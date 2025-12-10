import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-11: OIDC Federation
 * Visual: SPIRE to cloud IAM bridge
 */
export const Frame8_11: React.FC = () => {
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
          OIDC Federation
        </motion.text>

        {/* SPIRE side */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={150} width={200} height={200} rx={12} fill={colors.surface} stroke={colors.server} strokeWidth={2} />
          <SpireServer label="SPIRE" position={{ x: 200, y: 220 }} animate={!prefersReducedMotion} size={60} />
          <text x={200} y={280} textAnchor="middle" fill={colors.server} fontSize={12}>SPIRE Server</text>
          <text x={200} y={310} textAnchor="middle" fill={colors.textMuted} fontSize={10}>(OIDC Provider)</text>
        </motion.g>

        {/* Cloud IAM */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={500} y={150} width={200} height={200} rx={12} fill={`${colors.warning}10`} stroke={colors.warning} strokeWidth={2} />
            <text x={600} y={190} textAnchor="middle" fill={colors.warning} fontSize={14} fontWeight="bold">Cloud IAM</text>
            <text x={600} y={240} textAnchor="middle" fontSize={40}>☁️</text>
            <text x={600} y={290} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>AWS/GCP/Azure</text>
            <text x={600} y={310} textAnchor="middle" fill={colors.textMuted} fontSize={10}>(Workload Identity)</text>
          </motion.g>
        )}

        {/* OIDC flow */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={305} y1={230} x2={495} y2={230} stroke={colors.svid} strokeWidth={3} markerEnd="url(#oidc-arr)" />
            <text x={400} y={215} textAnchor="middle" fill={colors.svid} fontSize={11} fontWeight="bold">JWT-SVID</text>
            <text x={400} y={255} textAnchor="middle" fill={colors.textMuted} fontSize={10}>OIDC Token</text>
            <defs>
              <marker id="oidc-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.svid} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Result */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={390} width={500} height={80} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={420} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Bridge workload identity to cloud IAM
            </text>
            <text x={400} y={450} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Access cloud resources using your SPIFFE identity
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
