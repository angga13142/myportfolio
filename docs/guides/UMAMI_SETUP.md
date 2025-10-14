# 📊 Umami Analytics Setup Guide

**Privacy-focused, open-source analytics**  
**Alternative to Google Analytics**

---

## 🎯 Why Umami?

- ✅ Privacy-focused (no cookies, GDPR compliant)
- ✅ Open source & self-hostable
- ✅ Simple & fast
- ✅ Free tier available
- ✅ No personal data collection

---

## 🚀 Quick Setup (Umami Cloud - Easiest)

### Step 1: Create Account
1. Go to: **https://cloud.umami.is**
2. Click **"Sign up"**
3. Enter email & password
4. Verify email

### Step 2: Add Website
1. Click **"Add website"**
2. Fill form:
   - **Name:** Portfolio Muhammad Nurhidayat Gani
   - **Domain:** mnhidayatgani.vercel.app
   - **Timezone:** Asia/Jakarta
3. Click **"Save"**

### Step 3: Get Tracking Code
1. Click on your website
2. Click **"Edit"** → **"Tracking code"**
3. Copy the **Website ID** (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

---

## 💻 Implementation

Already integrated! Just add environment variable:

### Local (.env.local):
```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-website-id-here"
```

### Vercel:
1. Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_UMAMI_WEBSITE_ID` = your-id
3. Redeploy

---

## 📊 Dashboard

Access at: **https://cloud.umami.is**

Features:
- Real-time visitors
- Page views
- Referrers
- Browsers & OS
- Countries
- Devices

---

**Setup time:** 5 minutes  
**Cost:** FREE (10k events/month)

