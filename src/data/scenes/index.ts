import type { Scene } from '../../types/scenes';
import { chapter1Scenes } from './chapter1';
import { chapter2Scenes } from './chapter2';
import { chapter3Scenes } from './chapter3';

const sceneMap = new Map<string, Scene>();

for (const scene of [...chapter1Scenes, ...chapter2Scenes, ...chapter3Scenes]) {
  sceneMap.set(scene.id, scene);
}

export function getSceneById(id: string): Scene | undefined {
  return sceneMap.get(id);
}

export function getAllScenes(): Scene[] {
  return [...sceneMap.values()];
}
