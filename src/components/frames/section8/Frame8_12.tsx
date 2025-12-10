import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-12: High Availability
 * Visual: Clustered SPIRE servers with shared datastore
 */
export const Frame8_12: React.FC = () => {
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
          High Availability
        </motion.text>

        {/* Cluster box */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={150} y={100} width={500} height={200} rx={12} fill={colors.surface} stroke={colors.server} strokeWidth={2} strokeDasharray="10 5" />
          <text x={400} y={125} textAnchor="middle" fill={colors.server} fontSize={12} fontWeight="bold">SPIRE Server Cluster</text>
        </motion.g>

        {/* Multiple servers */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SpireServer label="Server 1" position={{ x: 250, y: 200 }} animate={!prefersReducedMotion} size={55} />
            <SpireServer label="Server 2" position={{ x: 400, y: 200 }} animate={!prefersReducedMotion} size={55} />
            <SpireServer label="Server 3" position={{ x: 550, y: 200 }} animate={!prefersReducedMotion} size={55} />
          </motion.g>
        )}

        {/* Shared datastore */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={300} y={340} width={200} height={70} rx={8} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={400} y={370} textAnchor="middle" fill={colors.warning} fontSize={12} fontWeight="bold">Shared Datastore</text>
            <text x={400} y={390} textAnchor="middle" fill={colors.textMuted} fontSize={10}>PostgreSQL / MySQL</text>

            <line x1={250} y1={240} x2={350} y2={335} stroke={colors.warning} strokeWidth={1} strokeDasharray="4 2" />
            <line x1={400} y1={240} x2={400} y2={335} stroke={colors.warning} strokeWidth={1} strokeDasharray="4 2" />
            <line x1={550} y1={240} x2={450} y2={335} stroke={colors.warning} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {/* Benefits */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={430} width={500} height={50} rx={6} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={260} y={460} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold">✓ No single point of failure</text>
            <text x={540} y={460} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold">✓ Production ready</text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
