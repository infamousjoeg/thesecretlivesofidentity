import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-3: The Badge Metaphor
 * Visual: Two employees showing badges to each other
 */
export const Frame6_3: React.FC = () => {
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

        {/* Two people with badges */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Person A */}
          <circle cx={200} cy={180} r={40} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
          <text x={200} y={190} textAnchor="middle" fontSize={30}>👤</text>
          <text x={200} y={250} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold">Alice</text>

          {/* Person B */}
          <circle cx={600} cy={180} r={40} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
          <text x={600} y={190} textAnchor="middle" fontSize={30}>👤</text>
          <text x={600} y={250} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold">Bob</text>
        </motion.g>

        {/* Badges being shown */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge spiffeId="Alice @ Acme" position={{ x: 300, y: 160 }} state="valid" size={50} animate={!prefersReducedMotion} />
            <line x1={245} y1={180} x2={270} y2={170} stroke={colors.agent} strokeWidth={2} />
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge spiffeId="Bob @ Acme" position={{ x: 500, y: 160 }} state="valid" size={50} animate={!prefersReducedMotion} />
            <line x1={555} y1={180} x2={530} y2={170} stroke={colors.svid} strokeWidth={2} />
          </motion.g>
        )}

        {/* Checkmarks */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <circle cx={350} cy={220} r={15} fill={colors.success} />
            <text x={350} y={226} textAnchor="middle" fill="white" fontSize={14}>✓</text>

            <circle cx={450} cy={220} r={15} fill={colors.success} />
            <text x={450} y={226} textAnchor="middle" fill="white" fontSize={14}>✓</text>
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={320} width={500} height={130} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={360} textAnchor="middle" fill={colors.textPrimary} fontSize={16} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Like two employees meeting
            </text>
            <text x={400} y={395} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Both show their badges before
            </text>
            <text x={400} y={420} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              discussing anything sensitive
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
