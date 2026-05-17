import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 4-8: Platform Deep Dive Teaser
 * Visual: Teaser for advanced concepts
 */
export const Frame4_8: React.FC = () => {
  const { t } = useTranslation('frames');
  const { phase } = useAnimationPhase([0, 600, 600]);

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={50}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={22}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('frame4_8.title')}
        </motion.text>

        {/* Coming soon box */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={200} y={100} width={400} height={200} rx={12} fill={colors.surface} stroke={colors.trustBundle} strokeWidth={2} />
          <text x={400} y={140} textAnchor="middle" fontSize={40}>🔮</text>
          <text x={400} y={185} textAnchor="middle" fill={colors.trustBundle} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame4_8.advancedLabel')}
          </text>
          <text x={400} y={215} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame4_8.explorationText')}
          </text>
          <text x={400} y={235} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {/* part of explorationText */}
          </text>
          <text x={400} y={280} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame4_8.bullet1')}
          </text>
          <text x={400} y={298} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame4_8.bullet2')}
          </text>
        </motion.g>

        {/* For now... */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={340} width={500} height={100} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={375} textAnchor="middle" fill={colors.success} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_8.forNow')}
            </text>
            <text x={400} y={410} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_8.pattern')}
            </text>
          </motion.g>
        )}

        {/* Continue message */}
        {phase >= 2 && (
          <motion.text
            x={400}
            y={475}
            textAnchor="middle"
            fill={colors.textMuted}
            fontSize={12}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* no direct key - omit or use a shared key */}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
