import type { GameState } from '../types/game';
import type { ChoiceRequirement, SceneChoice, CustomInputChoice } from '../types/scenes';

export function evaluateRequirements(
  requires: ChoiceRequirement | undefined,
  state: GameState,
): boolean {
  if (!requires) return true;

  if (requires.items) {
    if (!requires.items.every(item => state.inventory.includes(item))) return false;
  }

  if (requires.flags) {
    for (const [key, value] of Object.entries(requires.flags)) {
      if (state.narrativeFlags[key] !== value) return false;
    }
  }

  if (requires.minHearts !== undefined) {
    if (state.hearts < requires.minHearts) return false;
  }

  return true;
}

export interface EvaluatedChoice {
  choice: SceneChoice | CustomInputChoice;
  available: boolean;
}

export function getAvailableChoices(
  choices: (SceneChoice | CustomInputChoice)[],
  state: GameState,
): EvaluatedChoice[] {
  return choices.map(choice => {
    if ('type' in choice && choice.type === 'custom_input') {
      return { choice, available: true };
    }
    const sceneChoice = choice as SceneChoice;
    return { choice, available: evaluateRequirements(sceneChoice.requires, state) };
  });
}

