import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { animationTiming } from '@/utils/constants';

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Animation type: 'typing' types character by character, 'words' fades in word by word */
  variant?: 'typing' | 'words' | 'fade';
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Speed of typing animation (ms per character) */
  typingSpeed?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  variant = 'fade',
  delay = 0,
  typingSpeed = animationTiming.typingSpeed,
  onComplete,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Handle typing animation
  useEffect(() => {
    if (variant !== 'typing' || prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, variant, delay, typingSpeed, prefersReducedMotion, onComplete]);

  // For reduced motion or instant display
  if (prefersReducedMotion || variant === 'fade') {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay / 1000 }}
      >
        {text}
      </motion.span>
    );
  }

  // Typing animation
  if (variant === 'typing') {
    return (
      <span className={className} aria-label={text}>
        {displayedText}
        {!isComplete && (
          <motion.span
            className="inline-block w-0.5 h-[1em] bg-current ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </span>
    );
  }

  // Word by word animation
  if (variant === 'words') {
    const words = text.split(' ');
    return (
      <span className={className} aria-label={text}>
        <AnimatePresence>
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: delay / 1000 + index * 0.1,
              }}
            >
              {word}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    );
  }

  return <span className={className}>{text}</span>;
};
