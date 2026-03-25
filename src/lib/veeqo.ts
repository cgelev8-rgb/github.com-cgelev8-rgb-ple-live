export const VEEQO_BASE_URL = 'https://api.veeqo.com';

export async function fetchVeeqo(endpoint: string, options: RequestInit = {}) {
  const apiKey = process.env.VEEQO_API_KEY;
  if (!apiKey) throw new Error("VEEQO_API_KEY is not configured in .env.local");

  const response = await fetch(`${VEEQO_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Veeqo API Error [${response.status}]: ${errorText}`);
  }

  return response.json();
}

/**
 * Fetch Veeqo orders that have been updated/shipped since a certain date.
 */
export async function getShippedOrdersSince(sinceDate: Date) {
  // ISO string is required by Veeqo usually
  const query = new URLSearchParams({
    updated_at_min: sinceDate.toISOString(),
    status: 'shipped', // only pulled shipped orders meaning labels were purchased
    page_size: '100' // max per page
  });

  const data = await fetchVeeqo(`/orders?${query}`);
  return data;
}
