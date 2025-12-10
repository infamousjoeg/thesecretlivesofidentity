import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '@/store/visualizationStore';
import { useReducedMotion } from '@/hooks';

export const ProgressBar: React.FC = () => {
  const { percentage, current, total } = useProgress();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-surface">
      <motion.div
        className="h-full bg-gradient-to-r from-server via-agent to-svid"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: 'easeOut',
        }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Progress: ${current} of ${total} frames`}
      />
      <span className="sr-only">
        Frame {current} of {total}
      </span>
    </div>
  );
};
