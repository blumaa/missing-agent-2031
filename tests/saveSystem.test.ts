import { describe, it, expect, beforeEach } from 'vitest';
import { saveGame, loadGame, clearSave, SAVE_KEY } from '../src/utils/saveSystem';
import type { GameState } from '../src/types/game';
import { INITIAL_STATE } from '../src/utils/constants';

describe('saveSystem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const testState: GameState = {
    ...INITIAL_STATE,
    status: 'playing',
    currentSceneId: 'ch1_street',
    hearts: 8,
    inventory: ['burner_phone'],
    visitedScenes: ['ch1_apartment_wake', 'ch1_street'],
    narrativeFlags: { met_kai: true },
    currentChapter: 1,
    playtimeSeconds: 300,
  };

  it('saves and loads game state', () => {
    saveGame(testState);
    const loaded = loadGame();
    expect(loaded).toEqual(testState);
  });

  it('returns null when no save exists', () => {
    expect(loadGame()).toBeNull();
  });

  it('clears save data', () => {
    saveGame(testState);
    clearSave();
    expect(loadGame()).toBeNull();
  });

  it('returns null for corrupted save data', () => {
    localStorage.setItem(SAVE_KEY, 'not valid json{{{');
    expect(loadGame()).toBeNull();
  });

  it('stores under the correct key', () => {
    saveGame(testState);
    const raw = localStorage.getItem(SAVE_KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw!)).toEqual(testState);
  });

  it('returns null for invalid state shape (missing fields)', () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ status: 'playing' }));
    expect(loadGame()).toBeNull();
  });

  it('returns null for invalid hearts value', () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...testState, hearts: Infinity }));
    expect(loadGame()).toBeNull();
  });

  it('returns null for invalid status', () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...testState, status: 'hacked' }));
    expect(loadGame()).toBeNull();
  });

  it('returns null for negative playtime', () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...testState, playtimeSeconds: -100 }));
    expect(loadGame()).toBeNull();
  });
});
