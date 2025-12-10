import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-11: Zero Trust Foundation
 * Visual: SPIFFE as the foundation for zero trust
 */
export const Frame6_11: React.FC = () => {
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
          Zero Trust Foundation
        </motion.text>

        {/* Zero Trust principle */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={200} y={90} width={400} height={50} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
          <text x={400} y={120} textAnchor="middle" fill={colors.success} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Never trust, always verify
          </text>
        </motion.g>

        {/* Visual representation */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Multiple workloads verifying each other */}
            <Workload label="A" position={{ x: 200, y: 250 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Workload label="B" position={{ x: 400, y: 250 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Workload label="C" position={{ x: 600, y: 250 }} attested={true} animate={!prefersReducedMotion} size={50} />

            {/* Badges */}
            <Badge spiffeId="A" position={{ x: 200, y: 320 }} state="valid" size={35} animate={!prefersReducedMotion} />
            <Badge spiffeId="B" position={{ x: 400, y: 320 }} state="valid" size={35} animate={!prefersReducedMotion} />
            <Badge spiffeId="C" position={{ x: 600, y: 320 }} state="valid" size={35} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Verification lines */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={260} y1={240} x2={340} y2={240} stroke={colors.success} strokeWidth={2} markerEnd="url(#arr6-11)" />
            <line x1={340} y1={260} x2={260} y2={260} stroke={colors.success} strokeWidth={2} markerEnd="url(#arr6-11)" />

            <line x1={460} y1={240} x2={540} y2={240} stroke={colors.success} strokeWidth={2} markerEnd="url(#arr6-11)" />
            <line x1={540} y1={260} x2={460} y2={260} stroke={colors.success} strokeWidth={2} markerEnd="url(#arr6-11)" />

            <text x={300} y={220} textAnchor="middle" fill={colors.success} fontSize={10}>verify</text>
            <text x={500} y={220} textAnchor="middle" fill={colors.success} fontSize={10}>verify</text>

            <defs>
              <marker id="arr6-11" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={colors.success} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={380} width={600} height={90} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={415} textAnchor="middle" fill={colors.textPrimary} fontSize={16} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              SPIFFE provides the identity foundation for zero trust
            </text>
            <text x={400} y={445} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Verify explicitly. Never assume trust based on network location.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
