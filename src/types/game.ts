export type GameStatus = 'idle' | 'playing' | 'paused';

export interface GameState {
  status: GameStatus;
  currentSceneId: string;
  inventory: string[];
  hearts: number;
  maxHearts: number;
  visitedScenes: string[];
  narrativeFlags: Record<string, boolean>;
  currentChapter: number;
  playtimeSeconds: number;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'CONTINUE_GAME'; savedState: GameState }
  | { type: 'NAVIGATE_SCENE'; sceneId: string }
  | { type: 'ADD_ITEM'; item: string }
  | { type: 'REMOVE_ITEM'; item: string }
  | { type: 'CHANGE_HEARTS'; delta: number }
  | { type: 'SET_FLAG'; key: string; value: boolean }
  | { type: 'SET_CHAPTER'; chapter: number }
  | { type: 'TICK_PLAYTIME'; seconds: number }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'RESET_GAME' };
