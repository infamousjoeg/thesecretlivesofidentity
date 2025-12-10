import { useState, useEffect, useCallback, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseAnimationPhaseOptions {
  /** Whether to auto-advance through phases */
  autoAdvance?: boolean;
  /** Callback when all phases complete */
  onComplete?: () => void;
}

/**
 * Hook to manage animation phases within a frame
 * @param phaseDurations Array of durations for each phase in milliseconds
 * @param options Configuration options
 * @returns Current phase number and control functions
 */
export const useAnimationPhase = (
  phaseDurations: number[],
  options: UseAnimationPhaseOptions = {}
) => {
  const { autoAdvance = true, onComplete } = options;
  const [currentPhase, setCurrentPhase] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  // Clear any pending timeouts
  const clearPhaseTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Advance to next phase
  const nextPhase = useCallback(() => {
    setCurrentPhase((prev) => {
      const next = prev + 1;
      if (next >= phaseDurations.length) {
        if (!completedRef.current && onComplete) {
          completedRef.current = true;
          onComplete();
        }
        return prev; // Stay at last phase
      }
      return next;
    });
  }, [phaseDurations.length, onComplete]);

  // Go to specific phase
  const goToPhase = useCallback((phase: number) => {
    clearPhaseTimeout();
    if (phase >= 0 && phase < phaseDurations.length) {
      setCurrentPhase(phase);
      completedRef.current = false;
    }
  }, [phaseDurations.length, clearPhaseTimeout]);

  // Reset to first phase
  const reset = useCallback(() => {
    clearPhaseTimeout();
    setCurrentPhase(0);
    completedRef.current = false;
  }, [clearPhaseTimeout]);

  // Skip to final phase
  const skipToEnd = useCallback(() => {
    clearPhaseTimeout();
    setCurrentPhase(phaseDurations.length - 1);
    completedRef.current = true;
    if (onComplete) {
      onComplete();
    }
  }, [phaseDurations.length, onComplete, clearPhaseTimeout]);

  // Auto-advance through phases
  useEffect(() => {
    if (!autoAdvance) return;

    // If reduced motion, skip to end immediately
    if (prefersReducedMotion) {
      skipToEnd();
      return;
    }

    // Don't advance if at last phase
    if (currentPhase >= phaseDurations.length - 1) return;

    const duration = phaseDurations[currentPhase];
    timeoutRef.current = window.setTimeout(() => {
      nextPhase();
    }, duration);

    return clearPhaseTimeout;
  }, [
    currentPhase,
    phaseDurations,
    autoAdvance,
    prefersReducedMotion,
    nextPhase,
    skipToEnd,
    clearPhaseTimeout,
  ]);

  return {
    /** Current phase number (0-indexed) */
    phase: currentPhase,
    /** Total number of phases */
    totalPhases: phaseDurations.length,
    /** Whether currently at the last phase */
    isComplete: currentPhase >= phaseDurations.length - 1,
    /** Whether currently at the first phase */
    isFirst: currentPhase === 0,
    /** Advance to next phase manually */
    nextPhase,
    /** Go to specific phase */
    goToPhase,
    /** Reset to first phase */
    reset,
    /** Skip to final phase */
    skipToEnd,
  };
};
