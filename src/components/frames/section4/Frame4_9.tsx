import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-9: After Attestation
 * Visual: Agent now trusted and can issue badges
 */
export const Frame4_9: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
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
          After Attestation
        </motion.text>

        {/* Attested Agent */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={250} y={90} width={300} height={200} rx={12} fill={`${colors.agent}10`} stroke={colors.agent} strokeWidth={2} />
          <rect x={350} y={70} width={100} height={30} rx={6} fill={colors.background} stroke={colors.agent} strokeWidth={2} />
          <text x={400} y={90} textAnchor="middle" fill={colors.agent} fontSize={11} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            NODE
          </text>

          <SpireAgent label="Agent" position={{ x: 400, y: 160 }} size={60} active={true} animate={!prefersReducedMotion} />

          {/* Agent badge */}
          <Badge spiffeId="spiffe://acme.com/spire/agent/..." position={{ x: 400, y: 240 }} state="valid" size={40} showCountdown={false} animate={false} />
        </motion.g>

        {/* Checkmark */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx={350} cy={120} r={20} fill={colors.success} />
            <text x={350} y={127} textAnchor="middle" fill="white" fontSize={16} fontWeight="bold">✓</text>
          </motion.g>
        )}

        {/* Agent capability */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={580} y={130} width={160} height={80} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={660} y={160} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Agent can now:
            </text>
            <text x={660} y={185} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Issue badges to
            </text>
            <text x={660} y={200} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              local workloads
            </text>
          </motion.g>
        )}

        {/* Workloads waiting */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Workload label="api" position={{ x: 300, y: 360 }} attested={true} animate={!prefersReducedMotion} size={45} />
            <Workload label="web" position={{ x: 400, y: 360 }} attested={true} animate={!prefersReducedMotion} size={45} />
            <Workload label="db" position={{ x: 500, y: 360 }} attested={true} animate={!prefersReducedMotion} size={45} />

            {/* Arrows from agent to workloads */}
            <line x1={380} y1={270} x2={320} y2={320} stroke={colors.agent} strokeWidth={2} strokeDasharray="4 2" />
            <line x1={400} y1={270} x2={400} y2={320} stroke={colors.agent} strokeWidth={2} strokeDasharray="4 2" />
            <line x1={420} y1={270} x2={480} y2={320} stroke={colors.agent} strokeWidth={2} strokeDasharray="4 2" />
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={420} width={500} height={60} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={450} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              The Agent's <tspan fill={colors.agent} fontWeight="bold">own SVID</tspan> proves it's authorized to speak for this node.
            </text>
            <text x={400} y={470} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Next: How workloads get their identities...
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
