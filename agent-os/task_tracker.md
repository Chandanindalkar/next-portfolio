# Project Task List

## Phase 1: Foundation
- [x] Setup Project Specific Agent OS (Task tracking, Implementation Plans)
- [x] Initialize Next.js 15 Project (TypeScript, ESLint, Tailwind CSS)
    - [x] `npx create-next-app@latest`
    - [x] Configure Tailwind CSS
- [x] Setup Basic Folder Structure
    - [x] `app/`
    - [x] `components/`
    - [x] `lib/`
    - [x] `styles/` (using `app/globals.css` for Tailwind)
    - [x] `public/`
- [x] Database Setup
    - [x] Initialize Prisma (`npx prisma init`)
    - [x] Define initial Schema (User, Project models initially)
    - [x] Setup PostgreSQL (Connected to local DB)
- [x] Font Configuration
    - [x] Configure `next/font`

## Phase 2: Rendering Strategy
- [x] Verify Server/Client Component split (Audit completed)
- [x] Configure `use client` for animations/interactive parts
    - [x] Setup GSAP Provider / Hooks (`useGSAP.ts`)
    - [x] Create basic Component Shells (Hero, About, etc.) to verify rendering

## Phase 3: Visual & Animations
- [x] Install GSAP (Already installed, verifying lenis)
- [x] Setup Global Animations context
    - [x] Install `next-themes`
    - [x] Create `Providers` component
    - [x] Implement Custom Cursor
    - [x] Implement Preloader
- [x] Theme Toggle (Dark/Light) implementation
    - [x] Create Toggle Component

## Phase 4: Core Sections (Public)
- [x] Hero Section
    - [x] Design High-Impact Layout
    - [x] Implement GSAP Text Reveals
- [x] About Me Section
    - [x] Implement "Bento Grid" style info cards (Currently/Previously/Listening)
    - [x] Skeleton for Spotify component
- [ ] Listen/Spotify Integration
    - [/] Implement Spotify API Route (Mock for now, skeleton exists)
    - [ ] Create Real-time "Now Playing" Component (SSE/Polling)
- [/] Skills Section
    - [ ] Implement Dynamic Experience Logic (Server-side)
    - [ ] Design Skills Layout
- [ ] Projects Section
- [ ] Hobbies Section
- [ ] Contact Section

## Phase 5: Backend & Database
- [ ] Implement API Routes as per PRD
- [ ] Database Migrations

## Phase 6: Admin Panel
- [ ] Auth Implementation (JWT/NextAuth)
- [ ] Dashboard UI
- [ ] Content Management (CRUD)

## Phase 7: Analytics
- [ ] Custom Analytics Implementation

## Phase 8: Polish & Optimization
- [ ] SEO Metadata
- [ ] Performance Tuning
