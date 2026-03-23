import { useEffect, useRef } from 'react';
import type { GameState } from '../types/game';
import { saveGame } from '../utils/saveSystem';

export function useSaveGame(state: GameState) {
  const stateRef = useRef(state);
  stateRef.current = state;

  const prevSceneRef = useRef(state.currentSceneId);

  useEffect(() => {
    if (state.status !== 'playing') return;
    if (state.currentSceneId === prevSceneRef.current) return;

    prevSceneRef.current = state.currentSceneId;
    saveGame(stateRef.current);
  }, [state.currentSceneId, state.status]);
}
