# Missing Agent 2031

A cyberpunk interactive fiction game set in a near-future city where an AI called ARIA controls everything. You wake up disconnected from the system. Choices shape the story across three chapters with multiple endings.

Built as a single SVG canvas with no HTML layout for game elements. Runs as a PWA on the web and as a native app on iOS via Capacitor.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for web (with PWA) |
| `npm run build:ios` | Build for iOS (no PWA service worker) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI) |

## iOS Build

```bash
npm run build:ios
npx cap sync ios
npx cap open ios
```

Requires Xcode. The `CAPACITOR=true` env var disables the PWA plugin so the service worker doesn't conflict with the native WebView.

## Stack

- **UI:** React 19 + TypeScript, rendered entirely within a `<svg viewBox="0 0 400 700">`
- **Build:** Vite 8
- **Animations:** GSAP + @gsap/react
- **State:** `useReducer` with typed actions (no external state library)
- **Audio:** Web Audio API synthesis (no audio files)
- **Mobile:** Capacitor 8 (iOS), haptics, screen orientation lock
- **Offline:** vite-plugin-pwa for web, Capacitor for native
- **Testing:** Vitest + Testing Library

## Architecture

```
src/
  Game.tsx                  # Main game orchestrator
  components/
    hud/                    # Chapter indicator, hearts, buttons
    scene/                  # 14 SVG art components (registry pattern)
    narrative/              # Text box with pagination, choice buttons, text input
    overlays/               # Inventory grid
    screens/                # Title, settings, collapse recovery, endings
    ErrorBoundary.tsx       # Crash recovery
  hooks/
    useGameState.ts         # useReducer + dispatch callbacks
    useTypewriter.ts        # Character-by-character text reveal
    useSceneTransition.ts   # GSAP fade animations
    useSoundEffects.ts      # Synthesized audio (8 effects)
    useHaptics.ts           # Capacitor haptics (noop on web)
    useSaveGame.ts          # Auto-save to localStorage
    useViewBox.ts           # Responsive SVG height
  utils/
    constants.ts            # Palette, layout, game config
    saveSystem.ts           # Save/load with runtime validation
    storyEngine.ts          # Choice requirement evaluation
    inputMatcher.ts         # Keyword matching for free-text input
    textLayout.ts           # SVG text wrapping and pagination
  data/
    items.ts                # 8 collectible items
    scenes/                 # 3 chapters of scene data
  types/
    game.ts                 # GameState, GameAction
    scenes.ts               # Scene, choice, consequence types
    items.ts                # Item definition
```

## Game Design

- **3 chapters**, ~78 scenes, branching narrative with item/flag/health gating
- **3 endings:** Reconnect, Destroy, or Coexist
- **Quarter-heart health system** (12 max) with collapse/recovery
- **Inventory:** 8 slots, items unlock choices
- **Free-text input** scenes with keyword matching
- **Typewriter text** with pagination for long passages, tap to cycle through pages
- **Accessibility:** `prefers-reduced-motion` respected for animations and typewriter

## Conventions

- All game components use `React.memo()`
- SVG-only rendering, no HTML layout for game elements
- Fonts: Press Start 2P (headers/HUD), Share Tech Mono (narrative)
- Color palette: Neon Noir 2031 (see `constants.ts`)
- TDD for pure logic (reducer, story engine, save system, input matcher, text layout)

## License

Private.
