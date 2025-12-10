import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent, Badge, TrustBundle } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 9-1: What We've Learned
 * Visual: Summary of all key concepts
 */
export const Frame9_1: React.FC = () => {
  const { phase } = useAnimationPhase([0, 400, 400, 400, 400]);
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
          What We've Learned
        </motion.text>

        {/* SPIFFE */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <rect x={100} y={100} width={150} height={80} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
          <text x={175} y={130} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold">SPIFFE</text>
          <text x={175} y={155} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>Universal workload</text>
          <text x={175} y={170} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>identity standard</text>
        </motion.g>

        {/* SPIRE */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={280} y={100} width={150} height={80} rx={8} fill={`${colors.server}15`} stroke={colors.server} strokeWidth={2} />
            <text x={355} y={130} textAnchor="middle" fill={colors.server} fontSize={14} fontWeight="bold">SPIRE</text>
            <text x={355} y={155} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>The reference</text>
            <text x={355} y={170} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>implementation</text>
          </motion.g>
        )}

        {/* SVIDs */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={460} y={100} width={150} height={80} rx={8} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={2} />
            <text x={535} y={130} textAnchor="middle" fill={colors.svid} fontSize={14} fontWeight="bold">SVIDs</text>
            <text x={535} y={155} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>Short-lived proof</text>
            <text x={535} y={170} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>documents</text>
          </motion.g>
        )}

        {/* Trust Domains */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={640} y={100} width={150} height={80} rx={8} fill={`${colors.trustBundle}15`} stroke={colors.trustBundle} strokeWidth={2} />
            <text x={715} y={130} textAnchor="middle" fill={colors.trustBundle} fontSize={14} fontWeight="bold">Trust Domains</text>
            <text x={715} y={155} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>Security</text>
            <text x={715} y={170} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>boundaries</text>
          </motion.g>
        )}

        {/* Visual summary */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpireServer label="" position={{ x: 400, y: 280 }} animate={!prefersReducedMotion} size={50} />
            <SpireAgent label="" position={{ x: 250, y: 350 }} active={true} animate={!prefersReducedMotion} size={40} />
            <SpireAgent label="" position={{ x: 550, y: 350 }} active={true} animate={!prefersReducedMotion} size={40} />
            <Badge spiffeId="" position={{ x: 250, y: 420 }} state="valid" size={35} animate={!prefersReducedMotion} />
            <Badge spiffeId="" position={{ x: 550, y: 420 }} state="valid" size={35} animate={!prefersReducedMotion} />
            <TrustBundle position={{ x: 400, y: 420 }} size={35} animate={!prefersReducedMotion} />

            <line x1={400} y1={310} x2={270} y2={330} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4 2" />
            <line x1={400} y1={310} x2={530} y2={330} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {/* Summary text */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <text x={400} y={480} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              The complete identity infrastructure for modern workloads
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
