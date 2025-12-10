import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { TrustBundle } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-4: How Federation Works
 * Visual: Trust bundle exchange flow
 */
export const Frame8_4: React.FC = () => {
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
          How Federation Works
        </motion.text>

        {/* Domain A */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={120} width={200} height={150} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={200} y={150} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold">Domain A</text>
          <TrustBundle position={{ x: 200, y: 210 }} size={40} animate={!prefersReducedMotion} />
        </motion.g>

        {/* Domain B */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <rect x={500} y={120} width={200} height={150} rx={8} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
          <text x={600} y={150} textAnchor="middle" fill={colors.svid} fontSize={14} fontWeight="bold">Domain B</text>
          <TrustBundle position={{ x: 600, y: 210 }} size={40} animate={!prefersReducedMotion} />
        </motion.g>

        {/* Step 1 */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={300} width={500} height={40} rx={6} fill={`${colors.trustBundle}15`} stroke={colors.trustBundle} strokeWidth={1} />
            <text x={400} y={325} textAnchor="middle" fill={colors.trustBundle} fontSize={12}>
              1. Domains exchange trust bundles (public keys)
            </text>
          </motion.g>
        )}

        {/* Step 2 */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={355} width={500} height={40} rx={6} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={380} textAnchor="middle" fill={colors.success} fontSize={12}>
              2. Each domain learns to verify the other's SVIDs
            </text>
          </motion.g>
        )}

        {/* Step 3 */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={410} width={500} height={40} rx={6} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={1} />
            <text x={400} y={435} textAnchor="middle" fill={colors.svid} fontSize={12}>
              3. Cross-domain workloads can now authenticate!
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
