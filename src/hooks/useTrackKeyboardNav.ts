/**
 * useTrackKeyboardNav - Keyboard navigation for track-based visualization
 *
 * Handles keyboard shortcuts within a learning track context.
 */

import { useEffect, useCallback } from 'react';
import { keyboardShortcuts } from '@/utils/constants';

interface UseTrackKeyboardNavOptions {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Navigate to next frame */
  onNext: () => void;
  /** Navigate to previous frame */
  onPrev: () => void;
  /** Navigate to first frame */
  onFirst?: () => void;
  /** Navigate to last frame */
  onLast?: () => void;
  /** Callback when Escape is pressed */
  onEscape?: () => void;
}

/**
 * Hook to handle keyboard navigation for track-based visualization
 */
export const useTrackKeyboardNav = (options: UseTrackKeyboardNavOptions) => {
  const { enabled = true, onNext, onPrev, onFirst, onLast, onEscape } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Don't handle if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = event.key;

      // Next frame: Right arrow or Space
      if (keyboardShortcuts.nextFrame.includes(key)) {
        event.preventDefault();
        onNext();
        return;
      }

      // Previous frame: Left arrow
      if (keyboardShortcuts.prevFrame.includes(key)) {
        event.preventDefault();
        onPrev();
        return;
      }

      // First frame: Home
      if (keyboardShortcuts.firstFrame.includes(key) && onFirst) {
        event.preventDefault();
        onFirst();
        return;
      }

      // Last frame: End
      if (keyboardShortcuts.lastFrame.includes(key) && onLast) {
        event.preventDefault();
        onLast();
        return;
      }

      // Escape: Close interactive/modal
      if (keyboardShortcuts.escape.includes(key)) {
        event.preventDefault();
        if (onEscape) {
          onEscape();
        }
        return;
      }
    },
    [enabled, onNext, onPrev, onFirst, onLast, onEscape]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
};
