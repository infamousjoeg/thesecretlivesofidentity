import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-6: SPIFFE ID Stays Stable
 * Visual: SVID rotating but SPIFFE ID unchanged
 */
export const Frame7_6: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500, 600]);
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
          SPIFFE ID Stays Stable
        </motion.text>

        {/* Stable SPIFFE ID */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={200} y={90} width={400} height={50} rx={8} fill={colors.success} />
          <text x={400} y={120} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
            spiffe://acme/payments/api
          </text>
          <text x={400} y={160} textAnchor="middle" fill={colors.success} fontSize={13} fontWeight="bold">
            ↑ Never changes
          </text>
        </motion.g>

        {/* Rotating SVIDs below */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge spiffeId="SVID v1" position={{ x: 200, y: 280 }} state="expired" size={60} animate={!prefersReducedMotion} />
            <text x={200} y={330} textAnchor="middle" fill={colors.textMuted} fontSize={11}>expired</text>
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge spiffeId="SVID v2" position={{ x: 350, y: 280 }} state="expired" size={60} animate={!prefersReducedMotion} />
            <text x={350} y={330} textAnchor="middle" fill={colors.textMuted} fontSize={11}>expired</text>
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge spiffeId="SVID v3" position={{ x: 500, y: 280 }} state="valid" size={60} animate={!prefersReducedMotion} />
            <text x={500} y={330} textAnchor="middle" fill={colors.success} fontSize={11} fontWeight="bold">current</text>
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Badge spiffeId="SVID v4" position={{ x: 650, y: 280 }} state="valid" size={60} animate={!prefersReducedMotion} />
            <text x={650} y={330} textAnchor="middle" fill={colors.textMuted} fontSize={11}>next</text>
          </motion.g>
        )}

        {/* Arrow showing rotation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <path d="M 200 350 Q 400 400 650 350" fill="none" stroke={colors.svid} strokeWidth={2} markerEnd="url(#arr7-6)" />
            <text x={400} y={390} textAnchor="middle" fill={colors.svid} fontSize={12}>SVIDs rotate over time</text>
            <defs>
              <marker id="arr7-6" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={colors.svid} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={420} width={400} height={55} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={453} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Your identity (SPIFFE ID) never changes
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
