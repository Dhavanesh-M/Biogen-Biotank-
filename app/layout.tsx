import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { LanguageBanner } from '../components/LanguageBanner';
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Tamil } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { siteUrl } from '../lib/site';
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], display: 'swap', variable: '--font-devanagari' });
const tamil = Noto_Sans_Tamil({ subsets: ['tamil'], display: 'swap', variable: '--font-tamil' });
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: 'BioGen Biotank | Wastewater, transformed.', template: '%s | BioGen Biotank' }, description: 'Modular biological wastewater treatment, engineered for a world that never stops.', icons: { icon: '/brand/favicon.png', apple: '/brand/apple-touch-icon.png' }, alternates: { canonical: siteUrl, languages: { 'x-default': siteUrl, en: siteUrl, hi: `${siteUrl}/hi`, ta: `${siteUrl}/ta` } }, openGraph: { title: 'BioGen Biotank', description: 'Modular biological wastewater treatment, engineered for a world that never stops.', locale: 'en_IN', url: siteUrl, images: ['/posters/hero-last-frame.jpg'] } };
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { const locale = await getLocale(); const messages = await getMessages(); const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'BioGen Biotank', url: siteUrl, logo: `${siteUrl}/brand/logo-light.png`, email: 'rajmurugan307@gmail.com', telephone: '+919566504484', inLanguage: locale }; return <html lang={locale}><body className={`${inter.variable} ${devanagari.variable} ${tamil.variable}`}><NextIntlClientProvider locale={locale} messages={messages}><Navbar /><LanguageBanner />{children}<Footer /><Analytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></NextIntlClientProvider></body></html>; }