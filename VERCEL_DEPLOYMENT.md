# 🚀 Vercel Deployment Guide - aistorytell.me

Complete guide untuk deploy portfolio ke Vercel dengan custom domain **aistorytell.me** dan mengaktifkan Speed Insights & Web Analytics.

---

## 📋 Prerequisites

✅ Domain **aistorytell.me** sudah terdaftar  
✅ Repository **mnhidayatgani/aiStory** sudah di GitHub  
✅ Code sudah di-push ke repository  
✅ Akun Vercel (gratis)

---

## 🎯 Step 1: Deploy ke Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Buka Vercel**
   - Kunjungi: [vercel.com](https://vercel.com)
   - Login dengan **GitHub account** Anda

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Pilih repository: **mnhidayatgani/aiStory**
   - Click **"Import"**

3. **Configure Project**
   
   Settings akan otomatis terdeteksi:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: pnpm build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: pnpm install (auto-detected)
   Node.js Version: 18.x (recommended)
   ```

4. **Environment Variables (Optional)**
   
   Tambahkan environment variables jika diperlukan:
   ```bash
   # Production URL
   NEXT_PUBLIC_URL = https://aistorytell.me
   
   # Optional - Upstash Redis (page views)
   UPSTASH_REDIS_REST_URL = your_url
   UPSTASH_REDIS_REST_TOKEN = your_token
   
   # Optional - Email service
   RESEND_API_KEY = your_key
   
   # Optional - Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID = your_ga_id
   NEXT_PUBLIC_UMAMI_WEBSITE_ID = your_umami_id
   ```
   
   **Note:** Vercel Analytics & Speed Insights tidak perlu environment variables!

5. **Deploy!**
   - Click **"Deploy"**
   - Tunggu 2-3 menit untuk build
   - ✅ Portfolio LIVE di: `https://your-project-name.vercel.app`

---

## 🌐 Step 2: Add Custom Domain (aistorytell.me)

### 2.1 Add Domain di Vercel

1. **Open Project Settings**
   - Buka project Anda di Vercel Dashboard
   - Click tab **"Settings"**
   - Pilih **"Domains"**

2. **Add Domain**
   - Click **"Add Domain"**
   - Masukkan: `aistorytell.me`
   - Click **"Add"**
   
3. **Add WWW Subdomain (Optional)**
   - Click **"Add Domain"** lagi
   - Masukkan: `www.aistorytell.me`
   - Click **"Add"**

4. **Get DNS Records**
   
   Vercel akan memberikan DNS records yang perlu dikonfigurasi:
   ```
   For aistorytell.me:
   Type: A
   Name: @
   Value: 76.76.21.21
   
   For www.aistorytell.me:
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### 2.2 Configure DNS di Domain Provider

**Langkah-langkah (contoh untuk Namecheap, GoDaddy, dll):**

1. **Login ke Domain Provider** (tempat Anda beli domain)

2. **Navigate to DNS Settings**
   - Cari menu "DNS Settings", "DNS Management", atau "Advanced DNS"

3. **Add A Record untuk Root Domain**
   ```
   Type: A Record
   Host: @ (atau kosongkan)
   Value: 76.76.21.21
   TTL: Automatic (atau 300)
   ```

4. **Add CNAME Record untuk WWW (Optional)**
   ```
   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic (atau 300)
   ```

5. **Remove Conflicting Records**
   - Hapus A record lama yang pointing ke IP lain
   - Hapus CNAME record lama untuk @ atau www
   - Biarkan records lain (seperti MX, TXT) tetap ada

6. **Save Changes**

### 2.3 Wait for DNS Propagation

- DNS propagation biasanya memakan waktu 5-60 menit
- Maksimal 24-48 jam
- Vercel akan otomatis detect dan issue SSL certificate
- Check status di Vercel Dashboard → Domains tab

**Tips cek DNS:**
```bash
# Check A record
dig aistorytell.me

# Check CNAME
dig www.aistorytell.me

# Or use online tool
https://dnschecker.org
```

### 2.4 SSL Certificate (Automatic!)

Vercel akan otomatis:
- ✅ Generate SSL certificate (Let's Encrypt)
- ✅ Enable HTTPS
- ✅ Redirect HTTP to HTTPS
- ✅ Renew certificate automatically

**No configuration needed!**

---

## 📊 Step 3: Enable Vercel Analytics

### 3.1 Speed Insights (Performance Monitoring)

✅ **Already Configured!** Speed Insights sudah aktif di code Anda.

**Cara melihat data:**

1. **Open Vercel Dashboard**
2. Click project: **aiStory**
3. Click tab **"Speed Insights"**
4. Lihat metrics:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)
   - First Input Delay (FID)
   - Time to First Byte (TTFB)

**Features:**
- ✅ Real User Monitoring (RUM)
- ✅ Core Web Vitals tracking
- ✅ Performance score per page
- ✅ Geographic distribution
- ✅ Device & browser breakdown
- ✅ Automatic alerts

### 3.2 Web Analytics (Visitor Tracking)

✅ **Already Configured!** Web Analytics sudah aktif di code Anda.

**Cara enable di Vercel:**

1. **Open Vercel Dashboard**
2. Click project: **aiStory**
3. Click tab **"Analytics"**
4. Click **"Enable Analytics"** (jika belum aktif)

**Cara melihat data:**

1. Click tab **"Analytics"**
2. Lihat metrics:
   - Page views
   - Unique visitors
   - Top pages
   - Top referrers
   - Geographic data
   - Device types
   - Real-time visitors

**Features:**
- ✅ Privacy-focused (no cookies)
- ✅ GDPR compliant
- ✅ Real-time data
- ✅ Page-level insights
- ✅ Conversion tracking
- ✅ Automatic filtering of bots

---

## 🎨 Step 4: Verify Installation

### 4.1 Check Website

```bash
# Open in browser
https://aistorytell.me
https://www.aistorytell.me
```

**Verify:**
- ✅ Site loads correctly
- ✅ HTTPS is active (green padlock)
- ✅ All pages working
- ✅ Images loading
- ✅ Animations working
- ✅ Mobile responsive

### 4.2 Check Analytics

**Speed Insights:**
1. Open **Speed Insights** tab di Vercel
2. Visit your site: `https://aistorytell.me`
3. Navigate beberapa pages
4. Tunggu 5-10 menit
5. Refresh Speed Insights tab
6. ✅ Data akan mulai muncul!

**Web Analytics:**
1. Open **Analytics** tab di Vercel
2. Visit your site
3. Tunggu 1-2 menit
4. Refresh Analytics tab
5. ✅ Lihat visitor count & page views!

### 4.3 Check in Browser DevTools

```javascript
// Open browser console (F12)
// Speed Insights & Analytics akan otomatis tracking
console.log('Vercel Analytics loaded:', window.va)
```

---

## ⚙️ Configuration Details

### Current Setup

**Code Changes Made:**

1. **Installed Packages:**
   ```json
   "@vercel/analytics": "^1.5.0"
   "@vercel/speed-insights": "^1.2.0"
   ```

2. **app/layout.tsx:**
   ```typescript
   import { Analytics } from "@vercel/analytics/react";
   import { SpeedInsights } from "@vercel/speed-insights/next";
   
   // In body:
   <VercelAnalytics />
   <SpeedInsights />
   ```

3. **.env.example:**
   ```bash
   NEXT_PUBLIC_URL="https://aistorytell.me"
   ```

### Features Enabled

✅ **Speed Insights:**
- Core Web Vitals monitoring
- Real User Monitoring (RUM)
- Performance tracking per page
- Geographic performance data
- Device & browser insights
- Automatic performance scoring

✅ **Web Analytics:**
- Page view tracking
- Unique visitor counting
- Referrer tracking
- Geographic data
- Device detection
- Real-time monitoring
- Privacy-focused (no cookies)

✅ **Automatic Features:**
- SSL/HTTPS (Let's Encrypt)
- CDN (Global edge network)
- Image optimization
- Compression (Brotli, Gzip)
- HTTP/2 & HTTP/3
- Edge caching
- Automatic minification
- Source map upload

---

## 🔄 Step 5: Continuous Deployment

### Auto-Deploy on Git Push

Vercel otomatis deploy setiap kali Anda push ke GitHub:

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to production
# 4. Updates aistorytell.me
```

### Preview Deployments

- Setiap **branch** mendapat preview URL
- Setiap **pull request** mendapat preview URL
- Perfect untuk testing sebelum merge ke main

---

## 📈 Monitoring & Optimization

### Daily Monitoring

**Check these regularly:**

1. **Speed Insights** - Performance scores
2. **Analytics** - Visitor trends
3. **Logs** - Error monitoring
4. **Build Time** - Optimization opportunities

### Performance Goals

**Target Metrics:**
- ✅ Lighthouse Score: 95+
- ✅ First Contentful Paint: < 1.5s
- ✅ Largest Contentful Paint: < 2.5s
- ✅ Cumulative Layout Shift: < 0.1
- ✅ First Input Delay: < 100ms
- ✅ Time to Interactive: < 3.5s

### Optimization Tips

**If performance drops:**

1. **Check Speed Insights** for slow pages
2. **Optimize images** (use WebP, AVIF)
3. **Reduce bundle size** (code splitting)
4. **Enable caching** (already configured)
5. **Use CDN** (automatic with Vercel)
6. **Minimize JavaScript** (tree shaking)

---

## 🎯 Quick Reference

### Important URLs

```bash
# Production Site
https://aistorytell.me

# Vercel Dashboard
https://vercel.com/dashboard

# GitHub Repository
https://github.com/mnhidayatgani/aiStory

# Speed Insights
https://vercel.com/[your-team]/aiStory/speed-insights

# Web Analytics
https://vercel.com/[your-team]/aiStory/analytics
```

### Common Commands

```bash
# Local development
pnpm dev

# Build locally (test before deploy)
pnpm build

# Deploy via CLI
npx vercel --prod

# Check deployment status
vercel ls

# Open project in browser
vercel open
```

### DNS Records Summary

```
Domain: aistorytell.me

A Record:
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic

CNAME Record (optional):
Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

---

## ❓ Troubleshooting

### Domain Not Working

**Issue:** Domain tidak redirect ke site

**Solutions:**
1. Check DNS propagation: `dig aistorytell.me`
2. Wait 5-60 minutes for DNS update
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private window
5. Check Vercel dashboard → Domains tab
6. Verify DNS records di domain provider

### SSL Certificate Error

**Issue:** "Not Secure" warning di browser

**Solutions:**
1. Wait for DNS propagation
2. Vercel auto-generates SSL (takes 5-15 min)
3. Check Domains tab → Should show "Valid Configuration"
4. If stuck, try "Refresh" di Vercel Domains tab

### Analytics Not Showing Data

**Issue:** No data di Speed Insights atau Analytics

**Solutions:**
1. **Wait 5-10 minutes** after first visit
2. Make sure you visited the production URL
3. Open site in different browser/device
4. Check browser console for errors
5. Verify packages installed: `@vercel/analytics` & `@vercel/speed-insights`
6. Check code: `<Analytics />` & `<SpeedInsights />` in layout.tsx

### Build Failed

**Issue:** Deployment gagal build

**Solutions:**
1. Check Vercel build logs
2. Test locally: `pnpm build`
3. Fix TypeScript errors
4. Check dependencies: `pnpm install`
5. Verify Node.js version (18.x recommended)

---

## 🎊 Success Checklist

After deployment, verify:

### Domain & SSL
- [ ] `https://aistorytell.me` loads correctly
- [ ] `https://www.aistorytell.me` redirects properly
- [ ] Green padlock (SSL) shows in browser
- [ ] No security warnings

### Website Functionality
- [ ] Homepage loads with Matrix animation
- [ ] All navigation links work
- [ ] Projects page displays case studies
- [ ] Resume page shows correctly
- [ ] Contact page works
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] Animations work smoothly

### Analytics & Monitoring
- [ ] Speed Insights tab shows data
- [ ] Web Analytics tab shows visitors
- [ ] Core Web Vitals tracked
- [ ] Real-time visitors showing
- [ ] Performance scores visible

### Vercel Features
- [ ] Auto-deployment on git push works
- [ ] Preview deployments for branches
- [ ] Build logs accessible
- [ ] Environment variables set
- [ ] Custom domain configured

---

## 🚀 You're Live!

**Congratulations!** Portfolio Anda sekarang LIVE di:

🌐 **https://aistorytell.me**

**With:**
- ✅ Custom domain
- ✅ SSL/HTTPS
- ✅ Speed Insights
- ✅ Web Analytics
- ✅ Auto-deployment
- ✅ Global CDN
- ✅ Performance monitoring

**Next Steps:**
1. Share your portfolio URL
2. Monitor analytics daily
3. Keep content updated
4. Track performance metrics
5. Optimize based on insights

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

**Good luck with your portfolio!** 🎉

---

**Last Updated:** 2025-10-14  
**Domain:** aistorytell.me  
**Platform:** Vercel  
**Framework:** Next.js 13.5  
**Status:** Production Ready
