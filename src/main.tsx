import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import './style.css';
import './mobile.css'; // OrbitFlow Mobile Design System â€” intentional mobile UI spec

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && window.innerWidth >= 1024 && !window.matchMedia('(pointer: coarse)').matches) {
  void import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1, // Standard touch response
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  });
}

import { SubTabProvider } from './hooks/useSubTab';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SubTabProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SubTabProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
