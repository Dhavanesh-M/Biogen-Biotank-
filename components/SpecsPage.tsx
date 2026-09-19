import { SpecsComparison } from './ProductExperience';
import { getTranslations } from 'next-intl/server';

export default async function SpecsPage() {
  const t = await getTranslations('pages.specs');
  return <main className="page"><section className="page-header"><p className="eyebrow">BioGen Biotank · Specs</p><h1>{t('title')}</h1><p>{t('lead')}</p></section><SpecsComparison /></main>;
}