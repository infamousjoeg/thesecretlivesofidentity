import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-3: Scoped
 * Visual: The slip names exactly what is allowed (read one calendar) and nothing
 * else — scope is the explicit allow-list; everything outside it is denied.
 */
export const Frame4_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, x: 14 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Slip with one granted scope and the rest explicitly removed */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <PermissionSlip
            position={{ x: 250, y: 250 }}
            size={160}
            state="valid"
            scopes={['Read calendar']}
            revokedScopes={['Delete events', 'Send email']}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Allowed row */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <rect x={470} y={170} width={280} height={52} rx={8} fill={`${colors.success}1A`} stroke={colors.success} strokeWidth={1.5} />
            <circle cx={496} cy={196} r={9} fill="none" stroke={colors.success} strokeWidth={2} />
            <path d="M 491 196 l 3.5 3.5 l 6 -7" fill="none" stroke={colors.success} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <text x={516} y={192} fill={colors.textPrimary} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_3.allowed', { defaultValue: 'Read calendar' })}
            </text>
            <text x={516} y={210} fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_3.allowedSub', { defaultValue: 'Exactly what the task needs' })}
            </text>
          </motion.g>
        )}

        {/* Denied row */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <rect x={470} y={278} width={280} height={52} rx={8} fill={`${colors.attacker}14`} stroke={colors.attacker} strokeWidth={1.5} />
            <circle cx={496} cy={304} r={9} fill="none" stroke={colors.attacker} strokeWidth={2} />
            <path d="M 492 300 l 8 8 M 500 300 l -8 8" fill="none" stroke={colors.attacker} strokeWidth={2} strokeLinecap="round" />
            <text x={516} y={300} fill={colors.textPrimary} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_3.denied', { defaultValue: 'Everything else' })}
            </text>
            <text x={516} y={318} fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_3.deniedSub', { defaultValue: 'Not on the slip = not allowed' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
