import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-3: Rotation Is Automatic
 * Visual: Agent automatically rotating SVIDs
 */
export const Frame7_3: React.FC = () => {
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
          Rotation Is Automatic
        </motion.text>

        {/* Agent */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireAgent
            label="SPIRE Agent"
            position={{ x: 400, y: 150 }}
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
            label="my-service"
            position={{ x: 400, y: 350 }}
            attested={true}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Old badge expiring */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              spiffeId="old"
              position={{ x: 250, y: 280 }}
              state="expiring"
              size={50}
              animate={!prefersReducedMotion}
            />
            <text x={250} y={330} textAnchor="middle" fill={colors.warning} fontSize={10}>expiring soon</text>
          </motion.g>
        )}

        {/* New badge being issued */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={400} y1={200} x2={400} y2={290} stroke={colors.success} strokeWidth={2} strokeDasharray="6 3" />
            <Badge
              spiffeId="new"
              position={{ x: 550, y: 280 }}
              state="valid"
              size={50}
              animate={!prefersReducedMotion}
            />
            <text x={550} y={330} textAnchor="middle" fill={colors.success} fontSize={10}>fresh SVID</text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={410} width={400} height={60} rx={8} fill={`${colors.agent}15`} stroke={colors.agent} strokeWidth={1} />
            <text x={400} y={445} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Before expiration, Agent fetches fresh SVIDs
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
