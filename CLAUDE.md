@~/.claude/AGENTS.md

# Missing Agent 2031

## Stack
- React 19 + TypeScript + Vite + @vitejs/plugin-react
- GSAP + @gsap/react (animations)
- Single `<svg viewBox="0 0 400 700">` rendering
- `useReducer` with typed actions (no external state library)
- Capacitor 8 (iOS)
- vite-plugin-pwa (web only)
- Web Audio API synthesis (no audio files)
- Vitest + Testing Library

## Conventions
- TDD: write tests first
- All game components use `React.memo()`
- SVG-only rendering, no HTML layout for game elements
- Fonts: Press Start 2P (headers/HUD), Share Tech Mono (narrative)
- Color palette: Neon Noir 2031 (see constants.ts)
