# Alaska Handyman Services — revised direction

## Built right. Feels like home.

The website opens on the supplied portrait woodworking footage. An asymmetric dark field makes room for large Manrope typography while the craftsperson, task lamp and timber remain visible. The supplied cleaning film belongs in the process section. Both actual project transformations appear directly on the page.

## Tokens

- Deep inlet: `#132e38`; foreground ink: `#1c302f`.
- Paper: `#f7f8f5`; pale spruce: `#e7eeea`; contact green: `#dce8e0`.
- Muted body: `#6b7777`; divider: `#d5ddda`.
- Typography: locally hosted Manrope, weights 400–700; display headlines use 500, tight tracking and restrained line lengths.
- Layout: 1440px maximum content width; 56px desktop gutters and 20px mobile gutters. Hero uses a continuous film; services combine expanding text with photography; projects alternate wide image and narrow narrative; process changes to deep inlet; contact uses pale spruce.

## Motion

React 18, GSAP/ScrollTrigger and Lenis share one animation clock. The hero orchestrates a film zoom, masked headline entrance and supporting copy. Desktop scroll adds gentle film parallax and moving project narratives. Headings and comparison frames reveal once. Service photography crossfades on selection. Three.js creates a lazily loaded alpine landscape that responds to pointer movement and stops rendering when settled or offscreen.

System reduced-motion preferences and the footer's Reduce motion control disable decorative GSAP/Lenis and Three.js, pause films, and preserve all content. Each film also has its own play/pause button. Mobile avoids parallax and uses native touch scrolling.

## Content

One brand headline, followed by concrete service categories and actual room imagery. No invented ratings, reviews, licenses, company history, prices or guarantee terms. Service coverage is confirmed through conversation. Contact uses the supplied phone and email; the form validates a local request and opens a draft in the visitor's email app. It does not claim delivery.

## Assets and research

All seven original user assets are represented by optimized derivatives. Originals remain in the parent folder. See ASSETS.md for exact transformations and research/DESIGN-RESEARCH.md for the 30-site source-linked audit and its visual-inspection limits.
