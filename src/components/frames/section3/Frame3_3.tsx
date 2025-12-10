import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-3: The SPIRE Server
 * Visual: Server as corporate headquarters
 */
export const Frame3_3: React.FC = () => {
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
          The SPIRE Server
        </motion.text>

        {/* Headquarters metaphor */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Building outline */}
          <rect x={250} y={100} width={300} height={250} rx={12} fill={`${colors.server}10`} stroke={colors.server} strokeWidth={2} strokeDasharray="10 5" />
          <rect x={340} y={80} width={120} height={35} rx={8} fill={colors.background} stroke={colors.server} strokeWidth={2} />
          <text x={400} y={103} textAnchor="middle" fill={colors.server} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            HEADQUARTERS
          </text>

          {/* Server in center */}
          <SpireServer
            label="Server"
            position={{ x: 400, y: 220 }}
            size={90}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Key characteristics */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={80} y={130} width={140} height={50} rx={6} fill={colors.surface} stroke={colors.server} strokeWidth={1} />
            <text x={150} y={155} textAnchor="middle" fill={colors.server} fontSize={11} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Central Authority
            </text>
            <text x={150} y={172} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              Single source of truth
            </text>
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={580} y={130} width={140} height={50} rx={6} fill={colors.surface} stroke={colors.server} strokeWidth={1} />
            <text x={650} y={155} textAnchor="middle" fill={colors.server} fontSize={11} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Knows Everything
            </text>
            <text x={650} y={172} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              All workload identities
            </text>
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={580} y={250} width={140} height={50} rx={6} fill={colors.surface} stroke={colors.server} strokeWidth={1} />
            <text x={650} y={275} textAnchor="middle" fill={colors.server} fontSize={11} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Signs Identities
            </text>
            <text x={650} y={292} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              Issues official SVIDs
            </text>
          </motion.g>
        )}

        {/* Badge metaphor */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <rect x={200} y={390} width={400} height={70} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={420} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Think of it like <tspan fill={colors.server} fontWeight="bold">corporate headquarters</tspan>—
            </text>
            <text x={400} y={445} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              the central authority that decides who gets an official badge
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
