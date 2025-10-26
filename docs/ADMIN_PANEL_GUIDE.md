# 🔧 Admin Panel Documentation

## 📋 Overview

Admin Panel adalah Content Management System (CMS) sederhana yang terintegrasi langsung di website untuk mengelola konten foto dan video **tanpa perlu edit source code**.

**Features:**

- ✅ Secure password authentication
- ✅ Upload foto ke gallery
- ✅ Manage operations videos (YouTube)
- ✅ Manage video testimonials
- ✅ Edit metadata (title, description, category, dll)
- ✅ Real-time preview
- ✅ Drag-and-drop upload
- ✅ Auto-save ke JSON file

---

## 🚀 Quick Start

### 1. Setup Password

Edit file `.env.local` (atau `.env`):

```bash
ADMIN_PASSWORD="your_secure_password_here"
```

⚠️ **PENTING:** Ganti password default di production!

### 2. Access Admin Panel

Buka browser dan pergi ke:

```
https://aistorytell.me/admin/login
```

Atau lokal:

```
http://localhost:3000/admin/login
```

### 3. Login

Masukkan password yang Anda set di `.env.local`

---

## 📂 File Structure

```
aiStory/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx           # Login page
│   │   ├── videos/
│   │   │   └── page.tsx           # Video management
│   │   ├── photos/
│   │   │   └── page.tsx           # Photo management
│   │   └── page.tsx               # Admin dashboard
│   ├── api/
│   │   └── admin/
│   │       ├── auth/
│   │       │   └── route.ts       # Authentication API
│   │       ├── content/
│   │       │   └── route.ts       # Content CRUD API
│   │       └── upload/
│   │           └── route.ts       # File upload API
│   └── lib/
│       └── content-types.ts       # TypeScript types
├── data/
│   └── content.json               # Content storage (auto-generated)
└── public/
    ├── gallery/                   # Uploaded photos
    └── testimonials/              # Uploaded videos
```

---

## 🎬 Video Management

### Operations Videos (YouTube)

1. **Add New Video:**

   - Click "Manage Videos" di dashboard
   - Tab "Operations Videos"
   - Click "➕ Add Video"
   - Fill form:
     - **Title:** Judul video
     - **YouTube ID:** ID dari URL (contoh: `dQw4w9WgXcQ`)
     - **Category:** operations, safety, training, achievement
     - **Duration:** Format `MM:SS` (contoh: `3:45`)
     - **Description:** Deskripsi singkat (optional)

2. **Edit Video:**

   - Edit langsung di form yang muncul
   - Changes auto-applied saat input

3. **Delete Video:**

   - Click "🗑️ Delete" di card video
   - Confirm deletion

4. **Save:**
   - Click "💾 Save Changes" di header
   - Data tersimpan ke `data/content.json`

**How to get YouTube ID:**

```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                      ^^^^^^^^^^^
                                      This is the ID
```

### Video Testimonials

1. **Upload Video File First:**

   - Manually upload file ke folder `/public/testimonials/`
   - Nama file: `supervisor.mp4`, `manager.mp4`, dll

2. **Add Testimonial:**

   - Tab "Video Testimonials"
   - Click "➕ Add Testimonial"
   - Fill form:
     - **Name:** Nama orang
     - **Role:** Jabatan
     - **Company:** Nama perusahaan
     - **Video URL:** `/testimonials/filename.mp4`
     - **Rating:** 1-5 stars
     - **Date:** Tanggal testimonial
     - **Text:** Quote/testimonial text

3. **Save Changes:** Same as operations videos

---

## 📸 Photo Management

### Upload New Photo

1. **Click "Manage Photos"** di dashboard

2. **Select Image:**

   - Click "Choose File" atau drag-and-drop
   - Supported: JPG, PNG, WebP
   - Max recommended: 10MB

3. **Preview:**

   - Image preview muncul sebelum upload
   - Check file size

4. **Upload:**
   - Click "⬆️ Upload Photo"
   - Wait for confirmation
   - Photo otomatis ditambahkan ke gallery

### Edit Photo Metadata

Setelah upload, edit metadata di card photo:

- **Alt Text:** Deskripsi untuk SEO & accessibility
- **Category:** operations, safety, equipment, team, dll
- **Caption:** Caption yang muncul di gallery (optional)
- **Order:** Urutan tampilan (auto-generated)

### Delete Photo

- Click "🗑️ Delete" di card photo
- Confirm deletion
- ⚠️ **Note:** File fisik di `/public/gallery/` tidak dihapus otomatis

### Save Gallery

- Click "💾 Save Gallery" di header
- Metadata tersimpan ke `data/content.json`

---

## 🔐 Security

### Authentication

Admin panel menggunakan **simple password authentication** dengan session:

- Password: Set di environment variable `ADMIN_PASSWORD`
- Session: 24 jam (auto-logout setelah 24 jam)
- Storage: In-memory session (reset saat server restart)

### Session Management

```typescript
// Session stored in localStorage (client)
localStorage.setItem("adminSession", token);

// Also set as HttpOnly cookie (more secure)
Set-Cookie: adminToken=xxx; HttpOnly; SameSite=Strict
```

### Logout

- Click "Logout" di header
- Session cleared dari localStorage
- Redirect ke login page

---

## 💾 Data Storage

### Content JSON Structure

File: `data/content.json`

```json
{
  "operationsVideos": [
    {
      "id": "video-123456789",
      "title": "Excavator Operations Excellence",
      "youtubeId": "dQw4w9WgXcQ",
      "category": "operations",
      "duration": "3:45",
      "description": "Demonstrasi operasi excavator profesional"
    }
  ],
  "testimonials": [
    {
      "id": "testimonial-123456789",
      "name": "Ahmad Syahrul",
      "role": "Site Supervisor",
      "company": "PT Mining Excellence",
      "videoUrl": "/testimonials/supervisor.mp4",
      "rating": 5,
      "date": "2024-12-15",
      "text": "Operator yang sangat profesional"
    }
  ],
  "gallery": [
    {
      "id": "image-123456789",
      "url": "/gallery/1234567890-excavator.jpg",
      "alt": "Excavator operations",
      "category": "operations",
      "caption": "Daily operations at mining site",
      "order": 1
    }
  ],
  "lastUpdated": "2025-01-15T10:30:00.000Z"
}
```

### File Upload Storage

Photos uploaded disimpan di:

```
/public/gallery/
  ├── 1234567890-excavator-1.jpg
  ├── 1234567891-safety-check.jpg
  └── ...
```

Filename pattern: `{timestamp}-{original-filename}`

---

## 🔄 Update Components to Use Dynamic Data

### Before (Static):

```tsx
const videos = [{ id: "1", title: "Video 1", youtubeId: "abc123" }];
```

### After (Dynamic):

```tsx
import contentData from "@/data/content.json";

export default function OperationsVideoShowcase() {
  const videos = contentData.operationsVideos;
  // ... render
}
```

### Components to Update:

1. **OperationsVideoShowcase.tsx**

   ```tsx
   import contentData from "@/data/content.json";
   const sampleVideos = contentData.operationsVideos;
   ```

2. **VideoTestimonials.tsx**

   ```tsx
   import contentData from "@/data/content.json";
   const testimonials = contentData.testimonials;
   ```

3. **ImageGallery.tsx** (if exists)
   ```tsx
   import contentData from "@/data/content.json";
   const images = contentData.gallery;
   ```

---

## 🚀 Deployment

### Development

```bash
# Set password
echo 'ADMIN_PASSWORD="your_password"' >> .env.local

# Run dev server
pnpm dev

# Access admin
http://localhost:3000/admin/login
```

### Production (Vercel)

1. **Set Environment Variable:**

   ```
   Vercel Dashboard → Settings → Environment Variables
   Add: ADMIN_PASSWORD = your_secure_password
   ```

2. **Deploy:**

   ```bash
   git add .
   git commit -m "feat: Add admin panel"
   git push
   ```

3. **Access:**
   ```
   https://aistorytell.me/admin/login
   ```

---

## 🛠️ Advanced Configuration

### Increase Upload Size Limit

Edit `next.config.mjs`:

```javascript
export default {
  // ... existing config
  api: {
    bodyParser: {
      sizeLimit: "50mb", // Increase from default 1mb
    },
  },
};
```

### Use Cloud Storage (Optional)

Replace local file storage dengan:

#### Vercel Blob Storage

```bash
pnpm add @vercel/blob
```

```typescript
// app/api/admin/upload/route.ts
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  const file = request.formData().get("file");
  const blob = await put(file.name, file, {
    access: "public",
  });
  return Response.json({ url: blob.url });
}
```

#### Cloudinary

```bash
pnpm add cloudinary
```

---

## 📊 Database Alternative (Advanced)

Untuk website dengan traffic tinggi, ganti JSON dengan database:

### Option 1: Vercel KV (Redis)

```bash
pnpm add @vercel/kv
```

```typescript
import { kv } from "@vercel/kv";

// Save
await kv.set("content", JSON.stringify(contentData));

// Load
const content = await kv.get("content");
```

### Option 2: Supabase (PostgreSQL)

```bash
pnpm add @supabase/supabase-js
```

Create table:

```sql
CREATE TABLE videos (
  id TEXT PRIMARY KEY,
  title TEXT,
  youtube_id TEXT,
  category TEXT,
  duration TEXT,
  description TEXT
);
```

---

## 🔒 Security Best Practices

### 1. Change Default Password

```bash
# NEVER use default password in production!
ADMIN_PASSWORD="use_strong_password_here_min_12_chars"
```

### 2. Use HTTPS

Vercel auto-provides HTTPS, jangan access admin via HTTP

### 3. Rate Limiting (Optional)

Add to `app/api/admin/auth/route.ts`:

```typescript
const loginAttempts = new Map();

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for");
  const attempts = loginAttempts.get(ip) || 0;

  if (attempts > 5) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  // ... rest of auth logic
}
```

### 4. Session Timeout

Current: 24 hours  
Untuk lebih secure, kurangi jadi 1-2 jam

---

## 🐛 Troubleshooting

### Login Failed

**Problem:** Password correct tapi tidak bisa login  
**Solution:**

1. Check `.env.local` file exists
2. Restart dev server: `pnpm dev`
3. Clear browser cache & localStorage

### Upload Failed

**Problem:** Photo tidak ter-upload  
**Solution:**

1. Check file size (max ~10MB recommended)
2. Check file format (JPG, PNG, WebP)
3. Check folder permissions: `/public/gallery/` writable

### Changes Not Saving

**Problem:** Click save tapi data tidak tersimpan  
**Solution:**

1. Check `data/content.json` file writable
2. Check console for errors
3. Hard refresh browser: `Ctrl+Shift+R`

### Photos Not Showing

**Problem:** Upload success tapi foto tidak muncul di website  
**Solution:**

1. Update component to read from JSON:
   ```tsx
   import contentData from "@/data/content.json";
   ```
2. Rebuild: `pnpm build`
3. Clear Next.js cache: `rm -rf .next`

---

## 📝 Todo List (Future Enhancements)

- [ ] NextAuth.js integration (multi-user support)
- [ ] Direct video upload (tidak perlu YouTube)
- [ ] Image optimization on upload
- [ ] Drag-and-drop reordering
- [ ] Bulk operations (delete multiple)
- [ ] Content versioning/history
- [ ] Preview changes before save
- [ ] Mobile-optimized admin UI
- [ ] Activity logs
- [ ] User roles (admin, editor, viewer)

---

## 💡 Tips & Tricks

### Quick Access

Bookmark admin login:

```
https://aistorytell.me/admin/login
```

### Keyboard Shortcuts

- `Ctrl+S`: Save changes (when focused on input)
- `Esc`: Close modals
- `Tab`: Navigate between fields

### Best Practices

1. **Always save changes** before leaving page
2. **Use descriptive alt text** for SEO
3. **Optimize images** before upload (TinyPNG, Squoosh)
4. **Use consistent naming** for categories
5. **Test videos** on YouTube before adding ID

---

## 📞 Support

Jika ada pertanyaan atau issues:

1. Check error di browser console (F12)
2. Check server logs di Vercel dashboard
3. Review documentation di atas
4. Test di local development first

---

**Status:** ✅ PRODUCTION READY

Admin panel siap digunakan untuk mengelola konten website secara mudah tanpa perlu edit kode!
