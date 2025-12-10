import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-5: The Overlap Period
 * Visual: Old and new SVIDs both valid during transition
 */
export const Frame7_5: React.FC = () => {
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
          The Overlap Period
        </motion.text>

        {/* Timeline */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <line x1={100} y1={300} x2={700} y2={300} stroke={colors.textMuted} strokeWidth={2} />
          <text x={100} y={330} fill={colors.textSecondary} fontSize={11}>T0</text>
          <text x={400} y={330} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>T1</text>
          <text x={700} y={330} textAnchor="end" fill={colors.textSecondary} fontSize={11}>T2</text>
        </motion.g>

        {/* Old SVID bar */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          >
            <rect x={100} y={180} width={400} height={40} rx={6} fill={`${colors.warning}30`} stroke={colors.warning} strokeWidth={2} />
            <text x={300} y={205} textAnchor="middle" fill={colors.warning} fontSize={13} fontWeight="bold">Old SVID</text>
            <Badge spiffeId="old" position={{ x: 150, y: 200 }} state="expiring" size={30} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* New SVID bar */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          >
            <rect x={300} y={240} width={400} height={40} rx={6} fill={`${colors.success}30`} stroke={colors.success} strokeWidth={2} />
            <text x={500} y={265} textAnchor="middle" fill={colors.success} fontSize={13} fontWeight="bold">New SVID</text>
            <Badge spiffeId="new" position={{ x: 650, y: 260 }} state="valid" size={30} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Overlap highlight */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <rect x={300} y={175} width={200} height={110} rx={4} fill="none" stroke={colors.svid} strokeWidth={2} strokeDasharray="8 4" />
            <text x={400} y={160} textAnchor="middle" fill={colors.svid} fontSize={12} fontWeight="bold">OVERLAP</text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={380} width={500} height={80} rx={8} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={1} />
            <text x={400} y={415} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              New SVIDs issued before old ones expire
            </text>
            <text x={400} y={445} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              No gap = No interruption
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
