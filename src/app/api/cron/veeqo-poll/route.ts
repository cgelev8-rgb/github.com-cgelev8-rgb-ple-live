import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getShippedOrdersSince } from '@/lib/veeqo';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Security check: Only allow requests with a valid secret key
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Determine the 'since' date. Always poll Veeqo for exact shipments over the past 7 days to ensure missed labels are captured.
    const sinceDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // 2. Fetch Shipped Orders from Veeqo
    const orders = await getShippedOrdersSince(sinceDate);
    let newLabelsProcessed = 0;

    // 3. Process each order
    for (const order of orders) {
      // Find the shipment cost inside the order. Veeqo orders usually embed 'allocations' and 'shipments'
      // This is dynamic based on Veeqo exact response shape, but usually:
      const shipments = order.allocations?.flatMap((a: any) => a.shipment) || [];
      
      for (const shipment of shipments) {
        if (!shipment || !shipment.id) continue;

        // Check if we've already seen this exact shipment to ensure idempotency
        const seen = await prisma.veeqoShipmentsSeen.findUnique({
          where: { veeqoShipmentId: String(shipment.id) }
        });

        if (!seen) {
          // Extract SKUs from the Veeqo order line items
          const skus = (order.line_items || []).map((li: any) => li.sellable?.sku_code || "").filter(Boolean);
          
          let dbCustomer = null;
          if (skus.length > 0) {
            // Retrieve customers with a registered prefix to check for a match
            const brandCustomers = await prisma.customer.findMany({
               where: { brandSkuPrefix: { not: null } },
               include: { walletLedger: true, billingProfile: true }
            });
            
            for (const bc of brandCustomers) {
              if (bc.brandSkuPrefix && skus.some((sku: string) => sku.startsWith(bc.brandSkuPrefix!))) {
                dbCustomer = bc;
                break;
              }
            }
          }

          const rawCost = shipment.outbound_label_charges?.value || shipment.cost;

          if (dbCustomer && rawCost !== undefined && rawCost !== null) {
             const cost = parseFloat(rawCost);

             await prisma.$transaction(async (tx) => {
               // Record the seen shipment
               await tx.veeqoShipmentsSeen.create({
                 data: { veeqoShipmentId: String(shipment.id) }
               });

               // Record the charge event
               await tx.shippingChargeEvent.create({
                 data: {
                   customerId: dbCustomer.id,
                   veeqoShipmentId: String(shipment.id),
                   veeqoOrderId: String(order.number || order.id),
                   trackingNumber: shipment.tracking_number_api || shipment.tracking_number?.tracking_number,
                   carrier: shipment.sub_carrier_id || shipment.service_carrier_name || shipment.carrier?.name,
                   serviceLevel: shipment.service_name || shipment.short_service_name,
                   cost: cost,
                   billed: false, 
                 }
               });

               // If they are on Wallet Model, immediately deduct the wallet ledger
               if (dbCustomer.billingProfile?.billingMode === 'wallet' && dbCustomer.walletLedger) {
                 await tx.shippingWalletLedger.update({
                   where: { customerId: dbCustomer.id },
                   data: { balance: { decrement: cost } }
                 });
                 
                 if (dbCustomer.walletLedger!.balance - cost < 0) {
                    await tx.billingProfile.update({
                      where: { customerId: dbCustomer.id },
                      data: { fulfillmentHoldStatus: true }
                    });
                                        console.log(`[HOLD] Fulfillment hold triggered for customer ${dbCustomer.id} due to zero balance.`);
                  } 
               }
             });
             newLabelsProcessed++;
          }
        }
      }
    }

    return NextResponse.json({ success: true, newLabelsProcessed });
  } catch (error: any) {
    console.error("Veeqo Polling Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
