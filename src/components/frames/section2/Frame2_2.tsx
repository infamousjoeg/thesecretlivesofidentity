import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-2: Three Core Ideas
 * Visual: Three pillars of SPIFFE
 */
export const Frame2_2: React.FC = () => {
  const { t } = useTranslation('frames');
  const { phase } = useAnimationPhase([0, 500, 500, 500]);
  const prefersReducedMotion = useReducedMotion();

  const pillars = [
    { icon: '🏷️', titleKey: 'frame2_2.pillar1Title', descKey: 'frame2_2.pillar1Description', color: colors.server },
    { icon: '📜', titleKey: 'frame2_2.pillar2Title', descKey: 'frame2_2.pillar2Description', color: colors.svid },
    { icon: '✓', titleKey: 'frame2_2.pillar3Title', descKey: 'frame2_2.pillar3Description', color: colors.success },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={60}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={24}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('frame2_2.title')}
        </motion.text>

        {/* Three pillars */}
        {pillars.map((pillar, index) => (
          phase >= index + 1 && (
            <motion.g
              key={pillar.titleKey}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Pillar */}
              <rect
                x={130 + index * 220}
                y={100}
                width={180}
                height={310}
                rx={8}
                fill={colors.surface}
                stroke={pillar.color}
                strokeWidth={2}
              />

              {/* Top cap */}
              <rect
                x={130 + index * 220}
                y={100}
                width={180}
                height={55}
                rx={8}
                fill={pillar.color}
              />

              {/* Number */}
              <circle cx={162 + index * 220} cy={127} r={17} fill="white" opacity={0.9} />
              <text
                x={162 + index * 220}
                y={134}
                textAnchor="middle"
                fill={pillar.color}
                fontSize={16}
                fontWeight="bold"
                fontFamily="Space Grotesk, sans-serif"
              >
                {index + 1}
              </text>

              {/* Icon */}
              <text
                x={220 + index * 220}
                y={225}
                textAnchor="middle"
                fontSize={48}
              >
                {pillar.icon}
              </text>

              {/* Title */}
              <text
                x={220 + index * 220}
                y={290}
                textAnchor="middle"
                fill={colors.textPrimary}
                fontSize={18}
                fontWeight="bold"
                fontFamily="Space Grotesk, sans-serif"
              >
                {t(pillar.titleKey)}
              </text>

              {/* Description — two lines to fit longer translations inside card */}
              <text
                x={220 + index * 220}
                y={330}
                textAnchor="middle"
                fill={colors.textMuted}
                fontSize={12}
                fontFamily="IBM Plex Sans, sans-serif"
              >
                {t(`${pillar.descKey}Line1`, { defaultValue: t(pillar.descKey) })}
              </text>
              <text
                x={220 + index * 220}
                y={348}
                textAnchor="middle"
                fill={colors.textMuted}
                fontSize={12}
                fontFamily="IBM Plex Sans, sans-serif"
              >
                {t(`${pillar.descKey}Line2`, { defaultValue: '' })}
              </text>
            </motion.g>
          )
        ))}

        {/* Connecting arrows */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <path
              d="M 310 275 L 350 275"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth={2}
              markerEnd="url(#arrowGray)"
            />
            <path
              d="M 530 275 L 570 275"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth={2}
              markerEnd="url(#arrowGray)"
            />
            <defs>
              <marker id="arrowGray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.textMuted} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Summary */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={450}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={14}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t('frame2_2.together')}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
