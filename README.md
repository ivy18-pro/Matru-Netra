# MATRU-NETRA — Maternal Care Net-Grid

> **A connected, voice-assisted maternal and newborn healthcare network designed for rural India.**

MATRU-NETRA is a digital health platform engineered to bridge the critical gap between rural homes, frontline Accredited Social Health Activists (ASHA workers), and Primary Health Centres (PHCs). It ensures continuous, dignified care for pregnant women and newborn babies across every stage of the maternal journey.

---

## Key Highlights

- **Cinematic Scroll-Driven Storytelling Landing Page:** 7 interactive narrative scenes detailing a mother's journey from antenatal checkups and high-risk detection through emergency transport and newborn immunization.
- **Real Role-Based Authentication:** Dedicated portals and secure session handling for three roles:
  1. **Doctor / Medical Officer (PHC):** Clinical oversight, high-risk flag verification, and directive assignment.
  2. **ASHA Worker:** Doorstep antenatal & postnatal checkups, vital sign logging, offline field sync, and household language onboarding.
  3. **Mother / Patient:** Low-literacy, voice-first care dashboard with audio reminders, visit milestones, and emergency lifeline.
- **Interactive Map of India & Regional Dialects:** Leaflet-powered vector map with selectable state boundaries, dynamic district lists, and intelligent region-to-language mappings covering **11 regional Indian languages**:
  - Bengali (`বাংলা`), Hindi (`हिन्दी`), Odia (`ଓଡ଼ିଆ`), Marathi (`मराठी`), Tamil (`தமிழ்`), Telugu (`తెలుగు`), Gujarati (`ગુજરાતી`), Punjabi (`ਪੰਜਾਬੀ`), Malayalam (`മലയാളം`), Assamese (`অসমীয়া`), and English.
- **Voice-First Accessibility:** Web Speech API integration with Text-to-Speech audio narration tuned for rural comprehension and voice-assisted navigation commands.
- **ASHA-Assisted Language Facilitation:** Field workers can configure dialect preferences for assigned mothers during home visits and rapidly toggle languages across diverse households.
- **Offline-First Resilience:** Local encrypted storage and automatic queue synchronization for remote hamlets with intermittent connectivity.
- **Dual Authentication Architecture:** Plug-and-play Supabase PostgreSQL backend with Row-Level Security (RLS) alongside a local cryptographic SHA-256 fallback engine.

---

## Tech Stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Mapping & Geospatial:** [Leaflet](https://leafletjs.com/) with OpenStreetMap & CartoDB vector basemaps
- **Icons & UI:** [Lucide React](https://lucide.dev/)
- **Speech & Audio:** Web Speech API (SpeechSynthesis & SpeechRecognition)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL with RLS) or built-in Web Crypto engine
- **Linting & Code Quality:** [Oxlint](https://oxc.rs/)

---

## Project Structure

```
Matru-Netra/
├── public/                 # Static assets and audio tracks
├── src/
│   ├── components/
│   │   ├── auth/           # Role-specific authentication modal & credentials forms
│   │   ├── dashboards/     # Doctor, ASHA Worker, and Mother patient dashboards
│   │   ├── modals/         # Visit recording and mother registration modals
│   │   ├── onboarding/     # Interactive Leaflet India map & regional language modal
│   │   ├── LandingPage.tsx # Hero landing wrapper
│   │   ├── Navbar.tsx      # Universal navigation, language switcher, audio & network toggles
│   │   └── ScrollStorytelling.tsx # 7-scene scroll-driven cinematic animation
│   ├── context/
│   │   └── CareContext.tsx # Centralized healthcare application state & offline sync
│   ├── data/
│   │   ├── indiaGeoData.ts # India states & districts boundary dataset with dialect mapping
│   │   └── mockData.ts     # Initial seed records for clinical demonstrations
│   ├── i18n/
│   │   └── translations.ts # Scalable 11-language localization dictionary with safe fallback
│   ├── services/
│   │   ├── authService.ts  # Supabase Auth / Local Web Crypto authentication provider
│   │   ├── translationService.ts # Clinical string localization provider
│   │   └── voiceService.ts # Web Speech TTS and Speech Recognition engine
│   ├── types/
│   │   └── index.ts        # TypeScript data contracts (Mother, Visit, User, Language)
│   ├── App.tsx             # Root application and protected route gateways
│   └── main.tsx            # Application entry point
├── supabase/
│   └── schema.sql          # Production PostgreSQL database schema with RLS policies
├── .env.example            # Environment configuration template
├── package.json
└── vite.config.ts
```

---

## Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher (or pnpm / yarn)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ivy18-pro/Matru-Netra.git
cd Matru-Netra
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables (Optional)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

To connect to Supabase:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-public-key
```

> **Note:** If no Supabase credentials are provided, MATRU-NETRA automatically initializes with its built-in local cryptographic authentication engine. You can register accounts, sign in, log visits, and test all features immediately without any external configuration.

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 5. Build for Production

```bash
npm run build
npm run preview
```

---

## Database Setup (Supabase)

If using Supabase:
1. Create a new project in the [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to the **SQL Editor** in your Supabase project.
3. Open [`supabase/schema.sql`](./supabase/schema.sql) from this repository, paste the contents into the SQL editor, and click **Run**.
4. Copy your project URL and anonymous key into your local `.env` file.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
