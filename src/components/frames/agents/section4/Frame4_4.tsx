import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';
import type { BadgeState } from '@/types';

/**
 * Frame 4-4: Short-Lived
 * Visual: The same slip across its short life — valid, then expiring, then
 * expired. A stolen slip becomes useless within minutes; no long-lived keys.
 */
export const Frame4_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700, 500]);
  const prefersReducedMotion = useReducedMotion();

  const slips: { x: number; state: BadgeState; expiresIn: number; caption: string; def: string }[] = [
    { x: 180, state: 'valid', expiresIn: 300, caption: 'frame4_4.fresh', def: 'Issued' },
    { x: 400, state: 'expiring', expiresIn: 25, caption: 'frame4_4.expiring', def: 'Minutes later' },
    { x: 620, state: 'expired', expiresIn: 0, caption: 'frame4_4.expired', def: 'Now useless' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Timeline arrow */}
        <motion.line
          x1={120}
          y1={400}
          x2={680}
          y2={400}
          stroke={colors.textMuted}
          strokeWidth={2}
          strokeDasharray="6 5"
          initial={prefersReducedMotion ? { opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 0.5 } : { pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.8 }}
        />
        <text x={690} y={404} fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
          {t('frame4_4.time', { defaultValue: 'time' })}
        </text>

        {slips.map((s, i) =>
          phase >= i ? (
            <motion.g
              key={s.x}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              <PermissionSlip
                position={{ x: s.x, y: 240 }}
                size={128}
                state={s.state}
                expiresIn={s.expiresIn}
                showCountdown={s.state !== 'expired'}
                animate={!prefersReducedMotion}
              />
              <circle cx={s.x} cy={400} r={6} fill={s.state === 'expired' ? colors.attacker : s.state === 'expiring' ? '#F97316' : colors.permissionSlip} />
              <text x={s.x} y={432} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
                {t(s.caption, { defaultValue: s.def })}
              </text>
            </motion.g>
          ) : null
        )}
      </svg>
    </Stage>
  );
};
