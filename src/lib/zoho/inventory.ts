import { getZohoAccessToken } from './auth';

const ZOHO_INV_BASE = 'https://www.zohoapis.com/inventory/v1';

export async function fetchZohoInventory(endpoint: string, options: RequestInit = {}) {
  const token = await getZohoAccessToken();
  const orgId = process.env.ZOHO_ORG_ID;

  if (!orgId) throw new Error("ZOHO_ORG_ID is missing in .env.local");

  // Format url with organization_id query param
  const url = new URL(`${ZOHO_INV_BASE}${endpoint}`);
  url.searchParams.append('organization_id', orgId);

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      'Authorization': `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Zoho Inventory Error [${data.code}]: ${data.message}`);
  }

  return data;
}

/**
 * Generates an automated invoice for Weekly Billing users
 */
export async function createWeeklyShippingInvoice(contactId: string, amount: number, dueDate: string) {
  const payload = {
    customer_id: contactId,
    date: new Date().toISOString().split('T')[0],
    due_date: dueDate,
    line_items: [
      {
        name: 'Weekly Shipping Charges',
        description: 'Automated weekly billing for shipping labels generated in Veeqo',
        rate: amount,
        quantity: 1,
      }
    ],
    notes: 'Thank you for your business. This invoice captures your fulfillment shipping charges for the week.',
    is_inclusive_tax: false,
  };

  const data = await fetchZohoInventory('/invoices', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  console.log(`Created Invoice ${data.invoice.invoice_number} for amount $${amount}`);
  return data.invoice;
}
