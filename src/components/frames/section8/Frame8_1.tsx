import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { TrustBundle } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-1: Beyond Single Domains
 * Visual: Multiple trust domains
 */
export const Frame8_1: React.FC = () => {
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
          Beyond Single Domains
        </motion.text>

        {/* Single domain */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={250} y={100} width={300} height={150} rx={12} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={400} y={130} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold">
            acme.com
          </text>
          <TrustBundle position={{ x: 400, y: 180 }} size={50} animate={!prefersReducedMotion} />
          <text x={400} y={235} textAnchor="middle" fill={colors.textMuted} fontSize={11}>Your trust domain</text>
        </motion.g>

        {/* Multiple domains */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={300} width={180} height={100} rx={8} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
            <text x={190} y={330} textAnchor="middle" fill={colors.svid} fontSize={12} fontWeight="bold">partner.io</text>

            <rect x={310} y={300} width={180} height={100} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
            <text x={400} y={330} textAnchor="middle" fill={colors.agent} fontSize={12} fontWeight="bold">vendor.net</text>

            <rect x={520} y={300} width={180} height={100} rx={8} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={610} y={330} textAnchor="middle" fill={colors.warning} fontSize={12} fontWeight="bold">cloud.xyz</text>
          </motion.g>
        )}

        {/* Question marks */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={190} y={380} textAnchor="middle" fill={colors.textMuted} fontSize={20}>?</text>
            <text x={400} y={380} textAnchor="middle" fill={colors.textMuted} fontSize={20}>?</text>
            <text x={610} y={380} textAnchor="middle" fill={colors.textMuted} fontSize={20}>?</text>
          </motion.g>
        )}

        {/* Question */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={450} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              How do different trust domains communicate?
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
