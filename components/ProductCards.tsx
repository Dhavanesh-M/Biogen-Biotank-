'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '../data/products';

const filters = ['All', 'Home', 'Apartment', 'Office', 'Commercial'] as const;
export function ProductCards({ products, taglines, details, quote }: { products: Product[]; taglines: Record<string, string>; details: string; quote: string }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const visible = filter === 'All' ? products : products.filter((product) => product.useCases.includes(filter));
  return <><div className="product-filters" aria-label="Product filters">{filters.map((item) => <button type="button" className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><section className="product-list">{visible.map((product) => <article className={`product-card ${products.indexOf(product) % 2 ? 'product-card-reverse' : ''}`} key={product.slug}><div className={`product-photo ${product.slug === 'biogen-5600' ? 'product-photo-cover' : ''}`}>{product.image ? <Image src={product.image} alt={product.alt} fill sizes="(max-width: 800px) 86vw, 42vw" /> : <div className="product-placeholder"><span className="brand-mark">B</span><strong>{product.name}</strong></div>}</div><div className="product-copy"><p className="eyebrow">{product.name}</p><h2>{product.name}</h2><div className="product-specs"><span>Up to {product.users} users</span><span>{product.litres} litres</span></div><p>{taglines[product.slug]}</p><div className="product-actions"><Link className="button" href={`/products/${product.slug}`}>{details} <span>↗</span></Link><Link className="button button-outline" href="/quote">{quote}</Link></div></div></article>)}</section></>;
}