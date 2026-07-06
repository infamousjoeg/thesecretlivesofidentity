import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-6: No Receipts
 * Visual: three identical, anonymous agents all using the shared key, and an
 * audit log whose every "who" column is an unanswerable "???".
 */
export const Frame1_6: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  const rows = [
    { time: '09:14', action: t('frame1_6.action0', { defaultValue: 'Deleted records' }) },
    { time: '09:15', action: t('frame1_6.action1', { defaultValue: 'Moved funds' }) },
    { time: '09:16', action: t('frame1_6.action2', { defaultValue: 'Read mailbox' }) },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Anonymous, indistinguishable agents */}
        {[150, 240, 330].map((x, i) => (
          <AIAgent key={i} label={t('frame1_6.agent', { defaultValue: 'Agent ?' })} position={{ x, y: 175 }} size={56} animate={!prefersReducedMotion} />
        ))}

        {/* Audit log panel */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <rect x={470} y={110} width={280} height={210} rx={10} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1.25} />
            <text x={610} y={138} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame1_6.logTitle', { defaultValue: 'Audit Log' })}
            </text>
            <line x1={486} y1={150} x2={734} y2={150} stroke={colors.textMuted} strokeWidth={0.75} opacity={0.5} />
            {/* header */}
            <text x={500} y={170} fill={colors.textSecondary} fontSize={12} fontFamily="JetBrains Mono, monospace">{t('frame1_6.colTime', { defaultValue: 'TIME' })}</text>
            <text x={560} y={170} fill={colors.textSecondary} fontSize={12} fontFamily="JetBrains Mono, monospace">{t('frame1_6.colWho', { defaultValue: 'WHO' })}</text>
            <text x={630} y={170} fill={colors.textSecondary} fontSize={12} fontFamily="JetBrains Mono, monospace">{t('frame1_6.colAction', { defaultValue: 'ACTION' })}</text>
            {rows.map((r, i) => {
              const y = 198 + i * 34;
              return (
                <g key={i}>
                  <text x={500} y={y} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">{r.time}</text>
                  <text x={560} y={y} fill={colors.attacker} fontSize={13} fontWeight="bold" fontFamily="JetBrains Mono, monospace">???</text>
                  <text x={630} y={y} fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">{r.action}</text>
                </g>
              );
            })}
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={420}
            textAnchor="middle"
            fill={colors.attacker}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame1_6.caption', { defaultValue: 'No trail of who acted, or what they were allowed to do.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
