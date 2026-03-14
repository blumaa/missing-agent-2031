import { describe, it, expect } from 'vitest';
import { gameReducer } from '../src/hooks/useGameState';
import { INITIAL_STATE, STARTING_SCENE, MAX_HEARTS, MAX_INVENTORY } from '../src/utils/constants';
import type { GameState } from '../src/types/game';

describe('gameReducer', () => {
  it('returns initial state for unknown action', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = gameReducer(INITIAL_STATE, { type: 'UNKNOWN' } as any);
    expect(result).toBe(INITIAL_STATE);
  });

  describe('START_GAME', () => {
    it('sets status to playing and resets to starting scene', () => {
      const result = gameReducer(INITIAL_STATE, { type: 'START_GAME' });
      expect(result.status).toBe('playing');
      expect(result.currentSceneId).toBe(STARTING_SCENE);
      expect(result.hearts).toBe(MAX_HEARTS);
      expect(result.inventory).toEqual([]);
      expect(result.visitedScenes).toEqual([STARTING_SCENE]);
    });
  });

  describe('CONTINUE_GAME', () => {
    it('restores saved state', () => {
      const saved: GameState = {
        ...INITIAL_STATE,
        status: 'playing',
        currentSceneId: 'ch1_street',
        hearts: 8,
        inventory: ['burner_phone'],
        visitedScenes: [STARTING_SCENE, 'ch1_street'],
        narrativeFlags: { met_kai: true },
        currentChapter: 1,
        playtimeSeconds: 120,
      };
      const result = gameReducer(INITIAL_STATE, { type: 'CONTINUE_GAME', savedState: saved });
      expect(result).toEqual(saved);
    });
  });

  describe('NAVIGATE_SCENE', () => {
    const playing: GameState = {
      ...INITIAL_STATE,
      status: 'playing',
      visitedScenes: [STARTING_SCENE],
    };

    it('updates currentSceneId and adds to visitedScenes', () => {
      const result = gameReducer(playing, { type: 'NAVIGATE_SCENE', sceneId: 'ch1_street' });
      expect(result.currentSceneId).toBe('ch1_street');
      expect(result.visitedScenes).toContain('ch1_street');
    });

    it('does not duplicate visited scenes', () => {
      const result = gameReducer(playing, { type: 'NAVIGATE_SCENE', sceneId: STARTING_SCENE });
      expect(result.visitedScenes.filter(s => s === STARTING_SCENE)).toHaveLength(1);
    });
  });

  describe('ADD_ITEM', () => {
    const playing: GameState = { ...INITIAL_STATE, status: 'playing' };

    it('adds item to inventory', () => {
      const result = gameReducer(playing, { type: 'ADD_ITEM', item: 'burner_phone' });
      expect(result.inventory).toContain('burner_phone');
    });

    it('does not add duplicate items', () => {
      const withItem = { ...playing, inventory: ['burner_phone'] };
      const result = gameReducer(withItem, { type: 'ADD_ITEM', item: 'burner_phone' });
      expect(result.inventory).toEqual(['burner_phone']);
    });

    it('respects max inventory limit', () => {
      const full = { ...playing, inventory: Array.from({ length: MAX_INVENTORY }, (_, i) => `item_${i}`) };
      const result = gameReducer(full, { type: 'ADD_ITEM', item: 'overflow_item' });
      expect(result.inventory).toHaveLength(MAX_INVENTORY);
      expect(result.inventory).not.toContain('overflow_item');
    });
  });

  describe('REMOVE_ITEM', () => {
    it('removes item from inventory', () => {
      const state: GameState = { ...INITIAL_STATE, status: 'playing', inventory: ['burner_phone', 'med_patch'] };
      const result = gameReducer(state, { type: 'REMOVE_ITEM', item: 'burner_phone' });
      expect(result.inventory).toEqual(['med_patch']);
    });

    it('does nothing if item not in inventory', () => {
      const state: GameState = { ...INITIAL_STATE, status: 'playing', inventory: ['med_patch'] };
      const result = gameReducer(state, { type: 'REMOVE_ITEM', item: 'burner_phone' });
      expect(result.inventory).toEqual(['med_patch']);
    });
  });

  describe('CHANGE_HEARTS', () => {
    const playing: GameState = { ...INITIAL_STATE, status: 'playing', hearts: 8 };

    it('increases hearts', () => {
      const result = gameReducer(playing, { type: 'CHANGE_HEARTS', delta: 2 });
      expect(result.hearts).toBe(10);
    });

    it('decreases hearts', () => {
      const result = gameReducer(playing, { type: 'CHANGE_HEARTS', delta: -3 });
      expect(result.hearts).toBe(5);
    });

    it('clamps at maxHearts', () => {
      const result = gameReducer(playing, { type: 'CHANGE_HEARTS', delta: 100 });
      expect(result.hearts).toBe(MAX_HEARTS);
    });

    it('clamps at 0', () => {
      const result = gameReducer(playing, { type: 'CHANGE_HEARTS', delta: -100 });
      expect(result.hearts).toBe(0);
    });
  });

  describe('SET_FLAG', () => {
    it('sets a narrative flag', () => {
      const state: GameState = { ...INITIAL_STATE, status: 'playing' };
      const result = gameReducer(state, { type: 'SET_FLAG', key: 'met_kai', value: true });
      expect(result.narrativeFlags.met_kai).toBe(true);
    });

    it('can unset a flag', () => {
      const state: GameState = { ...INITIAL_STATE, status: 'playing', narrativeFlags: { met_kai: true } };
      const result = gameReducer(state, { type: 'SET_FLAG', key: 'met_kai', value: false });
      expect(result.narrativeFlags.met_kai).toBe(false);
    });
  });

  describe('SET_CHAPTER', () => {
    it('updates current chapter', () => {
      const state: GameState = { ...INITIAL_STATE, status: 'playing' };
      const result = gameReducer(state, { type: 'SET_CHAPTER', chapter: 2 });
      expect(result.currentChapter).toBe(2);
    });
  });

  describe('TICK_PLAYTIME', () => {
    it('increments playtime', () => {
      const state: GameState = { ...INITIAL_STATE, status: 'playing', playtimeSeconds: 60 };
      const result = gameReducer(state, { type: 'TICK_PLAYTIME', seconds: 5 });
      expect(result.playtimeSeconds).toBe(65);
    });
  });

  describe('PAUSE_GAME / RESUME_GAME', () => {
    it('pauses a playing game', () => {
      const state: GameState = { ...INITIAL_STATE, status: 'playing' };
      const result = gameReducer(state, { type: 'PAUSE_GAME' });
      expect(result.status).toBe('paused');
    });

    it('does not pause an idle game', () => {
      const result = gameReducer(INITIAL_STATE, { type: 'PAUSE_GAME' });
      expect(result.status).toBe('idle');
    });

    it('resumes a paused game', () => {
      const state: GameState = { ...INITIAL_STATE, status: 'paused' };
      const result = gameReducer(state, { type: 'RESUME_GAME' });
      expect(result.status).toBe('playing');
    });
  });

  describe('RESET_GAME', () => {
    it('returns to initial state', () => {
      const state: GameState = {
        ...INITIAL_STATE,
        status: 'playing',
        hearts: 4,
        inventory: ['burner_phone'],
        currentChapter: 3,
      };
      const result = gameReducer(state, { type: 'RESET_GAME' });
      expect(result).toEqual(INITIAL_STATE);
    });
  });
});
