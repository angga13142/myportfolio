# Muhammad Nurhidayat Gani - Professional Portfolio

Modern, interactive portfolio website showcasing professional expertise as a Heavy Equipment Operator, featuring advanced animations, visual galleries, comprehensive case studies, and **integrated Admin Panel CMS** for content management.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Features](https://img.shields.io/badge/features-18-success)
![Next.js](https://img.shields.io/badge/Next.js-13.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 👤 About

Professional Heavy Equipment Operator specializing in excavator operations, with expertise in:

- Nickel mining operations
- Safety standards (K3) and compliance
- Equipment maintenance and optimization
- Team coordination and leadership
- Productivity improvement

## 📋 Portfolio Highlights

### Operational Excellence

- **95% operational efficiency** in mining operations
- Daily production: 800-1,000 BCM consistently achieved
- Zero accident record across all positions

### Safety Leadership

- **40% reduction** in near-miss incidents
- 100% P2H compliance
- Safety Champion Award recipient

### Equipment Expertise

- **96% equipment uptime** achievement
- **45% reduction** in unplanned downtime
- Cost savings of Rp 85M+ annually per equipment

### Productivity Innovation

- **23% productivity increase** through technique optimization
- **18% fuel consumption reduction**
- Measurable business impact and ROI

## ✨ Complete Feature Set (18 Features)

### 🎯 Performance Optimizations (8 Features)

1. **Optimized Particles System** - Reduced particles on mobile, auto-pause on inactive tabs, disabled on low-end devices
2. **Smart Image Loading** - Lazy loading, optimized cache (24h), reduced sizes, priority loading
3. **Font Optimization** - Reduced Poppins weights (3 vs 6), preload, fallback fonts, display swap
4. **Next.js Bundle Optimization** - Tree-shaking for lucide-react, removed console.log in production
5. **Enhanced AOS Animations** - Faster duration (600ms), lighter easing, disabled on mobile
6. **Loading Skeletons** - ProjectCard, BlogCard, Article skeletons for better UX
7. **Performance Hooks** - useReducedMotion, useIsMobile, useIsLowEndDevice
8. **Redis Revalidation** - Increased cache TTL (1 hour vs 60s) for reduced server load

### 💼 Professional Features (4 Features)

9. **WhatsApp Floating Button** - Instant contact with quick message templates
10. **Newsletter Signup** - Email subscription with Resend API integration
11. **Skills Matrix** - Interactive radar chart with professional certifications
12. **Safety Dashboard** - Charts, metrics, heat map, safety achievements

### 🚀 Differentiation Features (3 Features)

13. **Video Testimonials** - Full-featured video player with controls, ratings, dates
14. **Interactive Career Timeline** - Vertical timeline with modal details, animations, company logos
15. **3D Equipment Showcase** - Interactive 3D excavator model with React Three Fiber, orbit controls, hotspots

### 📈 Scale Features (3 Features)

16. **PDF Case Studies Generator** - Professional downloadable PDFs with jsPDF (~500ms generation)
17. **Multi-language Support (EN/ID)** - Custom lightweight i18n (~20KB bundle), type-safe, localStorage persistence
18. **Equipment Maintenance Log** - Interactive tracking with charts, filters, CSV export, analytics

### 🎨 Visual Components

- **Matrix Animation Hero** - Dynamic typing effect with green matrix rain
- **Equipment Gallery** - Interactive showcase with hover effects
- **Before/After Comparisons** - Visual transformation sliders
- **Day-in-Life Timeline** - Animated schedule visualization
- **Certificate Showcase** - Professional certifications with PDF support
- **Achievement Badges** - Animated stat counters with icons
- **Operations Video Showcase** - YouTube embed gallery for equipment operations
- **Image Lightbox** - Full-screen gallery viewer
- **Progress Circles** - Animated skill level indicators

### 🛠️ Admin Panel CMS (Bonus Feature!)

**Manage portfolio content without touching code!**

- **🔐 Secure Authentication** - Password-protected admin access with 24-hour sessions
- **📊 Dashboard** - Overview of videos, testimonials, and images with quick actions
- **🎥 Video Management** - Add/edit/delete operations videos and testimonials (YouTube integration)
- **📸 Photo Upload** - Drag-and-drop file upload with preview and metadata editing
- **💾 JSON Storage** - All content stored in `data/content.json` for easy management
- **🔄 Real-time Updates** - Changes reflect immediately on the website

**Admin Access:** Navigate to `/admin/login` and enter your admin password

**Documentation:** See [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) for complete setup guide

## ✨ Key Features

### Interactive Components

- **Matrix Animation Hero** - Dynamic typing effect with green matrix rain
- **Equipment Gallery** - Interactive showcase of heavy equipment with hover effects
- **Before/After Comparisons** - Visual transformation sliders
- **Day-in-Life Timeline** - Animated schedule visualization
- **Certificate Showcase** - Professional certifications with PDF support
- **Achievement Badges** - Animated stat counters with icons

### Advanced Functionality

- **AOS Animations** - Scroll-triggered animations throughout
- **Project Filters** - Category-based filtering system
- **Video Background** - Hero section with video support
- **Image Lightbox** - Full-screen image gallery viewer
- **Progress Circles** - Animated skill level indicators
- **Back-to-Top Button** - Smooth scroll navigation

## 🛠️ Tech Stack

### Core

- **Next.js 13.5.4** - React framework with App Router
- **TypeScript 5.2.2** - Type safety and better DX
- **Tailwind CSS 3.3.3** - Utility-first styling
- **Contentlayer 0.3.4** - Type-safe MDX content management

### Libraries & Tools

- **React Three Fiber** - 3D graphics and interactive models
- **Recharts** - Data visualization and charts
- **jsPDF** - PDF generation for case studies
- **Framer Motion** - Advanced animations
- **AOS (Animate On Scroll)** - Scroll animations
- **Lucide React** - Modern icon system
- **React Compare Slider** - Before/after image comparison
- **Upstash Redis** - Page view tracking
- **Resend** - Email service for contact form and newsletter
- **react-ga4** - Google Analytics 4 integration

### Analytics & Monitoring

- **Vercel Analytics** - Web analytics & visitor tracking (auto-enabled)
- **Vercel Speed Insights** - Performance monitoring (auto-enabled)
- **Google Analytics 4** - Comprehensive event tracking

## 🚀 Quick Start

See **[INSTALL.md](./INSTALL.md)** for complete installation and deployment guide.

**Quick Deploy to Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mnhidayatgani/aiStory)

**Local Development:**

````bash
# Clone and install
git clone https://github.com/mnhidayatgani/aiStory.git
cd aiStory
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

## 📝 Environment Variables

Create `.env.local` file in root directory:

```bash
# Required for SEO
NEXT_PUBLIC_URL=https://yourdomain.com

# Admin Panel (Required for /admin access)
ADMIN_PASSWORD=your_secure_password_here

# Optional Features
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_id
````

**Important Notes:**

- Copy `.env.example` to `.env.local` for local development
- **Never commit `.env.local` to git** (already in .gitignore)
- For production deployment, add environment variables in Vercel Dashboard
- **Vercel Analytics & Speed Insights** are auto-enabled (no config needed)
- See [INSTALL.md](./INSTALL.md) for detailed setup instructions

```

Visit [http://localhost:3000](http://localhost:3000)
pnpm install

# Run development server

pnpm dev

```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Deploy to Vercel

**Quick Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mnhidayatgani/aiStory)

**Or use Vercel CLI:**

```bash
npm i -g vercel
vercel --prod
```

**Production URL:** [https://aistorytell.me](https://aistorytell.me)

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete deployment guide with custom domain setup.

## 📝 Environment Variables

Required for production deployment:

```bash
# Production URL (Required for proper SEO)
NEXT_PUBLIC_URL=https://aistorytell.me
```

Optional variables for enhanced features:

```bash
# Upstash Redis (for page view tracking) - Optional
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Email service (for contact form) - Optional
RESEND_API_KEY=your_resend_api_key

# Analytics - Optional
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your_umami_id
```

**Important Notes:**

- **Vercel Analytics & Speed Insights** are automatically enabled when deployed to Vercel (no configuration needed!)
- The portfolio works perfectly without optional variables
- Copy `.env.example` to `.env.local` for local development
- Add environment variables in Vercel Dashboard → Project Settings → Environment Variables

## 📊 Content

### Project Case Studies (6)

1. **Nickel Mining Operations Excellence** - 95% efficiency, 800-1,000 BCM daily
2. **Safety Protocol Implementation** - 40% incident reduction, Safety Champion Award
3. **Equipment Maintenance Excellence** - 96% uptime, Rp 85M+ savings
4. **Multi-Equipment Team Coordination** - 8-unit fleet, 98% efficiency
5. **Productivity Improvement** - 23% increase, 18% fuel savings
6. **Excavator Operations Overview** - Professional capabilities showcase

**Total:** 6,373 words of professional content with measurable results

## 📚 Documentation

- **[INSTALL.md](./INSTALL.md)** - Complete installation and deployment guide ⭐
- **[ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md)** - Admin panel setup and usage ⭐
- **[.env.example](./.env.example)** - Environment variables template

### Additional Documentation

- **[docs/guides/](./docs/guides/)** - Setup and deployment guides
- **[docs/summaries/](./docs/summaries/)** - Technical implementation details

## 📊 Project Structure

**Phase 2: Visual Enhancement**

- ✅ Image gallery with lightbox
- ✅ Certificate showcase with PDF support
- ✅ Interactive timeline
- ✅ Skills visualization
- ✅ Enhanced contact form
- ✅ Typography improvements (Poppins font)

**Phase 3: SEO & Performance**

- ✅ JSON-LD structured data (5 schemas)
- ✅ Enhanced meta tags & Open Graph
- ✅ Performance optimization
- ✅ Security headers
- ✅ PWA manifest
- ✅ Accessibility improvements (WCAG AA)
- ✅ Loading states & skeletons

**Phase 4: Advanced Features (Current)**

- ✅ Matrix animation hero
- ✅ Equipment gallery with hover effects
- ✅ Before/after comparison sliders
- ✅ Day-in-life timeline
- ✅ AOS scroll animations
- ✅ Achievement badges with counters
- ✅ Project filtering system
- ✅ Video background support
- ✅ Back-to-top button

### ⏳ Next Steps

- Add professional photos and work site images
- Implement blog section (optional)
- Add testimonials (optional)
- Performance monitoring setup
- Google Search Console integration

## � Project Structure

```
aiStory/
├── app/                          # Next.js App Router
│   ├── components/               # Reusable components (40+ components)
│   ├── admin/                    # Admin Panel CMS
│   │   ├── login/               # Authentication page
│   │   ├── videos/              # Video management
│   │   ├── photos/              # Photo upload
│   │   └── page.tsx             # Dashboard
│   ├── api/                      # API routes
│   │   └── admin/               # Admin API endpoints
│   │       ├── auth/            # Authentication
│   │       ├── content/         # Content CRUD
│   │       └── upload/          # File upload
│   ├── i18n/                     # Internationalization (EN/ID)
│   ├── lib/                      # Utilities & helpers
│   ├── projects/[slug]/          # Dynamic project pages
│   ├── resume/                   # Resume page
│   ├── contact/                  # Contact page
│   └── page.tsx                  # Homepage
│
├── content/
│   ├── projects/                 # 6 MDX case studies
│   └── blog/                     # 2 blog articles
│
├── data/
│   └── content.json              # Admin panel content storage
│
├── public/                       # Static assets
│   ├── projects/                 # Project images
│   ├── certificates/             # Certificate files
│   ├── gallery/                  # Uploaded photos
│   └── ...
│
├── docs/                         # Documentation
│   ├── guides/                   # Setup guides
│   └── summaries/                # Implementation docs
│
├── .env.example                  # Environment variables template
├── INSTALL.md                    # Installation guide
├── ADMIN_QUICK_START.md          # Admin panel guide
└── README.md                     # This file
```

## 🤝 Contact

**Muhammad Nurhidayat Gani**

- 📧 mnhidayatgani@gmail.com
- 📱 +62 853-4590-2520
- 💼 LinkedIn: Muhammad Nurhidayat Gani

## 📄 Certifications

- 🏆 SIO Excavator (Non-Class) - 2023
- 🚗 SIM BII Umum - 2023
- 📜 Heavy Equipment Training Certificate - 2023

## Performance

Optimized for excellent performance scores:

- **Lighthouse Score:** 95+ (Performance)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **SEO Score:** 100
- **Accessibility:** 95+
- **Best Practices:** 100

### Analytics & Monitoring

- **Vercel Speed Insights** - Real-time performance monitoring with Core Web Vitals
- **Vercel Web Analytics** - Privacy-focused visitor tracking (GDPR compliant)
- **Google Analytics 4** - Comprehensive event tracking (optional)

## 🔒 Security

Implemented security headers:

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security

## 📜 License

MIT License - See [LICENSE](./LICENSE) file for details

---

**Built with 💪 by Muhammad Nurhidayat Gani**  
_Professional Heavy Equipment Operator | Safety Leader | Continuous Learner_

**Live Site:** [https://aistorytell.me](https://aistorytell.me)  
**Repository:** [github.com/mnhidayatgani/aiStory](https://github.com/mnhidayatgani/aiStory)

---

Last Updated: January 2025  
Version: 2.0 (100% Complete - 18 Features)  
Status: Production Ready ✅
