import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { createWeeklyShippingInvoice } from '@/lib/zoho/inventory';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Security check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Find all customers on the Weekly Auto-Debit plan
    const weeklyCustomers = await prisma.customer.findMany({
      where: {
        billingProfile: {
          billingMode: 'weekly_autodebit',
          fulfillmentHoldStatus: false
        }
      },
      include: {
        chargeEvents: {
          where: { billed: false }
        }
      }
    });

    let invoicesCreated = 0;

    // 2. Process each customer
    for (const customer of weeklyCustomers) {
      if (customer.chargeEvents.length === 0) continue; // nothing to bill

      const totalUnbilled = customer.chargeEvents.reduce((sum, event) => sum + event.cost, 0);

      // We need their Zoho Inventory Contact ID to create an invoice
      if (!customer.zohoInventoryContactId) {
        console.error(`Customer ${customer.id} has no Zoho Inventory Contact ID mapped!`);
        continue;
      }

      // Generate invoice due immediately (or next day)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 1); // Due tomorrow
      const dueDateStr = dueDate.toISOString().split('T')[0];

      await prisma.$transaction(async (tx) => {
        // Create the invoice in Zoho
        const invoice = await createWeeklyShippingInvoice(
          customer.zohoInventoryContactId!, 
          totalUnbilled, 
          dueDateStr
        );

        // Mark all these events as billed so they aren't uniquely billed again
        await tx.shippingChargeEvent.updateMany({
          where: {
            id: { in: customer.chargeEvents.map((e) => e.id) }
          },
          data: { billed: true }
        });

        invoicesCreated++;
        console.log(`Successfully generated invoice ${invoice.invoice_number} for customer ${customer.id}`);
      });
    }

    return NextResponse.json({ success: true, invoicesCreated });
  } catch (error: any) {
    console.error("Weekly Billing Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
