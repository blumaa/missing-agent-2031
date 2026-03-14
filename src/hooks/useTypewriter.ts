import { useState, useEffect, useCallback, useRef } from 'react';
import { TYPEWRITER_SPEED_MS } from '../utils/constants';

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useTypewriter(text: string) {
  const [displayedLength, setDisplayedLength] = useState(prefersReducedMotion ? text.length : 0);
  const [prevText, setPrevText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset when text changes
  if (prevText !== text) {
    setPrevText(text);
    setDisplayedLength(prefersReducedMotion ? text.length : 0);
  }

  const isComplete = displayedLength >= text.length;
  const displayedText = text.slice(0, displayedLength);

  useEffect(() => {
    if (prefersReducedMotion || isComplete) return;

    const id = setInterval(() => {
      setDisplayedLength(prev => {
        if (prev >= text.length) {
          clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, TYPEWRITER_SPEED_MS);

    intervalRef.current = id;

    return () => {
      clearInterval(id);
    };
  }, [text, isComplete]);

  const skip = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedLength(text.length);
  }, [text]);

  return { displayedText, isComplete, skip };
}
