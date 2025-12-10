import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { TrustBundle } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-6: The Badge Metaphor (Trust Bundle)
 * Visual: List of partner companies whose badges you accept
 */
export const Frame6_6: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={50}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={24}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          The Badge Metaphor
        </motion.text>

        {/* Card reader */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={300} y={120} width={200} height={150} rx={12} fill={colors.surface} stroke={colors.trustBundle} strokeWidth={3} />
          <rect x={340} y={140} width={120} height={20} rx={4} fill={colors.trustBundle} opacity={0.3} />
          <text x={400} y={195} textAnchor="middle" fill={colors.trustBundle} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Card Reader
          </text>
          <circle cx={400} cy={230} r={15} fill={colors.trustBundle} opacity={0.2} />
          <text x={400} y={236} textAnchor="middle" fill={colors.trustBundle} fontSize={16}>🔒</text>
        </motion.g>

        {/* Trust bundle as list */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TrustBundle position={{ x: 650, y: 200 }} size={60} animate={!prefersReducedMotion} />
            <rect x={550} y={280} width={200} height={120} rx={8} fill={colors.surface} stroke={colors.trustBundle} strokeWidth={1} />
            <text x={650} y={305} textAnchor="middle" fill={colors.trustBundle} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Accepted Badges:
            </text>
            <text x={570} y={330} fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">✓ Acme Corp</text>
            <text x={570} y={350} fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">✓ Partner Inc</text>
            <text x={570} y={370} fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">✓ Trusted Co</text>
          </motion.g>
        )}

        {/* Connection */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={505} y1={200} x2={585} y2={200} stroke={colors.trustBundle} strokeWidth={2} strokeDasharray="6 3" />
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={420} width={600} height={60} rx={8} fill={`${colors.trustBundle}15`} stroke={colors.trustBundle} strokeWidth={1} />
            <text x={400} y={455} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              The trust bundle is like the list of companies whose badges your card readers accept
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
