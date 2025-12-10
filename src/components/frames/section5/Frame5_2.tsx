import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-2: Workload Attestation
 * Visual: Agent examining a workload
 */
export const Frame5_2: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 800, 600]);
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
          Workload Attestation
        </motion.text>

        {/* Agent */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireAgent
            label="SPIRE Agent"
            position={{ x: 200, y: 200 }}
            active={true}
            animate={!prefersReducedMotion}
            size={70}
          />
        </motion.g>

        {/* Workload */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Workload
            label="payments-api"
            position={{ x: 550, y: 200 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Examination process */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={280} y1={200} x2={480} y2={200} stroke={colors.agent} strokeWidth={2} strokeDasharray="6 3" />
            <text x={380} y={180} textAnchor="middle" fill={colors.agent} fontSize={12} fontFamily="JetBrains Mono, monospace">
              examining...
            </text>
          </motion.g>
        )}

        {/* Properties being checked */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={350} y={280} width={200} height={120} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={1} />
            <text x={360} y={305} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">Checking:</text>
            <text x={370} y={325} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">• Process ID</text>
            <text x={370} y={345} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">• User ID</text>
            <text x={370} y={365} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">• Container ID</text>
            <text x={370} y={385} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">• K8s metadata</text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={450} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Agent examines workload to decide if it matches a registration entry
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
