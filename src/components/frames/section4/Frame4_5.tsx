import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-5: Platform as Witness
 * Visual: Platform vouching for the Agent
 */
export const Frame4_5: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

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
          {t('frame4_5.title')}
        </motion.text>

        {/* Platform cloud */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ellipse cx={400} cy={200} rx={250} ry={100} fill={`${colors.success}10`} stroke={colors.success} strokeWidth={2} />
          <text x={400} y={140} textAnchor="middle" fill={colors.success} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame4_5.platformLabel')}
          </text>
          <text x={400} y={165} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame4_5.platformSub')}
          </text>

          {/* Agent inside platform */}
          <SpireAgent label="Agent" position={{ x: 400, y: 230 }} size={60} active={true} animate={!prefersReducedMotion} />
        </motion.g>

        {/* Speech bubble from platform */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ellipse cx={180} cy={200} rx={100} ry={50} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <circle cx={270} cy={220} r={10} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <circle cx={295} cy={235} r={6} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={180} y={195} textAnchor="middle" fill={colors.success} fontSize={11} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_5.platformSays')}
            </text>
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={340} width={500} height={120} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={375} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_5.agentDoesNotClaim')}
            </text>
            <text x={400} y={405} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_5.platformProvides')}
            </text>
            <text x={400} y={435} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_5.proof1')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
