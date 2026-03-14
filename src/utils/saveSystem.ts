import type { GameState } from '../types/game';
import { MAX_HEARTS, MAX_INVENTORY } from './constants';

export const SAVE_KEY = 'missing-agent-2031-save';

function isValidGameState(data: unknown): data is GameState {
  if (typeof data !== 'object' || data === null) return false;
  const s = data as Record<string, unknown>;

  if (!['idle', 'playing', 'paused'].includes(s.status as string)) return false;
  if (typeof s.currentSceneId !== 'string' || s.currentSceneId.length === 0) return false;
  if (!Array.isArray(s.inventory) || s.inventory.length > MAX_INVENTORY) return false;
  if (!s.inventory.every((i: unknown) => typeof i === 'string')) return false;
  if (typeof s.hearts !== 'number' || s.hearts < 0 || s.hearts > MAX_HEARTS) return false;
  if (typeof s.maxHearts !== 'number' || s.maxHearts < 1 || s.maxHearts > MAX_HEARTS) return false;
  if (!Array.isArray(s.visitedScenes)) return false;
  if (typeof s.narrativeFlags !== 'object' || s.narrativeFlags === null || Array.isArray(s.narrativeFlags)) return false;
  if (typeof s.currentChapter !== 'number' || s.currentChapter < 1) return false;
  if (typeof s.playtimeSeconds !== 'number' || s.playtimeSeconds < 0) return false;

  return true;
}

export function saveGame(state: GameState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidGameState(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY);
}
