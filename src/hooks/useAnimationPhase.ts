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

  // Callers pass a fresh array literal every render (e.g. `useAnimationPhase([0, 500])`),
  // so depend on the durations' VALUES, not the array's identity — otherwise any
  // re-render mid-phase tears down and restarts the pending timer, stalling the
  // animation. A ref holds the latest array for reads without adding it as a dep.
  const phaseCount = phaseDurations.length;
  const durationsRef = useRef(phaseDurations);
  durationsRef.current = phaseDurations;
  const durationsKey = phaseDurations.join(',');

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
      if (next >= phaseCount) {
        if (!completedRef.current && onComplete) {
          completedRef.current = true;
          onComplete();
        }
        return prev; // Stay at last phase
      }
      return next;
    });
  }, [phaseCount, onComplete]);

  // Go to specific phase
  const goToPhase = useCallback((phase: number) => {
    clearPhaseTimeout();
    if (phase >= 0 && phase < phaseCount) {
      setCurrentPhase(phase);
      completedRef.current = false;
    }
  }, [phaseCount, clearPhaseTimeout]);

  // Reset to first phase
  const reset = useCallback(() => {
    clearPhaseTimeout();
    setCurrentPhase(0);
    completedRef.current = false;
  }, [clearPhaseTimeout]);

  // Skip to final phase
  const skipToEnd = useCallback(() => {
    clearPhaseTimeout();
    setCurrentPhase(phaseCount - 1);
    // Only fire onComplete once, matching nextPhase's guard, so a re-running
    // effect (e.g. under reduced motion) can't invoke it repeatedly.
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [phaseCount, onComplete, clearPhaseTimeout]);

  // Auto-advance through phases
  useEffect(() => {
    if (!autoAdvance) return;

    // If reduced motion, skip to end immediately
    if (prefersReducedMotion) {
      skipToEnd();
      return;
    }

    // Don't advance if at last phase
    if (currentPhase >= phaseCount - 1) return;

    const duration = durationsRef.current[currentPhase];
    timeoutRef.current = window.setTimeout(() => {
      nextPhase();
    }, duration);

    return clearPhaseTimeout;
    // durationsKey stands in for the durations array by value (see above),
    // so re-renders that only re-create the literal don't restart the timer.
  }, [
    currentPhase,
    durationsKey,
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
    totalPhases: phaseCount,
    /** Whether currently at the last phase */
    isComplete: currentPhase >= phaseCount - 1,
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
