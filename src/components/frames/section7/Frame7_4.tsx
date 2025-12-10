import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-4: The Badge Metaphor
 * Visual: Auto-renewing badge at security desk
 */
export const Frame7_4: React.FC = () => {
  const { phase } = useAnimationPhase([0, 700, 700, 600]);
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

        {/* Security desk */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={300} y={120} width={200} height={120} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
          <text x={400} y={150} textAnchor="middle" fill={colors.agent} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Security Desk
          </text>
          <SpireAgent label="" position={{ x: 400, y: 190 }} active={true} animate={!prefersReducedMotion} size={50} />
        </motion.g>

        {/* Employee at work */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <circle cx={200} cy={330} r={35} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
          <text x={200} y={340} textAnchor="middle" fontSize={28}>👤</text>
          <text x={200} y={385} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Employee working</text>
        </motion.g>

        {/* Auto-renewal happening */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <path d="M 400 250 Q 400 300 300 330" fill="none" stroke={colors.agent} strokeWidth={2} strokeDasharray="6 3" />
            <Badge spiffeId="renewed" position={{ x: 320, y: 280 }} state="valid" size={40} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* No interruption */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={280} width={250} height={80} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={575} y={310} textAnchor="middle" fill={colors.success} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Zero interruption
            </text>
            <text x={575} y={335} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Employee never stops working
            </text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={420} width={500} height={55} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={453} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="Space Grotesk, sans-serif">
              Your badge auto-renews every hour. You never think about it.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
