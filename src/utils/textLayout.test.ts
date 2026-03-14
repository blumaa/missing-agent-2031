import { describe, it, expect } from 'vitest';
import { wrapText, getMaxLines, paginateLines } from './textLayout';

describe('wrapText', () => {
  it('wraps long text into lines', () => {
    const text = 'hello world this is a test of wrapping';
    const lines = wrapText(text, 20);
    expect(lines.every(l => l.length <= 20)).toBe(true);
    expect(lines.join(' ')).toBe(text);
  });

  it('returns single line for short text', () => {
    expect(wrapText('hi', 38)).toEqual(['hi']);
  });

  it('handles empty string', () => {
    expect(wrapText('', 38)).toEqual([]);
  });
});

describe('getMaxLines', () => {
  it('calculates correct max lines for default height', () => {
    // narrativeHeight ~194 for 700px viewBox
    // (194 - 24 - 26) / 18 = 8
    expect(getMaxLines(194)).toBe(8);
  });

  it('returns at least 1', () => {
    expect(getMaxLines(50)).toBeGreaterThanOrEqual(1);
  });
});

describe('paginateLines', () => {
  it('returns single page when lines fit', () => {
    const lines = ['line 1', 'line 2', 'line 3'];
    expect(paginateLines(lines, 8)).toEqual([lines]);
  });

  it('splits into multiple pages when lines exceed max', () => {
    const lines = ['a', 'b', 'c', 'd', 'e'];
    const pages = paginateLines(lines, 2);
    expect(pages).toEqual([['a', 'b'], ['c', 'd'], ['e']]);
  });

  it('returns one empty page for empty input', () => {
    expect(paginateLines([], 8)).toEqual([[]]);
  });
});
