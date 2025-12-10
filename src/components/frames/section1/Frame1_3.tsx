import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Attacker } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-3: Secrets Have Problems
 * Visual: Showing the problems - distribution, storage, rotation, theft
 */
export const Frame1_3: React.FC = () => {
  const { phase } = useAnimationPhase([0, 800, 800, 800, 800]);
  const prefersReducedMotion = useReducedMotion();

  const problems = [
    { icon: '📦', label: 'Distributed', desc: 'Copied to every service', x: 150, y: 150 },
    { icon: '💾', label: 'Stored', desc: 'Saved in configs, env vars', x: 650, y: 150 },
    { icon: '🔄', label: 'Rotated', desc: 'Manual coordination', x: 150, y: 350 },
    { icon: '🎯', label: 'Stolen', desc: 'One leak = breach', x: 650, y: 350 },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Central key with warning */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect
            x={350}
            y={220}
            width={100}
            height={60}
            rx={8}
            fill={colors.surface}
            stroke={colors.attacker}
            strokeWidth={2}
          />
          <text x={400} y={245} textAnchor="middle" fontSize={24}>
            🔑
          </text>
          <text
            x={400}
            y={268}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={11}
            fontFamily="JetBrains Mono, monospace"
          >
            SECRET
          </text>
        </motion.g>

        {/* Problem boxes appearing */}
        {problems.map((problem, index) => (
          phase >= index + 1 && (
            <motion.g
              key={problem.label}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <rect
                x={problem.x - 60}
                y={problem.y - 40}
                width={120}
                height={80}
                rx={8}
                fill={colors.surface}
                stroke={colors.textMuted}
                strokeWidth={1}
              />
              <text x={problem.x} y={problem.y - 10} textAnchor="middle" fontSize={24}>
                {problem.icon}
              </text>
              <text
                x={problem.x}
                y={problem.y + 15}
                textAnchor="middle"
                fill={colors.textPrimary}
                fontSize={13}
                fontWeight={600}
                fontFamily="Space Grotesk, sans-serif"
              >
                {problem.label}
              </text>
              <text
                x={problem.x}
                y={problem.y + 32}
                textAnchor="middle"
                fill={colors.textMuted}
                fontSize={10}
                fontFamily="IBM Plex Sans, sans-serif"
              >
                {problem.desc}
              </text>

              {/* Line to center */}
              <line
                x1={problem.x}
                y1={problem.y + 40}
                x2={400}
                y2={250}
                stroke={colors.attacker}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.3}
              />
            </motion.g>
          )
        ))}

        {/* Attacker lurking */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Attacker
              position={{ x: 720, y: 430 }}
              blocked={false}
              animate={!prefersReducedMotion}
              size={40}
            />
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
