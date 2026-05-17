import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-10: Nested SPIRE
 * Visual: Hierarchical SPIRE servers
 */
export const Frame8_10: React.FC = () => {
  const { t } = useTranslation('frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
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
          {t('frame8_10.title', { defaultValue: 'Nested SPIRE' })}
        </motion.text>

        {/* Root server */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireServer label={t('frame8_10.rootServer', { defaultValue: 'Root Server' })} position={{ x: 400, y: 140 }} animate={!prefersReducedMotion} size={70} />
          <text x={400} y={195} textAnchor="middle" fill={colors.server} fontSize={11} fontWeight="bold">
            {t('frame8_10.globalRoot', { defaultValue: 'Global Root' })}
          </text>
        </motion.g>

        {/* Regional servers */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpireServer label={t('frame8_10.usWest', { defaultValue: 'US-West' })} position={{ x: 200, y: 280 }} animate={!prefersReducedMotion} size={55} />
            <SpireServer label={t('frame8_10.usEast', { defaultValue: 'US-East' })} position={{ x: 400, y: 280 }} animate={!prefersReducedMotion} size={55} />
            <SpireServer label={t('frame8_10.europe', { defaultValue: 'EU' })} position={{ x: 600, y: 280 }} animate={!prefersReducedMotion} size={55} />
            <text x={200} y={330} textAnchor="middle" fill={colors.server} fontSize={10}>
              {t('frame8_10.regional', { defaultValue: 'Regional' })}
            </text>
            <text x={400} y={330} textAnchor="middle" fill={colors.server} fontSize={10}>
              {t('frame8_10.regional', { defaultValue: 'Regional' })}
            </text>
            <text x={600} y={330} textAnchor="middle" fill={colors.server} fontSize={10}>
              {t('frame8_10.regional', { defaultValue: 'Regional' })}
            </text>
          </motion.g>
        )}

        {/* Hierarchy lines */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={370} y1={170} x2={220} y2={240} stroke={colors.server} strokeWidth={2} strokeDasharray="6 3" />
            <line x1={400} y1={175} x2={400} y2={240} stroke={colors.server} strokeWidth={2} strokeDasharray="6 3" />
            <line x1={430} y1={170} x2={580} y2={240} stroke={colors.server} strokeWidth={2} strokeDasharray="6 3" />
          </motion.g>
        )}

        {/* Benefits */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={370} width={500} height={100} rx={8} fill={colors.surface} stroke={colors.server} strokeWidth={1} />
            <text x={400} y={400} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame8_10.largeDeployment', { defaultValue: 'Large Deployment Pattern' })}
            </text>
            <text x={200} y={430} fill={colors.textSecondary} fontSize={11}>• {t('frame8_10.bullet1', { defaultValue: 'Regional servers under global root' })}</text>
            <text x={200} y={450} fill={colors.textSecondary} fontSize={11}>• {t('frame8_10.bullet2', { defaultValue: 'Locality-aware performance' })}</text>
            <text x={500} y={430} fill={colors.textSecondary} fontSize={11}>• {t('frame8_10.bullet3', { defaultValue: 'Hierarchical trust' })}</text>
            <text x={500} y={450} fill={colors.textSecondary} fontSize={11}>• {t('frame8_10.bullet4', { defaultValue: 'Fault isolation' })}</text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
