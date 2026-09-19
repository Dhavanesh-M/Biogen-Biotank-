# BioGen Biotank

## Development

```bash
npm install
npm run dev
```

The default language is English. Hindi and Tamil are available at `/hi` and `/ta`. Run `npm run i18n:check` after editing the message catalogs.

## Deploy to Vercel

1. Import this repository into Vercel and use the default Next.js build settings.
2. Add the variables from `.env.example` in Vercel Project Settings. `NEXT_PUBLIC_SITE_URL` must be the production URL, such as `https://biogen.example`.
3. Create a Resend API key, verify the sender domain, and set `LEAD_FROM_EMAIL` to an address on that verified domain. Set `LEAD_TO_EMAIL` to the inbox that should receive leads.
4. Google Sheets and Airtable forwarding are optional. Configure one provider's variables only when its webhook/API access is ready. Email delivery remains the primary lead path.
5. Deploy and test `/`, `/process`, `/gallery`, `/hi`, `/ta`, `/quote`, and each API endpoint. Submit a real test lead and confirm delivery.

```bash
npm run i18n:check
npm run build
npm run start
```

## Production notes

- Lead validation is server-side with Zod; the quote form also includes a hidden honeypot.
- The rate limit is an in-memory per-instance guard. For high-volume production traffic, replace it with Vercel KV/Upstash so limits are shared across serverless instances.
- Vercel Analytics is enabled without a cookie banner or cookie-based tracking.
- Replace `NEXT_PUBLIC_SITE_URL` before launch. The fallback is `http://localhost:3000` for local development only.
- The process video file and translated subtitle files should be reviewed before launch.# Biogen-Biotank-
# Biogen-Biotank-
# Biogen-Biotank-
