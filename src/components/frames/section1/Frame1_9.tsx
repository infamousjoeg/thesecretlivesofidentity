import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-9: What If...
 * Visual: Transition from question to hope - workloads proving identity differently
 */
export const Frame1_9: React.FC = () => {
  const { phase } = useAnimationPhase([0, 800, 800, 800]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Big question */}
        <motion.text
          x={400}
          y={80}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={28}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What if...
        </motion.text>

        {/* Two workloads */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Workload
            label="Service A"
            position={{ x: 200, y: 280 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
          <Workload
            label="Service B"
            position={{ x: 600, y: 280 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* No secret - just proof */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Strike through the key */}
            <g opacity={0.3}>
              <rect x={350} y={255} width={100} height={50} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
              <text x={400} y={275} textAnchor="middle" fontSize={20}>
                🔑
              </text>
              <line x1={340} y1={240} x2={460} y2={320} stroke={colors.attacker} strokeWidth={3} />
            </g>
          </motion.g>
        )}

        {/* The new way - cryptographic proof */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Proof badge on Service A */}
            <rect x={130} y={200} width={140} height={40} rx={6} fill={colors.success} opacity={0.2} stroke={colors.success} strokeWidth={1} />
            <text x={200} y={225} textAnchor="middle" fill={colors.success} fontSize={11} fontFamily="JetBrains Mono, monospace">
              I AM Service A
            </text>

            {/* Proof badge on Service B */}
            <rect x={530} y={200} width={140} height={40} rx={6} fill={colors.success} opacity={0.2} stroke={colors.success} strokeWidth={1} />
            <text x={600} y={225} textAnchor="middle" fill={colors.success} fontSize={11} fontFamily="JetBrains Mono, monospace">
              I AM Service B
            </text>

            {/* Verification arrows */}
            <path
              d="M 270 250 Q 400 180 530 250"
              fill="none"
              stroke={colors.success}
              strokeWidth={2}
              strokeDasharray="6 3"
            />
            <text x={400} y={200} textAnchor="middle" fill={colors.success} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              verify identity
            </text>
          </motion.g>
        )}

        {/* The promise */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text
              x={400}
              y={400}
              textAnchor="middle"
              fill={colors.textPrimary}
              fontSize={18}
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              ...workloads could prove who they are
            </text>
            <text
              x={400}
              y={430}
              textAnchor="middle"
              fill={colors.success}
              fontSize={16}
              fontWeight="bold"
              fontFamily="Space Grotesk, sans-serif"
            >
              without sharing secrets at all?
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
