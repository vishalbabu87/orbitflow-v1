import { useEffect, useState } from 'react';

/**
 * usePrefersReducedMotion
 *
 * Returns `true` when the user has enabled "reduce motion" in their OS/browser
 * accessibility settings (`prefers-reduced-motion: reduce`).
 *
 * Use this hook to conditionally disable Framer Motion animations or any JS-
 * driven animation that is not already covered by the CSS media query in
 * style.css.
 *
 * @example
 * const reducedMotion = usePrefersReducedMotion();
 * const variants = reducedMotion ? {} : { animate: { y: [0, -8, 0] } };
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    // SSR-safe: only read matchMedia in the browser
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}
