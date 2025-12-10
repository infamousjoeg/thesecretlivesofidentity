import { useEffect, useCallback } from 'react';
import { useVisualizationStore } from '@/store/visualizationStore';
import { keyboardShortcuts } from '@/utils/constants';

interface UseKeyboardNavOptions {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Callback when Escape is pressed */
  onEscape?: () => void;
}

/**
 * Hook to handle keyboard navigation for the visualization
 * @param options Configuration options
 */
export const useKeyboardNav = (options: UseKeyboardNavOptions = {}) => {
  const { enabled = true, onEscape } = options;
  const { nextFrame, prevFrame, goToSection, goToFrame, getTotalSections } =
    useVisualizationStore();

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
        nextFrame();
        return;
      }

      // Previous frame: Left arrow
      if (keyboardShortcuts.prevFrame.includes(key)) {
        event.preventDefault();
        prevFrame();
        return;
      }

      // First frame: Home
      if (keyboardShortcuts.firstFrame.includes(key)) {
        event.preventDefault();
        goToFrame(0, 0);
        return;
      }

      // Last frame: End
      if (keyboardShortcuts.lastFrame.includes(key)) {
        event.preventDefault();
        const totalSections = getTotalSections();
        goToSection(totalSections - 1);
        // TODO: Go to last frame of last section
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

      // Section jump: 1-9
      if (keyboardShortcuts.sections.includes(key)) {
        const sectionIndex = parseInt(key, 10) - 1;
        const totalSections = getTotalSections();
        if (sectionIndex >= 0 && sectionIndex < totalSections) {
          event.preventDefault();
          goToSection(sectionIndex);
        }
        return;
      }
    },
    [enabled, nextFrame, prevFrame, goToFrame, goToSection, getTotalSections, onEscape]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
};
