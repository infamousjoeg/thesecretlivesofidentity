import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { timing } from '@/utils/animations';

interface TransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  className = '',
  delay = 0,
  duration = timing.normal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};
