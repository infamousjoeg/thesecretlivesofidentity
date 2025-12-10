import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-1: You Have Identity. Now What?
 * Visual: Workload with SVID, wondering how to use it
 */
export const Frame6_1: React.FC = () => {
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
          You Have Identity. Now What?
        </motion.text>

        {/* Workload with badge */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Workload
            label="my-service"
            position={{ x: 250, y: 200 }}
            attested={true}
            animate={!prefersReducedMotion}
            size={70}
          />
          <Badge
            spiffeId="spiffe://acme/my-service"
            position={{ x: 250, y: 310 }}
            state="valid"
            size={60}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Question marks */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={450} y={180} fill={colors.textMuted} fontSize={30}>?</text>
            <text x={500} y={220} fill={colors.textMuted} fontSize={24}>?</text>
            <text x={470} y={260} fill={colors.textMuted} fontSize={28}>?</text>
          </motion.g>
        )}

        {/* Other services */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Workload label="database" position={{ x: 600, y: 150 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Workload label="cache" position={{ x: 650, y: 250 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Workload label="api" position={{ x: 600, y: 350 }} attested={true} animate={!prefersReducedMotion} size={50} />
          </motion.g>
        )}

        {/* Question */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={410} width={500} height={60} rx={8} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
            <text x={400} y={445} textAnchor="middle" fill={colors.textPrimary} fontSize={16} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              How do I securely communicate with other services?
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
