import { useState, useEffect, useRef } from 'react';

interface UseLiveCounterOptions {
  drift: 'up' | 'down' | 'both';
  minStep: number;
  maxStep: number;
  intervalMs: number;
  decimals?: number;
}

export const useLiveCounter = (initialValue: number, options: UseLiveCounterOptions) => {
  const [value, setValue] = useState(initialValue);
  const valueRef = useRef(initialValue);
  const { drift, minStep, maxStep, intervalMs, decimals = 0 } = options;

  useEffect(() => {
    const interval = setInterval(() => {
      const step = Math.random() * (maxStep - minStep) + minStep;
      let delta = 0;

      if (drift === 'up') {
        delta = step;
      } else if (drift === 'down') {
        delta = -step;
      } else {
        delta = Math.random() > 0.5 ? step : -step;
      }

      valueRef.current += delta;

      // Prevent negative values unless drift is both/down and it makes sense
      if (valueRef.current < 0 && drift !== 'both') {
        valueRef.current = 0;
      }

      setValue(valueRef.current);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [drift, minStep, maxStep, intervalMs]);

  return Number(value.toFixed(decimals));
};
