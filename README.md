# Alaska Handyman Services

Responsive React 18 website with GSAP, ScrollTrigger, Lenis and a lazy-loaded Three.js alpine scene.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The deployable static site is in `dist/`. The Sites identity is preserved in `.openai/hosting.json`.

## Main files

- `src/app.jsx`: React components, motion lifecycle, forms and comparisons.
- `src/redesign.css`: responsive design and reduced-motion styles.
- `src/terrain.js`: optional Three.js scene with complete cleanup.
- `public/assets/`: optimized supplied media.
- `research/DESIGN-RESEARCH.md`: review of 30 handyman websites with sources and evidence limits.
- `ASSETS.md`: media inventory and optimization details.
- `DESIGN.md`: visual direction and content rules.

## Contact behavior

Phone links use `tel:+19077448725`. Email goes to `alaskahandymanservices907@gmail.com`. The inquiry form validates locally and prepares a reviewable `mailto:` draft; it does not deliver email or store customer information on a server. The visitor sends from their email app and can attach photos there.

## Rebuild media

Original files remain one folder above this project. `node scripts/prepare-assets.mjs` generates optimized derivatives; use `--force` only when re-encoding is needed. The website uses both supplied videos, both comparison pairs and the original logo. There is also an optional landscape video crop for future use.

## Accessibility and motion

Native keyboard-operable comparison sliders, explicit labels, visible focus states, mobile menu Escape handling, readable static fallbacks and reduced-motion support. The footer provides a Reduce motion control. Background videos pause when out of view or the tab is hidden. Three.js loads near the relevant section and renders only when necessary.

Company service descriptions are based on the brief and supplied project examples. No ratings, licensing claims, years of operation or precise service boundaries were invented.
