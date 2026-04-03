import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/db';
import { fetchZohoInventory } from '@/lib/zoho/inventory';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // 1. Verify the user is authenticated
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { amount } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // 2. Look up the customer and their billing profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { customer: { include: { billingProfile: true } } }
    });

    if (!user?.customer?.zohoInventoryContactId) {
      return NextResponse.json({ 
        error: 'Your account is not linked to Zoho Inventory yet. Please contact support.' 
      }, { status: 400 });
    }

    // 3. GUARD: Check for an unpaid top-up invoice
    if (user.customer.billingProfile?.pendingTopUpInvoiceId) {
      const pendingInvoice = user.customer.billingProfile.pendingTopUpInvoiceId;
      return NextResponse.json({ 
        error: `You already have an outstanding top-up invoice (#${pendingInvoice}). Please pay it before requesting another.` 
      }, { status: 409 });
    }

    const itemId = process.env.ZOHO_WALLET_TOPUP_ITEM_ID;
    if (!itemId) {
      return NextResponse.json({ error: 'Wallet top-up item not configured' }, { status: 500 });
    }

    // 4. Create a Zoho invoice with the Top-Up item
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3); // Due in 3 days
    const dueDateStr = dueDate.toISOString().split('T')[0];

    const payload = {
      customer_id: user.customer.zohoInventoryContactId,
      date: today,
      due_date: dueDateStr,
      line_items: [
        {
          item_id: itemId,
          name: 'Shipping Wallet Top-Up',
          description: `Wallet credit deposit — requested by ${session.user.name || session.user.email}`,
          rate: amount,
          quantity: 1,
        }
      ],
      notes: 'This invoice is for adding funds to your Shipping Wallet. Once paid, your balance will update automatically.',
      is_inclusive_tax: false,
    };

    const data = await fetchZohoInventory('/invoices', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // 5. Store the pending invoice ID to block future spam
    await prisma.billingProfile.update({
      where: { customerId: user.customer.id },
      data: { pendingTopUpInvoiceId: data.invoice.invoice_number }
    });

    console.log(`[TOP-UP] Created invoice ${data.invoice.invoice_number} for $${amount} — customer: ${user.customer.companyName}`);

    return NextResponse.json({
      success: true,
      invoiceNumber: data.invoice.invoice_number,
      message: `Invoice #${data.invoice.invoice_number} has been created. You'll receive a payment link at your registered email shortly.`,
    });

  } catch (error: any) {
    console.error('Top-Up Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
