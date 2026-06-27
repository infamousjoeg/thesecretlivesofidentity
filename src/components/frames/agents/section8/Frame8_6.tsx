import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, Verifier, Attacker } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-6: Short Lifetimes Limit Damage
 * Visual: an attacker who leaked a slip finds it already expired — the verifier
 * rejects it. Time itself caps how far a single failure spreads.
 */
export const Frame8_6: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Attacker holding a leaked slip */}
        <Attacker position={{ x: 110, y: 250 }} label={t('frame8_6.attackerLabel', { defaultValue: 'Leaked a slip' })} blocked={phase >= 2} animate={animate} />

        {/* The expired slip */}
        <PermissionSlip
          position={{ x: 320, y: 250 }}
          size={150}
          state="expired"
          onBehalfOf={t('frame8_6.onBehalfOf', { defaultValue: 'Alex (you)' })}
          actor={t('frame8_6.actor', { defaultValue: 'Agent' })}
          scopes={[t('frame8_6.scope', { defaultValue: 'Read calendar' })]}
          audience="calendar-api"
          expiresIn={0}
          showCountdown={false}
          animate={animate}
        />

        {/* Verifier rejects the expired slip */}
        {phase >= 1 && (
          <motion.g initial={animate ? { opacity: 0, scale: 0.7 } : { opacity: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <line x1={420} y1={250} x2={500} y2={250} stroke={colors.attacker} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
            <Verifier position={{ x: 580, y: 250 }} size={84} label={t('frame8_6.verifierLabel', { defaultValue: 'Already expired' })} state="reject" animate={animate} />
          </motion.g>
        )}

        {/* Caption */}
        {phase >= 2 && (
          <motion.text
            x={400}
            y={465}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('frame8_6.caption', { defaultValue: 'A leaked slip stops working soon — time caps the damage.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
