import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-6: Rotation Hell
 * Visual: Checklist of rotation steps, growing complexity
 */
export const Frame1_6: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500, 500, 800]);
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    { text: '1. Generate new API key', icon: '🔑', status: 'pending' },
    { text: '2. Update 47 services', icon: '📦', status: 'pending' },
    { text: '3. Coordinate restart', icon: '🔄', status: 'pending' },
    { text: '4. Pray nothing breaks', icon: '🙏', status: 'pending' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <text
          x={400}
          y={60}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={24}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
        >
          Incident Response Checklist
        </text>

        {/* Clock ticking */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <circle cx={680} cy={60} r={35} fill={colors.surface} stroke={colors.attacker} strokeWidth={2} />
          <text x={680} y={55} textAnchor="middle" fill={colors.attacker} fontSize={12} fontFamily="JetBrains Mono, monospace">
            ELAPSED
          </text>
          <motion.text
            x={680}
            y={75}
            textAnchor="middle"
            fill={colors.attacker}
            fontSize={14}
            fontWeight="bold"
            fontFamily="JetBrains Mono, monospace"
            animate={prefersReducedMotion ? {} : { opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            03:47:22
          </motion.text>
        </motion.g>

        {/* Checklist items */}
        {steps.map((step, index) => (
          phase >= index + 1 && (
            <motion.g
              key={step.text}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect
                x={150}
                y={100 + index * 80}
                width={500}
                height={60}
                rx={8}
                fill={colors.surface}
                stroke={colors.textMuted}
                strokeWidth={1}
              />

              {/* Checkbox */}
              <rect
                x={170}
                y={118 + index * 80}
                width={24}
                height={24}
                rx={4}
                fill="transparent"
                stroke={colors.textMuted}
                strokeWidth={2}
              />

              {/* Icon */}
              <text x={220} y={138 + index * 80} fontSize={24}>
                {step.icon}
              </text>

              {/* Text */}
              <text
                x={260}
                y={138 + index * 80}
                fill={colors.textPrimary}
                fontSize={16}
                fontFamily="IBM Plex Sans, sans-serif"
              >
                {step.text}
              </text>

              {/* Complexity indicator */}
              {index === 1 && (
                <text
                  x={560}
                  y={138 + index * 80}
                  fill={colors.attacker}
                  fontSize={12}
                  fontFamily="JetBrains Mono, monospace"
                >
                  (manual!)
                </text>
              )}
            </motion.g>
          )
        ))}

        {/* Bottom message */}
        {phase >= 5 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={430} width={500} height={50} rx={8} fill={`${colors.attacker}20`} />
            <text
              x={400}
              y={460}
              textAnchor="middle"
              fill={colors.attacker}
              fontSize={16}
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              Meanwhile, attackers have had the key for 10+ hours...
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
