import { useEffect, useState, useCallback } from 'react';

export function useHorizontalScroll() {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const ref = useCallback((el: HTMLDivElement | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    const el = node;
    if (!el) return;

    // --- 1. Mouse Wheel Horizontal Scroll Integration ---
    const onWheel = (e: WheelEvent) => {
      // If there is no horizontal scroll space, do not intercept
      if (el.scrollWidth <= el.clientWidth) return;

      if (e.deltaX !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
      } else if (e.shiftKey && e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    // --- 2. Mouse Drag-to-Scroll ("Drager") Implementation ---
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastTime = 0;
    let lastX = 0;
    let animationFrameId: number | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      isDown = true;
      el.classList.add('active-dragging');
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';

      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      lastX = e.pageX;
      lastTime = Date.now();
      velocity = 0;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!isDown) return;
      isDown = false;
      el.classList.remove('active-dragging');
      el.style.cursor = 'grab';
      el.style.removeProperty('user-select');
      applyMomentum();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!isDown) return;
      isDown = false;
      el.classList.remove('active-dragging');
      el.style.cursor = 'grab';
      el.style.removeProperty('user-select');
      applyMomentum();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;

      const now = Date.now();
      const elapsed = now - lastTime;
      if (elapsed > 0) {
        const deltaX = e.pageX - lastX;
        velocity = deltaX / elapsed;
        lastTime = now;
        lastX = e.pageX;
      }

      el.scrollLeft = scrollLeft - walk;
    };

    const applyMomentum = () => {
      if (Math.abs(velocity) < 0.05) return;
      
      const step = () => {
        el.scrollLeft -= velocity * 16;
        velocity *= 0.92;
        
        if (Math.abs(velocity) > 0.05) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          animationFrameId = null;
        }
      };
      
      animationFrameId = requestAnimationFrame(step);
    };

    el.style.cursor = el.scrollWidth > el.clientWidth ? 'grab' : 'default';
    el.style.touchAction = 'auto';
    el.setAttribute('data-lenis-prevent', 'true');

    const resizeObserver = new ResizeObserver(() => {
      el.style.cursor = el.scrollWidth > el.clientWidth ? 'grab' : 'default';
    });
    resizeObserver.observe(el);

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointerleave', onPointerLeave);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointermove', onPointerMove);

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointerleave', onPointerLeave);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointermove', onPointerMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [node]);

  return ref;
}
