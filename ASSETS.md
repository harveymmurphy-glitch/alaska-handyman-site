# Supplied asset inventory

All seven supplied source files remain untouched in the parent folder. The site uses optimized derivatives from public/assets. No replacement or AI-generated imagery was introduced.

| Original | Website asset | Original size | Output size | Transformation |
| --- | --- | ---: | ---: | --- |
| before.png | /assets/before.webp | 2.17 MB | 167.4 KB | WebP quality 86; 1448 × 1086; full original image, including existing labels. |
| before1.png | /assets/before1.webp | 1.86 MB | 92.9 KB | WebP quality 86; 1448 × 1086; full original image, including existing labels. |
| after.png | /assets/after.webp | 84.0 KB | 79.6 KB | WebP quality 86; 1160 × 870; full original image, including existing labels. |
| after1.png | /assets/after1.webp | 68.4 KB | 62.6 KB | WebP quality 86; 1160 × 870; full original image, including existing labels. |
| logo.png | /assets/logo.webp | 1005.0 KB | 70.5 KB | Full original logo, unchanged composition, WebP quality 92. |
| logo.png | /assets/favicon.png | 1005.0 KB | 43.4 KB | Existing mountain/house/hammer mark cropped from supplied logo, centered on white at 256 × 256. |
| hero.mp4 | /assets/hero.mp4 | 26.37 MB | 4.88 MB | Living-room floor cleaning; full 17-second source; 1920 × 1080; H.264/yuv420p; 25 fps; CRF 24, capped 2.4 Mbps; silent MP4 with faststart. |
| hero.mp4 | /assets/hero-poster.webp | 26.37 MB | 78.5 KB | Poster extracted from encoded clip at 1 second; WebP quality 84. |
| mobilehero.mp4 | /assets/mobilehero.mp4 | 48.92 MB | 1.96 MB | Craftsperson measuring/marking timber at a workbench; source seconds 2–20; 676 × 1280; H.264/yuv420p; 25 fps; CRF 24, capped 2.4 Mbps; silent MP4 with faststart. |
| mobilehero.mp4 | /assets/mobile-poster.webp | 48.92 MB | 33.8 KB | Poster extracted from encoded clip at 1 second; WebP quality 84. |
| mobilehero.mp4 | /assets/craft-wide.mp4 | 48.92 MB | 3.50 MB | Detail crop of the craftsperson’s hands, timber and warm task light; source seconds 2–20; 1600 × 900; H.264/yuv420p; 25 fps; CRF 24, capped 2.4 Mbps; silent MP4 with faststart. |
| mobilehero.mp4 | /assets/craft-wide-poster.webp | 48.92 MB | 45.1 KB | Poster extracted from encoded clip at 1 second; WebP quality 84. |
| mobilehero.mp4 | /assets/craft-detail.webp | 48.92 MB | 63.6 KB | Landscape detail of hands marking the timber; source second 3; 1600 × 900. Conventional crop/extraction only, WebP quality 88. |
| mobilehero.mp4 | /assets/workshop.webp | 48.92 MB | 62.2 KB | Landscape view of the warm lamp, workbench, and hands; source second 12; 1600 × 1200. Conventional crop/extraction only, WebP quality 88. |

## Visual observations

- The desktop video shows a person vacuuming a modern living-room floor. It is best suited to the finishing/clean-up portion of the page.
- The portrait video shows a craftsperson measuring and marking timber at a workbench under a warm task light. It is the strongest supplied footage for a craftsmanship-led hero.
- before.png and after.png depict a bathroom vanity update: dark refinished cabinetry, new countertops, taps, and lighting.
- before1.png and after1.png depict a fireplace wall update: repaired and repainted walls, extended trim, tiled fireplace, and patterned alcove paneling.
- The supplied logo text uses the singular “Handyman Service”; the requested company name in website copy is “Alaska Handyman Services.” The logo artwork is preserved as supplied.

## Reproduction

Run `node scripts/prepare-assets.mjs` with the package dependencies installed. Video outputs are H.264 MP4 with the index moved to the front of the file for progressive playback. All clips are silent for muted autoplay; website components should provide playback controls and respect reduced-motion preferences.
