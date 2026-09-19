'use client';
import { Link } from '../i18n/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
const links = [['technology', '/technology'], ['process', '/process'], ['products', '/products'], ['specs', '/specs'], ['install', '/install'], ['applications', '/applications'], ['gallery', '/gallery']] as const;
export function Navbar() { const [open, setOpen] = useState(false); const t = useTranslations('nav'); return <header className="nav"><Link href="/" className="brand" aria-label="BioGen Biotank"><Logo /></Link><nav>{links.slice(0, 5).map(([label, href]) => <Link key={href} href={href}>{t(label)}</Link>)}</nav><div className="nav-actions"><LanguageSwitcher /><Link className="button button-small" href="/quote">{t('quote')} <span>↗</span></Link><button className="icon-button menu-toggle" aria-label={t('menu')} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>{open && <div className="mobile-menu"><Link href="/" className="mobile-logo" onClick={() => setOpen(false)}><Logo /></Link>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{t(label)}<span>↗</span></Link>)}<Link className="button" href="/quote" onClick={() => setOpen(false)}>{t('quote')} <span>↗</span></Link><LanguageSwitcher mobile /></div>}</header>; }