# Analytics Setup Guide

## Google Analytics 4 Setup

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" → "Create Property"
3. Follow setup wizard
4. Get your Measurement ID (format: G-XXXXXXXXXX)

### Step 2: Add to Project
1. Add to `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. The analytics component is already configured in `app/components/analytics.tsx`

### Step 3: Verify
- Deploy your site
- Visit your site
- Check Google Analytics real-time reports

---

## Vercel Analytics Setup

### Step 1: Enable in Vercel Dashboard
1. Go to your project in Vercel
2. Click "Analytics" tab
3. Click "Enable Analytics"

### Step 2: No Code Changes Needed
Vercel Analytics works automatically on Vercel deployments!

### Features:
- ✅ Real-time visitor tracking
- ✅ Page performance metrics
- ✅ Core Web Vitals monitoring
- ✅ Device & browser stats
- ✅ Geographic data

---

## Umami Analytics (Privacy-Friendly Alternative)

Already configured! See `app/components/UmamiAnalytics.tsx`

### Setup:
1. Sign up at [umami.is](https://umami.is)
2. Create a website
3. Get your script URL and website ID
4. Add to `.env.local`:
```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_URL=https://your-umami-instance.com
```

---

## Environment Variables Summary

Create `.env.local` with:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX                          # Google Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id            # Umami (optional)
NEXT_PUBLIC_UMAMI_URL=https://your-umami-instance.com   # Umami (optional)

# API Keys (if using contact form)
RESEND_API_KEY=re_xxxxxxxxxxxxx
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxx

# Site URL
NEXT_PUBLIC_URL=https://your-domain.com
```

---

## Testing Analytics

### Google Analytics
1. Open Google Analytics real-time report
2. Visit your site in incognito mode
3. You should see yourself in real-time view

### Vercel Analytics
1. Open Vercel dashboard → Analytics
2. Visit your site
3. Metrics will appear within minutes

### Umami Analytics
1. Open your Umami dashboard
2. Visit your site
3. Real-time data appears immediately

---

## Privacy Considerations

### GDPR Compliance
All analytics are configured with privacy in mind:
- ✅ No cookies without consent
- ✅ IP anonymization enabled
- ✅ Respects Do Not Track
- ✅ Privacy-first tracking

### Recommendations:
1. Add cookie consent banner (optional)
2. Update privacy policy
3. Mention analytics in terms of service

---

## Performance Impact

All analytics are loaded asynchronously and won't block page rendering:
- Google Analytics: ~45KB gzipped
- Vercel Analytics: ~5KB (minimal)
- Umami Analytics: ~2KB (privacy-focused)

Choose based on your needs!

---

**Current Status:** Analytics components configured, waiting for environment variables.
