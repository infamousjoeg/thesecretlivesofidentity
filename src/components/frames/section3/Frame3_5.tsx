import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-5: The SPIRE Agent
 * Visual: Agent as local security desk with workloads
 */
export const Frame3_5: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500]);
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
          fontSize={24}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          The SPIRE Agent
        </motion.text>

        {/* Node boundary */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={200} y={80} width={400} height={300} rx={12} fill={`${colors.agent}08`} stroke={colors.agent} strokeWidth={2} strokeDasharray="10 5" />
          <rect x={340} y={60} width={120} height={35} rx={8} fill={colors.background} stroke={colors.agent} strokeWidth={2} />
          <text x={400} y={83} textAnchor="middle" fill={colors.agent} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            NODE
          </text>
        </motion.g>

        {/* Agent */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpireAgent
              label="SPIRE Agent"
              position={{ x: 400, y: 180 }}
              size={70}
              active={true}
              animate={!prefersReducedMotion}
            />
            <rect x={330} y={230} width={140} height={30} rx={4} fill={colors.agent} />
            <text x={400} y={250} textAnchor="middle" fill="white" fontSize={11} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Local Security Desk
            </text>
          </motion.g>
        )}

        {/* Workloads */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Workload label="api" position={{ x: 280, y: 330 }} attested={true} animate={!prefersReducedMotion} size={40} />
            <Workload label="web" position={{ x: 400, y: 330 }} attested={true} animate={!prefersReducedMotion} size={40} />
            <Workload label="db" position={{ x: 520, y: 330 }} attested={true} animate={!prefersReducedMotion} size={40} />
          </motion.g>
        )}

        {/* Key characteristics */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={400} width={500} height={70} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={430} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              The Agent runs on <tspan fill={colors.agent} fontWeight="bold">every node</tspan>—
            </text>
            <text x={400} y={455} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              issuing badges to local workloads on behalf of headquarters
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
