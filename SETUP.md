# Soko Transit PWA — Developer Setup Guide

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | ≥ 18.0 | Use [nvm](https://github.com/nvm-sh/nvm) to manage versions |
| npm | ≥ 9.0 | Comes with Node |
| Git | any | For version control |

---

## 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-org/soko-transit.git
cd soko-transit

# Install dependencies
npm install
```

---

## 2. Environment Variables

Create a `.env` file in the project root:

```env
# API base URL (your backend)
VITE_API_URL=http://localhost:4000

# Supabase (if using Supabase auth)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Firebase (if using Firebase auth)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-app-id
```

> All `VITE_` prefixed variables are exposed to the browser. Never put secrets here.

---

## 3. Development Server

```bash
npm run dev
```

Opens at **http://localhost:5173**

For mobile testing on your local network:

```bash
npm run dev -- --host
```

Then open the displayed network URL (e.g. `http://192.168.x.x:5173`) on your phone.

---

## 4. App Icons (Required)

The PWA requires icon files. Generate them from your logo:

```
public/
  icons/
    icon-192.png   ← 192×192px PNG (required)
    icon-512.png   ← 512×512px PNG (required)
  favicon.ico
```

**Quick generation:**
1. Use [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) with your logo
2. Or install the CLI tool:

```bash
npx pwa-asset-generator logo.png public/icons --background "#0A0A0A" --padding "15%"
```

---

## 5. Project Structure

```
soko-transit/
├── public/
│   ├── icons/            # PWA icons (add your own)
│   └── manifest.json     # PWA manifest
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx # Tab bar navigation
│   │   ├── Layout.tsx    # App shell wrapper
│   │   └── TopBar.tsx    # Page header component
│   ├── pages/
│   │   ├── Splash.tsx    # Loading/splash screen
│   │   ├── Auth.tsx      # Login + OTP screen
│   │   ├── Home.tsx      # Dashboard
│   │   ├── Routes.tsx    # Routes list + map toggle
│   │   ├── RoutesMap.tsx # Leaflet map (lazy loaded)
│   │   ├── QRPass.tsx    # QR code display
│   │   ├── Wallet.tsx    # Wallet + transactions
│   │   └── Profile.tsx   # User profile
│   ├── store/
│   │   ├── authStore.ts  # Auth state (Zustand + persist)
│   │   ├── passStore.ts  # Bus pass state
│   │   └── walletStore.ts # Wallet + transactions
│   ├── types/
│   │   └── index.ts      # Shared TypeScript interfaces
│   ├── utils/
│   │   └── mockData.ts   # Routes, bus positions, helpers
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.tsx        # React Router v6 config
│   └── index.css         # Tailwind + global styles
├── index.html
├── vite.config.ts        # Vite + PWA plugin config
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 6. Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build:

```bash
npm run preview
```

---

## 7. Connecting the Backend

All API calls are mocked with `setTimeout` for now. Replace them with real `fetch` calls to your backend.

### Auth endpoints expected:

| Method | Endpoint | Payload |
|--------|----------|---------|
| POST | `/api/auth/otp/send` | `{ method: 'email'|'phone', value: string }` |
| POST | `/api/auth/otp/verify` | `{ method, value, otp: string }` |

### Pass endpoints:

| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/api/passes` | Returns user's passes |
| POST | `/api/passes` | Purchase a pass |

### Wallet endpoints:

| Method | Endpoint | Payload |
|--------|----------|---------|
| GET | `/api/wallet` | Returns balance + transactions |
| POST | `/api/wallet/topup` | `{ amount: number, method: 'mpesa' }` |

### User endpoints:

| Method | Endpoint | Payload |
|--------|----------|---------|
| GET | `/api/users/me` | Returns current user |
| PATCH | `/api/users/me` | `{ mpesaNumber?: string, ... }` |

---

## 8. PWA Testing

To test PWA install behavior:

1. Run `npm run build && npm run preview`
2. Open Chrome DevTools → Application tab → Manifest
3. Check "Service Workers" and "Storage"
4. On mobile: open in Chrome → tap "Add to Home Screen"

---

## 9. Adding i18n (Swahili)

The project is i18n-ready with `react-i18next`. To add Swahili translations:

```bash
mkdir src/locales
```

Create `src/locales/en.json` and `src/locales/sw.json`, then initialize i18next in `src/main.tsx`.

---

## 10. Linting

```bash
npm run lint
```

---

## Tech Stack Summary

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool |
| TypeScript | 5 | Type safety |
| TailwindCSS | 3 | Styling |
| React Router | v6 | Navigation |
| Zustand | 4 | State management |
| Leaflet + React-Leaflet | 1.9 / 4 | Maps |
| qrcode | 1.5 | QR generation |
| vite-plugin-pwa | 0.19 | PWA support |
| Lucide React | latest | Icons |

---

## Design Tokens Quick Reference

```
Background:   #0A0A0A / #121212 / #1F1F1F
Gold Accent:  #D4AF37
Green CTA:    #22C55E
Error:        #EF4444
Text Primary: #FFFFFF
Text Muted:   #9CA3AF
```

---

## Common Issues

**Map not showing tiles?**
Leaflet requires `leaflet/dist/leaflet.css` to be imported. It's imported in `RoutesMap.tsx`.

**QR code not rendering?**
Ensure the canvas ref is attached before calling `QRCode.toCanvas`. The `useEffect` handles this.

**Auth redirecting in a loop?**
Clear `localStorage` (`soko-auth` key) and refresh — Zustand persist may have stale state.

**Icons not showing for PWA?**
Add `icon-192.png` and `icon-512.png` to `public/icons/` before building.
