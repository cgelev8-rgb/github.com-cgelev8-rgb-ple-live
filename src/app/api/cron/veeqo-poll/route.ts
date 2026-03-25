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
    // 1. Determine the 'since' date. Defaults to 24 hours ago if no previous records exist.
    const lastSeen = await prisma.shippingChargeEvent.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    const sinceDate = lastSeen ? lastSeen.createdAt : new Date(Date.now() - 24 * 60 * 60 * 1000);

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
          // If the customer matches a known account (mapped via Zoho email or ID later)
          // For now we assume we have a way to match it. E.g. order.customer.email
          const customerEmail = order.customer?.email;
          const dbCustomer = await prisma.customer.findFirst({
             where: { user: { email: customerEmail } },
             include: { walletLedger: true, billingProfile: true }
          });

          if (dbCustomer && shipment.cost) {
             const cost = parseFloat(shipment.cost);

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
                   veeqoOrderId: String(order.id),
                   trackingNumber: shipment.tracking_number_api,
                   carrier: shipment.carrier?.name,
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
                 
                 // TODO: Trigger Fullfillment Hold if balance drops below 0 
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
