# ⚡ Admin Panel - Quick Start Guide

## 🚀 Akses dalam 3 Langkah

### 1️⃣ Set Password (Sekali Saja)

Buat file `.env.local` di root project:

```bash
ADMIN_PASSWORD="password_rahasia_anda"
```

### 2️⃣ Jalankan Development Server

```bash
pnpm dev
```

### 3️⃣ Login ke Admin Panel

Buka browser:

```
http://localhost:3000/admin/login
```

Masukkan password yang tadi dibuat → Done! 🎉

---

## 🎯 Apa yang Bisa Dilakukan?

### 📹 Manage Videos

**URL:** `/admin/videos`

**Operations Videos:**

- Tambah video baru dengan YouTube ID
- Edit judul, kategori, durasi
- Hapus video yang tidak relevan

**Contoh YouTube ID:**

```
URL: https://youtube.com/watch?v=dQw4w9WgXcQ
                                  ^^^^^^^^^^^
                                  Ini ID-nya
```

**Video Testimonials:**

- Upload file video ke `/public/testimonials/`
- Tambah testimonial dengan nama, role, company
- Set rating & tanggal

### 📸 Manage Photos

**URL:** `/admin/photos`

- Drag & drop foto
- Preview sebelum upload
- Edit alt text & caption
- Organize by category
- Delete foto yang tidak dipakai

---

## 💾 Save Changes

**PENTING:** Jangan lupa klik tombol **"💾 Save Changes"** setelah edit!

Data disimpan di file `data/content.json`

---

## 🔒 Security Tips

1. **Ganti password default** sebelum production
2. **Jangan commit `.env.local`** ke git
3. **Gunakan HTTPS** di production (Vercel auto-enable)

---

## 🆘 Troubleshooting

### Password salah terus?

```bash
# Cek file .env.local ada dan benar
cat .env.local

# Restart server
pnpm dev
```

### Upload gagal?

- Cek ukuran file (max ~10MB recommended)
- Cek format: JPG, PNG, WebP
- Refresh browser: Ctrl+Shift+R

### Changes tidak tersimpan?

- Klik "💾 Save Changes" di header
- Check console browser (F12) untuk error
- Hard refresh: Ctrl+Shift+R

---

## 📱 Mobile Access

Admin panel responsive! Bisa diakses dari HP/tablet.

**Recommended:** Desktop/laptop untuk experience terbaik

---

## 🎓 Full Documentation

Untuk panduan lengkap, baca:

- **`docs/ADMIN_PANEL_GUIDE.md`** - Complete user guide
- **`docs/summaries/ADMIN_PANEL_IMPLEMENTATION.md`** - Technical details

---

## ✅ Ready!

Sekarang Anda bisa update konten website kapan saja tanpa coding! 🚀

**Happy managing!** 🎊
