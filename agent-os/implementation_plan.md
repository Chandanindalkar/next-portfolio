# Implementation Plan - Phase 4: Core Sections (Hero & About)

This plan covers the implementation of the first two major visual sections: Hero and About.

## Goals
- **Hero**: Create a high-impact, animation-driven entry point.
- **About**: Implement the "Currently/Previously/Studied/Listening" data using a modern grid layout (Bento Box style).

## Proposed Changes

### Hero Section
- **File**: `components/sections/Hero.tsx`
- **Design**: 
    - Full viewport height (`min-h-screen`).
    - Large, staggered typography for Name/Title.
    - animated "Scroll Down" indicator.
    - **Animation**: GSAP timeline to reveal text characters/words on load (after preloader).
    - **Background**: Subtle animated grain or gradient to keep focus on text.

### About Section
- **File**: `components/sections/About.tsx`
- **Design**:
    - "Bento Grid" layout using CSS Grid.
    - Cards for:
        - **Bio**: Short intro.
        - **Experience**: Current/Previous roles.
        - **Education**: Studied.
        - **Spotify**: "Listening Now" stub (real API later).
- **Animation**: Cards reveal on scroll using `ScrollTrigger`.

### Components

#### [MODIFY] [components/sections/Hero.tsx](file:///home/cipher/projects/portfolio-react/components/sections/Hero.tsx)
- Implement structure and `useGSAP` for animation.

#### [MODIFY] [components/sections/About.tsx](file:///home/cipher/projects/portfolio-react/components/sections/About.tsx)
- Implement Grid layout.

#### [NEW] [components/ui/BentoCard.tsx](file:///home/cipher/projects/portfolio-react/components/ui/BentoCard.tsx)
- Reusable card component for the About section grid.

## Verification Plan
- **Hero**: Check animation timing (should play after preloader).
- **About**: Verify responsive grid behavior (stack on mobile, grid on desktop).
- **Scroll**: Ensure smooth start from Hero to About.
