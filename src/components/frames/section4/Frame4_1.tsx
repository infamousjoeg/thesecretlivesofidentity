import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-1: The Bootstrap Problem
 * Visual: Server and Agent with question about trust
 */
export const Frame4_1: React.FC = () => {
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
          fontSize={24}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('frame4_1.title')}
        </motion.text>

        {/* Server */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireServer label={t('ui:entities.server', { defaultValue: 'Server' })} position={{ x: 250, y: 200 }} size={80} animate={!prefersReducedMotion} />
          <text x={250} y={280} textAnchor="middle" fill={colors.server} fontSize={14} fontFamily="Space Grotesk, sans-serif">
            SPIRE Server
          </text>
        </motion.g>

        {/* Agent */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpireAgent label={t('ui:entities.agent', { defaultValue: 'Agent' })} position={{ x: 550, y: 200 }} size={80} active={false} animate={!prefersReducedMotion} />
            <text x={550} y={280} textAnchor="middle" fill={colors.agent} fontSize={14} fontFamily="Space Grotesk, sans-serif">
              {t('frame4_1.newAgentLabel')}
            </text>

            {/* Question marks */}
            <text x={500} y={140} fill={colors.warning} fontSize={30} fontWeight="bold">?</text>
            <text x={600} y={140} fill={colors.warning} fontSize={30} fontWeight="bold">?</text>
          </motion.g>
        )}

        {/* Question bubble */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={330} y={160} width={140} height={80} rx={8} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={400} y={190} textAnchor="middle" fill={colors.warning} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_1.serverQuestion')}
            </text>
            <text x={400} y={230} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_1.serverQuestionCredit')}
            </text>
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <rect x={150} y={340} width={500} height={100} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={375} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_1.before')}
            </text>
            <text x={400} y={400} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_1.beforeConclusion')}
            </text>
            <text x={400} y={425} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_1.how')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
