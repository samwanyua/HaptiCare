<div align="center">

#  HaptiCare — HaptiQ

### *Restoring Awareness Through Vibration*

**An AI-powered haptic wristband companion app for the Deaf and hard-of-hearing community in Kenya and beyond.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.5--Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express)](https://expressjs.com)

</div>

---



1. [Project Overview](#-project-overview)
2. [The Problem](#-the-problem)
3. [Core Features](#-core-features)
4. [Architecture](#-architecture)
5. [Project Structure](#-project-structure)
6. [Tech Stack](#-tech-stack)
7. [Getting Started](#-getting-started)
8. [Environment Variables](#-environment-variables)
9. [API Reference](#-api-reference)
10. [Application Screens](#-application-screens)
11. [Data Models & Types](#-data-models--types)
12. [Haptic Engine](#-haptic-engine)
13. [AI Integration](#-ai-integration)
14. [Build & Deployment](#-build--deployment)
15. [Design System](#-design-system)
16. [Contributing](#-contributing)

---

##  Project Overview

**HaptiCare**  is an inclusive technology platform developed by **HaptiCare Labs**, a team of Kenyan engineers and disability advocates. It pairs a physical haptic wristband device — the *HaptiCare One* — with a companion mobile web application that translates environmental sound into distinct, meaningful tactile vibration patterns in real time.

The app serves as both a **product landing page** (marketing/waitlist site) and a **full interactive app wireframe simulator** showcasing the wearable's companion app experience inside a realistic phone frame mockup.

> *"Designed in Africa, built for the world."*

View the live app in AI Studio: https://ai.studio/apps/94453a99-7709-4683-8566-92d9b62f3f81



##  Architecture

```
Browser (React SPA)
        │
        ▼
  Vite Dev Server ──── HMR (dev) / Static (prod)
        │
  Express Backend (server.ts)
        │
        ├── GET  /api/health          → Health check
        ├── POST /api/translate       → Gemini text translation (EN ↔ SW)
        └── POST /api/analyze-sound   → Gemini sound classification (JSON)
              │
              ▼
       Google Gemini 2.5 Flash API
```

In development, the Express server proxies Vite's middleware directly — no separate frontend dev server is needed. In production, Vite builds the SPA to `dist/` and Express serves it statically with SPA fallback routing.

---

##  Project Structure

```
HaptiCare/
├── index.html                              # App entry point (Google Fonts, Material Symbols)
├── server.ts                               # Express backend + Vite middleware
├── vite.config.ts                          # Vite + React + Tailwind config
├── tsconfig.json                           # TypeScript configuration
├── package.json                            # Dependencies and npm scripts
├── .env.example                            # Environment variable template
│
└── src/
    ├── main.tsx                            # React DOM root mount
    ├── App.tsx                             # Root app component (renders landing page)
    ├── index.css                           # Global base styles
    ├── types.ts                            # All shared TypeScript interfaces and types
    │
    ├── components/
    │   ├── HaptiCareLandingPage.tsx        # Full marketing landing page (dark mode, waitlist)
    │   ├── PhoneFrame.tsx                  # Phone mockup container + iOS-style status bar
    │   ├── BottomNav.tsx                   # 4-tab bottom navigation bar
    │   ├── HomeDashboardScreen.tsx         # Main dashboard (band status, quick toggles)
    │   ├── SoundTriggersLibraryScreen.tsx  # Trigger library (preset + custom)
    │   ├── CustomTriggerCreatorScreen.tsx  # Trigger creation wizard (AI classify)
    │   ├── AlertsLogScreen.tsx             # Historical alert log with detail modals
    │   ├── LiveCallTranscriptionScreen.tsx # Live call with speech-to-text + translation
    │   ├── OnboardingProfileScreen.tsx     # User profile setup screen
    │   └── WaveformVisualizer.tsx          # SVG waveform renderer for haptic patterns
    │
    ├── data/
    │   └── initialData.ts                  # Seed data (profile, triggers, alerts, call messages)
    │
    └── utils/
        └── haptics.ts                      # Web Vibration API + Web Audio API engine
```

---

##  Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend Framework** | React | 19.0.1 | Component-based UI |
| **Language** | TypeScript | ~5.8.2 | Static typing throughout |
| **Build Tool** | Vite | 6.2.3 | Fast bundling & HMR |
| **Styling** | Tailwind CSS | 4.1.14 | Utility-first CSS |
| **Animation** | Motion (Framer) | 12.23.24 | UI micro-animations |
| **Icons** | Lucide React | 0.546.0 | SVG icon set |
| **Icons** | Material Symbols | (CDN) | Outlined Google icons |
| **Backend Server** | Express | 4.21.2 | API routes + static serving |
| **AI / LLM** | Google Gemini 2.5 Flash | `@google/genai` 2.4.0 | Translation + sound classification |
| **Fonts** | Atkinson Hyperlegible | (Google Fonts CDN) | Accessibility-first typeface |
| **Runtime** | Node.js + tsx | 4.21.0 | TypeScript-native dev server |
| **Haptics** | Web Vibration API | Browser Native | Physical wristband vibration |
| **Audio** | Web Audio API | Browser Native | Desktop tone synthesis |
| **Speech** | Web Speech API | Browser Native | Live speech-to-text recognition |

---

##  Getting Started

### Prerequisites

- **Node.js** `v18+` (LTS recommended)
- **npm** `v9+`
- A **Google Gemini API key** — free tier available at [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd HaptiCare
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your Gemini API key:

```env
GEMINI_API_KEY="your-actual-gemini-api-key-here"
APP_URL="http://localhost:3000"
```

> **Note:** The app works without a Gemini API key. AI-powered features (translation, sound classification) fall back to mock/hardcoded responses.

### 4. Run the development server

```bash
npm run dev
```

The unified Express + Vite server starts at **[http://localhost:3000](http://localhost:3000)**.

---

##  Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Recommended | Google Gemini API key. Falls back to mock data if omitted or set to `MY_GEMINI_API_KEY`. |
| `APP_URL` | Optional | Public URL of the deployed app. Used for self-referential links and OAuth callbacks. |
| `NODE_ENV` | Auto-set | When `production`, serves the built `dist/` folder instead of using Vite middleware. |
| `DISABLE_HMR` | Optional | Set to `true` to disable Vite HMR and file watching (used in AI Studio environments). |

---

## 🔌 API Reference

The Express backend exposes three endpoints under `/api/`.

---

### `GET /api/health`

Simple health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-07-30T10:00:00.000Z"
}
```

---

### `POST /api/translate`

Translates a speech transcript using Gemini 2.5 Flash. Called by the Live Call Transcription screen on every new message.

**Request Body:**
```json
{
  "text": "How am I looking on your monitor?",
  "targetLang": "sw"
}
```

| Field | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The speech transcript to translate *(required)* |
| `targetLang` | `"sw"` \| `"en"` | `"sw"` | Target language code |

**Success Response:**
```json
{
  "translatedText": "Vipi ninaonekana kwenye mchoro wako?",
  "source": "gemini"
}
```

**Fallback Response (no API key):**
```json
{
  "translatedText": "[SW] How am I looking on your monitor?",
  "source": "fallback"
}
```

---

### `POST /api/analyze-sound`

Classifies a described sound and recommends a vibration pattern using Gemini 2.5 Flash. Used by the Custom Trigger Creator's AI Describe mode.

**Request Body:**
```json
{
  "promptText": "Sharp double siren from an ambulance"
}
```

**Success Response:**
```json
{
  "detectedSound": "Ambulance Siren",
  "category": "Hazard",
  "recommendedPattern": "rapid-triple-pulse",
  "confidence": 0.96
}
```

| Field | Type | Description |
|---|---|---|
| `detectedSound` | `string` | Human-readable name of the detected sound |
| `category` | `"Hazard"` \| `"Traffic"` \| `"Social"` \| `"Call"` | Classification category |
| `recommendedPattern` | `string` | Suggested vibration pattern description |
| `confidence` | `number` | Score between `0.8` and `0.99` |

**Fallback Response (no API key):**
```json
{
  "detectedSound": "High-frequency siren detected",
  "category": "Hazard",
  "recommendedPattern": "rapid-triple-pulse",
  "confidence": 0.94
}
```

---



### Production Build

```bash
npm run build
npm start
```

The production server:
1. Serves the compiled SPA from `dist/` as static files
2. Handles all `GET *` routes with `index.html` for client-side routing
3. Exposes the same `/api/*` routes on port 3000



##  Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary Teal | `#006a62` | CTAs, active states, brand color |
| Primary Teal Light | `#00a396` | Accents, toggle active, waveforms |
| Mint Highlight | `#7cf6e7` | Dark mode highlights, hover text |
| Background Light | `#faf8ff` | App background |
| Background Dark | `#090d16` | App background (dark mode) |
| Text Primary | `#131b2e` | Headings, primary body text |
| Text Secondary | `#505f76` | Subtitles, labels |
| Text Muted | `#3d4947` | Paragraph text (landing page) |
| Indigo Chip | `#eaedff` | Filter chips, icon backgrounds |
| Lavender Section | `#dae2fd` | Product section background |
| Border | `#bcc9c6` | Card and input borders |
| Danger Red | `#ba1a1a` | Hazard alerts, end call, errors |
| Amber | `#855300` | Social/Baby category color |

### Typography

- **Primary Font:** `Atkinson Hyperlegible Next` — variable weight 400–700, specifically designed for low-vision and accessibility users
- **Fallback:** `Atkinson Hyperlegible` (static), then `sans-serif`
- **Icon Font:** `Material Symbols Outlined` (Google CDN, variable weight + fill)
- **Icon Library:** `Lucide React` for inline component icons

### CSS Animations

| Class | Effect | Usage |
|---|---|---|
| `.haptic-pulse` | Slow radial ring expansion | Dashboard wristband hero, landing hero |
| `.haptic-pulse-fast` | Rapid ring animation | Dashboard during active vibration |
| `.animate-ping` | Sharp fade-expand | Sensor dot during active pulse |
| `.animate-pulse` | Opacity oscillation | Bluetooth/recording state indicators |
| `.animate-bounce` | Vertical bounce | Save success checkmark |
| `.animate-spin` | Rotation | Gemini translation loading icon |

---

##  Contributing

Contributions are welcome from engineers, designers, and accessibility advocates. HaptiCare is built for community impact.

### Development Guidelines

1. **TypeScript First** — All new files must be `.tsx` or `.ts`. Avoid `any` types where possible; extend shared types in `src/types.ts`.
2. **Component Isolation** — Keep components in `src/components/`. Each screen is a standalone functional component receiving props from a parent orchestrator.
3. **Design System** — Use existing color palette tokens. Do not introduce new colors without updating the design system section above.
4. **Accessibility** — All interactive elements must have:
   - Unique `id` attributes for browser testing
   - `aria-label` for icon-only buttons
   - Keyboard navigation support (`tabIndex`, `onKeyDown` handlers)
5. **API Changes** — New endpoints go in `server.ts`. Follow the existing pattern: validate input → call Gemini → return graceful fallback on error.
6. **New Sound Categories** — Must include:
   - Entry in `src/utils/haptics.ts` with a vibration sequence
   - Matching SVG path in `WaveformVisualizer.tsx`
   - Type update in `src/types.ts` (`TriggerCategory`, `waveformPattern`)

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit with descriptive messages: `git commit -m "feat: add doorbell trigger pattern"`
4. Push and open a Pull Request with a clear description of changes and their accessibility impact

---

##  License

© 2026 **HaptiCare Labs**. All rights reserved.

*Empowering through tactile clarity. Built in Nairobi for the world.*

---

<div align="center">

**Helping 2.75 million Kenyans — and millions more worldwide — feel their world.**

</div>
