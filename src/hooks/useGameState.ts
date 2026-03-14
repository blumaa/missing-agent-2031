import { useReducer, useCallback } from 'react';
import type { GameState, GameAction } from '../types/game';
import { INITIAL_STATE, MAX_INVENTORY, STARTING_SCENE } from '../utils/constants';

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...INITIAL_STATE,
        status: 'playing',
        currentSceneId: STARTING_SCENE,
        visitedScenes: [STARTING_SCENE],
      };

    case 'CONTINUE_GAME':
      return action.savedState;

    case 'NAVIGATE_SCENE': {
      const visited = state.visitedScenes.includes(action.sceneId)
        ? state.visitedScenes
        : [...state.visitedScenes, action.sceneId];
      return { ...state, currentSceneId: action.sceneId, visitedScenes: visited };
    }

    case 'ADD_ITEM':
      if (state.inventory.includes(action.item)) return state;
      if (state.inventory.length >= MAX_INVENTORY) return state;
      return { ...state, inventory: [...state.inventory, action.item] };

    case 'REMOVE_ITEM':
      return { ...state, inventory: state.inventory.filter(i => i !== action.item) };

    case 'CHANGE_HEARTS': {
      const newHearts = Math.max(0, Math.min(state.maxHearts, state.hearts + action.delta));
      return { ...state, hearts: newHearts };
    }

    case 'SET_FLAG':
      return { ...state, narrativeFlags: { ...state.narrativeFlags, [action.key]: action.value } };

    case 'SET_CHAPTER':
      return { ...state, currentChapter: action.chapter };

    case 'TICK_PLAYTIME':
      return { ...state, playtimeSeconds: state.playtimeSeconds + action.seconds };

    case 'PAUSE_GAME':
      return state.status === 'playing' ? { ...state, status: 'paused' } : state;

    case 'RESUME_GAME':
      return state.status === 'paused' ? { ...state, status: 'playing' } : state;

    case 'RESET_GAME':
      return INITIAL_STATE;

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const continueGame = useCallback((savedState: GameState) => dispatch({ type: 'CONTINUE_GAME', savedState }), []);
  const navigateScene = useCallback((sceneId: string) => dispatch({ type: 'NAVIGATE_SCENE', sceneId }), []);
  const addItem = useCallback((item: string) => dispatch({ type: 'ADD_ITEM', item }), []);
  const removeItem = useCallback((item: string) => dispatch({ type: 'REMOVE_ITEM', item }), []);
  const changeHearts = useCallback((delta: number) => dispatch({ type: 'CHANGE_HEARTS', delta }), []);
  const setFlag = useCallback((key: string, value: boolean) => dispatch({ type: 'SET_FLAG', key, value }), []);
  const setChapter = useCallback((chapter: number) => dispatch({ type: 'SET_CHAPTER', chapter }), []);
  const tickPlaytime = useCallback((seconds: number) => dispatch({ type: 'TICK_PLAYTIME', seconds }), []);
  const pauseGame = useCallback(() => dispatch({ type: 'PAUSE_GAME' }), []);
  const resumeGame = useCallback(() => dispatch({ type: 'RESUME_GAME' }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET_GAME' }), []);

  return {
    state,
    startGame,
    continueGame,
    navigateScene,
    addItem,
    removeItem,
    changeHearts,
    setFlag,
    setChapter,
    tickPlaytime,
    pauseGame,
    resumeGame,
    resetGame,
  };
}
