import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('orbitflow-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('orbitflow-theme', theme);
  }, [theme]);

  // Listen for system preference changes when no saved theme exists
  useEffect(() => {
    const saved = localStorage.getItem('orbitflow-theme');
    if (saved) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    // Inject style tag to disable all transitions instantly during theme toggle
    const css = window.document.createElement('style');
    css.appendChild(
      window.document.createTextNode(
        `* {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`
      )
    );
    window.document.head.appendChild(css);

    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    // Force repaint to make the transition disabling take effect immediately
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.getComputedStyle(css).opacity;

    // Remove the style block after a short delay
    setTimeout(() => {
      window.document.head.removeChild(css);
    }, 20);
  };

  return { theme, toggleTheme };
};

export default useTheme;
