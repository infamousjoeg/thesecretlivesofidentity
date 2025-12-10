import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-6: How It Works
 * Visual: Step-by-step attestation flow
 */
export const Frame4_6: React.FC = () => {
  const { phase } = useAnimationPhase([0, 400, 400, 400, 400, 400]);
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    { num: 1, text: 'Agent starts on a node', color: colors.agent },
    { num: 2, text: 'Agent asks platform for proof', color: colors.success },
    { num: 3, text: 'Agent sends proof to Server', color: colors.server },
    { num: 4, text: 'Server validates with platform', color: colors.success },
    { num: 5, text: 'Server issues Agent SVID', color: colors.svid },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={35}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={20}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          How Node Attestation Works
        </motion.text>

        {/* Entities */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Platform */}
          <rect x={50} y={80} width={120} height={80} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={110} y={115} textAnchor="middle" fontSize={20}>☁️</text>
          <text x={110} y={140} textAnchor="middle" fill={colors.success} fontSize={10} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Platform
          </text>

          {/* Agent */}
          <SpireAgent label="" position={{ x: 300, y: 120 }} size={50} active={phase >= 5} animate={!prefersReducedMotion} />
          <text x={300} y={165} textAnchor="middle" fill={colors.agent} fontSize={10} fontFamily="Space Grotesk, sans-serif">
            Agent
          </text>

          {/* Server */}
          <SpireServer label="" position={{ x: 500, y: 120 }} size={50} animate={!prefersReducedMotion} />
          <text x={500} y={165} textAnchor="middle" fill={colors.server} fontSize={10} fontFamily="Space Grotesk, sans-serif">
            Server
          </text>
        </motion.g>

        {/* Flow arrows based on phase */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <line x1={250} y1={110} x2={180} y2={110} stroke={colors.success} strokeWidth={2} />
            <polygon points="170,110 185,105 185,115" fill={colors.success} />
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <line x1={350} y1={120} x2={450} y2={120} stroke={colors.server} strokeWidth={2} />
            <polygon points="460,120 450,115 450,125" fill={colors.server} />
          </motion.g>
        )}

        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M 480 90 Q 400 50, 130 80" fill="none" stroke={colors.success} strokeWidth={2} strokeDasharray="5 3" />
            <polygon points="130,85 120,80 130,75" fill={colors.success} />
          </motion.g>
        )}

        {phase >= 5 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <line x1={450} y1={130} x2={350} y2={130} stroke={colors.svid} strokeWidth={2} />
            <polygon points="340,130 355,125 355,135" fill={colors.svid} />
            <text x={400} y={150} textAnchor="middle" fill={colors.svid} fontSize={9} fontFamily="Space Grotesk, sans-serif">
              SVID
            </text>
          </motion.g>
        )}

        {/* Steps */}
        {steps.map((step, index) => (
          phase >= index + 1 && (
            <motion.g
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <rect
                x={100}
                y={190 + index * 55}
                width={600}
                height={45}
                rx={6}
                fill={colors.surface}
                stroke={step.color}
                strokeWidth={2}
              />
              <circle cx={140} cy={212 + index * 55} r={15} fill={step.color} />
              <text x={140} y={218 + index * 55} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
                {step.num}
              </text>
              <text x={180} y={218 + index * 55} fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
                {step.text}
              </text>
            </motion.g>
          )
        ))}

        {/* Complete message */}
        {phase >= 5 && (
          <motion.text
            x={400}
            y={480}
            textAnchor="middle"
            fill={colors.success}
            fontSize={13}
            fontWeight="bold"
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✓ Agent is now attested and can issue workload SVIDs
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
