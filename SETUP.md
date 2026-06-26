# Soko Transit v2 — Setup Guide

## Requirements
- Node.js 18+
- npm 9+

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173/splash
```

## Assets Required
The following files must be present before running:

| File | Location | Description |
|------|----------|-------------|
| `soko-logo.jpeg` | `src/assets/` | The circular Soko Transit badge logo |
| `loading.mp4` | `public/` | The splash screen loading video |

Both are included in this zip.

## Build for Production

```bash
npm run build
# Output: dist/
```

## PWA Icons
Place your icons at:
- `public/icons/icon-192.png` (192×192)
- `public/icons/icon-512.png` (512×512)

You can generate them from the logo using any online PWA icon generator.

## Features in v2
- ✅ Video splash screen (10s, auto-redirects)
- ✅ OTP auth with email/phone validation  
- ✅ Dark / Light mode toggle (persists)
- ✅ Notification bell with red dot + Notifications page
- ✅ Floating AI chat assistant
- ✅ QR Pass with 1-hour countdown timer
- ✅ Buy pass flow: Routes → select plan → wallet deduct
- ✅ Wallet top-up: M-Pesa, Stripe, PayPal (multi-step)
- ✅ Profile: PFP upload, editable fields, verification badges
- ✅ Support tabs (Developer / Company Manager)
- ✅ Operator modal → conductor.sokotransit.com
- ✅ Toast notification system
- ✅ Membership duration tracker
- ✅ Cloudflare deployment guide
- ✅ Full PWA (offline caching of video + assets)
