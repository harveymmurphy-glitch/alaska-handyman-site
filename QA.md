# Verification — 24 October 2026

## Browser checks

- Desktop, 768px tablet, 390px mobile, and 320px narrow mobile were inspected with the supported in-app browser. No horizontal document overflow at checked narrow widths.
- Mobile navigation opens, closes, responds to Escape, and hides its links when closed.
- Both before/after comparisons were exercised. The After button produces 0% before/100% after; the Before button produces 100% before/0% after. ArrowRight changes the native slider by one percentage point and updates its accessible value text.
- Service sections expand and update the photography. The service inquiry link preselects the requested service and clears any older email draft.
- FAQ disclosure opens and updates aria-expanded.
- An empty form is blocked by native required-field validation. A valid preview inquiry produces the correct mailto recipient, subject, service and body. No email was sent during testing.
- All internal anchor destinations exist. Every telephone link targets the supplied +19077448725 number.
- Reduce motion pauses both videos, removes the Three.js canvas, and restores all animated headings to visible, unclipped content. System reduced-motion uses the same control path and cannot be overridden by the toggle.
- Supplied videos were decoded end-to-end without errors during asset preparation. The hero is the woodworking footage; the original desktop cleaning footage appears in the process section.

## Implementation safeguards

- GSAP contexts, responsive media handlers, Lenis ticker, observers, media listeners, Three.js geometries/materials/renderer and pointer listeners are disposed on unmount.
- WebGL has a static mountain fallback; Three.js is loaded near its section and renders only when needed.
- Fonts are self-hosted and limited to Latin subsets. All seven original source assets are represented by optimized derivatives.
- Contact requests are local email drafts, not server submissions. Form delivery depends on the visitor opening and sending from an email application.
- No business ratings, testimonials, certifications, prices or history were invented.

This is a functional and visual browser check, not a measured Lighthouse report or a full assistive-technology audit. Device testing used responsive browser viewports rather than physical phones.
