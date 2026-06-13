// src/components/hero/WorkSmarterHeading.tsx
import React, { useEffect, useState } from 'react';
import './typing.css';

const phrases = ['Work smarter', 'Achieve more', 'AI automation'];

export const WorkSmarterHeading: React.FC = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 50; // ms per character (medium)
  const pauseDuration = 1000; // ms pause after full phrase

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    if (charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentPhrase.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      // phrase complete, pause then move to next
      const timeout = setTimeout(() => {
        setText('');
        setCharIndex(0);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, phraseIndex]);

  return (
    <h1 className="gradient-text mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight md:text-7xl">
      {text}
    </h1>
  );
};

// CSS for gradient text and blinking cursor is in typing.css
