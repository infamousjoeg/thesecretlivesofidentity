import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-6: Rotation Hell
 * Visual: Checklist of rotation steps, growing complexity
 */
export const Frame1_6: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 500, 500, 500, 500, 800]);
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    { textKey: 'frame1_6.step1', icon: '🔑', status: 'pending' },
    { textKey: 'frame1_6.step2', icon: '📦', status: 'pending', showManual: true },
    { textKey: 'frame1_6.step3', icon: '🔄', status: 'pending' },
    { textKey: 'frame1_6.step4', icon: '🙏', status: 'pending' },
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
          {t('frame1_6.title')}
        </text>

        {/* Clock ticking */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <circle cx={680} cy={60} r={35} fill={colors.surface} stroke={colors.attacker} strokeWidth={2} />
          <text x={680} y={55} textAnchor="middle" fill={colors.attacker} fontSize={12} fontFamily="JetBrains Mono, monospace">
            {t('frame1_6.elapsed')}
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
              key={step.textKey}
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
                {t(step.textKey, { count: 47 })}
              </text>

              {/* Complexity indicator */}
              {step.showManual && (
                <text
                  x={560}
                  y={138 + index * 80}
                  fill={colors.attacker}
                  fontSize={12}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {t('frame1_6.manual')}
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
              {t('frame1_6.attackersNote')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
