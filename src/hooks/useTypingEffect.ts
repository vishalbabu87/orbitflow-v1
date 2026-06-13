// src/hooks/useTypingEffect.ts
import { useState, useEffect, useRef } from 'react';

type UseTypingEffectParams = {
  texts: string[]; // list of texts to type out sequentially
  typingSpeed?: number; // ms per character
  pauseDuration?: number; // ms to pause after a word is completed
  deleteSpeed?: number; // ms per character when deleting
};

/**
 * Custom hook that returns the current text being typed.
 * It cycles through the provided `texts` array, typing each string
 * character-by-character, pausing, then deleting before moving to the next.
 */
export const useTypingEffect = ({
  texts,
  typingSpeed = 50,
  pauseDuration = 1000,
  deleteSpeed = 30,
}: UseTypingEffectParams): string => {
  const [display, setDisplay] = useState('');
  const textIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const currentText = texts[textIndex.current];
    const timeout = setTimeout(
      () => {
        if (!deleting.current) {
          // typing forward
          if (charIndex.current < currentText.length) {
            charIndex.current += 1;
            setDisplay(currentText.slice(0, charIndex.current));
          } else {
            // finished typing, pause then start deleting
            deleting.current = true;
          }
        } else {
          // deleting
          if (charIndex.current > 0) {
            charIndex.current -= 1;
            setDisplay(currentText.slice(0, charIndex.current));
          } else {
            // finished deleting, move to next text
            deleting.current = false;
            textIndex.current = (textIndex.current + 1) % texts.length;
          }
        }
      },
      deleting.current ? deleteSpeed : typingSpeed
    );

    // Pause after full word typed before deleting starts
    if (!deleting.current && charIndex.current === currentText.length) {
      const pause = setTimeout(() => {
        // trigger next tick which will start deleting
      }, pauseDuration);
      return () => clearTimeout(pause);
    }

    return () => clearTimeout(timeout);
  }, [display, texts, typingSpeed, pauseDuration, deleteSpeed]);

  return display;
};
