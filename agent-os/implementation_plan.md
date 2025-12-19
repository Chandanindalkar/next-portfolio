# Implementation Plan - Phase 5: Hobbies & Contact

This plan completes the core sections of the portfolio.

## Goals
- **Hobbies**: Personal touch. horizontal scroll or drag interaction.
- **Contact**: Strong footer, clear call-to-action (CTA), and social links.

## Proposed Changes

### Data

#### [MODIFY] [lib/data.ts](file:///home/cipher/projects/next-portfolio/lib/data.ts)
- Add `HOBBIES_DATA`: `{ name, icon (emoji or lucide), description }`.
- Add `SOCIAL_LINKS`: `{ platform, url, icon }`.

### Components

#### [MODIFY] [components/sections/Hobbies.tsx](file:///home/cipher/projects/next-portfolio/components/sections/Hobbies.tsx)
- Horizontal ticker or scrolling container.
- Cards with emojis/icons.

#### [MODIFY] [components/sections/Contact.tsx](file:///home/cipher/projects/next-portfolio/components/sections/Contact.tsx)
- Minimalist "Let's Talk" large typography.
- "Copy Email" interaction.
- Social links grid.
- Footer copyright.

### Visuals
- **Hobbies**: Infinite scroll animation using GSAP or CSS.
- **Contact**: High contrast, large text.

## Verification Plan
- **Responsiveness**: Check horizontal scroll on mobile.
- **Interactivity**: Verify "Copy Email" clipboard functionality.
