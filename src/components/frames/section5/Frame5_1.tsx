import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-1: Node Trusted. Now What?
 * Visual: Attested Agent with workloads needing identity
 */
export const Frame5_1: React.FC = () => {
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
          Node Trusted. Now What?
        </motion.text>

        {/* Attested Agent */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireAgent
            label="SPIRE Agent"
            position={{ x: 400, y: 150 }}
            active={true}
            animate={!prefersReducedMotion}
            size={70}
          />
          <text x={400} y={200} textAnchor="middle" fill={colors.success} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            ✓ Node Attested
          </text>
        </motion.g>

        {/* Workloads waiting */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Workload label="api" position={{ x: 200, y: 350 }} attested={false} animate={!prefersReducedMotion} />
            <Workload label="worker" position={{ x: 400, y: 350 }} attested={false} animate={!prefersReducedMotion} />
            <Workload label="cache" position={{ x: 600, y: 350 }} attested={false} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Question marks */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={200} y={290} textAnchor="middle" fill={colors.warning} fontSize={24}>?</text>
            <text x={400} y={290} textAnchor="middle" fill={colors.warning} fontSize={24}>?</text>
            <text x={600} y={290} textAnchor="middle" fill={colors.warning} fontSize={24}>?</text>
          </motion.g>
        )}

        {/* Message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={450} textAnchor="middle" fill={colors.textPrimary} fontSize={16} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Workloads on this node need their own identities
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
