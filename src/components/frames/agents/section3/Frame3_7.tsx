import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-7: The Shape Of A Slip
 * Visual: a delegation is a signed note with three clauses — "this agent",
 * "acting for this principal", "may do this task" — teasing the next chapter.
 */
export const Frame3_7: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  const clauses = [
    { y: 150, label: t('frame3_7.clause1', { defaultValue: 'This agent…' }), color: colors.agentAI },
    { y: 235, label: t('frame3_7.clause2', { defaultValue: '…acting for this principal…' }), color: colors.principal },
    { y: 320, label: t('frame3_7.clause3', { defaultValue: '…may do this task.' }), color: colors.permissionSlip },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <PermissionSlip
          position={{ x: 250, y: 255 }}
          size={165}
          onBehalfOf={t('frame3_7.onBehalfOf', { defaultValue: 'Alex (you)' })}
          actor={t('frame3_7.actor', { defaultValue: 'Travel Agent' })}
          scopes={[t('frame3_7.scope', { defaultValue: 'Read calendar' })]}
          audience="calendar-api"
          expiresIn={300}
          animate={!prefersReducedMotion}
        />

        {clauses.map((c, i) =>
          phase >= i + 1 ? (
            <motion.g key={i} initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <rect x={470} y={c.y - 26} width={290} height={48} rx={10} fill={colors.surface} stroke={c.color} strokeWidth={1.5} />
              <circle cx={498} cy={c.y - 2} r={5} fill={c.color} />
              <text x={520} y={c.y + 3} fill={colors.textPrimary} fontSize={15} fontFamily="IBM Plex Sans, sans-serif">
                {c.label}
              </text>
            </motion.g>
          ) : null
        )}

        {phase >= 3 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={448}
            textAnchor="middle"
            fill={colors.textMuted}
            fontSize={14}
            fontStyle="italic"
            fontFamily="IBM Plex Sans, sans-serif"
          >
            {t('frame3_7.caption', { defaultValue: 'Next: we give this note real structure and real properties.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
