import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-3: Node Attestation
 * Visual: Definition and purpose of node attestation
 */
export const Frame4_3: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600]);
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
          fontSize={26}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Node Attestation
        </motion.text>

        {/* Definition */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={150} y={90} width={500} height={60} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={400} y={125} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
            <tspan fontWeight="bold">Node Attestation</tspan>: Proving an Agent is running on
          </text>
          <text x={400} y={145} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
            a legitimate, authorized node
          </text>
        </motion.g>

        {/* Visual */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Platform */}
            <rect x={350} y={200} width={300} height={150} rx={12} fill={`${colors.success}10`} stroke={colors.success} strokeWidth={2} strokeDasharray="10 5" />
            <text x={500} y={225} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              PLATFORM (AWS / K8s / GCP)
            </text>

            {/* Agent inside platform */}
            <SpireAgent label="Agent" position={{ x: 500, y: 300 }} size={60} active={true} animate={!prefersReducedMotion} />

            {/* Server */}
            <SpireServer label="Server" position={{ x: 150, y: 280 }} size={60} animate={!prefersReducedMotion} />

            {/* Arrow from platform to server */}
            <line x1={350} y1={270} x2={210} y2={270} stroke={colors.success} strokeWidth={2} />
            <polygon points="200,270 215,263 215,277" fill={colors.success} />
            <text x={280} y={260} textAnchor="middle" fill={colors.success} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              "This Agent is legit"
            </text>
          </motion.g>
        )}

        {/* Key points */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={380} width={600} height={90} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={410} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              The platform provides <tspan fill={colors.success} fontWeight="bold">cryptographic proof</tspan> that:
            </text>
            <text x={300} y={440} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              ✓ The node exists
            </text>
            <text x={500} y={440} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              ✓ The Agent runs on it
            </text>
            <text x={400} y={460} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              ✓ It matches expected properties
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
