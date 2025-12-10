import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-1: SVIDs Don't Last Forever
 * Visual: Badge with countdown timer
 */
export const Frame7_1: React.FC = () => {
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
          SVIDs Don't Last Forever
        </motion.text>

        {/* Badge with expiration */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            spiffeId="spiffe://acme/service"
            position={{ x: 400, y: 200 }}
            state="valid"
            size={100}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Clock/timer emphasis */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <circle cx={550} cy={180} r={40} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={550} y={175} textAnchor="middle" fill={colors.warning} fontSize={24}>⏱️</text>
            <text x={550} y={200} textAnchor="middle" fill={colors.warning} fontSize={12} fontWeight="bold">01:00</text>
          </motion.g>
        )}

        {/* Timeline */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={320} width={400} height={8} rx={4} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <rect x={200} y={320} width={100} height={8} rx={4} fill={colors.warning} />
            <text x={200} y={355} fill={colors.textSecondary} fontSize={11}>Now</text>
            <text x={600} y={355} textAnchor="end" fill={colors.textSecondary} fontSize={11}>Expiration</text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={400} width={500} height={70} rx={8} fill={`${colors.warning}15`} stroke={colors.warning} strokeWidth={1} />
            <text x={400} y={430} textAnchor="middle" fill={colors.textPrimary} fontSize={16} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              SVIDs are short-lived by design
            </text>
            <text x={400} y={455} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Minutes to hours, not months or years
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
