# Installation Guide

Complete guide to install, configure, and deploy the portfolio website.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Admin Panel Setup](#admin-panel-setup)
5. [Production Deployment](#production-deployment)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before starting, ensure you have:

### Required
- **Node.js 18+** or **Node.js 20+** ([Download](https://nodejs.org/))
- **pnpm** package manager ([Install guide](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/))

### Optional (for enhanced features)
- **Upstash Redis** account ([Free tier](https://upstash.com/)) - For page view tracking
- **Resend** account ([Free tier](https://resend.com/)) - For contact form and newsletter
- **Google Analytics 4** account ([Free](https://analytics.google.com/)) - For analytics tracking
- **Vercel** account ([Free](https://vercel.com/)) - For deployment

### Check Your Setup

```bash
# Check Node.js version (should be 18+ or 20+)
node --version

# Check pnpm (if not installed, run: npm install -g pnpm)
pnpm --version

# Check Git
git --version
```

---

## 💻 Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/mnhidayatgani/aiStory.git

# Navigate to project directory
cd aiStory
```

### Step 2: Install Dependencies

```bash
# Install all dependencies using pnpm
pnpm install

# This will install:
# - Next.js, React, TypeScript
# - Tailwind CSS, Contentlayer
# - All required libraries and tools
# - Total: ~300MB of node_modules
```

**Note:** Installation may take 2-5 minutes depending on your internet connection.

### Step 3: Run Development Server

```bash
# Start the development server
pnpm dev

# Server will start at http://localhost:3000
# - Hot reload enabled
# - TypeScript checking enabled
# - Fast refresh for instant updates
```

**Access the site:**
- Homepage: http://localhost:3000
- Projects: http://localhost:3000/projects
- Resume: http://localhost:3000/resume
- Contact: http://localhost:3000/contact
- Admin Panel: http://localhost:3000/admin/login

---

## ⚙️ Environment Configuration

### Step 1: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local
```

### Step 2: Configure Variables

Edit `.env.local` with your values:

```bash
# ============================================
# REQUIRED FOR SEO
# ============================================
NEXT_PUBLIC_URL=http://localhost:3000

# ============================================
# ADMIN PANEL (REQUIRED for /admin access)
# ============================================
ADMIN_PASSWORD=your_secure_password_here

# ============================================
# OPTIONAL FEATURES
# ============================================

# Upstash Redis (for page view tracking)
UPSTASH_REDIS_REST_URL=your_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here

# Resend (for contact form and newsletter)
RESEND_API_KEY=your_resend_api_key_here

# Google Analytics 4 (for comprehensive analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Variable Details

#### 1. NEXT_PUBLIC_URL (Required)
- **Local Development:** `http://localhost:3000`
- **Production:** Your actual domain (e.g., `https://yourdomain.com`)
- **Purpose:** Used for SEO metadata and canonical URLs

#### 2. ADMIN_PASSWORD (Required for Admin Panel)
- **Recommended:** 12+ characters with mix of letters, numbers, symbols
- **Example:** `MySecure@Password123!`
- **Purpose:** Protects `/admin` dashboard access
- **Important:** Change from default value!

#### 3. UPSTASH_REDIS_REST_URL & TOKEN (Optional)
- **Get from:** [Upstash Console](https://console.upstash.com/)
- **Purpose:** Track page views on projects and blog posts
- **Without it:** Page views will show 0 (site works fine)

**Setup Steps:**
1. Create free account at [upstash.com](https://upstash.com/)
2. Create new Redis database
3. Copy REST URL and REST TOKEN from database page

#### 4. RESEND_API_KEY (Optional)
- **Get from:** [Resend Dashboard](https://resend.com/api-keys)
- **Purpose:** Send emails from contact form and newsletter signup
- **Without it:** Forms will show error (other features work)

**Setup Steps:**
1. Create free account at [resend.com](https://resend.com/)
2. Verify your domain or use test domain
3. Generate API key from dashboard

#### 5. NEXT_PUBLIC_GA_MEASUREMENT_ID (Optional)
- **Get from:** [Google Analytics](https://analytics.google.com/)
- **Purpose:** Track events (PDF downloads, language switches, video plays)
- **Without it:** Basic analytics from Vercel still work

**Setup Steps:**
1. Create Google Analytics 4 property
2. Copy Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to environment variables

### Step 3: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Start again to load new environment variables
pnpm dev
```

---

## 🛠️ Admin Panel Setup

The admin panel allows you to manage content without touching code.

### Step 1: Set Admin Password

Ensure `ADMIN_PASSWORD` is set in `.env.local`:

```bash
ADMIN_PASSWORD=your_secure_password
```

### Step 2: Access Admin Panel

1. Open browser: http://localhost:3000/admin/login
2. Enter your admin password
3. Click "Login"

### Step 3: Manage Content

**Dashboard:** http://localhost:3000/admin
- View statistics (videos, testimonials, images)
- Quick navigation to management pages

**Video Management:** http://localhost:3000/admin/videos
- **Operations Videos Tab:**
  - Add YouTube video IDs for equipment operations
  - Categories: Operations, Safety, Training, Achievement
  - Fields: Title, YouTube ID, Duration, Category, Description
  
- **Video Testimonials Tab:**
  - Add client/colleague testimonials
  - Fields: Name, Role, Company, Video ID, Rating, Date, Text

**Photo Upload:** http://localhost:3000/admin/photos
- Drag and drop photos or click to select
- Auto-upload to `/public/gallery/`
- Edit metadata: Alt text, Category, Caption
- Delete unwanted photos

**Data Storage:**
- All content saved to `data/content.json`
- Automatic timestamps for tracking changes
- Real-time updates to website

### Step 4: Verify Changes

After adding content:
1. Visit homepage: http://localhost:3000
2. Check "Operations Video Showcase" section
3. Changes should appear immediately

**For detailed admin panel guide, see [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md)**

---

## 🚀 Production Deployment

### Option 1: Deploy to Vercel (Recommended)

#### Quick Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mnhidayatgani/aiStory)

#### Manual Deployment

**Step 1: Push to GitHub**

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

**Step 2: Import to Vercel**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Import"

**Step 3: Configure Environment Variables**

In Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```bash
# Required
NEXT_PUBLIC_URL=https://your-vercel-domain.vercel.app
ADMIN_PASSWORD=your_secure_production_password

# Optional (add if you have accounts)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

**Important:** 
- Use different `ADMIN_PASSWORD` for production
- Update `NEXT_PUBLIC_URL` to your actual domain after deployment

**Step 4: Deploy**

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your site is live!

**Step 5: Access Admin Panel in Production**

1. Visit: `https://your-domain.vercel.app/admin/login`
2. Use your production admin password
3. Start managing content

#### Custom Domain Setup (Optional)

1. Go to Vercel Dashboard → **Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., `myportfolio.com`)
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_URL` environment variable to new domain
6. Redeploy

### Option 2: Vercel CLI Deployment

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd aiStory

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? (enter name)
# - Directory? ./
# - Override settings? N
```

**Add Environment Variables via CLI:**

```bash
# Add environment variables
vercel env add ADMIN_PASSWORD
vercel env add NEXT_PUBLIC_URL
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
vercel env add RESEND_API_KEY
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID

# Redeploy with new environment variables
vercel --prod
```

### Option 3: Other Platforms

#### Build for Production

```bash
# Build the application
pnpm build

# Output will be in .next/ directory
# Build time: ~1-2 minutes
```

#### Start Production Server

```bash
# Run production build locally
pnpm start

# Server runs on http://localhost:3000
```

#### Deploy to Other Platforms

- **Netlify:** Use `next.config.js` with `output: 'standalone'`
- **AWS Amplify:** Connect GitHub repository, auto-detects Next.js
- **Railway:** One-click deploy from GitHub
- **DigitalOcean App Platform:** Import from GitHub

**Note:** Vercel is recommended as it's optimized for Next.js and includes free analytics.

---

## 🔍 Troubleshooting

### Common Issues

#### 1. "Cannot find module" error

**Cause:** Dependencies not installed or corrupted

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
pnpm install
```

#### 2. Port 3000 already in use

**Cause:** Another application using port 3000

**Solution:**
```bash
# Kill process on port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Or run on different port
pnpm dev -- -p 3001
```

#### 3. Environment variables not working

**Cause:** Variables not loaded or server not restarted

**Solution:**
```bash
# Ensure .env.local exists
ls -la .env.local

# Restart development server
# Stop with Ctrl+C, then:
pnpm dev
```

#### 4. Build fails with TypeScript errors

**Cause:** Type checking errors in code

**Solution:**
```bash
# Check TypeScript errors
pnpm tsc --noEmit

# Fix errors shown in output
# Common: missing types, wrong imports
```

#### 5. Admin panel shows "Unauthorized"

**Cause:** Wrong password or session expired

**Solution:**
- Verify `ADMIN_PASSWORD` in `.env.local`
- Clear browser cookies and try again
- Check browser console for errors

#### 6. Images not loading

**Cause:** Files not in `/public` folder or wrong paths

**Solution:**
- Ensure images are in `/public/` directory
- Check file paths (case-sensitive)
- Verify image extensions (.jpg, .png, .webp)

#### 7. "Module not found: Can't resolve 'contentlayer/generated'"

**Cause:** Contentlayer not built yet

**Solution:**
```bash
# Build contentlayer
pnpm build

# Or run dev (it auto-builds contentlayer)
pnpm dev
```

### Getting Help

**Documentation:**
- [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) - Admin panel guide
- [README.md](./README.md) - Project overview
- [.env.example](./.env.example) - Environment variables reference

**External Resources:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)
- [pnpm Documentation](https://pnpm.io/)

**Community:**
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

## 📊 Build Information

### Development Build
```bash
pnpm dev
```
- **Build Time:** ~10-15 seconds (first run)
- **Hot Reload:** Instant updates
- **Size:** Not optimized (includes dev tools)

### Production Build
```bash
pnpm build
```
- **Build Time:** ~1-2 minutes
- **Output Size:** 
  - Homepage: ~94 KB
  - Projects: ~241 KB
  - Resume: ~277 KB
- **Optimizations:** Tree-shaking, minification, image optimization

### Performance Targets
- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Total Bundle Size:** < 500 KB (gzipped)

---

## ✅ Verification Checklist

After installation and deployment, verify:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Projects page displays case studies
- [ ] Resume page shows skills and experience
- [ ] Contact form is accessible
- [ ] Admin panel login works
- [ ] Admin dashboard displays stats
- [ ] Video management interface functional
- [ ] Photo upload works
- [ ] Environment variables loaded
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] Images load properly
- [ ] Animations work smoothly

---

## 🎉 Next Steps

After successful installation:

1. **Customize Content:**
   - Use admin panel to add your videos and photos
   - Edit MDX files in `content/projects/` for case studies
   - Update profile information in `app/resume/page.tsx`

2. **Configure Analytics:**
   - Set up Google Analytics 4
   - Enable Vercel Analytics (auto-enabled on deploy)
   - Monitor performance with Speed Insights

3. **SEO Optimization:**
   - Submit sitemap to Google Search Console
   - Verify structured data with Google Rich Results Test
   - Monitor search performance

4. **Performance Monitoring:**
   - Check Lighthouse scores regularly
   - Monitor Core Web Vitals
   - Review Vercel Analytics dashboard

5. **Content Updates:**
   - Add real project photos
   - Upload work videos to YouTube
   - Update testimonials
   - Publish blog articles

---

**Installation Complete! 🚀**

Your portfolio is now ready for development and deployment.

For admin panel usage, see [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md)

---

**Last Updated:** January 2025  
**Version:** 2.0  
**Status:** Production Ready ✅
