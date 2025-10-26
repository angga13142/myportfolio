# 📹 Video Integration Guide

Panduan lengkap untuk menambahkan video asli ke website portfolio Anda.

## 🎬 Video Yang Diperlukan

### 1. **Operations Video Showcase** (Homepage)

Lokasi: Homepage - Section "Operations in Action"

**4 Video Diperlukan:**

1. **Excavator Operations Excellence** (3-5 menit)

   - Konten: Operasi excavator profesional, teknik penggalian presisi
   - Scene: Di lokasi tambang nikel
   - Focus: Precision digging, material handling
   - Tips: Tunjukkan berbagai angle, close-up controls, wide shot operations

2. **P2H Safety Check Demonstration** (5-7 menit)

   - Konten: Prosedur P2H lengkap sesuai K3
   - Scene: Pre-operation check step by step
   - Focus: Safety inspection, checklist documentation
   - Tips: Voice-over menjelaskan setiap langkah safety check

3. **High-Efficiency Material Loading** (4-6 menit)

   - Konten: Teknik loading material yang efisien
   - Scene: Operasi harian mencapai 800+ BCM
   - Focus: Optimasi fuel efficiency, cycle time
   - Tips: Tambahkan text overlay dengan metrics (BCM, fuel consumption)

4. **Junior Operator Training** (6-8 menit)
   - Konten: Sesi pelatihan operator baru
   - Scene: Hands-on training di lapangan
   - Focus: Basic controls, safety procedures
   - Tips: Dokumentasi dari POV trainer dan trainee

---

### 2. **Video Testimonials** (Resume Page)

Lokasi: Resume Page - Section "Video Testimonials"

**3 Video Diperlukan:**

1. **Supervisor Testimonial** (1-2 menit)

   - From: Site Supervisor / Operations Manager
   - Content: Professional work quality, safety record
   - Format: Interview style, profesional setting
   - Tips: Good lighting, clear audio

2. **Manager Testimonial** (1-2 menit)

   - From: Operations Manager / Project Manager
   - Content: Technical skills, problem-solving ability
   - Format: Office atau site background
   - Tips: Mention specific achievements

3. **Peer/Team Testimonial** (1-2 menit)
   - From: Maintenance Coordinator / Fellow Operator
   - Content: Teamwork, equipment maintenance quality
   - Format: Casual but professional
   - Tips: Authentic feedback from colleagues

---

## 🔧 Cara Upload Video

### Option 1: YouTube (Recommended - Free & Easy)

**Keuntungan:**

- ✅ Gratis unlimited storage
- ✅ Automatic optimization untuk semua device
- ✅ Fast loading dengan CDN global
- ✅ Automatic transcoding ke berbagai kualitas
- ✅ Built-in analytics

**Langkah-langkah:**

1. **Upload ke YouTube:**

   ```
   1. Login ke YouTube Studio (studio.youtube.com)
   2. Click "Create" → "Upload videos"
   3. Pilih video file
   4. Isi title, description
   5. Set visibility: "Unlisted" (agar hanya bisa diakses via link)
   6. Click "Publish"
   ```

2. **Dapatkan Video ID:**

   ```
   URL YouTube: https://www.youtube.com/watch?v=dQw4w9WgXcQ
   Video ID: dQw4w9WgXcQ (part setelah "v=")
   ```

3. **Update di Code:**

   Edit file: `app/components/OperationsVideoShowcase.tsx`

   ```typescript
   const sampleVideos: VideoItem[] = [
     {
       id: "excavator-operations",
       title: "Excavator Operations Excellence",
       youtubeId: "PASTE_YOUR_YOUTUBE_ID_HERE", // ← Replace ini
       category: "operations",
       duration: "3:45",
     },
     // ... untuk video lainnya
   ];
   ```

### Option 2: Vimeo (Alternative - Better Privacy)

**Keuntungan:**

- ✅ Lebih professional appearance
- ✅ Better privacy controls
- ✅ No ads
- ⚠️ Free plan: 500MB/week limit

**Langkah-langkah:**

1. Upload ke Vimeo
2. Set privacy ke "Hide from Vimeo"
3. Dapatkan video ID dari URL
4. Update code dengan Vimeo embed URL

### Option 3: Self-Hosted (Advanced)

**Hanya untuk video < 50MB:**

1. Letakkan video di folder `public/videos/`
2. Compress dengan Handbrake (target: H.264, 720p)
3. Update VideoTestimonials component dengan local paths

---

## 📝 Template Deskripsi YouTube

```
🚜 [Judul Video]

Video ini menampilkan [deskripsi singkat operasi/training/safety procedure].

📍 Lokasi: [Nama Site/Project]
📅 Tanggal: [Bulan Tahun]
⚙️ Equipment: [Merk & Model Excavator]

🎯 Highlights:
- [Point 1]
- [Point 2]
- [Point 3]

📧 Contact: [Email]
🌐 Portfolio: https://aistorytell.me

#HeavyEquipment #ExcavatorOperator #SafetyFirst #K3 #Mining #ProfessionalOperator
```

---

## 🎨 Tips Video Production

### Recording Tips:

1. **Lighting:** Rekam saat kondisi cahaya bagus (pagi/sore)
2. **Stabilization:** Gunakan tripod atau gimbal
3. **Audio:** Jika ada voice-over, gunakan mic eksternal
4. **Duration:** Keep it concise (1-5 menit ideal)
5. **Multiple Angles:** Rekam dari berbagai sudut

### Editing Tips:

1. **Opening:** 3-5 detik intro dengan nama & title
2. **B-Roll:** Insert close-up shots untuk visual interest
3. **Text Overlay:** Tambahkan metrics & achievements
4. **Transitions:** Simple cuts lebih professional
5. **Ending:** Call-to-action atau contact info

### Free Editing Tools:

- **DaVinci Resolve** (PC/Mac) - Professional grade, gratis
- **CapCut** (Mobile/PC) - User-friendly, quick editing
- **iMovie** (Mac/iOS) - Simple & clean
- **Shotcut** (PC/Mac/Linux) - Open source

---

## 🚀 Quick Start Checklist

- [ ] Pilih 4 video untuk Operations Showcase
- [ ] Record atau pilih 3 testimonial videos
- [ ] Upload semua video ke YouTube (set "Unlisted")
- [ ] Copy Video IDs dari setiap video
- [ ] Update `OperationsVideoShowcase.tsx` dengan Video IDs
- [ ] Test di localhost:3000
- [ ] Deploy ke production
- [ ] Verify videos load correctly

---

## 🔗 Video yang Sudah Ada di Website

### Current Implementation:

1. **Homepage - Operations Video Showcase**

   - File: `app/components/OperationsVideoShowcase.tsx`
   - Status: ✅ Component ready, menggunakan placeholder IDs
   - Action: Replace YouTube IDs dengan video asli

2. **Resume Page - Video Testimonials**
   - File: `app/components/VideoTestimonials.tsx`
   - Status: ✅ Component ready, menggunakan local video paths
   - Action: Upload video ke YouTube atau letakkan di `public/testimonials/`

---

## 📞 Need Help?

Jika ada pertanyaan atau butuh bantuan:

1. Check dokumentasi YouTube: https://support.google.com/youtube
2. Video compression: https://handbrake.fr/
3. Free stock footage (jika diperlukan): https://www.pexels.com/videos/

---

**Last Updated:** October 26, 2025
**Component Files:**

- `app/components/OperationsVideoShowcase.tsx`
- `app/components/VideoTestimonials.tsx`
