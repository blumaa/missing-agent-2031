import { describe, it, expect } from 'vitest';
import { matchKeywords } from '../src/utils/inputMatcher';

describe('matchKeywords', () => {
  const keywords: Record<string, string> = {
    'hello': 'scene_hello',
    'help': 'scene_help',
    'who are you': 'scene_identity',
    'run': 'scene_run',
    'fight': 'scene_fight',
  };

  it('matches exact keyword', () => {
    expect(matchKeywords('hello', keywords)).toBe('scene_hello');
  });

  it('matches case-insensitively', () => {
    expect(matchKeywords('HELLO', keywords)).toBe('scene_hello');
    expect(matchKeywords('Help', keywords)).toBe('scene_help');
  });

  it('matches keyword within longer input', () => {
    expect(matchKeywords('I want to run away', keywords)).toBe('scene_run');
  });

  it('matches multi-word keywords', () => {
    expect(matchKeywords('who are you?', keywords)).toBe('scene_identity');
  });

  it('returns null when no match', () => {
    expect(matchKeywords('something unrelated', keywords)).toBeNull();
  });

  it('returns null for empty input', () => {
    expect(matchKeywords('', keywords)).toBeNull();
  });

  it('prefers longer keyword match', () => {
    const kw: Record<string, string> = {
      'run': 'scene_run',
      'run away': 'scene_run_away',
    };
    expect(matchKeywords('I want to run away now', kw)).toBe('scene_run_away');
  });
});
