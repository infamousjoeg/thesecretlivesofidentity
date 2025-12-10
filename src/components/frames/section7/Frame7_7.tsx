import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 7-7: Why Stability Matters
 * Visual: Policies reference SPIFFE ID, not SVIDs
 */
export const Frame7_7: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);

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
          Why Stability Matters
        </motion.text>

        {/* Policy box */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={200} y={100} width={400} height={150} rx={8} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
          <text x={400} y={130} textAnchor="middle" fill={colors.warning} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Authorization Policy
          </text>
          <rect x={230} y={150} width={340} height={80} rx={4} fill={`${colors.warning}10`} />
          <text x={250} y={175} fill={colors.textSecondary} fontSize={12} fontFamily="JetBrains Mono, monospace">
            allow:
          </text>
          <text x={270} y={200} fill={colors.success} fontSize={12} fontFamily="JetBrains Mono, monospace">
            spiffe://acme/payments/api
          </text>
          <text x={250} y={220} fill={colors.textSecondary} fontSize={12} fontFamily="JetBrains Mono, monospace">
            → database.read
          </text>
        </motion.g>

        {/* SVID rotation happening */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={280} width={400} height={60} rx={6} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={1} strokeDasharray="6 3" />
            <text x={400} y={305} textAnchor="middle" fill={colors.svid} fontSize={12}>SVID rotates: v1 → v2 → v3 → v4...</text>
            <text x={400} y={325} textAnchor="middle" fill={colors.textMuted} fontSize={11}>Keys change, certificates change</text>
          </motion.g>
        )}

        {/* Policies unaffected */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={250} y={360} width={300} height={50} rx={8} fill={colors.success} />
            <text x={400} y={390} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">
              Policy still works! ✓
            </text>
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={450} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Policies reference SPIFFE IDs, not SVIDs
            </text>
            <text x={400} y={475} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Rotation doesn't break authorization
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
