import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // 1. Security: Validate the webhook secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ZOHO_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // 2. Extract key fields from the Zoho payment webhook payload
    const {
      payment_id,       // Unique Zoho payment reference
      customer_id,      // Zoho CRM Account ID of the payer
      invoice_number,   // Which invoice was paid (if applicable)
      line_items = [],  // The individual line items on the paid invoice
    } = body;

    if (!payment_id || !customer_id) {
      return NextResponse.json({ error: 'Missing payment_id or customer_id' }, { status: 400 });
    }

    // 3. Idempotency: Check if this payment was already processed
    const existingPayment = await prisma.paymentEvent.findUnique({
      where: { zohoPaymentId: String(payment_id) }
    });
    if (existingPayment) {
      return NextResponse.json({ message: 'Payment already processed', paymentId: payment_id });
    }

    // 4. Find the customer by their Zoho CRM Account ID
    const customer = await prisma.customer.findUnique({
      where: { zohoCrmAccountId: String(customer_id) },
      include: {
        billingProfile: true,
        walletLedger: true
      }
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found for this Zoho account' }, { status: 404 });
    }

    // 5. Filter line items for Shipping Wallet relevance
    const TOPUP_ITEM_ID = process.env.ZOHO_WALLET_TOPUP_ITEM_ID;
    const WEEKLY_ITEM_ID = process.env.ZOHO_SHIPPING_CHARGES_ITEM_ID;

    let walletTopUpAmount = 0;
    let weeklyPaymentAmount = 0;

    for (const item of line_items) {
      const itemId = String(item.item_id);
      if (itemId === TOPUP_ITEM_ID) {
        walletTopUpAmount += parseFloat(item.item_total || item.rate || 0);
      } else if (itemId === WEEKLY_ITEM_ID) {
        weeklyPaymentAmount += parseFloat(item.item_total || item.rate || 0);
      }
      // All other item IDs are silently ignored (not our service)
    }

    // If neither of our items matched, this payment isn't for the Shipping Wallet
    if (walletTopUpAmount === 0 && weeklyPaymentAmount === 0) {
      return NextResponse.json({ message: 'Payment ignored — no Shipping Wallet line items found' });
    }

    // 6. Process the payment inside a transaction
    await prisma.$transaction(async (tx) => {
      // === WALLET TOP-UP ===
      if (walletTopUpAmount > 0) {
        // Add funds to the wallet balance
        await tx.shippingWalletLedger.update({
          where: { customerId: customer.id },
          data: { balance: { increment: walletTopUpAmount } }
        });

        // If they were on hold and now have a positive balance, release the hold
        if (customer.billingProfile?.fulfillmentHoldStatus) {
          const updatedLedger = await tx.shippingWalletLedger.findUnique({
            where: { customerId: customer.id }
          });
          if (updatedLedger && updatedLedger.balance > 0) {
            await tx.billingProfile.update({
              where: { customerId: customer.id },
              data: { fulfillmentHoldStatus: false }
            });
            console.log(`[HOLD RELEASED] Fulfillment hold lifted for customer ${customer.id}`);
          }
        }

        // Record the payment event
        await tx.paymentEvent.create({
          data: {
            customerId: customer.id,
            zohoPaymentId: String(payment_id),
            amount: walletTopUpAmount,
            paymentType: 'wallet_topup',
            zohoInvoiceNumber: invoice_number || null,
          }
        });

        // Clear the pending invoice lock so they can request new top-ups
        await tx.billingProfile.update({
          where: { customerId: customer.id },
          data: { pendingTopUpInvoiceId: null }
        });
      }

      // === WEEKLY INVOICE PAYMENT ===
      if (weeklyPaymentAmount > 0) {
        // Mark all billed-but-unpaid charge events as paid
        await tx.shippingChargeEvent.updateMany({
          where: {
            customerId: customer.id,
            billed: true,
            paid: false,
          },
          data: { paid: true }
        });

        // Record the payment event
        await tx.paymentEvent.create({
          data: {
            customerId: customer.id,
            zohoPaymentId: String(payment_id) + (walletTopUpAmount > 0 ? '-weekly' : ''),
            amount: weeklyPaymentAmount,
            paymentType: 'invoice_payment',
            zohoInvoiceNumber: invoice_number || null,
          }
        });
      }
    });

    const actions: string[] = [];
    if (walletTopUpAmount > 0) actions.push(`wallet topped up by $${walletTopUpAmount.toFixed(2)}`);
    if (weeklyPaymentAmount > 0) actions.push(`weekly charges marked as paid`);

    return NextResponse.json({
      success: true,
      customer: customer.companyName,
      actions,
    });

  } catch (error: any) {
    console.error('Zoho Payment Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
