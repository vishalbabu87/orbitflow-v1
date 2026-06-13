import { useState, useEffect } from 'react';

/**
 * Returns true when viewport width < breakpoint (default 768px).
 * Uses matchMedia so it reacts to DevTools resize instantly.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches); // sync on mount
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}
