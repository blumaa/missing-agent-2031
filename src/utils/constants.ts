import type { GameState } from '../types/game';

export const VIEWBOX = {
  width: 400,
  height: 700,
};

export const HUD_HEIGHT = 52;

export interface Layout {
  hudY: number;
  hudHeight: number;
  sceneArtY: number;
  sceneArtHeight: number;
  narrativeY: number;
  narrativeHeight: number;
  choicesY: number;
  choicesHeight: number;
  totalHeight: number;
}

export function computeLayout(viewBoxHeight: number): Layout {
  const hudY = 0;
  const hudHeight = HUD_HEIGHT;
  const usable = viewBoxHeight - hudHeight;

  // Proportions: art 34%, narrative 30%, choices 36%
  const sceneArtHeight = Math.round(usable * 0.34);
  const narrativeHeight = Math.round(usable * 0.30);
  const choicesHeight = viewBoxHeight - hudHeight - sceneArtHeight - narrativeHeight;

  return {
    hudY,
    hudHeight,
    sceneArtY: hudHeight,
    sceneArtHeight,
    narrativeY: hudHeight + sceneArtHeight,
    narrativeHeight,
    choicesY: hudHeight + sceneArtHeight + narrativeHeight,
    choicesHeight,
    totalHeight: viewBoxHeight,
  };
}

export const MAX_INVENTORY = 8;
export const MAX_HEARTS = 12;
export const STARTING_HEARTS = 12;
export const STARTING_SCENE = 'ch1_apartment_wake';

export const TYPEWRITER_SPEED_MS = 30;

export const PALETTE = {
  bgDarkest: '#0a0a14',
  bgDark: '#141428',
  bgMid: '#1e1e3c',
  bgLight: '#d4d4e8',
  accentCyan: '#00e5ff',
  accentMagenta: '#ff2d7b',
  accentAmber: '#ffb300',
  accentGreen: '#00e676',
  textPrimary: '#e8e8f0',
  textSecondary: '#6a6a8a',
  border: '#2a2a4a',
  buttonBg: '#1a1a30',
} as const;

export const INITIAL_STATE: GameState = {
  status: 'idle',
  currentSceneId: STARTING_SCENE,
  inventory: [],
  hearts: STARTING_HEARTS,
  maxHearts: MAX_HEARTS,
  visitedScenes: [],
  narrativeFlags: {},
  currentChapter: 1,
  playtimeSeconds: 0,
};
