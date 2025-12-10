import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-3: The Badge Metaphor
 * Visual: HR verifying employment before printing badge
 */
export const Frame5_3: React.FC = () => {
  const { phase } = useAnimationPhase([0, 700, 700, 600]);
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
          The Badge Metaphor
        </motion.text>

        {/* HR Desk (Agent) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={180} width={200} height={100} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
          <text x={200} y={175} textAnchor="middle" fill={colors.agent} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            HR Security Desk
          </text>
          <SpireAgent
            label=""
            position={{ x: 200, y: 230 }}
            active={true}
            animate={!prefersReducedMotion}
            size={50}
          />
        </motion.g>

        {/* Employee (Workload) */}
        <motion.g
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Workload
            label="New Employee"
            position={{ x: 500, y: 230 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* HR checking records */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={300} y={160} width={150} height={80} rx={6} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={375} y={180} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">Employee Database</text>
            <text x={375} y={200} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">Checking...</text>
            <text x={375} y={220} textAnchor="middle" fill={colors.success} fontSize={11} fontFamily="JetBrains Mono, monospace">✓ Found in system</text>
          </motion.g>
        )}

        {/* Badge being issued */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              spiffeId="spiffe://acme/employee"
              position={{ x: 500, y: 350 }}
              state="valid"
              size={60}
              animate={!prefersReducedMotion}
            />
            <line x1={200} y1={290} x2={470} y2={340} stroke={colors.success} strokeWidth={2} strokeDasharray="6 3" />
          </motion.g>
        )}

        {/* Message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={430} width={400} height={40} rx={8} fill={`${colors.agent}15`} stroke={colors.agent} strokeWidth={1} />
            <text x={400} y={455} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="Space Grotesk, sans-serif">
              HR verifies employment before printing badge
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
