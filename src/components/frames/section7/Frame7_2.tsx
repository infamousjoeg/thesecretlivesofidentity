import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge, Attacker } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-2: Why So Short?
 * Visual: Compromised SVID becomes useless quickly
 */
export const Frame7_2: React.FC = () => {
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
          Why So Short?
        </motion.text>

        {/* Scenario: Attacker gets SVID */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Attacker
            label="Attacker"
            position={{ x: 200, y: 200 }}
            blocked={false}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Stolen badge */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              spiffeId="stolen SVID"
              position={{ x: 350, y: 200 }}
              state="expiring"
              size={60}
              animate={!prefersReducedMotion}
            />
            <text x={350} y={260} textAnchor="middle" fill={colors.warning} fontSize={11} fontFamily="JetBrains Mono, monospace">
              05:00 remaining
            </text>
          </motion.g>
        )}

        {/* Time passes */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={430} y1={200} x2={500} y2={200} stroke={colors.textMuted} strokeWidth={2} strokeDasharray="6 3" />
            <text x={465} y={185} textAnchor="middle" fill={colors.textMuted} fontSize={10}>time passes</text>

            <Badge
              spiffeId="expired"
              position={{ x: 600, y: 200 }}
              state="expired"
              size={60}
              animate={!prefersReducedMotion}
            />
            <circle cx={650} cy={160} r={20} fill={colors.attacker} />
            <text x={650} y={167} textAnchor="middle" fill="white" fontSize={16}>✗</text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={330} width={500} height={120} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={365} textAnchor="middle" fill={colors.success} fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Short lifetimes limit blast radius
            </text>
            <text x={400} y={400} textAnchor="middle" fill={colors.textSecondary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              A compromised SVID is only useful briefly
            </text>
            <text x={400} y={425} textAnchor="middle" fill={colors.textSecondary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              Then it becomes worthless automatically
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
