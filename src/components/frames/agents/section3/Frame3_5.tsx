import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-5: Why Both Matter
 * Visual: subject = whose authority is used; actor = who to hold responsible.
 * Keep both and an audit can answer "who really did this, and for whom?"
 */
export const Frame3_5: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 700]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* SUBJECT card */}
        <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <rect x={90} y={110} width={280} height={120} rx={12} fill={colors.surface} stroke={colors.principal} strokeWidth={1.5} />
          <text x={230} y={150} textAnchor="middle" fill={colors.principal} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame3_5.subject', { defaultValue: 'SUBJECT' })}
          </text>
          <text x={230} y={180} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame3_5.subjectQ', { defaultValue: 'Whose authority is used?' })}
          </text>
          <text x={230} y={206} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame3_5.subjectA', { defaultValue: 'The principal’s' })}
          </text>
        </motion.g>

        {/* ACTOR card */}
        {phase >= 1 && (
          <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <rect x={430} y={110} width={280} height={120} rx={12} fill={colors.surface} stroke={colors.agentAI} strokeWidth={1.5} />
            <text x={570} y={150} textAnchor="middle" fill={colors.agentAI} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame3_5.actorLabel', { defaultValue: 'ACTOR' })}
            </text>
            <text x={570} y={180} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_5.actorQ', { defaultValue: 'Who to hold responsible?' })}
            </text>
            <text x={570} y={206} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_5.actorA', { defaultValue: 'The agent' })}
            </text>
          </motion.g>
        )}

        {/* Audit answer panel */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <rect x={150} y={290} width={500} height={110} rx={12} fill={`${colors.success}12`} stroke={colors.success} strokeWidth={1.5} />
            <g transform="translate(190, 330)">
              <circle cx={0} cy={0} r={15} fill={`${colors.success}22`} stroke={colors.success} strokeWidth={2} />
              <path d="M -5 0 l 3.5 4 l 7 -8" fill="none" stroke={colors.success} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text x={400} y={328} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_5.auditTitle', { defaultValue: 'The audit can answer:' })}
            </text>
            <text x={400} y={358} textAnchor="middle" fill={colors.success} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_5.auditAnswer', { defaultValue: '“Who really did this — and for whom?”' })}
            </text>
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            x={400}
            y={448}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize={15}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame3_5.caption', { defaultValue: 'Keep both, and nothing about the action is ambiguous.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
