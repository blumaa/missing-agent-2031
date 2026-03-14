import { useRef, useCallback } from 'react';
import gsap from 'gsap';

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useSceneTransition() {
  const containerRef = useRef<SVGGElement>(null);

  const transitionOut = useCallback(() => {
    return new Promise<void>(resolve => {
      if (!containerRef.current || prefersReducedMotion) { resolve(); return; }
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: resolve,
      });
    });
  }, []);

  const transitionIn = useCallback(() => {
    if (!containerRef.current) return;
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
    );
  }, []);

  return { containerRef, transitionOut, transitionIn };
}
