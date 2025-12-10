import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent, Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-12: The Full Picture
 * Visual: Complete flow from admin to workload
 */
export const Frame3_12: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500, 500]);
  const prefersReducedMotion = useReducedMotion();

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
          The Full Picture
        </motion.text>

        {/* Step 1: Admin creates entries */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <rect x={50} y={70} width={100} height={60} rx={6} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
          <text x={100} y={95} textAnchor="middle" fontSize={20}>👤</text>
          <text x={100} y={115} textAnchor="middle" fill={colors.textMuted} fontSize={9} fontFamily="Space Grotesk, sans-serif">
            Admin
          </text>
          <circle cx={100} cy={55} r={14} fill={phase >= 1 ? colors.success : colors.textMuted} />
          <text x={100} y={60} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">1</text>
        </motion.g>

        {/* Arrow to Server */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <line x1={160} y1={100} x2={220} y2={100} stroke={colors.success} strokeWidth={2} />
            <polygon points="230,100 220,95 220,105" fill={colors.success} />
            <text x={195} y={90} textAnchor="middle" fill={colors.success} fontSize={8} fontFamily="IBM Plex Sans, sans-serif">
              creates entries
            </text>
          </motion.g>
        )}

        {/* Step 2: Server stores entries */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SpireServer label="" position={{ x: 300, y: 100 }} size={50} animate={!prefersReducedMotion} />
          <text x={300} y={145} textAnchor="middle" fill={colors.server} fontSize={9} fontFamily="Space Grotesk, sans-serif">
            Server
          </text>
          <circle cx={300} cy={55} r={14} fill={phase >= 2 ? colors.success : colors.textMuted} />
          <text x={300} y={60} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">2</text>
        </motion.g>

        {/* Arrow to Agent */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <line x1={360} y1={100} x2={420} y2={100} stroke={colors.success} strokeWidth={2} />
            <polygon points="430,100 420,95 420,105" fill={colors.success} />
            <text x={395} y={90} textAnchor="middle" fill={colors.success} fontSize={8} fontFamily="IBM Plex Sans, sans-serif">
              syncs entries
            </text>
          </motion.g>
        )}

        {/* Step 3: Agent checks workloads */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <SpireAgent label="" position={{ x: 500, y: 100 }} size={50} active={true} animate={!prefersReducedMotion} />
          <text x={500} y={145} textAnchor="middle" fill={colors.agent} fontSize={9} fontFamily="Space Grotesk, sans-serif">
            Agent
          </text>
          <circle cx={500} cy={55} r={14} fill={phase >= 3 ? colors.success : colors.textMuted} />
          <text x={500} y={60} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">3</text>
        </motion.g>

        {/* Arrow to Workload */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <line x1={560} y1={100} x2={620} y2={100} stroke={colors.success} strokeWidth={2} />
            <polygon points="630,100 620,95 620,105" fill={colors.success} />
            <text x={595} y={90} textAnchor="middle" fill={colors.success} fontSize={8} fontFamily="IBM Plex Sans, sans-serif">
              attests workload
            </text>
          </motion.g>
        )}

        {/* Step 4: Workload gets SVID */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <rect x={640} y={70} width={100} height={60} rx={6} fill={colors.surface} stroke={colors.svid} strokeWidth={1} />
          <Workload label="api" position={{ x: 690, y: 100 }} attested={phase >= 4} animate={false} size={35} />
          <circle cx={690} cy={55} r={14} fill={phase >= 4 ? colors.success : colors.textMuted} />
          <text x={690} y={60} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">4</text>
        </motion.g>

        {/* SVID result */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge spiffeId="spiffe://acme.com/api" position={{ x: 690, y: 200 }} state="valid" size={50} showCountdown={false} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Summary boxes */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={80} y={280} width={640} height={180} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={310} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              The Complete Flow
            </text>

            {['Admin creates entries', 'Server stores entries', 'Agent checks workloads', 'Matching workloads get SVIDs'].map((step, i) => (
              <g key={step}>
                <circle cx={120} cy={345 + i * 25} r={10} fill={colors.success} />
                <text x={120} y={349 + i * 25} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
                  {i + 1}
                </text>
                <text x={145} y={350 + i * 25} fill={colors.textPrimary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
                  {step}
                </text>
              </g>
            ))}

            <text x={550} y={370} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              All automatic.
            </text>
            <text x={550} y={390} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              No secrets distributed.
            </text>
            <text x={550} y={410} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              No manual intervention.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
