import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'hi', 'ta'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false
});

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };