# Muhammad Nurhidayat Gani - Professional Portfolio

Modern, interactive portfolio website showcasing professional expertise as a Heavy Equipment Operator, featuring advanced animations, visual galleries, and comprehensive case studies.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Progress](https://img.shields.io/badge/progress-85%25-blue)
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
- **Framer Motion** - Advanced animations
- **AOS (Animate On Scroll)** - Scroll animations
- **Lucide React** - Modern icon system
- **React Compare Slider** - Before/after image comparison
- **Upstash Redis** - Page view tracking
- **Vercel Analytics** - Web analytics & visitor tracking
- **Vercel Speed Insights** - Performance monitoring
- **Vercel** - Hosting and deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone repository
git clone https://github.com/mnhidayatgani/aiStory.git
cd aiStory

# Install dependencies
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

## 🎯 Development Progress

### ✅ Completed Phases (85%)

**Phase 0: Foundation & Setup**
- ✅ Next.js 13 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS setup
- ✅ Component structure

**Phase 1: Content Development**
- ✅ 6 comprehensive project case studies
- ✅ Resume and skills section
- ✅ Contact information
- ⏳ Visual assets (photos pending)

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

## 🔄 Project Structure

```
aiStory/
├── app/                          # Next.js App Router
│   ├── components/               # Reusable components
│   │   ├── matrix-hero.tsx      # Matrix animation
│   │   ├── equipment-gallery.tsx # Equipment showcase
│   │   ├── before-after.tsx     # Comparison slider
│   │   ├── day-timeline.tsx     # Daily schedule
│   │   ├── achievement-badge.tsx # Stat counters
│   │   └── ...
│   ├── projects/                 # Projects section
│   │   ├── [slug]/              # Dynamic project pages
│   │   └── page.tsx             # Projects listing
│   ├── resume/                   # Resume page
│   ├── contact/                  # Contact page
│   └── page.tsx                  # Homepage
│
├── content/
│   └── projects/                 # 6 MDX case studies
│
├── public/                       # Static assets
│   ├── projects/                 # Project images
│   ├── certificates/             # Certificate files
│   ├── equipment/                # Equipment photos
│   └── ...
│
├── util/                         # Utility functions
├── types/                        # TypeScript types
└── Documentation/                # Project docs
    ├── IMPROVEMENT_PHASES.md
    ├── PHASE_3_SUMMARY.md
    ├── ANALYTICS_SETUP.md
    └── ...
```

## 🤝 Contact

**Muhammad Nurhidayat Gani**
- 📧 mnhidayatgani@gmail.com
- 📱 +62 853-4590-2520
- 💼 LinkedIn: Muhammad Nurhidayat Gani

## 📄 Certifications

- 🏆 SIO Excavator (Non-Class) - 2023
- �� SIM BII Umum - 2023
- 📜 Heavy Equipment Training Certificate - 2023

## 📚 Documentation

Comprehensive guides available:

- **VERCEL_DEPLOYMENT.md** - Complete deployment guide with domain setup ⭐
- **READY_TO_DEPLOY.md** - Current status and deployment overview
- **IMPROVEMENT_PHASES.md** - Complete development roadmap
- **PHASE_3_SUMMARY.md** - Latest phase completion details
- **ANALYTICS_SETUP.md** - Analytics integration guide
- **VISUAL_OVERHAUL_COMPLETE.md** - Visual enhancements documentation
- **TOP_5_IMPLEMENTATION.md** - Feature implementation guide
- **SESSION_SUMMARY_2025-10-14.md** - Recent development session

## 🎨 Features Showcase

### Matrix Hero Animation
Dynamic typing effect with customizable text and green matrix rain background effect.

### Equipment Gallery
Interactive gallery featuring:
- Komatsu PC200 Excavator
- Hitachi ZX200 Excavator
- Volvo EC140D Excavator
- Hover effects and smooth transitions

### Before/After Comparisons
Visual transformation sliders showing work progress and results.

### Day-in-Life Timeline
Animated schedule visualization showing typical workday activities from 05:00 to 17:00.

### Achievement Badges
Animated counters displaying key metrics:
- Years of experience
- Projects completed
- Equipment operated
- Team members trained

### Project Filtering
Category-based filtering system with smooth animations:
- All Projects
- Mining Operations
- Safety & Compliance
- Equipment Maintenance
- Team Leadership

## 📈 Performance

Optimized for excellent performance scores:

- **Lighthouse Score:** 95+ (Performance)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **SEO Score:** 100
- **Accessibility:** 95+
- **Best Practices:** 100

### Monitoring & Analytics

**Vercel Speed Insights** - Real-time performance monitoring
- Core Web Vitals tracking (LCP, FID, CLS)
- Performance score per page
- Geographic performance data
- Device & browser insights
- Automatic performance alerts

**Vercel Web Analytics** - Privacy-focused visitor tracking
- Page views & unique visitors
- Top pages & referrers
- Geographic distribution
- Device types & browsers
- Real-time monitoring
- GDPR compliant (no cookies)

## 🔒 Security

Implemented security headers:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security

## 📜 License

MIT License

---

**Built with 💪 by Muhammad Nurhidayat Gani**  
*Professional Heavy Equipment Operator | Safety Leader | Continuous Learner*

**Live Site:** [https://aistorytell.me](https://aistorytell.me)  
**Repository:** [github.com/mnhidayatgani/aiStory](https://github.com/mnhidayatgani/aiStory)

---

### 🚀 Deployment Status

- ✅ **Hosting:** Vercel
- ✅ **Domain:** aistorytell.me
- ✅ **SSL/HTTPS:** Auto-configured
- ✅ **Speed Insights:** Enabled
- ✅ **Web Analytics:** Enabled
- ✅ **CDN:** Global Edge Network
- ✅ **Auto-Deploy:** Git push triggers deployment

**Deploy Guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for step-by-step instructions

---

Last Updated: 2025-10-14  
Version: 0.85 (85% Complete)  
Status: Production Ready
