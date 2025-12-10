import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-8: But Wait: Who Gets Identity?
 * Visual: Server with question marks about workloads
 */
export const Frame3_8: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={45}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={22}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          But Wait: Who Gets Identity?
        </motion.text>

        {/* Server thinking */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireServer label="Server" position={{ x: 400, y: 150 }} size={70} animate={!prefersReducedMotion} />

          {/* Thought bubble */}
          <ellipse cx={520} cy={100} rx={80} ry={40} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
          <circle cx={470} cy={130} r={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
          <circle cx={450} cy={150} r={5} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
          <text x={520} y={95} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            Which workloads
          </text>
          <text x={520} y={110} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            get which IDs?
          </text>
        </motion.g>

        {/* Unknown workloads */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Workload label="???" position={{ x: 200, y: 300 }} attested={false} animate={false} size={50} showQuestionMark={true} />
            <Workload label="???" position={{ x: 350, y: 300 }} attested={false} animate={false} size={50} showQuestionMark={true} />
            <Workload label="???" position={{ x: 500, y: 300 }} attested={false} animate={false} size={50} showQuestionMark={true} />
            <Workload label="???" position={{ x: 650, y: 300 }} attested={false} animate={false} size={50} showQuestionMark={true} />
          </motion.g>
        )}

        {/* Question */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={390} width={500} height={80} rx={8} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={400} y={420} textAnchor="middle" fill={colors.warning} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              How does the Server know?
            </text>
            <text x={400} y={450} textAnchor="middle" fill={colors.textMuted} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              It needs a mapping: workload properties → SPIFFE ID
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
