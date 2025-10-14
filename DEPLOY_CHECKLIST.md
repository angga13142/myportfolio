# 🚀 Quick Deploy Checklist - aistorytell.me

Checklist cepat untuk deploy portfolio ke Vercel dengan domain aistorytell.me.

---

## ✅ Pre-Deployment (Already Done!)

- [x] Code sudah di-push ke GitHub
- [x] Vercel Analytics installed (`@vercel/analytics`)
- [x] Speed Insights installed (`@vercel/speed-insights`)
- [x] Domain configuration ready (aistorytell.me)
- [x] Environment variables configured
- [x] Build test passed locally
- [x] All features working

---

## 📋 Deployment Steps

### 1. Deploy to Vercel (10 minutes)

```bash
# Option A: Via Vercel Dashboard (Easiest)
1. Go to vercel.com
2. Login dengan GitHub
3. Click "Add New" → "Project"
4. Select repository: mnhidayatgani/aiStory
5. Click "Deploy"
6. Done! ✅

# Option B: Via CLI (Fastest)
npm i -g vercel
vercel --prod
```

**Your temporary URL:** `https://[project-name].vercel.app`

---

### 2. Configure Custom Domain (15 minutes)

**In Vercel Dashboard:**

1. Open Project Settings → Domains
2. Add domain: `aistorytell.me`
3. Add domain: `www.aistorytell.me` (optional)
4. Copy DNS records yang diberikan

**In Domain Provider (Namecheap/GoDaddy/etc):**

```
A Record:
Type: A
Host: @ 
Value: 76.76.21.21

CNAME Record (optional):
Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

5. Save DNS settings
6. Wait 5-60 minutes for propagation
7. Vercel will auto-generate SSL certificate ✅

---

### 3. Set Environment Variable (2 minutes)

**In Vercel Dashboard:**

1. Project Settings → Environment Variables
2. Add variable:
   ```
   Name: NEXT_PUBLIC_URL
   Value: https://aistorytell.me
   ```
3. Click "Save"
4. Redeploy (automatic trigger)

---

### 4. Enable Analytics (Already Enabled!)

**Speed Insights:**
- ✅ Already configured in code
- Automatically enabled on Vercel
- View: Project → Speed Insights tab

**Web Analytics:**
- ✅ Already configured in code
- Click "Enable Analytics" if needed
- View: Project → Analytics tab

---

### 5. Verify Deployment (5 minutes)

**Check these:**

- [ ] Open `https://aistorytell.me`
- [ ] HTTPS works (green padlock)
- [ ] All pages load correctly
- [ ] Matrix animation works
- [ ] Equipment gallery displays
- [ ] Mobile responsive
- [ ] Speed Insights showing data (wait 10 min)
- [ ] Web Analytics tracking visitors (wait 5 min)

---

## 🎯 Quick Commands

```bash
# View deployment status
vercel ls

# Open project in Vercel
vercel open

# Check logs
vercel logs

# Redeploy
git push origin main
```

---

## 📊 Monitoring URLs

```bash
# Your Site
https://aistorytell.me

# Vercel Dashboard
https://vercel.com/dashboard

# Speed Insights
https://vercel.com/[your-team]/aiStory/speed-insights

# Web Analytics
https://vercel.com/[your-team]/aiStory/analytics
```

---

## 🆘 Quick Troubleshooting

**Domain not working?**
- Wait 5-60 minutes for DNS propagation
- Check: `dig aistorytell.me`
- Clear browser cache

**SSL error?**
- Wait 10-15 minutes for Vercel to generate certificate
- Check Domains tab → Should show "Valid"

**Analytics not showing?**
- Wait 5-10 minutes after first visit
- Make sure you visited production URL
- Check browser console for errors

**Build failed?**
- Check Vercel build logs
- Test locally: `pnpm build`
- Check Node.js version (18.x)

---

## ✅ Success Criteria

After deployment:

- [x] Site loads: `https://aistorytell.me`
- [x] SSL certificate active (HTTPS)
- [x] All pages functional
- [x] Speed Insights tracking
- [x] Web Analytics tracking
- [x] Auto-deploy on git push

---

## 📚 Full Documentation

For detailed step-by-step guide, see:
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Complete guide
- **[README.md](./README.md)** - Project overview

---

## 🎉 You're Ready!

**Next Actions:**

1. **Deploy Now!** → [vercel.com](https://vercel.com)
2. **Configure Domain** → Add aistorytell.me
3. **Monitor Performance** → Check Speed Insights
4. **Track Visitors** → View Analytics
5. **Share Portfolio** → LinkedIn, resume, etc.

**Good luck!** 🚀

---

**Estimated Total Time:** 30-60 minutes
**Status:** Ready to Deploy
**Last Updated:** 2025-10-14
