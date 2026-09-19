export type ProductUseCase = 'Home' | 'Apartment' | 'Office' | 'Commercial';

export type Product = {
  name: string;
  slug: string;
  users: number;
  litres: number;
  tagline: string;
  useCases: ProductUseCase[];
  image: string | null;
  alt: string;
};

const productSpecs = [
  ['BioGen 2600', 'biogen-2600', 6, 2600, 'A considered fit for a family home.', ['Home']],
  ['BioGen 3350', 'biogen-3350', 10, 3350, 'A generous step for larger homes and small apartments.', ['Home', 'Apartment']],
  ['BioGen 4100', 'biogen-4100', 14, 4100, 'A calm scale for apartment blocks and small offices.', ['Apartment', 'Office']],
  ['BioGen 4850', 'biogen-4850', 18, 4850, 'A dependable choice for offices, schools and guest houses.', ['Office', 'Commercial']],
  ['BioGen 5600', 'biogen-5600', 20, 5600, 'A larger rhythm for resorts and institutions.', ['Commercial']],
] as const;

export const products: Product[] = productSpecs.map(([name, slug, users, litres, tagline, useCases]) => ({
  name,
  slug,
  users,
  litres,
  tagline,
  useCases: [...useCases],
  image: `/products/${slug}.webp`,
  alt: `${name} tank, ${litres} litres, up to ${users} users`,
}));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}