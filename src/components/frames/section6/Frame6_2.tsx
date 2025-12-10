import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-2: mTLS: Mutual Authentication
 * Visual: Two workloads establishing mTLS connection
 */
export const Frame6_2: React.FC = () => {
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
          mTLS: Mutual Authentication
        </motion.text>

        {/* Two workloads */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Workload label="Service A" position={{ x: 200, y: 200 }} attested={true} animate={!prefersReducedMotion} size={70} />
          <Badge spiffeId="spiffe://acme/a" position={{ x: 200, y: 290 }} state="valid" size={50} animate={!prefersReducedMotion} />

          <Workload label="Service B" position={{ x: 600, y: 200 }} attested={true} animate={!prefersReducedMotion} size={70} />
          <Badge spiffeId="spiffe://acme/b" position={{ x: 600, y: 290 }} state="valid" size={50} animate={!prefersReducedMotion} />
        </motion.g>

        {/* Mutual arrows */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Arrow A to B */}
            <line x1={280} y1={180} x2={520} y2={180} stroke={colors.success} strokeWidth={2} markerEnd="url(#arrow6-2)" />
            <text x={400} y={165} textAnchor="middle" fill={colors.success} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              I'm Service A
            </text>

            {/* Arrow B to A */}
            <line x1={520} y1={220} x2={280} y2={220} stroke={colors.svid} strokeWidth={2} markerEnd="url(#arrow6-2b)" />
            <text x={400} y={245} textAnchor="middle" fill={colors.svid} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              I'm Service B
            </text>

            <defs>
              <marker id="arrow6-2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.success} />
              </marker>
              <marker id="arrow6-2b" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.svid} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* mTLS label */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={320} y={340} width={160} height={50} rx={8} fill={colors.success} />
            <text x={400} y={370} textAnchor="middle" fill="white" fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              mTLS
            </text>
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={430} textAnchor="middle" fill={colors.textPrimary} fontSize={16} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Both sides prove who they are
            </text>
            <text x={400} y={460} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Not just the server—the client too!
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
