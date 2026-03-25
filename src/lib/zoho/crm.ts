import { getZohoAccessToken } from './auth';

const ZOHO_CRM_BASE = 'https://www.zohoapis.com/crm/v5';

export async function fetchZohoCRM(endpoint: string, options: RequestInit = {}) {
  const token = await getZohoAccessToken();

  const res = await fetch(`${ZOHO_CRM_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return res.json();
}

/**
 * Fetch Account by email or external ID to sync Billing Types
 */
export async function getAccountBillingProfile(accountId: string) {
  const data = await fetchZohoCRM(`/Accounts/${accountId}`);
  const account = data.data?.[0];
  if (!account) return null;

  return {
    billingType: account.Shipping_Billing_Type || 'Prepaid Wallet',
    clientSegment: account.Client_Segment || 'New',
    creditCap: account.Shipping_Credit_Cap || 0,
    walletBalance: account.Wallet_Balance || 0,
    fulfillmentHold: account.Fulfillment_Hold || false,
  };
}

/**
 * Update the Wallet Balance and Fulfillment Hold flag back to CRM so Ops team is aware
 */
export async function updateCRMStatus(accountId: string, updates: { walletBalance?: number; fulfillmentHold?: boolean }) {
  const payload: any = { id: accountId };
  if (updates.walletBalance !== undefined) payload.Wallet_Balance = updates.walletBalance;
  if (updates.fulfillmentHold !== undefined) payload.Fulfillment_Hold = updates.fulfillmentHold;

  return fetchZohoCRM(`/Accounts/${accountId}`, {
    method: 'PUT',
    body: JSON.stringify({ data: [payload] })
  });
}
