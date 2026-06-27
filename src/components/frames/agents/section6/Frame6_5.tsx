import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

interface Row {
  who: string;
  forWhom: string;
  what: string;
  when: string;
}

/**
 * Frame 6-5: The Audit Trail
 * Visual: A ledger recording who acted, for whom, with what permission, and when
 * — because every hop is named and scoped, the record is complete.
 */
export const Frame6_5: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 500, 500, 500]);
  const prefersReducedMotion = useReducedMotion();

  const rows: Row[] = [
    { who: 'agent-a', forWhom: 'principal', what: 'read calendar', when: '14:02:03' },
    { who: 'agent-b', forWhom: 'principal', what: 'charge card', when: '14:02:05' },
    { who: 'agent-c', forWhom: 'principal', what: 'send receipt', when: '14:02:06' },
  ];

  const cols = [
    { x: 110, key: 'frame6_5.who', def: 'WHO' },
    { x: 270, key: 'frame6_5.forWhom', def: 'FOR WHOM' },
    { x: 430, key: 'frame6_5.what', def: 'WHAT' },
    { x: 610, key: 'frame6_5.when', def: 'WHEN' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Ledger card */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <rect x={80} y={100} width={640} height={300} rx={14} fill={colors.surface} stroke={colors.permissionSlip} strokeWidth={1.5} />
          <text x={110} y={135} fill={colors.permissionSlip} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" letterSpacing="0.5">
            {t('frame6_5.title', { defaultValue: 'AUDIT TRAIL' })}
          </text>
          {/* header */}
          {cols.map((c) => (
            <text key={c.def} x={c.x} y={172} fill={colors.textSecondary} fontSize={11} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
              {t(c.key, { defaultValue: c.def })}
            </text>
          ))}
          <line x1={100} y1={184} x2={700} y2={184} stroke={colors.textMuted} strokeWidth={1} opacity={0.5} />
        </motion.g>

        {/* rows */}
        {rows.map((r, i) =>
          phase >= i + 1 ? (
            <motion.g
              key={i}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <text x={cols[0].x} y={222 + i * 44} fill={colors.agentAI} fontSize={13} fontFamily="JetBrains Mono, monospace">{r.who}</text>
              <text x={cols[1].x} y={222 + i * 44} fill={colors.principal} fontSize={13} fontFamily="JetBrains Mono, monospace">{r.forWhom}</text>
              <text x={cols[2].x} y={222 + i * 44} fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">{r.what}</text>
              <text x={cols[3].x} y={222 + i * 44} fill={colors.textSecondary} fontSize={13} fontFamily="JetBrains Mono, monospace">{r.when}</text>
            </motion.g>
          ) : null
        )}
      </svg>
    </Stage>
  );
};
