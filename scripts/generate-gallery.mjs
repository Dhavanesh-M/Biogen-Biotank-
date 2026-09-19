import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const requestedDir = path.join(root, 'public', 'gallery', 'site');
const legacyDir = path.join(root, 'public', 'gallery');
const output = path.join(root, 'data', 'sitePhotos.generated.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
await fs.mkdir(requestedDir, { recursive: true });
async function filesIn(directory) { try { return (await fs.readdir(directory)).filter((file) => imageExtensions.has(path.extname(file).toLowerCase())).map((file) => ({ file, directory })); } catch { return []; } }
const requested = await filesIn(requestedDir);
const files = requested.length ? requested : (await filesIn(legacyDir)).filter(({ file }) => !file.startsWith('hero-'));
const photos = [];
for (const { file, directory } of files) { const source = path.join(directory, file); const image = sharp(source); const metadata = await image.metadata(); const blur = await image.resize({ width: 24 }).jpeg({ quality: 40 }).toBuffer(); const relative = path.relative(path.join(root, 'public'), source).split(path.sep).join('/'); photos.push({ filename: file, src: `/${relative}`, width: metadata.width ?? 1200, height: metadata.height ?? 800, blurDataURL: `data:image/jpeg;base64,${blur.toString('base64')}` }); }
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, `${JSON.stringify(photos, null, 2)}\n`);
console.log(`Generated ${photos.length} site photo record${photos.length === 1 ? '' : 's'}.`);