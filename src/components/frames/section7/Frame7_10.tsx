import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-10: Lifecycle Complete
 * Visual: Complete lifecycle loop
 */
export const Frame7_10: React.FC = () => {
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
          Lifecycle Complete
        </motion.text>

        {/* Circular lifecycle */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle cx={400} cy={250} r={120} fill="none" stroke={colors.textMuted} strokeWidth={2} strokeDasharray="10 5" />
        </motion.g>

        {/* Issue */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={340} y={100} width={120} height={40} rx={6} fill={colors.success} />
            <text x={400} y={125} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">1. Issue</text>
            <Badge spiffeId="new" position={{ x: 400, y: 170 }} state="valid" size={30} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Use */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={500} y={230} width={100} height={40} rx={6} fill={colors.svid} />
            <text x={550} y={255} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">2. Use</text>
          </motion.g>
        )}

        {/* Rotate */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={340} y={340} width={120} height={40} rx={6} fill={colors.warning} />
            <text x={400} y={365} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">3. Rotate</text>
          </motion.g>
        )}

        {/* Repeat arrow */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={230} width={100} height={40} rx={6} fill={colors.agent} />
            <text x={250} y={255} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">4. Repeat</text>
          </motion.g>
        )}

        {/* Summary */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={410} width={500} height={70} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={440} textAnchor="middle" fill={colors.textPrimary} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Issue → Use → Rotate → Repeat
            </text>
            <text x={400} y={465} textAnchor="middle" fill={colors.success} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              All automatic. All cryptographic. No human intervention.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
