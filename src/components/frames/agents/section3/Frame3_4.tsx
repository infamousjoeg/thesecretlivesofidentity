import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-4: Subject And Actor
 * Visual: the slip with two parts called out — the SUBJECT (on whose behalf) and
 * the ACTOR (who is actually acting). Both are recorded.
 */
export const Frame3_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <PermissionSlip
          position={{ x: 400, y: 250 }}
          size={170}
          onBehalfOf={t('frame3_4.onBehalfOf', { defaultValue: 'Alex (you)' })}
          actor={t('frame3_4.actor', { defaultValue: 'Travel Agent' })}
          scopes={[t('frame3_4.scope', { defaultValue: 'Read calendar' })]}
          audience="calendar-api"
          expiresIn={300}
          animate={!prefersReducedMotion}
        />

        {/* SUBJECT callout (left) */}
        {phase >= 1 && (
          <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <line x1={185} y1={200} x2={332} y2={205} stroke={colors.principal} strokeWidth={1.5} strokeDasharray="4 4" />
            <circle cx={332} cy={205} r={4} fill={colors.principal} />
            <rect x={40} y={172} width={150} height={56} rx={8} fill={colors.surface} stroke={colors.principal} strokeWidth={1.5} />
            <text x={115} y={195} textAnchor="middle" fill={colors.principal} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame3_4.subject', { defaultValue: 'SUBJECT' })}
            </text>
            <text x={115} y={216} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_4.subjectDesc', { defaultValue: 'on whose behalf' })}
            </text>
          </motion.g>
        )}

        {/* ACTOR callout (right) */}
        {phase >= 2 && (
          <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <line x1={615} y1={250} x2={468} y2={250} stroke={colors.agentAI} strokeWidth={1.5} strokeDasharray="4 4" />
            <circle cx={468} cy={250} r={4} fill={colors.agentAI} />
            <rect x={610} y={222} width={150} height={56} rx={8} fill={colors.surface} stroke={colors.agentAI} strokeWidth={1.5} />
            <text x={685} y={245} textAnchor="middle" fill={colors.agentAI} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame3_4.actorLabel', { defaultValue: 'ACTOR' })}
            </text>
            <text x={685} y={266} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_4.actorDesc', { defaultValue: 'who is acting' })}
            </text>
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            x={400}
            y={468}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
          >
            {t('frame3_4.caption', { defaultValue: 'Tokens record both: the subject and the actor.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
