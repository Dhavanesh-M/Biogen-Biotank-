import { z } from 'zod';

export const leadSchema = z.object({
  locale: z.enum(['en', 'hi', 'ta']).default('en'),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(''),
  projectType: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().max(4000).optional().default(''),
  website: z.string().max(200).optional().default('')
});

type RateEntry = { count: number; resetAt: number };
const rateStore = new Map<string, RateEntry>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateStore.get(ip);
  if (!current || current.resetAt <= now) { rateStore.set(ip, { count: 1, resetAt: now + WINDOW_MS }); return false; }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export function leadError(locale: string) { return locale === 'hi' ? 'कृपया जानकारी जांचें और फिर से प्रयास करें।' : locale === 'ta' ? 'தயவுசெய்து தகவலைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.' : 'Please check your details and try again.'; }
export function deliveryError(locale: string) { return locale === 'hi' ? 'अभी संदेश भेजा नहीं जा सका। कृपया सीधे हमसे संपर्क करें।' : locale === 'ta' ? 'இப்போது செய்தியை அனுப்ப முடியவில்லை. தயவுசெய்து நேரடியாக தொடர்பு கொள்ளுங்கள்.' : 'We could not send your message right now. Please contact us directly.'; }
export function successMessage(locale: string) { return locale === 'hi' ? 'धन्यवाद। हम आपसे जल्द संपर्क करेंगे।' : locale === 'ta' ? 'நன்றி. விரைவில் உங்களைத் தொடர்புகொள்கிறோம்.' : 'Thank you. We will be in touch.'; }

export async function storeLead(endpoint: string, lead: z.infer<typeof leadSchema>) {
  const payload = { endpoint, ...lead, submittedAt: new Date().toISOString() };
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_NAME) {
    await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME)}`, { method: 'POST', headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`, 'content-type': 'application/json' }, body: JSON.stringify({ fields: payload }) });
  }
}