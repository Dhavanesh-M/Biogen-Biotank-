import { getRequestConfig } from 'next-intl/server';

const supported = ['en', 'hi', 'ta'] as const;
export type Locale = (typeof supported)[number];
export const locales = supported;

function mergeMessages(base: Record<string, unknown>, override: Record<string, unknown>) { const result = { ...base }; for (const [key, value] of Object.entries(override)) result[key] = value && typeof value === 'object' && !Array.isArray(value) ? mergeMessages((result[key] as Record<string, unknown>) ?? {}, value as Record<string, unknown>) : value; return result; }

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = supported.includes(requested as Locale) ? requested as Locale : 'en';
  const english = (await import('../messages/en.json')).default;
  const localized = locale === 'en' ? {} : (await import(`../messages/${locale}.json`)).default;
  return { locale, messages: mergeMessages(english, localized) as any };
});