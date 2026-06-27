import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-6: Delegation Is Not Impersonation
 * Visual: side-by-side. Left = impersonation (agent hidden behind a YOU mask, ✗).
 * Right = delegation (agent visible and named, ✓). We always want the right one.
 */
export const Frame3_6: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 800]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <line x1={400} y1={95} x2={400} y2={415} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="6 6" opacity={0.5} />

        {/* LEFT — Impersonation (bad) */}
        <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <text x={200} y={125} textAnchor="middle" fill={colors.attacker} fontSize={17} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame3_6.impersonation', { defaultValue: 'Impersonation' })}
          </text>
          <AIAgent label={t('frame3_6.hidden', { defaultValue: '???' })} position={{ x: 200, y: 255 }} size={84} animate={!prefersReducedMotion} />
          {/* YOU mask hiding the agent */}
          <ellipse cx={200} cy={238} rx={40} ry={30} fill={colors.principal} opacity={0.92} stroke="#4F46E5" strokeWidth={2} />
          <text x={200} y={244} textAnchor="middle" fill="#FFFFFF" fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" letterSpacing="1">
            {t('frame3_6.mask', { defaultValue: 'YOU' })}
          </text>
          <text x={200} y={345} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame3_6.hides', { defaultValue: 'hides the agent, pretends to be you' })}
          </text>
          <g transform="translate(200, 388)" stroke={colors.attacker} strokeWidth={4} strokeLinecap="round">
            <circle cx={0} cy={0} r={15} fill="none" strokeWidth={3} />
            <line x1={-7} y1={-7} x2={7} y2={7} />
            <line x1={7} y1={-7} x2={-7} y2={7} />
          </g>
        </motion.g>

        {/* RIGHT — Delegation (good) */}
        {phase >= 1 && (
          <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <text x={600} y={125} textAnchor="middle" fill={colors.success} fontSize={17} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame3_6.delegation', { defaultValue: 'Delegation' })}
            </text>
            <AIAgent label={t('frame3_6.named', { defaultValue: 'Travel Agent' })} position={{ x: 600, y: 255 }} size={84} active animate={!prefersReducedMotion} />
            <text x={600} y={345} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_6.visible', { defaultValue: 'visible and named, acting for you' })}
            </text>
            <g transform="translate(600, 388)">
              <circle cx={0} cy={0} r={15} fill={`${colors.success}22`} stroke={colors.success} strokeWidth={2} />
              <path d="M -6 0 l 4 5 l 8 -9" fill="none" stroke={colors.success} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </motion.g>
        )}

        {phase >= 1 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            x={400}
            y={455}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize={15}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame3_6.caption', { defaultValue: 'Always delegation. Never impersonation.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
