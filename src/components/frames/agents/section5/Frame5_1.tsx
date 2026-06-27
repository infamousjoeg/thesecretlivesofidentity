import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-1: Least Privilege
 * Visual: A broad slip (more power than needed) beside a narrow slip (just
 * enough). The narrow slip is the simplest way to limit what can go wrong.
 */
export const Frame5_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Broad slip — too much authority */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <PermissionSlip
              position={{ x: 230, y: 245 }}
              size={150}
              state="valid"
              scopes={['Read calendar', 'Send email', 'Delete events']}
              animate={false}
            />
            <rect x={140} y={358} width={180} height={30} rx={6} fill={`${colors.warning}1A`} stroke={colors.warning} strokeWidth={1.25} />
            <text x={230} y={378} textAnchor="middle" fill={colors.warning} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_1.broad', { defaultValue: 'More power than needed' })}
            </text>
          </motion.g>
        )}

        {/* Narrow slip — least privilege */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <PermissionSlip
              position={{ x: 560, y: 245 }}
              size={150}
              state="valid"
              scopes={['Read calendar']}
              revokedScopes={['Send email', 'Delete events']}
              animate={!prefersReducedMotion}
            />
            <rect x={470} y={358} width={180} height={30} rx={6} fill={`${colors.success}1A`} stroke={colors.success} strokeWidth={1.25} />
            <text x={560} y={378} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_1.narrow', { defaultValue: 'Just enough — least privilege' })}
            </text>
          </motion.g>
        )}

        {/* vs divider */}
        {phase >= 2 && (
          <motion.text
            x={395}
            y={250}
            textAnchor="middle"
            fill={colors.textMuted}
            fontSize={20}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {t('frame5_1.vs', { defaultValue: 'vs' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
