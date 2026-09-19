export type SitePhotoMeta = { title?: string; location?: string; projectType?: 'Home' | 'Apartment' | 'Office' | 'School' | 'Resort' | 'Industrial'; capacity?: string; year?: string; caption?: string };
export const sitePhotoMeta: Record<string, SitePhotoMeta> = {
  // Add metadata keyed by the exact filename, for example: 'site-01.jpg': { location: 'Pune', projectType: 'Home' }
};