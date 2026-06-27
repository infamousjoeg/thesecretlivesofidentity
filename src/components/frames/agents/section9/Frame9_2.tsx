import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 9-2: The Slip Summary
 * Visual: one slip annotated with the five questions it answers — who for, who
 * acts, what is allowed, where, and until when.
 */
export const Frame9_2: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 350, 350, 350, 350, 350]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const slipX = 230;
  const callouts = [
    { y: 110, q: t('frame9_2.who', { defaultValue: 'WHO is it for' }), a: t('frame9_2.whoA', { defaultValue: 'on behalf of the principal' }), color: colors.principal },
    { y: 180, q: t('frame9_2.acting', { defaultValue: 'WHO is acting' }), a: t('frame9_2.actingA', { defaultValue: 'the named agent' }), color: colors.agentAI },
    { y: 250, q: t('frame9_2.what', { defaultValue: 'WHAT is allowed' }), a: t('frame9_2.whatA', { defaultValue: 'a narrow set of scopes' }), color: colors.permissionSlip },
    { y: 320, q: t('frame9_2.where', { defaultValue: 'WHERE' }), a: t('frame9_2.whereA', { defaultValue: 'audience: one server' }), color: colors.verifier },
    { y: 390, q: t('frame9_2.until', { defaultValue: 'UNTIL WHEN' }), a: t('frame9_2.untilA', { defaultValue: 'a short expiry' }), color: colors.success },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* The slip */}
        <PermissionSlip
          position={{ x: slipX, y: 250 }}
          size={160}
          state="valid"
          onBehalfOf={t('frame9_2.onBehalfOf', { defaultValue: 'Alex (you)' })}
          actor={t('frame9_2.actor', { defaultValue: 'Travel Agent' })}
          scopes={[t('frame9_2.scope', { defaultValue: 'Read calendar' })]}
          audience="calendar-api"
          expiresIn={300}
          animate={animate}
        />

        {/* Callouts */}
        {callouts.map((c, i) => (
          phase >= i + 1 && (
            <motion.g
              key={c.q}
              initial={animate ? { opacity: 0, x: 16 } : { opacity: 1 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* connector */}
              <line x1={slipX + 70} y1={250} x2={470} y2={c.y} stroke={c.color} strokeWidth={1.5} opacity={0.4} strokeDasharray="3 3" />
              <rect x={470} y={c.y - 24} width={300} height={48} rx={8} fill={colors.surface} stroke={c.color} strokeWidth={1.5} />
              <text x={486} y={c.y - 4} fill={c.color} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {c.q}
              </text>
              <text x={486} y={c.y + 14} fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
                {c.a}
              </text>
            </motion.g>
          )
        ))}
      </svg>
    </Stage>
  );
};
