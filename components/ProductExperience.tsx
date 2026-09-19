import Image from 'next/image';
import Link from 'next/link';
import { products, type Product } from '../data/products';
import { getTranslations } from 'next-intl/server';
import { ProductCards } from './ProductCards';

const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMTExNTEzIi8+PC9zdmc+';

function ProductPhoto({ product, priority = false }: { product: Product; priority?: boolean }) {
  return <div className={`product-photo ${product.slug === 'biogen-5600' ? 'product-photo-cover' : ''}`}>
    {product.image ? <Image src={product.image} alt={product.alt} fill sizes="(max-width: 800px) 86vw, 42vw" placeholder="blur" blurDataURL={blurDataURL} priority={priority} /> : <div className="product-placeholder"><span className="brand-mark">B</span><strong>{product.name}</strong></div>}
  </div>;
}

export function SizeStrip() {
  return <section className="size-strip"><p className="eyebrow">Choose your size</p><div>{products.map((product) => <Link href={`/products/${product.slug}`} key={product.slug}><strong>{product.name.replace('BioGen ', '')}</strong><span>Up to {product.users} users · {product.litres} L</span></Link>)}</div></section>;
}

export function SpecsComparison() {
  return <section className="comparison"><div className="comparison-scroll"><table><thead><tr><th>Model</th><th>Users</th><th>Litres</th></tr></thead><tbody>{products.map((product) => <tr key={product.slug}><th>{product.name}</th><td>{product.users}</td><td>{product.litres} L</td></tr>)}</tbody></table></div></section>;
}

export async function ProductListing() {
  const t = await getTranslations('products');
  const taglines = Object.fromEntries(products.map((product) => [product.slug, t(`taglines.${product.slug}`)]));
  return <main className="page products-page"><section className="page-header"><p className="eyebrow">BioGen Biotank · Products</p><h1>{t('title')}</h1><p>{t('lead')}</p></section><ProductCards products={products} taglines={taglines} details={t('details')} quote={t('quote')} /><SizeStrip /></main>;
}

export async function ProductDetail({ product }: { product: Product }) {
  const t = await getTranslations('products');
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 2);
  return <main className="page product-detail"><section className="product-hero"><div><p className="eyebrow">BioGen Biotank · {product.name}</p><h1>{product.name}</h1><p>{t(`taglines.${product.slug}`)}</p><div className="product-specs"><strong>Up to {product.users} users</strong><strong>{product.litres} litres</strong></div><Link className="button" href="/quote">{t('quote')} <span>↗</span></Link></div><ProductPhoto product={product} priority /></section><section className="detail-grid"><div><p className="eyebrow">{t('includedTitle')}</p><h2>{t('included')}</h2><p>{t('includedText')}</p></div><div><p className="eyebrow">{t('dimensionsTitle')}</p><h2>{t('dimensions')}</h2><table><tbody><tr><th>{t('length')}</th><td>{t('contactDimensions')}</td></tr><tr><th>{t('width')}</th><td>{t('contactDimensions')}</td></tr><tr><th>{t('height')}</th><td>{t('contactDimensions')}</td></tr></tbody></table><small>// PLACEHOLDER: dimensions to be supplied.</small></div></section><section className="detail-actions"><button className="button button-outline" type="button">{t('brochure')}</button><Link className="button" href="/quote">{t('quote')} <span>↗</span></Link></section><section className="related-products"><p className="eyebrow">{t('related')}</p><div>{related.map((item) => <Link href={`/products/${item.slug}`} key={item.slug}><strong>{item.name}</strong><span>{item.users} users · {item.litres} L</span></Link>)}</div></section></main>;
}