import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site';
import { products } from '../data/products';
const routes = ['', 'technology', 'process', 'products', 'specs', 'applications', 'install', 'sustainability', 'gallery', 'about', 'faq', 'blog', 'contact', 'quote', 'privacy', 'terms'];
const productRoutes = products.map((product) => `products/${product.slug}`);
export default function sitemap(): MetadataRoute.Sitemap { return [...routes, ...productRoutes].flatMap((route) => [{ url: `${siteUrl}/${route}`, alternates: { languages: { en: `${siteUrl}/${route}`, hi: `${siteUrl}/hi/${route}`, ta: `${siteUrl}/ta/${route}`, 'x-default': `${siteUrl}/${route}` } } }, { url: `${siteUrl}/hi/${route}` }, { url: `${siteUrl}/ta/${route}` }]); }