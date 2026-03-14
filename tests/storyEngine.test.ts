import { describe, it, expect } from 'vitest';
import { getAvailableChoices, evaluateRequirements } from '../src/utils/storyEngine';
import type { GameState } from '../src/types/game';
import type { SceneChoice, CustomInputChoice } from '../src/types/scenes';
import { INITIAL_STATE } from '../src/utils/constants';

const playing: GameState = {
  ...INITIAL_STATE,
  status: 'playing',
  hearts: 8,
  inventory: ['burner_phone'],
  narrativeFlags: { met_kai: true },
};

describe('evaluateRequirements', () => {
  it('returns true when no requirements', () => {
    expect(evaluateRequirements(undefined, playing)).toBe(true);
  });

  it('returns true when all item requirements met', () => {
    expect(evaluateRequirements({ items: ['burner_phone'] }, playing)).toBe(true);
  });

  it('returns false when item requirements not met', () => {
    expect(evaluateRequirements({ items: ['circuit_tool'] }, playing)).toBe(false);
  });

  it('returns true when flag requirements met', () => {
    expect(evaluateRequirements({ flags: { met_kai: true } }, playing)).toBe(true);
  });

  it('returns false when flag requirements not met', () => {
    expect(evaluateRequirements({ flags: { met_kai: false } }, playing)).toBe(false);
  });

  it('returns false when flag is missing', () => {
    expect(evaluateRequirements({ flags: { unknown_flag: true } }, playing)).toBe(false);
  });

  it('returns true when minHearts met', () => {
    expect(evaluateRequirements({ minHearts: 8 }, playing)).toBe(true);
  });

  it('returns false when minHearts not met', () => {
    expect(evaluateRequirements({ minHearts: 10 }, playing)).toBe(false);
  });

  it('checks all requirements together', () => {
    expect(evaluateRequirements({
      items: ['burner_phone'],
      flags: { met_kai: true },
      minHearts: 4,
    }, playing)).toBe(true);

    expect(evaluateRequirements({
      items: ['burner_phone', 'circuit_tool'],
      flags: { met_kai: true },
    }, playing)).toBe(false);
  });
});

describe('getAvailableChoices', () => {
  const choices: (SceneChoice | CustomInputChoice)[] = [
    { text: 'Go outside', targetSceneId: 'ch1_street' },
    { text: 'Override door', targetSceneId: 'ch1_override', requires: { items: ['circuit_tool'] } },
    { text: 'Call Kai', targetSceneId: 'ch1_kai', requires: { flags: { met_kai: true } } },
    { type: 'custom_input', prompt: 'Say something...', keywords: { hello: 'ch1_hello' }, fallbackSceneId: 'ch1_fallback', fallbackNarrative: 'Nothing happens.' },
  ];

  it('marks available choices correctly', () => {
    const result = getAvailableChoices(choices, playing);
    expect(result).toHaveLength(4);
    expect(result[0].available).toBe(true);  // no requirements
    expect(result[1].available).toBe(false); // needs circuit_tool
    expect(result[2].available).toBe(true);  // has met_kai flag
    expect(result[3].available).toBe(true);  // custom input always available
  });
});

