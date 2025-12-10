// Timing presets
export const timing = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  dramatic: 1.2,
};

// Easing presets
export const easing = {
  easeOut: [0.0, 0.0, 0.2, 1] as const,
  easeIn: [0.4, 0.0, 1, 1] as const,
  easeInOut: [0.4, 0.0, 0.2, 1] as const,
  spring: { type: 'spring' as const, stiffness: 400, damping: 30 },
};

// Animation preset type - simple object with initial/animate/exit
interface AnimationPreset {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
}

// Common animation presets
export const fadeInUp: AnimationPreset = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const fadeInDown: AnimationPreset = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const fadeInLeft: AnimationPreset = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const fadeInRight: AnimationPreset = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const fadeIn: AnimationPreset = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn: AnimationPreset = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const slideInFromRight: AnimationPreset = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

// Entity-specific animations
export const badgePulse = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(245, 158, 11, 0.4)',
      '0 0 0 10px rgba(245, 158, 11, 0)',
    ],
  },
};

export const badgeExpire = {
  animate: {
    opacity: [1, 0.7, 1],
    scale: [1, 0.98, 1],
  },
};

export const shake = {
  animate: {
    x: [-5, 5, -5, 5, 0],
  },
};

export const glow = {
  initial: { filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))' },
  animate: {
    filter: [
      'drop-shadow(0 0 0px rgba(255,255,255,0))',
      'drop-shadow(0 0 8px rgba(255,255,255,0.6))',
      'drop-shadow(0 0 0px rgba(255,255,255,0))',
    ],
  },
};

// SVG path drawing
export const drawLine: AnimationPreset = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  exit: { pathLength: 0, opacity: 0 },
};

// Stagger container
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger helpers
export const staggerChildren = (staggerTime: number = 0.1) => ({
  staggerChildren: staggerTime,
});

export const staggerItems = (index: number, staggerTime: number = 0.1) => ({
  delay: index * staggerTime,
});

// Default transition
export const defaultTransition = {
  duration: timing.normal,
  ease: easing.easeOut,
};

// Reduced motion helper
export const withReducedMotion = (
  animation: AnimationPreset,
  prefersReducedMotion: boolean
): AnimationPreset => {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  return animation;
};

// Page transition
export const pageTransition: AnimationPreset = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Frame navigation transition
export const frameTransition: AnimationPreset = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

// Interactive component highlight
export const highlight = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.3,
    },
  },
};

// Success/Error feedback
export const successFeedback = {
  initial: { scale: 1, backgroundColor: 'transparent' },
  animate: {
    scale: [1, 1.1, 1],
    backgroundColor: ['transparent', 'rgba(34, 197, 94, 0.2)', 'transparent'],
    transition: { duration: 0.5 },
  },
};

export const errorFeedback = {
  initial: { scale: 1, x: 0 },
  animate: {
    scale: [1, 1.02, 1],
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.4 },
  },
};
