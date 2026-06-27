import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, Verifier, AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-5: Revocation
 * Visual: a still-valid slip is cancelled (REVOKED stamp) before it expires; the
 * verifier now rejects it, stopping a misbehaving agent immediately.
 */
export const Frame8_5: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Agent being stopped */}
        <AIAgent position={{ x: 110, y: 250 }} label={t('frame8_5.agentLabel', { defaultValue: 'Compromised agent' })} active={phase < 1} animate={animate} />

        {/* The slip, with a revoked stamp slammed over it */}
        <g>
          <PermissionSlip
            position={{ x: 320, y: 250 }}
            size={150}
            state="valid"
            onBehalfOf={t('frame8_5.onBehalfOf', { defaultValue: 'Alex (you)' })}
            actor={t('frame8_5.actor', { defaultValue: 'Agent' })}
            scopes={[t('frame8_5.scope', { defaultValue: 'Read calendar' })]}
            audience="calendar-api"
            expiresIn={240}
            animate={animate}
          />
          {phase >= 1 && (
            <motion.g
              initial={{ opacity: 0, scale: 1.6, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: -14 }}
              transition={{ duration: 0.4 }}
            >
              <rect x={235} y={235} width={170} height={40} rx={4} fill="none" stroke={colors.attacker} strokeWidth={4} />
              <text x={320} y={264} textAnchor="middle" fill={colors.attacker} fontSize={24} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {t('frame8_5.revokedStamp', { defaultValue: 'REVOKED' })}
              </text>
            </motion.g>
          )}
        </g>

        {/* Verifier rejects the revoked slip */}
        {phase >= 2 && (
          <motion.g initial={animate ? { opacity: 0, scale: 0.7 } : { opacity: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <line x1={420} y1={250} x2={500} y2={250} stroke={colors.attacker} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
            <Verifier position={{ x: 580, y: 250 }} size={84} label={t('frame8_5.verifierLabel', { defaultValue: 'Stopped now' })} state="reject" animate={animate} />
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
            {t('frame8_5.caption', { defaultValue: 'Revocation cancels a slip before it expires — access cut now.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
