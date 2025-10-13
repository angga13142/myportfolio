# Project Context: chronark.com

**Last Updated:** 2025-10-13  
**Analyzed By:** AI Agent  
**Project Size:** 1.5MB (63 source files)

---

## 📋 Overview

Personal portfolio website for Andreas Thomas (chronark), showcasing projects and providing contact information. Built with modern web technologies focused on performance and elegant UI/UX.

**Live Site:** https://chronark.com  
**Owner:** chronark (Co-founder of unkey.dev, founder of planetfall.io)

---

## 🏗️ Architecture

### Framework & Runtime
- **Framework:** Next.js 13.5.4 (App Router)
- **Runtime:** Edge Runtime (for API routes)
- **Language:** TypeScript 5.2.2
- **React:** 18.2.0

### Rendering Strategy
- **Static Generation (SSG):** Homepage, project pages
- **Server Components:** Default for all pages
- **Client Components:** Interactive elements (particles, analytics)
- **Revalidation:** 60 seconds for project pages with view counts
- **Edge Functions:** Page view tracking API

### Architecture Pattern
- **App Router:** Next.js 13+ file-based routing (`app/` directory)
- **Content-First:** MDX-based project content with Contentlayer
- **Serverless:** Deployed on Vercel with edge functions
- **JAMstack:** Static pages with dynamic data from Upstash Redis

---

## 📁 Project Structure

```
chronark.com/
├── app/                          # Next.js 13 App Router
│   ├── layout.tsx               # Root layout with fonts, metadata, analytics
│   ├── page.tsx                 # Homepage with animated hero
│   ├── components/              # Shared React components
│   │   ├── analytics.tsx        # Beam Analytics integration
│   │   ├── card.tsx            # Project card with hover effects
│   │   ├── mdx.tsx             # MDX component overrides
│   │   ├── nav.tsx             # Navigation component
│   │   └── particles.tsx       # Canvas-based particle animation
│   ├── projects/               # Projects section
│   │   ├── page.tsx            # Project listing with Redis views
│   │   ├── article.tsx         # Article card component
│   │   ├── layout.tsx          # Projects layout
│   │   └── [slug]/             # Dynamic project routes
│   │       ├── page.tsx        # Individual project page
│   │       ├── header.tsx      # Project header with metadata
│   │       ├── view.tsx        # View counter component
│   │       └── mdx.css         # MDX styling
│   └── contact/                # Contact page
│       └── page.tsx            # Contact page component
│
├── pages/api/                   # Legacy API routes (Edge)
│   └── incr.ts                 # Page view increment endpoint
│
├── content/                     # MDX content files
│   └── projects/               # Project write-ups (21 files)
│       ├── unkey.mdx           # Featured project
│       ├── planetfall.mdx      # Top project
│       ├── highstorm.mdx       # Top project
│       └── *.mdx               # Other projects (Upstash, etc.)
│
├── public/                      # Static assets
│   ├── fonts/                  # Custom fonts (CalSans)
│   ├── og.png                  # OpenGraph image
│   ├── favicon.png             # Favicon
│   └── planetfall.png          # Project image
│
├── util/                        # Utility functions
│   └── mouse.ts                # Mouse position tracking hook
│
├── types/                       # TypeScript definitions
│   └── mdx.d.ts                # MDX type definitions
│
├── .agent-memory/              # AI agent memory system
│   ├── utils.js                # Memory logging utilities
│   ├── logs/                   # Session archives
│   └── *.md                    # Documentation
│
├── contentlayer.config.js      # Contentlayer configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
├── postcss.config.js           # PostCSS configuration
├── rome.json                   # Rome linter/formatter config
├── .agent-memory.json          # Agent persistent memory
├── .env.example                # Environment variables template
└── package.json                # Dependencies and scripts
```

---

## 🎨 Tech Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 13.5.4 | React framework with App Router |
| React | 18.2.0 | UI library |
| TypeScript | 5.2.2 | Type safety |
| Tailwind CSS | 3.3.3 | Utility-first CSS |
| Contentlayer | 0.3.4 | Type-safe content management |

### Content & Markdown
| Technology | Purpose |
|------------|---------|
| @next/mdx | MDX support in Next.js |
| next-contentlayer | Contentlayer integration |
| remark-gfm | GitHub Flavored Markdown |
| rehype-pretty-code | Syntax highlighting |
| rehype-slug | Heading IDs |
| rehype-autolink-headings | Auto-linked headings |
| markdown-wasm | WebAssembly Markdown parser |

### UI & Animation
| Technology | Purpose |
|------------|---------|
| Framer Motion | Animation library |
| Lucide React | Icon library |
| @next/font | Font optimization |
| react-wrap-balancer | Better text wrapping |

### Data & Analytics
| Technology | Purpose |
|------------|---------|
| @upstash/redis | Edge-compatible Redis client |
| Beam Analytics | Privacy-friendly analytics |

### Styling
| Technology | Purpose |
|------------|---------|
| @tailwindcss/typography | Typography plugin |
| @tailwindcss/line-clamp | Line clamping |
| tailwindcss-debug-screens | Debug screen sizes |
| PostCSS | CSS processing |
| postcss-nesting | Nested CSS support |

### Development Tools
| Technology | Purpose |
|------------|---------|
| Rome | Linter and formatter |
| pnpm | Package manager |

---

## 🎯 Key Features

### 1. **Animated Hero Section**
- Canvas-based particle system with mouse interaction
- Custom typography with CalSans font
- Gradient effects and animations
- Responsive design

**Files:**
- `app/page.tsx` - Hero component
- `app/components/particles.tsx` - Particle animation
- `util/mouse.ts` - Mouse tracking

### 2. **Project Portfolio**
- MDX-based project content
- Redis-backed page view counter
- IP-based deduplication (24-hour window)
- Featured projects layout (Unkey, Planetfall, Highstorm)
- Responsive grid layout

**Files:**
- `app/projects/page.tsx` - Project listing
- `app/projects/[slug]/page.tsx` - Individual project pages
- `content/projects/*.mdx` - Project content
- `pages/api/incr.ts` - View tracking API

### 3. **Content Management**
- Type-safe content with Contentlayer
- MDX support for rich content
- Syntax highlighting with github-dark theme
- Auto-generated slugs and paths

**Files:**
- `contentlayer.config.js` - Content configuration
- `content/projects/*.mdx` - Content files

### 4. **View Tracking System**
- Edge function for low latency
- Upstash Redis for storage
- IP hashing for privacy
- Deduplication to prevent spam
- Real-time view counts

**Files:**
- `pages/api/incr.ts` - Increment API
- `app/projects/[slug]/view.tsx` - View counter component

### 5. **Analytics Integration**
- Beam Analytics (privacy-friendly)
- Conditional loading based on token

**Files:**
- `app/components/analytics.tsx` - Analytics component

---

## 🔧 Configuration Details

### Next.js Configuration
```javascript
// next.config.mjs
- Contentlayer integration
- MDX support with experimental mdxRs
- Page extensions: js, jsx, ts, tsx, md, mdx
```

### TypeScript Configuration
```json
// tsconfig.json
- Strict mode enabled
- Path aliases: @/* for root, contentlayer/generated
- ES5 target for compatibility
- Incremental compilation
```

### Tailwind Configuration
```javascript
// tailwind.config.js
- Custom animations: fade-in, title, fade-left, fade-right
- Custom fonts: Inter (sans), CalSans (display)
- Typography plugin
- Debug screens plugin
- Gradient utilities
```

### Contentlayer Schema
```javascript
// Document Types:
1. Project
   - Fields: published, title, description, date, url, repository
   - Pattern: ./projects/**/*.mdx
   
2. Page
   - Fields: title, description
   - Pattern: pages/**/*.mdx
```

---

## 🗄️ Data Flow

### Page View Tracking Flow
```
User visits project page
    ↓
Client-side view.tsx component
    ↓
POST /api/incr with slug
    ↓
Edge function validates request
    ↓
Hash IP address (SHA-256)
    ↓
Check Redis for duplicate (24h TTL)
    ↓
If new: increment counter
    ↓
Return 202 Accepted
```

### Content Rendering Flow
```
Build time:
  Contentlayer processes MDX files
    ↓
  Generates TypeScript types
    ↓
  Creates importable content objects

Request time:
  Next.js fetches view counts from Redis
    ↓
  Renders project page with content
    ↓
  Client hydrates interactive components
    ↓
  Sends view tracking request
```

---

## 🎨 Design System

### Colors
- **Background:** Black (`bg-black`)
- **Primary Text:** Zinc-100/White
- **Secondary Text:** Zinc-400, Zinc-500
- **Accents:** Zinc-300, Zinc-600
- **Borders:** Zinc-800, Zinc-900

### Typography
- **Display Font:** CalSans SemiBold (custom)
- **Body Font:** Inter (Google Font)
- **Sizes:** Text-sm to text-9xl
- **Font Classes:** `font-display`, `font-sans`

### Animations
- **fade-in:** 3s ease-in-out (opacity)
- **title:** 3s ease-out (line-height, letter-spacing)
- **fade-left/right:** 3s ease-in-out (translateX)
- **glow:** Applied to gradient dividers

### Components
- **Card:** Hover effects with scale and opacity
- **Navigation:** Sticky header with blur backdrop
- **Particles:** Canvas-based with magnetism effect

---

## 🌐 Environment Variables

```bash
# Required for Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Optional for Analytics
NEXT_PUBLIC_BEAM_TOKEN=xxx
```

**Note:** Example values in `.env.example`

---

## 📦 Dependencies Analysis

### Production Dependencies (18)
- **Core:** next, react, react-dom, typescript
- **Content:** contentlayer, next-contentlayer, @next/mdx
- **Markdown:** remark-gfm, rehype-* plugins, markdown-wasm
- **UI:** framer-motion, lucide-react, react-wrap-balancer
- **Data:** @upstash/redis
- **Fonts:** @next/font

### Dev Dependencies (11)
- **Styling:** tailwindcss, autoprefixer, postcss
- **Tailwind Plugins:** @tailwindcss/typography, line-clamp, debug-screens
- **Types:** @types/node, @types/react, @types/react-dom
- **Tooling:** rome
- **Telemetry:** @opentelemetry/* (with version overrides)

---

## 🚀 Scripts

```json
{
  "dev": "next dev",           // Development server
  "build": "next build",       // Production build
  "start": "next start",       // Production server
  "fmt": "pnpm rome check . --apply-unsafe && pnpm rome format . --write"
}
```

---

## 📝 Content Structure

### Projects (21 MDX files)
**Featured/Top:**
- unkey.mdx - API authentication platform
- planetfall.mdx - Space game
- highstorm.mdx - Event tracking

**Categories:**
1. **Upstash Projects** (11 files)
   - Redis, Kafka, QStash, Rate limiting
   - Analytics (core, auth, web, rate limit)
   - React UI, CLI, Edge Flags

2. **Development Tools** (5 files)
   - terraform-provider-vercel
   - zod-bird
   - access
   - envshare

3. **Other** (2 files)
   - chronark.com (this site)
   - Personal projects

**MDX Frontmatter:**
- published: boolean
- title: string
- description: string
- date: date (optional)
- url: string (optional)
- repository: string (optional)

---

## 🔍 Code Patterns

### Server Components (Default)
```tsx
// app/projects/page.tsx
export default async function ProjectsPage() {
  const views = await redis.mget(...);
  return <div>...</div>;
}
```

### Client Components
```tsx
// app/components/particles.tsx
"use client";
export default function Particles() { ... }
```

### API Routes (Edge)
```tsx
// pages/api/incr.ts
export const config = { runtime: "edge" };
export default async function incr(req: NextRequest) { ... }
```

### Content Import
```tsx
import { allProjects } from "contentlayer/generated";
```

---

## 🎯 Performance Optimizations

1. **Edge Runtime:** API routes run on edge for low latency
2. **Static Generation:** Pages pre-rendered at build time
3. **Incremental Revalidation:** 60s cache for project pages
4. **Font Optimization:** Next.js font loading with display swap
5. **Image Optimization:** Next.js automatic image optimization
6. **Canvas Animation:** RequestAnimationFrame for smooth particles
7. **Redis Caching:** Fast view count retrieval
8. **Code Splitting:** Automatic with App Router

---

## 🧪 Testing & Quality

### Linting
- **Tool:** Rome 12.1.3
- **Config:** `rome.json`
- **Rules:** Recommended enabled
- **Ignored:** node_modules, .next, dist

### Type Checking
- **Tool:** TypeScript 5.2.2
- **Mode:** Strict enabled
- **Coverage:** Full project

---

## 🚢 Deployment

### Platform
- **Host:** Vercel
- **Region:** Edge network
- **Build:** Automatic on push
- **Preview:** Per PR

### Build Process
1. Install dependencies with pnpm
2. Run `next build`
3. Contentlayer processes MDX files
4. Next.js generates static pages
5. Deploy to Vercel edge network

---

## 🔐 Security Considerations

1. **IP Hashing:** SHA-256 hash before storing in Redis
2. **Rate Limiting:** 24-hour deduplication window
3. **Environment Variables:** Never committed to git
4. **Content Security:** Static content at build time
5. **Edge Functions:** Isolated execution environment

---

## 🛠️ Development Workflow

### Setup
```bash
git clone https://github.com/chronark/chronark.com.git
cd chronark.com
pnpm install
cp .env.example .env
# Add your Upstash credentials
pnpm dev
```

### Adding New Project
1. Create `content/projects/my-project.mdx`
2. Add frontmatter (title, description, etc.)
3. Write content in MDX
4. Contentlayer auto-generates types
5. Project appears on /projects

### Code Style
```bash
pnpm fmt  # Run Rome formatter and linter
```

---

## 📊 Key Metrics

- **Total Files:** 63 source files
- **Project Size:** 1.5MB (excluding node_modules)
- **Projects Showcased:** 21
- **Pages:** 3 main routes (/, /projects, /contact)
- **Components:** 5 shared components
- **API Routes:** 1 edge function

---

## 🔗 External Integrations

1. **Upstash Redis**
   - Purpose: Page view storage
   - Type: Serverless Redis
   - Region: Global edge

2. **Beam Analytics**
   - Purpose: Privacy-friendly analytics
   - Type: Third-party script
   - Conditional: Based on NEXT_PUBLIC_BEAM_TOKEN

3. **Vercel**
   - Purpose: Hosting and deployment
   - Features: Edge functions, auto-deployment

---

## 🎓 Learning Resources

### Key Technologies to Understand
1. **Next.js 13 App Router:** File-based routing, layouts, server components
2. **Contentlayer:** Type-safe content layer for MDX
3. **Tailwind CSS:** Utility-first styling
4. **Upstash Redis:** Serverless Redis for edge
5. **TypeScript:** Type system and configuration

### Important Files for New Developers
1. `app/layout.tsx` - Understand the root layout
2. `contentlayer.config.js` - How content works
3. `app/projects/page.tsx` - Data fetching pattern
4. `pages/api/incr.ts` - Edge function example
5. `tailwind.config.js` - Custom styling setup

---

## 🐛 Common Issues & Solutions

### Issue: Content not updating
**Solution:** Delete `.contentlayer` folder and rebuild

### Issue: Redis connection fails
**Solution:** Check UPSTASH_* environment variables

### Issue: Build fails
**Solution:** Clear `.next` folder and rebuild

### Issue: Fonts not loading
**Solution:** Check `public/fonts/` exists with CalSans-SemiBold.ttf

---

## 📈 Future Enhancements (Potential)

- [ ] Add blog section
- [ ] Implement search functionality
- [ ] Add RSS feed
- [ ] Dark/light mode toggle
- [ ] More interactive animations
- [ ] Project filtering/sorting
- [ ] Comments system
- [ ] Newsletter integration

---

## 🤝 Contributing

If forking this project:
1. Remove all personal content (`content/projects/*.mdx`)
2. Replace images in `public/`
3. Update metadata in `app/layout.tsx`
4. Add your own Upstash credentials
5. Customize colors/fonts in `tailwind.config.js`

---

## 📚 Additional Documentation

- **Agent Memory System:** See `.agent-memory/README.md`
- **Quick Start Guide:** See `.agent-memory/QUICKSTART.md`
- **Project README:** See `README.md`

---

**End of Context Document**

This document provides a comprehensive overview of the codebase. For specific implementation details, refer to the individual files listed in each section.
