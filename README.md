# Alaska Handyman Services

Responsive React 18 website with GSAP, ScrollTrigger, Lenis and lazy-loaded Three.js home and alpine scenes.

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
- `src/HomeWorld.jsx` and `src/home-world.css`: accessible interactive-home section, controls and static fallback.
- `src/world.js`: custom Three.js world with locally generated house geometry, touch/pointer rotation, layers, service focus and evening lighting. This is a project module, not a third-party package called world.js.
- `src/mobile-motion.js` and `src/mobile-motion.css`: mobile GSAP choreography and interaction feedback.
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

The 3D home supports horizontal swipes, pointer drags, arrow keys and rotation buttons. Vertical touch scrolling and pinch zoom remain available (`touch-action: pan-y pinch-zoom`). Service buttons also expose every model hotspot. Open the layers to separate the house components, or switch to evening lighting. The illustration represents the services; it is not presented as an actual completed project or a construction service offer.

Mobile motion includes hero depth, perspective project reveals, animated service and menu changes, individual process reveals and press feedback. Lenis handles smooth wheel/anchor navigation while mobile touch retains native scrolling. Reduced motion removes both WebGL scenes and animated scrolling, preserves service controls and displays an illustrated home. Rendering uses capped pixel density and stops offscreen, in hidden tabs and when the model settles.

Company service descriptions are based on the brief and supplied project examples. No ratings, licensing claims, years of operation or precise service boundaries were invented.
