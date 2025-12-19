# Personal Portfolio Website - Product Requirements Document

## 1. Project Overview

### Objective:
Build a visually striking, animation-rich personal portfolio website that showcases technical skills, professional projects, and personal hobbies while demonstrating advanced web development capabilities.

### Target Audience:
- Potential employers/recruiters 
- Fellow developers 
- General visitors interested in your work/hobbies 

## 2. Technical Stack


### Start With: Setup project specific Agent OS to keep track of project requirements, development and  progress

### Frontend:

- Framework: Next.js 15 (App Router with SSR)
- Language: TypeScript
- Styling: SCSS (with CSS Modules or global styles)
- State Management: Redux Toolkit (for client-side state only) Note: Much less state needed due to SSR data fetching
- Animations: GSAP (client-side only, in 'use client' components)
- Font: [TBD] - Use next/font for optimization
- Image Optimization: next/image component

### Backend:

- NextJS Server
- Language: TypeScript 
- ORM: Prisma 
- Authentication: JWT

### Database:

- PostgreSQL 

### Third-Party Integrations:

- Spotify Web API (WebSocket or SSE for real-time updates) 

## 3. Core Features & Sections

### 3.1 Visual Elements (Global)

**Custom Animated Loader**:

- Minimalist design 
- No progress bar 
- Loads before main content appears 

**Custom Cursor**:

- Non-default cursor design 
- Initial implementation without context-based changes (v2 feature) 
- Wrap in client component, check for window object

**Video Background**: Use next/video or standard video tag with lazy loading

**Rendering Strategy**:
- **Hero Section**: SSR for SEO
- **About Section**: SSR for SEO
- **Skills Section**: SSR with dynamic data
- **Projects**: SSR for SEO (great for showcasing work)
- **Hobbies**: SSR or ISR (Incremental Static Regeneration)
- **Admin Panel**: Client-side rendered (CSR)
- **Analytics**: Client-side tracking
- [Location TBD - hero section or specific area?] 
- Should be optimized for performance 
- Fallback for mobile/low-bandwidth 

**Animations**:
- GSAP-powered animations throughout 
- GSAP Animations: Use 'use client' directive, initialize in useEffect
- Scroll-triggered animations 
- Smooth transitions between sections 

**Theme**:
- Dark/Light mode toggle 
- Preference saved in localStorage 

### 3.2 Navigation

- Style: Creative (not standard fixed header/hamburger) 
- Type: Single-page scroll experience initially 
- Sections Navigation: Smooth scroll to anchored sections 
- Mobile: Touch-friendly, same creative approach 

### 3.3 Hero/Landing Section: [Design TBD - video background here?]

- Introduction/tagline 
- Eye-catching entry point 
- Possibly integrated with custom cursor showcase 

### 3.4 About Me Section: "Currently/Previously/Studied/Listening" Card:

- Currently: Current Job Title & Company 
- Previously: Previous Job Title & Company 
- Studied: Bachelor's in Engineering 
- Listening: Spotify real-time integration 
    * Display currently playing track only 
    * Show: Track name, artist, album art 
    * Explore: Progress bar if API supports it 
    * Fallback: "Not currently listening" state 
    * Tech: WebSocket or SSE for real-time updates 

[Section placement to be determined during design phase]

```
// Server Component (initial load)
async function SpotifyStatus() {
  const data = await fetch('api/spotify/now-playing', { 
    cache: 'no-store' // Always get fresh data
  });
  return <SpotifyDisplay initialData={data} />
}
```

```
// Client Component (real-time updates)
'use client'
function SpotifyDisplay({ initialData }) {
  // Use SSE or polling to update in real-time
  // Shows server-rendered data immediately, then updates
}
```

Benefit: Users see Spotify status immediately (SSR), then it updates in real-time (client-side).

### 3.5 Skills & Experience Section

**Dynamic Experience Tracking**:

- Each skill shows "X days/years of experience"  
- Updates daily without manual intervention 
- Example: "React: 847 days" → "React: 848 days" (next day) 

```
// This can be calculated server-side on each request!
// In app/api/skills/route.ts or directly in Server Component
export async function GET() {
  const skills = await prisma.skill.findMany();
  const skillsWithExperience = skills.map(skill => ({
    ...skill,
    daysOfExperience: Math.floor(
      (Date.now() - skill.startDate.getTime()) / (1000 * 60 * 60 * 24)
    )
  }));
  return Response.json(skillsWithExperience);
}
```

Benefit: Experience auto-calculates on server, always accurate, no client-side logic needed.

**Skill Display**:

- NOT categorized initially (can be v2 feature) 
- Focus on hands-on experience (no certifications/courses for now) 
- Tech stack coverage: Frontend, Backend, Tools, etc. 
```
Data Structure Example:
{
  skillName: "React",
  startDate: "2022-06-15",
  experienceType: "professional" | "hobby" | "learning"
}
```

### 3.6 Professional Projects Section

**Projects to Feature**:

- Mozart 
- Vendor Panel 
- [Future projects] 

**Information per Project**:

- Project name 
- Description/Problem solved 
- Tech stack used 
- Your specific role/contributions 
- Screenshots/visuals 
- NO live demo links (at least initially) 

**Admin Capabilities**:

- Add new projects via admin panel 
- Edit existing projects 
- Delete projects 
- Reorder projects 
- Upload project images 

### 3.7 Hobbies Sections

**Hobby 1: Biking Journey**

- Interactive Map: Places visited with markers 
- Photo Gallery: Location-tagged images 
- Stats Display: 
    * Total kilometers traveled 
    * Number of bikes owned 
    * Trips completed 
- Admin: Add new trips, upload photos, update stats 

**Hobby 2: Bike Maintenance**

- Before/After Gallery: Restoration work 
- Video Content: Embedded videos (or links to YouTube when created) 
- Short Blog Posts: Quick writeups 
    * Link to detailed YouTube videos when available 
- Admin: Add maintenance logs, upload media 

**Hobby 3: Mechanical Watches** 

- Collection Display: Each watch with specs 
    * Brand, model, movement type, year, etc. 
- Photo Showcase: High-quality images with descriptions 
- Admin: Add/edit watch collection 

**Hobby 4: Custom Builds (Longboard)**

- Project Showcase: Photos with descriptions 
- Specs Display: Build details 
- Admin: Add new builds, update existing 

### 3.8 Contact Section

**Contact Form**:

- Name (required) 
- Email (required) 
- Subject (optional) 
- Message (required) 
- Form validation 
- Success/error feedback 
- Rate limiting to prevent spam 

**Backend**:

- Store submissions in database 
- Email notification to you (optional) 
- Admin panel to view submissions 

### 3.9 Admin Panel (Separate route/page)

**Admin Panel Structure**:

- /app/admin/layout.tsx          # Protected layout with auth check
- /app/admin/dashboard/page.tsx  # Analytics dashboard
- /app/admin/projects/page.tsx   # Projects management
- /app/admin/skills/page.tsx     # Skills management
- /app/admin/hobbies/page.tsx    # Hobbies management

**Authentication**:

- Middleware for route protection
- JWT implementation

**Admin Capabilities:**

- Projects Management: CRUD operations 
- Skills Management: Add/edit skills with start dates 
- Hobbies Content: Update all hobby sections 
- Analytics Dashboard: View visitor analytics 
- Contact Form: View submissions 
- Content Preview: See changes before publishing 

**UI**:

- Separate design from main portfolio 
- Functional, clean interface 
- Responsive for editing on-the-go 

### 3.10 Analytics & Tracking

**Custom Analytics System (not Google Analytics):**

**Track:**

- Page views (total visits) 
- Time spent on each section 
- Click tracking (CTAs, project cards, external links) 
- Geographic data (country/city) 
- Device type (desktop/mobile/tablet) 
- Browser information 
- Referral sources 

**Storage:**

- All analytics stored in PostgreSQL 
- Daily/weekly/monthly aggregations 

**Admin View:**

- Dashboard with visualizations 
- Date range filtering 
- Export data capability 

**Implementation:**

- Lightweight tracking script 
- Non-invasive (doesn't slow down site) 
- Privacy-conscious (no personal data) 
- GDPR-friendly 

## 4. Technical Requirements

### Section 4.1: API Endpoints

**Next.js App Router Structure:**

- /app/api/projects/route.ts              # GET all projects
- /app/api/projects/[id]/route.ts         # GET single project
- /app/api/skills/route.ts                # GET all skills
- /app/api/hobbies/biking/route.ts        # GET biking data
- /app/api/hobbies/maintenance/route.ts   # GET maintenance logs
- /app/api/hobbies/watches/route.ts       # GET watches
- /app/api/hobbies/builds/route.ts        # GET custom builds
- /app/api/contact/route.ts               # POST contact form
- /app/api/spotify/now-playing/route.ts   # GET Spotify status

**Protected Routes (Admin):**

- /app/api/admin/auth/login/route.ts      # POST login
- /app/api/admin/auth/logout/route.ts     # POST logout
- /app/api/admin/projects/route.ts        # POST, PUT, DELETE
- /app/api/admin/skills/route.ts          # POST, PUT, DELETE
- /app/api/admin/hobbies/*/route.ts       # CRUD for hobbies
- /app/api/admin/analytics/route.ts       # GET analytics
- /app/api/admin/contacts/route.ts        # GET contacts

- /app/api/analytics/track/route.ts       # POST tracking events

### Section 4.2: Database Schema (Prisma)

**Key Models:**
```
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed
  createdAt DateTime @default(now())
}

model Project {
  id            String   @id @default(uuid())
  title         String
  description   String
  techStack     String[] // Array of technologies
  role          String
  contributions String
  imageUrls     String[] // Array of image URLs
  order         Int      // For sorting
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Skill {
  id         String   @id @default(uuid())
  name       String   @unique
  startDate  DateTime // To calculate experience
  category   String?  // Optional for future categorization
  createdAt  DateTime @default(now())
}

model BikeTrip {
  id          String   @id @default(uuid())
  location    String
  latitude    Float
  longitude   Float
  date        DateTime
  distance    Float?   // in km
  description String?
  imageUrls   String[]
  createdAt   DateTime @default(now())
}

model BikeMaintenance {
  id          String   @id @default(uuid())
  title       String
  description String
  beforeImages String[]
  afterImages  String[]
  videoUrl    String?
  date        DateTime
  createdAt   DateTime @default(now())
}

model Watch {
  id          String   @id @default(uuid())
  brand       String
  model       String
  movement    String
  year        Int?
  description String?
  imageUrls   String[]
  specs       Json     // Flexible specs object
  order       Int
  createdAt   DateTime @default(now())
}

model CustomBuild {
  id          String   @id @default(uuid())
  title       String
  description String
  specs       Json
  imageUrls   String[]
  createdAt   DateTime @default(now())
}

model Contact {
  id        String   @id @default(uuid())
  name      String
  email     String
  subject   String?
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Analytics {
  id           String   @id @default(uuid())
  eventType    String   // 'page_view', 'section_view', 'click', etc.
  eventData    Json     // Flexible data
  sessionId    String
  ipAddress    String?
  country      String?
  city         String?
  device       String?
  browser      String?
  referrer     String?
  timestamp    DateTime @default(now())
}

model BikeStats {
  id            String @id @default(uuid())
  totalKm       Float
  bikesOwned    Int
  tripsCompleted Int
  updatedAt     DateTime @updatedAt
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

## 4.3 Performance Considerations

**Frontend:**

- Code splitting for admin panel 
- Lazy loading images 
- Optimized GSAP animations (won't block rendering) 
- Video background optimization: 
    • Compressed video files 
    • WebM format with MP4 fallback 
    • Poster image for slow connections 
- Use Next.js dynamic import with SSR: false for video player
```
import dynamic from 'next/dynamic'; 
const VideoBackground = dynamic(() => import('@/components/VideoBackground'), { 
	ssr: false, // Don't render on server 
	loading: () => <VideoPosterImage />
});
```
- Redux Toolkit for efficient state updates if needed.

**Backend:**
- Database query optimization with Prisma 
- Response caching where appropriate 
- Rate limiting on contact form 
- Pagination for large data sets (projects, trips) 

**Mobile:**
- Responsive animations (reduced motion if needed) 
- Touch gesture support 
- Same features as desktop 
- Optimized media loading 

**Next.js Specific Optimizations:**

- SSR Benefits:
    • Faster First Contentful Paint (FCP)
    • Better SEO (fully rendered HTML)
    • Reduced client-side JS bundle size

**Next.js Features to Use:**
- next/image: Automatic image optimization
- next/font: Font optimization (no layout shift)
- ISR: Incremental Static Regeneration for hobby sections
- Streaming: React Server Components streaming for faster TTFB
- Route Caching: Automatic caching of route handlers

**Image Optimization:**
- Use next/image for all images
- Automatic WebP/AVIF conversion
- Lazy loading by default
- Responsive images

**Font Optimization:**
- Use next/font/google or next/font/local
- Fonts preloaded, no flash of unstyled text
- Self-hosted fonts (better privacy & performance)

**SEO Requirements:**
- Next.js Metadata API:
```
// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Name | Full Stack Developer',
  description: 'Portfolio showcasing web development projects, biking adventures, and more',
  openGraph: {
    title: 'Your Name | Full Stack Developer',
    description: '...',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// app/projects/[id]/page.tsx - Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProject(params.id);
  
  return {
    title: `${project.title} | Your Portfolio`,
    description: project.description,
    openGraph: {
      images: [project.imageUrls[0]],
    },
  };
}
```

**Sitemap Generation:**
```
// app/sitemap.ts
export default async function sitemap() {
  const projects = await prisma.project.findMany();
  
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
    },
    ...projects.map(project => ({
      url: `https://yoursite.com/projects/${project.id}`,
      lastModified: project.updatedAt,
    })),
  ];
}
```

**Performance:**
- Lighthouse score optimization 
- Core Web Vitals monitoring 

## 6. Deployment & Hosting

### Frontend + Backend (Combined):**
   - **Recommended:** Vercel (Best for Next.js)
   - **Free tier:** 100GB bandwidth, unlimited requests
   - **Automatic deployments:** from GitHub
   - **Edge functions:** for API routes
   - Built-in analytics
   - Free SSL certificate
   - **Serverless functions:** (no need for Express server)

### Database: Vercel Postgres (Preview)
   - Integrated with Vercel
   - Free tier available
   - Easiest setup
   - No separate backend hosting needed! 

### CI/CD:
   - Push to GitHub → Vercel auto-deploys
   - Preview deployments for PRs
   - Production deployment on merge to main
   - Environment variables in Vercel dashboard

### Custom Domain:
   - Purchase from Namecheap, Google Domains, or Cloudflare 
   - Connect to Vercel via DNS settings 
   - Estimated cost: $10-15/year 

## 7. Development Phases

### Phase 1: Foundation
- Next.js 15 project setup (npx create-next-app@latest)
- TypeScript configuration
- SCSS setup (in next.config.js)
- Prisma setup and initial schema
- Basic folder structure:
	  /app              # App router pages
	  /components       # React components
	  /lib              # Utilities, Prisma client
	  /styles           # Global SCSS
	  /public           # Static assets
- Font selection and next/font integration

### Phase 2: Rendering Strategy
- Identify which components are Server Components (default)
- Mark client components with 'use client':
    * Custom cursor
    * GSAP animations
    * Interactive elements (forms, modals)
    * Real-time Spotify updates
- Set up data fetching patterns
- Configure ISR where appropriate

### Phase 3: Visual & Animations
- GSAP animation setup 
- Video background integration 
- Dark/light theme toggle 
- Creative navigation system 

### Phase 4: Core Sections (Public)
- Hero/landing section 
- About me section 
- Skills section with dynamic experience 
- Projects showcase 
- Hobbies sections (all four) 
- Contact form 

### Phase 5: Backend & Database
- NextJS Server API 
- Prisma schema and migrations 
- PostgreSQL database setup 
- API endpoints (public) 
- Spotify API integration 

### Phase 6: Admin Panel
- JWT authentication 
- Admin routes/pages 
- CRUD interfaces for all content 
- Image upload functionality 
- Admin dashboard 

### Phase 7: Analytics
- Analytics tracking implementation 
- Data collection endpoints 
- Admin analytics dashboard 
- Visualizations 

### Phase 8: Polish & Optimization
- SEO implementation 
- Performance optimization 
- Mobile responsiveness testing 
- Accessibility improvements 
- Cross-browser testing

### Phase 9: Deployment
- Environment configuration 
- Frontend deployment (Vercel) 
- Backend deployment (Railway) 
- Database setup and migration 
- Domain configuration 
- SSL certificate setup 

## 8. Open Questions & Decisions Needed

### Design Decisions:

1. Font Selection: What typography style? (Modern sans-serif, mono, mixed?) 
2. Color Palette: Dark mode colors, light mode colors, accent colors? 
3. Video Background: Which section? What content? (Loop, with/without audio?) 
4. Creative Navigation: What concept? (Floating dots, side menu, radial, other?) 
5. About Section Placement: Where does "Currently/Previously/Studied/Listening" fit best? 

### Technical Decisions:

1. Image Storage: Where to store uploaded images? 
    ◦ Local server storage (not great for free hosting) 
    ◦ Cloudinary (free tier available) 
    ◦ AWS S3 (requires setup) 
    ◦ Uploadthing (modern, easy) 
2. Spotify Integration: SSE vs WebSocket? 
    ◦ SSE: Simpler, one-way communication 
    ◦ WebSocket: More complex, bidirectional 
    ◦ Recommendation: SSE for this use case 
3. Map Integration: Which mapping library? 
    ◦ Leaflet (open source, free) 
    ◦ Mapbox (free tier, beautiful) 
    ◦ Google Maps (requires API key, limited free tier) 

### Content Decisions:

1. Initial Content: Do you have content ready for: 
    ◦ Project descriptions and images? 
    ◦ Biking trip data (locations, photos)? 
    ◦ Watch collection details and photos? 
    ◦ Bike maintenance photos/videos? 
2. Placeholder Content: Need placeholder data during development? 

### Next.js Specific Questions:

1. Rendering Strategy per Section:
   - Which sections should use ISR (revalidate every X seconds)?
   - Which need real-time data (no cache)?
   - Admin panel: all client-side or mixed?

2. Image Storage with Next.js:
   - Use Vercel Blob Storage (integrated, paid after free tier)
   - Use Uploadthing (good free tier, Next.js focused)
   - Use Cloudinary (traditional choice)
   - Use Supabase Storage (if using Supabase for DB)

3. Authentication:
   - NextAuth.js (simpler, built for Next.js) or custom JWT?
   - Recommendation: NextAuth.js for easier OAuth in future

## 9. Future Enhancements (v2+)

### Content:
- Blog section for technical articles 
- Resume download functionality 
- Testimonials/recommendations section 

### Features:
- Context-based cursor changes 
- Search functionality 
- Filter projects by technology 
- Social media feed integration 
- Newsletter signup 
- Comments on blog posts 

### Technical:
- Progressive Web App (PWA) capabilities 
- Offline mode 
- Multi-language support 
- Advanced animations (WebGL, Three.js) 

## 10. Success Metrics

### Engagement:
- Average time on site > 2 minutes 
- Scroll depth to hobbies sections 
- Contact form conversion rate 

### Technical:
- Lighthouse performance score > 90 
- Time to Interactive < 3 seconds 
- Mobile performance score > 85 

### Business:
- Number of contact form submissions 
- Project page views 
- Referral traffic from portfolio 


## 11. Next.js Project Structure:
```
my-portfolio/
├── app/
│   ├── layout.tsx                 # Root layout (SSR)
│   ├── page.tsx                   # Home page (SSR)
│   ├── globals.scss               # Global styles
│   │
│   ├── admin/                     # Admin section
│   │   ├── layout.tsx             # Protected layout
│   │   ├── dashboard/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   └── hobbies/page.tsx
│   │
│   └── api/                       # API routes
│       ├── projects/route.ts
│       ├── skills/route.ts
│       ├── spotify/
│       │   └── now-playing/route.ts
│       ├── admin/
│       │   ├── auth/login/route.ts
│       │   └── projects/route.ts
│       └── analytics/track/route.ts
│
├── components/
│   ├── sections/
│   │   ├── Hero.tsx              # Server Component
│   │   ├── About.tsx             # Server Component
│   │   ├── Skills.tsx            # Server Component
│   │   ├── Projects.tsx          # Server Component
│   │   └── hobbies/
│   │       ├── BikeJourney.tsx
│   │       ├── BikeMaintenance.tsx
│   │       ├── Watches.tsx
│   │       └── CustomBuilds.tsx
│   │
│   ├── ui/                       # Client Components
│   │   ├── CustomCursor.tsx      # 'use client'
│   │   ├── Loader.tsx            # 'use client'
│   │   ├── ThemeToggle.tsx       # 'use client'
│   │   └── Navigation.tsx        # 'use client'
│   │
│   └── animations/
│       └── GSAPWrapper.tsx       # 'use client'
│
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # Auth utilities
│   ├── spotify.ts                # Spotify API wrapper
│   └── analytics.ts              # Analytics helpers
│
├── styles/
│   ├── variables.scss
│   ├── mixins.scss
│   └── animations.scss
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   ├── videos/
│   └── fonts/
│
├── middleware.ts                 # Route protection
├── next.config.js
├── tsconfig.json
└── package.json
```

## Next Steps
    1. Font Selection: Choose typography 
    2. Color Palette: Define theme colors 
    3. Content Gathering: Lets use dummy content for now, I’ll replace this as I go.
    4. Project Setup: Initialize repositories 
    5. Development: Start with Phase 1 


