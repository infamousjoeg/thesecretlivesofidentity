import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFrameNavigation, useKeyboardNav, useReducedMotion } from '@/hooks';

interface FrameProps {
  children: React.ReactNode;
}

export const Frame: React.FC<FrameProps> = ({ children }) => {
  const {
    section,
    frame,
    currentSection,
    currentFrame,
    isFirstFrame,
    isLastFrame,
    nextFrame,
    prevFrame,
  } = useFrameNavigation();
  const prefersReducedMotion = useReducedMotion();

  // Enable keyboard navigation
  useKeyboardNav({ enabled: true });

  if (!section || !frame) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-textMuted">
        Loading...
      </div>
    );
  }

  return (
    <main
      role="main"
      aria-label={`Section ${currentSection + 1}, Frame ${currentFrame + 1}: ${frame.title}`}
      className="relative min-h-[calc(100vh-4rem)] pt-20 pb-24 lg:pl-64"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section and Frame indicator */}
        <div className="mb-4 flex items-center gap-2 text-sm text-textMuted">
          <span className="px-2 py-0.5 bg-surface rounded text-textSecondary">
            {section.title}
          </span>
          <span>•</span>
          <span>
            Frame {currentFrame + 1} of {section.frames.length}
          </span>
        </div>

        {/* Frame Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-textPrimary mb-6">
          {frame.title}
        </h1>

        {/* Frame Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${currentFrame}`}
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: 50 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Content text */}
            <p className="text-lg sm:text-xl text-textSecondary mb-8 max-w-3xl">
              {frame.content}
            </p>

            {/* Visualization area */}
            <div className="relative">{children}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <nav
        className="fixed bottom-0 left-0 right-0 lg:left-64 bg-background/90 backdrop-blur-md border-t border-textMuted/20 py-4"
        aria-label="Frame navigation"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={prevFrame}
            disabled={isFirstFrame}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isFirstFrame
                ? 'text-textMuted cursor-not-allowed'
                : 'text-textSecondary hover:text-textPrimary hover:bg-surface'
            }`}
            aria-label="Previous frame"
            aria-keyshortcuts="ArrowLeft"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-textMuted hidden sm:inline">
              Press{' '}
              <kbd className="px-1.5 py-0.5 bg-surface rounded text-textSecondary">
                ←
              </kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-surface rounded text-textSecondary">
                →
              </kbd>{' '}
              to navigate
            </span>
          </div>

          <button
            onClick={nextFrame}
            disabled={isLastFrame}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isLastFrame
                ? 'text-textMuted cursor-not-allowed'
                : 'bg-server text-white hover:bg-opacity-90'
            }`}
            aria-label="Next frame"
            aria-keyshortcuts="ArrowRight Space"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </main>
  );
};
