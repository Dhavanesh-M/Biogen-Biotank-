import { NextResponse } from 'next/server';
import en from '../../../messages/en.json';
import hi from '../../../messages/hi.json';
import ta from '../../../messages/ta.json';
import { Resend } from 'resend';
import { deliveryError, isRateLimited, leadError, leadSchema, storeLead, successMessage } from '../../../lib/lead';
const catalogs = { en, hi, ta } as const;
type Locale = keyof typeof catalogs;
export async function POST(request: Request, { params }: { params: { endpoint: string } }) {
	const raw = await request.json().catch(() => ({}));
	const locale: Locale = raw.locale === 'hi' || raw.locale === 'ta' ? raw.locale : 'en';
	if (!['quote', 'contact', 'newsletter'].includes(params.endpoint)) return NextResponse.json({ message: catalogs[locale].errors.notFoundTitle }, { status: 404 });
	const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
	if (isRateLimited(ip)) return NextResponse.json({ message: deliveryError(locale) }, { status: 429 });
	const parsed = leadSchema.safeParse({ ...raw, locale });
	if (!parsed.success) return NextResponse.json({ message: leadError(locale), issues: parsed.error.flatten().fieldErrors }, { status: 400 });
	if (parsed.data.website) return NextResponse.json({ ok: true, message: successMessage(locale) });
	if (!process.env.RESEND_API_KEY || !process.env.LEAD_TO_EMAIL || !process.env.LEAD_FROM_EMAIL) return NextResponse.json({ message: deliveryError(locale) }, { status: 503 });
	try {
		const resend = new Resend(process.env.RESEND_API_KEY);
		const subject = `BioGen ${params.endpoint} lead: ${parsed.data.name}`;
		await resend.emails.send({ from: process.env.LEAD_FROM_EMAIL, to: process.env.LEAD_TO_EMAIL, subject, text: [`Name: ${parsed.data.name}`, `Email: ${parsed.data.email}`, `Phone: ${parsed.data.phone}`, `Project: ${parsed.data.projectType}`, `Model: ${parsed.data.model}`, `Message: ${parsed.data.message}`, `Locale: ${parsed.data.locale}`].join('\n') });
		// Optional Google Sheets/Airtable forwarding runs only when its environment variables are configured.
		try { await storeLead(params.endpoint, parsed.data); } catch (storageError) { console.error('Optional lead storage failed', storageError); }
		return NextResponse.json({ ok: true, message: successMessage(locale) });
	} catch (error) { console.error('Lead delivery failed', error); return NextResponse.json({ message: deliveryError(locale) }, { status: 502 }); }
}