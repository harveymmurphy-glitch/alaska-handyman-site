# Verification — updated 27 October 2026

## Mobile 3D and animation update

- The generated Three.js house was visually inspected at mobile width, assembled and with separated layers, in daylight and evening lighting. The camera pulls back when layers open so the raised roof remains inside the scene.
- Direct pointer drag rotated the model (observable yaw changed from -0.28 to 0.70). Rotation buttons, reset, layer toggle and lighting controls were exercised. Keyboard activation works.
- Tapping the visible roof hotspot directly selected Reimagine and updated its detail heading. Before/after button transitions now animate a smooth wipe; the tested After transition completed at 0% before / 100% after.
- Removed a duplicate Lenis anchor offset: native CSS scroll padding now places the 3D section at 84px on mobile and 100px on desktop, immediately below the header.
- Service selection updates the detail copy and carries the matching service into the contact form; Refine selected Carpentry & trim.
- Reduced motion removes both canvases, stops both videos, removes the mobile animation class and displays the static house illustration. Re-enabling motion recreates one home canvas.
- Mobile navigation opens with staggered entries, closes on navigation and Escape, and the before/after controls still work after perspective reveals.
- Corrected a pre-existing 15px overflow at the 320px viewport by allowing the body to fit the width available beside a scrollbar. At 320px: document width and client width are both 305px. At 390px: both are 375px. At 1280px: both are 1265px.
- Code review identified and fixed model/selected-service synchronization, oversized screen-space hotspot tap targets and occlusion checks so hidden pins cannot be selected through the house.
- Mobile gestures use horizontal pointer dragging with pan-y and pinch-zoom retained; pointer cancellation releases drag state. Browser testing used pointer drags and responsive viewports, not a physical iOS or Android device. Hardware touch behavior, battery use and frame rate have not been measured on phones.
- Three.js remains deferred. The home world adds about 4KB gzip of geometry/interaction code; the shared Three.js chunk is about 131KB gzip. Pixel density is capped, the frame loop settles and stops, and invisible/hidden-tab rendering is skipped. All generated geometry, materials, textures, shadow maps, listeners and observers have cleanup.
- Browser console reported no errors or warnings during the new interactions. Production build passes; Vite reports the shared Three.js chunk above its 500KB uncompressed advisory threshold.

## Previous full-site browser checks

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
