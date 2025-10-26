# Rekomendasi Optimasi UI & Performa

## 📊 Analisis Kondisi Saat Ini

### ✅ Hal Yang Sudah Baik

1. **Next.js Image Optimization** - Sudah menggunakan `next/image` dengan benar
2. **Code Splitting** - React.lazy() untuk Particles, AchievementBadges, CompanyLogos
3. **Suspense Boundaries** - Fallback yang tepat untuk lazy-loaded components
4. **Responsive Design** - Mobile-first approach dengan breakpoints yang baik
5. **SEO** - JSON-LD structured data sudah lengkap

### ⚠️ Area Yang Perlu Optimasi

#### 1. Bundle Size (Prioritas Tinggi)

- **Framer Motion**: ~80KB (gzip: ~25KB) - digunakan di banyak komponen
- **AOS Library**: ~12KB - untuk scroll animations
- **Lucide Icons**: Import semua icon membengkakkan bundle

#### 2. Runtime Performance

- **Particles**: Animasi canvas terus-menerus (CPU intensive)
- **Framer Motion**: Banyak animasi kompleks di mobile
- **Image Gallery**: Load semua gambar sekaligus

#### 3. Initial Load Time

- Beberapa komponen bisa di-defer lebih agresif
- Font loading bisa dioptimasi

---

## 🚀 Rekomendasi Optimasi (Prioritas)

### PRIORITAS 1: Kurangi Bundle Size Framer Motion

**Problem**: Framer Motion digunakan di banyak komponen tapi hanya untuk animasi sederhana.

**Solusi**: Ganti dengan CSS animations untuk kasus sederhana, pertahankan Framer Motion hanya untuk animasi kompleks.

#### Komponen yang Bisa Diganti:

1. **Card.tsx** - Ganti dengan CSS hover transitions
2. **SkillBar.tsx** - Pakai CSS animations
3. **Timeline.tsx** - Pakai AOS (sudah terinstall)
4. **ContactForm.tsx** - CSS transitions cukup

**Estimasi Pengurangan**: ~60KB dari bundle

#### Implementasi:

```tsx
// SEBELUM (Framer Motion)
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// SESUDAH (CSS + AOS)
<div
  data-aos="fade-up"
  data-aos-duration="500"
  className="animate-fade-in"
>
```

**Komponen yang TETAP pakai Framer Motion**:

- ImageGallery (AnimatePresence untuk modal kompleks)
- Komponen dengan gesture/drag interactions (jika ada)

---

### PRIORITAS 2: Optimasi Particles Component

**Problem**: Animasi canvas berjalan terus-menerus, konsumsi CPU tinggi di mobile.

**Solusi**:

1. Kurangi quantity particles di mobile
2. Pause animasi saat tab tidak aktif
3. Disable di low-end devices
4. Gunakan CSS fallback untuk mobile

#### Implementasi:

```tsx
// particles.tsx - Tambahkan optimasi
const Particles = ({
  quantity = 30, // Desktop
  // ... props lain
}) => {
  // Deteksi mobile & reduce particles
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const actualQuantity = isMobile ? Math.min(quantity, 15) : quantity;

  // Pause saat tab tidak aktif
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animation
        setIsAnimating(false);
      } else {
        setIsAnimating(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Disable di low-end devices
  const isLowEnd = navigator.hardwareConcurrency < 4;
  if (isLowEnd) return null;
};
```

**Estimasi Peningkatan**: 40-60% lebih rendah CPU usage di mobile

---

### PRIORITAS 3: Optimasi Image Loading

**Problem**: ImageGallery load semua gambar sekaligus, memperlambat initial load.

**Solusi**: Lazy load images dengan Intersection Observer.

#### Implementasi:

```tsx
// ImageGallery.tsx
import Image from "next/image";

// Tambahkan loading="lazy" untuk images di grid
<Image
  src={image.src}
  alt={image.alt}
  fill
  loading="lazy" // ← Tambahkan ini
  className="object-cover transition-transform duration-300 hover:scale-110"
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>

// Untuk lightbox, keep priority untuk UX
<Image
  src={images[selectedIndex].src}
  alt={images[selectedIndex].alt}
  fill
  priority // Tetap priority untuk image yang sedang dilihat
  sizes="90vw"
/>
```

**Estimasi Peningkatan**: 30-50% lebih cepat initial load untuk halaman dengan banyak gambar

---

### PRIORITAS 4: Icon Import Optimization

**Problem**: Import individual icons dari Lucide tapi mungkin masih bundle semua.

**Solusi**: Pastikan tree-shaking bekerja dengan baik.

#### Implementasi:

```tsx
// SEBELUM
import { Shield, Zap, TrendingUp, Award, Users, Target } from "lucide-react";

// TETAP SAMA, tapi pastikan next.config.mjs optimized:
// next.config.mjs
const nextConfig = {
  // ... config lain
  experimental: {
    optimizePackageImports: ["lucide-react"], // Tambahkan ini
  },
};
```

**Estimasi Pengurangan**: ~5-10KB

---

### PRIORITAS 5: Font Loading Optimization

**Problem**: Font blocking render.

**Solusi**: Optimize font loading strategy.

#### Implementasi:

```tsx
// layout.tsx
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Kurangi variants yang tidak terpakai
  variable: "--font-poppins",
  display: "swap", // ✅ Sudah ada
  preload: true, // ← Tambahkan
  fallback: ["system-ui", "arial"], // ← Tambahkan
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
  display: "swap", // ← Tambahkan
  preload: true, // ← Tambahkan
});
```

---

## 🎨 Optimasi UI/UX Spesifik

### 1. Skeleton Loading States

**Tambahkan skeleton screens** untuk better perceived performance:

```tsx
// Buat component: LoadingSkeleton.tsx
export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-zinc-800 rounded-lg" />
      <div className="mt-4 h-4 bg-zinc-800 rounded w-3/4" />
      <div className="mt-2 h-4 bg-zinc-800 rounded w-1/2" />
    </div>
  );
}

// Gunakan di Suspense fallback
<Suspense fallback={<ProjectCardSkeleton />}>
  <ProjectsList />
</Suspense>;
```

### 2. Reduce Animation Complexity di Mobile

```tsx
// Tambahkan hook: useReducedMotion.ts
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

// Gunakan di komponen
const reducedMotion = useReducedMotion();
const duration = reducedMotion ? 0 : 500;
```

### 3. Optimasi AOS Settings

```tsx
// AOSInit.tsx - Tuning untuk performa lebih baik
AOS.init({
  duration: 600, // Lebih cepat dari 800
  once: true, // ✅ Sudah ada
  easing: "ease-out", // Lebih ringan dari 'ease-out-cubic'
  offset: 100, // Trigger lebih awal
  delay: 0,
  disable: window.innerWidth < 768 ? true : false, // Disable di mobile
});
```

---

## 📦 Optimasi Build & Bundle

### 1. Next.js Config Enhancements

```javascript
// next.config.mjs
const nextConfig = {
  // ... existing config

  // Tambahkan optimasi
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.log
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "@upstash/redis"],
  },

  // Optimasi images lebih agresif
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Kurangi sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Kurangi sizes
    minimumCacheTTL: 86400, // 24 jam (dari 60 detik)
  },
};
```

### 2. Dynamic Imports Agresif

```tsx
// page.tsx - Defer non-critical components
const AchievementBadges = dynamic(
  () =>
    import("./components/AchievementBadges").then((m) => m.AchievementBadges),
  {
    ssr: false, // Tidak perlu SSR untuk ini
    loading: () => <div className="h-48" />,
  }
);

const CompanyLogos = dynamic(
  () => import("./components/CompanyLogos").then((m) => m.CompanyLogos),
  {
    ssr: false,
    loading: () => <div className="h-48" />,
  }
);
```

---

## 🔧 Quick Wins (Implementasi Cepat)

### 1. Tambahkan Resource Hints

```tsx
// layout.tsx - dalam <head>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://analytics.vercel.com" />
```

### 2. Optimize Redis Calls

```tsx
// projects/page.tsx
export const revalidate = 3600; // Dari 60 → 1 jam
// Kurangi frequency revalidation jika view count tidak kritis
```

### 3. Add Loading States

```tsx
// projects/page.tsx - Tambahkan loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse h-64 bg-zinc-800 rounded-lg" />
      ))}
    </div>
  );
}
```

---

## 📈 Estimasi Peningkatan Performa

| Optimasi                       | Impact                        | Effort | Priority |
| ------------------------------ | ----------------------------- | ------ | -------- |
| Ganti Framer Motion dengan CSS | **-60KB bundle, +20% faster** | Medium | ⭐⭐⭐   |
| Optimasi Particles             | **-40% CPU usage**            | Low    | ⭐⭐⭐   |
| Lazy load images               | **-30% initial load**         | Low    | ⭐⭐⭐   |
| Font optimization              | **-200ms FCP**                | Low    | ⭐⭐     |
| Icon tree-shaking              | **-10KB bundle**              | Low    | ⭐⭐     |
| Skeleton loading               | **Better UX**                 | Low    | ⭐⭐     |

### Target Metrics (Lighthouse)

**Sebelum Optimasi** (Estimasi):

- Performance: ~75-80
- FCP: ~2.5s
- LCP: ~4s
- Bundle: ~200KB

**Setelah Optimasi** (Target):

- Performance: **90+** ✨
- FCP: **<1.5s** ⚡
- LCP: **<2.5s** ⚡
- Bundle: **~130KB** 📦

---

## 🛠️ Implementation Plan

### Week 1: High Priority

1. ✅ Optimasi Particles (disable di mobile/low-end)
2. ✅ Lazy load images
3. ✅ Font optimization
4. ✅ Add resource hints

### Week 2: Medium Priority

5. ⚙️ Ganti Framer Motion di komponen sederhana
6. ⚙️ Implement skeleton loading
7. ⚙️ Optimize AOS settings

### Week 3: Polish

8. 🎨 Add useReducedMotion hook
9. 🎨 Mobile animation tuning
10. 📊 Performance monitoring & testing

---

## 🧪 Testing Checklist

- [ ] Test di Chrome DevTools (Performance tab)
- [ ] Test di mobile device (real device, bukan emulator)
- [ ] Check Lighthouse scores
- [ ] Test dengan slow 3G connection
- [ ] Check bundle size dengan `pnpm build`
- [ ] Visual regression testing
- [ ] Accessibility testing (axe DevTools)

---

## 📚 Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Framer Motion Performance](https://www.framer.com/motion/guide-reduce-bundle-size/)

---

**Catatan**: Implementasi bertahap lebih aman daripada mengubah semua sekaligus. Test setiap perubahan untuk memastikan tidak ada regression.
