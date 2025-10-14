# ⚡ Liquid Glass - Quick Reference

## 🎯 5-Second Guide

```tsx
// Use these classes anywhere!
<div className="glass">Basic Glass</div>
<div className="glass-strong">Strong Glass</div>
<div className="glass glass-hover">Interactive Glass</div>
<div className="glass-light">Light Glass</div>
<div className="glass-dark">Dark Glass</div>
```

## 📖 Class Reference

| Class | Blur | Opacity | Use For |
|-------|------|---------|---------|
| `.glass` | 10px | 5% | General cards |
| `.glass-strong` | 20px | 10% | Nav/Headers |
| `.glass-hover` | 25px | 15% | Interactive |
| `.glass-light` | 8px | 3% | Subtle effects |
| `.glass-dark` | 15px | 30% | Light backgrounds |

## 🎨 Common Patterns

### Glass Card
```tsx
<div className="glass rounded-xl p-6">
  <h3 className="text-zinc-100">Title</h3>
  <p className="text-zinc-400">Content</p>
</div>
```

### Interactive Button
```tsx
<button className="glass glass-hover rounded-lg px-6 py-3">
  Click Me
</button>
```

### Glass Navigation
```tsx
<nav className="glass-strong sticky top-0">
  {/* nav items */}
</nav>
```

### Light Glass Badge
```tsx
<span className="glass-light rounded-full px-3 py-1 text-sm">
  Badge
</span>
```

## 🔧 Customization

### Change Blur
```css
backdrop-filter: blur(15px); /* default: 10px */
```

### Change Transparency
```css
background: rgba(255, 255, 255, 0.08); /* default: 0.05 */
```

### Change Border
```css
border: 1px solid rgba(255, 255, 255, 0.15); /* default: 0.1 */
```

## ⚠️ Tips

✅ **Do:**
- Use sparingly for impact
- Test contrast ratios
- Combine with rounded corners
- Add shadows for depth

❌ **Don't:**
- Nest too many glass layers
- Use on all elements
- Forget mobile testing

## 🚀 Components Already Using Glass

- ✅ Card (project cards)
- ✅ Navigation (header bar)
- ✅ Achievement Badges
- ✅ Company Logos
- ✅ Contact Form
- ✅ Homepage Navigation

## 📱 Browser Support

✅ Chrome 76+ • Firefox 103+ • Safari 9+ • Edge 79+

## 🎯 Performance

- Pure CSS (0 bytes JS)
- GPU accelerated
- Mobile optimized

## 📚 Full Documentation

- `LIQUID_GLASS_IMPLEMENTATION.md` - Technical guide
- `LIQUID_GLASS_COMPLETE.md` - Full summary
- `LIQUID_GLASS_DEMO.md` - Visual demos
- `IMPLEMENTATION_SUMMARY.txt` - Quick overview

---

**Need help?** Check the full documentation files! 🚀
