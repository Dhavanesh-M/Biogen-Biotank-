import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '../../i18n/request';
import type { Metadata } from 'next';
import en from '../../messages/en.json';
import hi from '../../messages/hi.json';
import ta from '../../messages/ta.json';
import { siteUrl } from '../../lib/site';
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const catalog = params.locale === 'hi' ? hi : params.locale === 'ta' ? ta : en; const base = params.locale === 'en' ? '' : `/${params.locale}`; return { title: { default: catalog.seo.title, template: `%s | BioGen Biotank` }, description: catalog.seo.description, alternates: { canonical: `${siteUrl}${base}`, languages: { 'x-default': siteUrl, en: siteUrl, hi: `${siteUrl}/hi`, ta: `${siteUrl}/ta` } }, openGraph: { title: catalog.seo.title, description: catalog.seo.description, locale: params.locale === 'hi' ? 'hi_IN' : params.locale === 'ta' ? 'ta_IN' : 'en_IN', url: `${siteUrl}${base}`, images: ['/posters/hero-last-frame.jpg'] } }; }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) { if (!locales.includes(params.locale as Locale)) notFound(); setRequestLocale(params.locale); return children; }