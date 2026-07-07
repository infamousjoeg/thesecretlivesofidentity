import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-6: Agent Responsibilities
 * Visual: Agent with its three main responsibilities
 */
export const Frame3_6: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 400, 400, 400]);
  const prefersReducedMotion = useReducedMotion();

  const responsibilities = [
    { titleKey: 'frame3_6.resp1Title', descKey: 'frame3_6.resp1Description', icon: '🔍' },
    { titleKey: 'frame3_6.resp2Title', descKey: 'frame3_6.resp2Description', icon: '💾' },
    { titleKey: 'frame3_6.resp3Title', descKey: 'frame3_6.resp3Description', icon: '🔌' },
  ];

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
          {t('frame3_6.title')}
        </motion.text>

        {/* Agent */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireAgent
            label={t('ui:entities.spireAgent', { defaultValue: 'SPIRE Agent' })}
            position={{ x: 400, y: 150 }}
            size={70}
            active={true}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Responsibilities */}
        {responsibilities.map((resp, index) => (
          phase >= index + 1 && (
            <motion.g
              key={resp.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <line
                x1={400}
                y1={200}
                x2={150 + index * 250}
                y2={290}
                stroke={colors.agent}
                strokeWidth={2}
                strokeDasharray="5 3"
              />
              <rect
                x={75 + index * 250}
                y={300}
                width={150}
                height={100}
                rx={8}
                fill={colors.surface}
                stroke={colors.agent}
                strokeWidth={2}
              />
              <text x={150 + index * 250} y={335} textAnchor="middle" fontSize={24}>
                {resp.icon}
              </text>
              <text x={150 + index * 250} y={365} textAnchor="middle" fill={colors.agent} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {t(resp.titleKey)}
              </text>
              <text x={150 + index * 250} y={385} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
                {t(resp.descKey)}
              </text>
            </motion.g>
          )
        ))}

        {/* Summary */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={450}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={13}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t('frame3_6.conclusion')}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
