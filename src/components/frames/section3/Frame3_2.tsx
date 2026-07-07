import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-2: SPIRE: Two Components
 * Visual: Server and Agent side by side
 */
export const Frame3_2: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
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
          {t('frame3_2.title')}
        </motion.text>

        {/* SPIRE Server */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpireServer
              label={t('ui:entities.spireServer', { defaultValue: 'SPIRE Server' })}
              position={{ x: 250, y: 220 }}
              size={80}
              animate={!prefersReducedMotion}
            />
            <text x={250} y={310} textAnchor="middle" fill={colors.server} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame3_2.serverLabel')}
            </text>
            <text x={250} y={335} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_2.serverDescription')}
            </text>
            <text x={250} y={355} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_2.serverMetaphor')}
            </text>
          </motion.g>
        )}

        {/* SPIRE Agent */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpireAgent
              label={t('ui:entities.spireAgent', { defaultValue: 'SPIRE Agent' })}
              position={{ x: 550, y: 220 }}
              size={80}
              active={true}
              animate={!prefersReducedMotion}
            />
            <text x={550} y={310} textAnchor="middle" fill={colors.agent} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              SPIRE Agent
            </text>
            <text x={550} y={335} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_2.agentRunsOn')}
            </text>
            <text x={550} y={355} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_2.agentMetaphor')}
            </text>
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <rect x={200} y={400} width={400} height={60} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={437} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_2.intro')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
