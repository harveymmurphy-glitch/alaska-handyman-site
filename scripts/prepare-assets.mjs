import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

// Reproducible, conventional compression of the seven supplied source assets.
// Original sources are never modified. Run with: node scripts/prepare-assets.mjs
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.dirname(project);
const output = path.join(project, 'public', 'assets');
await fs.mkdir(output, { recursive: true });
const entries = [];

async function run(args) {
  return new Promise((resolve, reject) => {
    const process = spawn(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { windowsHide: true });
    let errors = '';
    process.stderr.on('data', data => { errors += data.toString(); });
    process.on('error', reject);
    process.on('close', code => code === 0 ? resolve() : reject(new Error(errors)));
  });
}

async function register(original, generated, transform) {
  const originalSize = (await fs.stat(path.join(source, original))).size;
  const generatedSize = (await fs.stat(path.join(output, generated))).size;
  entries.push({ original, generated, originalSize, generatedSize, transform });
  console.log(`${generated}: ${(generatedSize / 1024).toFixed(0)} KB`);
}

for (const name of ['before', 'before1', 'after', 'after1']) {
  const original = `${name}.png`;
  const generated = `${name}.webp`;
  await sharp(path.join(source, original)).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(path.join(output, generated));
  const { width, height } = await sharp(path.join(output, generated)).metadata();
  await register(original, generated, `WebP quality 86; ${width} × ${height}; full original image, including existing labels.`);
}

await sharp(path.join(source, 'logo.png')).rotate().resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 92, effort: 6 }).toFile(path.join(output, 'logo.webp'));
await register('logo.png', 'logo.webp', 'Full original logo, unchanged composition, WebP quality 92.');
await sharp(path.join(source, 'logo.png')).extract({ left: 100, top: 180, width: 1050, height: 620 }).resize(256, 256, { fit: 'contain', background: '#ffffff' }).png().toFile(path.join(output, 'favicon.png'));
await register('logo.png', 'favicon.png', 'Existing mountain/house/hammer mark cropped from supplied logo, centered on white at 256 × 256.');

const videos = [
  { original: 'hero.mp4', generated: 'hero.mp4', poster: 'hero-poster.webp', start: 0, duration: 17, scale: '1920:1080', description: 'Living-room floor cleaning; full 17-second source; 1920 × 1080' },
  { original: 'mobilehero.mp4', generated: 'mobilehero.mp4', poster: 'mobile-poster.webp', start: 2, duration: 18, scale: '720:1280', description: 'Craftsperson measuring/marking timber at a workbench; source seconds 2–20; 676 × 1280' },
  { original: 'mobilehero.mp4', generated: 'craft-wide.mp4', poster: 'craft-wide-poster.webp', start: 2, duration: 18, filter: 'crop=2144:1206:8:2300,scale=1600:900,setsar=1', description: 'Detail crop of the craftsperson’s hands, timber and warm task light; source seconds 2–20; 1600 × 900' },
];

for (const video of videos) {
  const existing = await fs.stat(path.join(output, video.generated)).catch(() => null);
  if (!existing || existing.size < 1024 || process.argv.includes('--force')) {
    console.log(`Encoding ${video.generated}…`);
    await run(['-ss', String(video.start), '-i', path.join(source, video.original), '-t', String(video.duration), '-an', '-vf', video.filter || `scale=${video.scale}:force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1`, '-r', '25', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-maxrate', '2400k', '-bufsize', '4800k', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-threads', '2', path.join(output, video.generated)]);
  }
  await register(video.original, video.generated, `${video.description}; H.264/yuv420p; 25 fps; CRF 24, capped 2.4 Mbps; silent MP4 with faststart.`);
  const temporary = path.join(output, `${video.poster}.png`);
  await run(['-ss', '1', '-i', path.join(output, video.generated), '-frames:v', '1', temporary]);
  await sharp(temporary).webp({ quality: 84, effort: 6 }).toFile(path.join(output, video.poster));
  await fs.unlink(temporary);
  await register(video.original, video.poster, 'Poster extracted from encoded clip at 1 second; WebP quality 84.');
}

for (const frame of [
  { name: 'craft-detail.webp', time: 3, filter: 'crop=2144:1206:8:2300,scale=1600:900', description: 'Landscape detail of hands marking the timber; source second 3; 1600 × 900.' },
  { name: 'workshop.webp', time: 12, filter: 'crop=2144:1608:8:1650,scale=1600:1200', description: 'Landscape view of the warm lamp, workbench, and hands; source second 12; 1600 × 1200.' },
]) {
  const temporary = path.join(output, `${frame.name}.png`);
  await run(['-ss', String(frame.time), '-i', path.join(source, 'mobilehero.mp4'), '-frames:v', '1', '-vf', frame.filter, temporary]);
  await sharp(temporary).webp({ quality: 88, effort: 6 }).toFile(path.join(output, frame.name));
  await fs.unlink(temporary);
  await register('mobilehero.mp4', frame.name, `${frame.description} Conventional crop/extraction only, WebP quality 88.`);
}

for (const name of ['hero-inspect.png', 'mobile-inspect.png', 'mobile-inspect-12.png', 'mobile-inspect-21.png', 'crop-inspect.png']) {
  await fs.unlink(path.join(output, name)).catch(error => { if (error.code !== 'ENOENT') throw error; });
}

const kb = value => value >= 1024 * 1024 ? `${(value / 1024 / 1024).toFixed(2)} MB` : `${(value / 1024).toFixed(1)} KB`;
const rows = entries.map(entry => `| ${entry.original} | /assets/${entry.generated} | ${kb(entry.originalSize)} | ${kb(entry.generatedSize)} | ${entry.transform} |`).join('\n');
await fs.writeFile(path.join(project, 'ASSETS.md'), `# Supplied asset inventory\n\nAll seven supplied source files remain untouched in the parent folder. The site uses optimized derivatives from public/assets. No replacement or AI-generated imagery was introduced.\n\n| Original | Website asset | Original size | Output size | Transformation |\n| --- | --- | ---: | ---: | --- |\n${rows}\n\n## Visual observations\n\n- The desktop video shows a person vacuuming a modern living-room floor. It is best suited to the finishing/clean-up portion of the page.\n- The portrait video shows a craftsperson measuring and marking timber at a workbench under a warm task light. It is the strongest supplied footage for a craftsmanship-led hero.\n- before.png and after.png depict a bathroom vanity update: dark refinished cabinetry, new countertops, taps, and lighting.\n- before1.png and after1.png depict a fireplace wall update: repaired and repainted walls, extended trim, tiled fireplace, and patterned alcove paneling.\n- The supplied logo text uses the singular “Handyman Service”; the requested company name in website copy is “Alaska Handyman Services.” The logo artwork is preserved as supplied.\n\n## Reproduction\n\nRun \`node scripts/prepare-assets.mjs\` with the package dependencies installed. Video outputs are H.264 MP4 with the index moved to the front of the file for progressive playback. All clips are silent for muted autoplay; website components should provide playback controls and respect reduced-motion preferences.\n`, 'utf8');
console.log('Asset preparation complete.');
