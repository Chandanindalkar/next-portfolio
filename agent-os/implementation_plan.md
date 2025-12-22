# Implementation Plan - Phase 8: Optimize & Polish

This phase focuses on making the portfolio production-ready through SEO, performance, and accessibility improvements.

## Goals
- **SEO**: Dynamic sitemap, robots.txt, and complete metadata.
- **Visuals**: Dynamic OG image generation.
- **Data**: Replace dummy content with finalized PRD-compliant data.

## Proposed Changes

### SEO & Metadata

#### [MODIFY] [app/layout.tsx](file:///home/cipher/projects/next-portfolio/app/layout.tsx)
- Define comprehensive metadata (Title, Description, OpenGraph, Twitter).

#### [NEW] [app/sitemap.ts](file:///home/cipher/projects/next-portfolio/app/sitemap.ts)
- Generate a dynamic sitemap including all projects.

#### [NEW] [app/robots.ts](file:///home/cipher/projects/next-portfolio/app/robots.ts)
- Standard robots.txt setup.

### Performance

#### [NEW] [app/api/og/route.tsx](file:///home/cipher/projects/next-portfolio/app/api/og/route.tsx)
- Edge-based dynamic OG image generation using `@vercel/og`.

### Final Content Replacement
- Replace dummy data in `prisma/seed.ts` with real personal information if available, or just refine the existing "dummies" to be more professional.

## Verification Plan
- **Metadata**: Use browser tools to inspect `<head>` tags.
- **Sitemap**: Navigate to `/sitemap.xml`.
- **OG Image**: Use a tool or navigate to `/api/og` to verify image generation.
