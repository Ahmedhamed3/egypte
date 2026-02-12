# NileQuest Egypt Explorer

Interactive educational web app where kids explore Egypt through a 3D map, layered missions, and a voice-enabled robot guide.

## Tech Stack
- Next.js (App Router + TypeScript)
- React Three Fiber / Drei
- Tailwind CSS
- Zustand state management
- Web Speech API (speech synthesis + recognition with text fallback)

## Folder Structure

```txt
app/
  api/places/route.ts        # JSON content API
  globals.css
  layout.tsx
  page.tsx                   # Main shell
components/
  EgyptMap3D.tsx             # 3D map + hotspot interactions
  MainMenu.tsx               # Language + progress + hero controls
  NileBot.tsx                # Speech UI + intents
  PassportPanel.tsx          # Badges + stamps
  PlaceWorldPanel.tsx        # Layered learning worlds (Giza fully implemented)
data/
  places.json                # Structured educational content
lib/
  content.ts                 # Data loading + intent matching
  types.ts                   # Data schema types
  store/useExplorerStore.ts  # Global app state
```

## Data Schema (`data/places.json`)

- `schemaVersion`, `defaultLanguage`, `supportedLanguages`
- `places[]`
  - `id`
  - `coordinates: [x, y, z]` for map hotspot
  - `name`, `category`, `overview` localized fields
  - `funFacts[]` localized snippets
  - `quiz[]` (question, choices, answerIndex)
  - `layers[]` for Layer 1..5 learning design
  - `voiceIntents` keyed by intent (`history`, `culture`, `fun`)
- `badges[]`

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Accessibility & Fallbacks
- Arabic/English language toggle with `dir="rtl"` support
- Keyboard-focusable controls and visible feedback
- Voice fallback to text input if speech recognition is unavailable
- Content can be fetched headlessly via `GET /api/places`
