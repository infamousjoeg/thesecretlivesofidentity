import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Verifier } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

interface Check {
  key: string;
  def: string;
}

/**
 * Frame 6-6: Trust, But Verify
 * Visual: A verifier inspects the whole chain — each link signed, each narrower
 * than the last, none expired, each bound to the right audience.
 */
export const Frame6_6: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 450, 450, 450, 450]);
  const prefersReducedMotion = useReducedMotion();

  const checks: Check[] = [
    { key: 'frame6_6.signed', def: 'Each link signed by a trusted authority' },
    { key: 'frame6_6.narrower', def: 'Each slip narrower than the last' },
    { key: 'frame6_6.notExpired', def: 'None expired' },
    { key: 'frame6_6.audience', def: 'Each bound to the right audience' },
  ];

  const verified = phase >= checks.length;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Verifier inspecting the chain */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Verifier label="Verifier" position={{ x: 165, y: 220 }} size={120} state={verified ? 'accept' : 'idle'} animate={verified && !prefersReducedMotion} />
        </motion.g>

        {/* Checklist */}
        <motion.rect
          x={350}
          y={95}
          width={400}
          height={310}
          rx={14}
          fill={colors.surface}
          stroke={colors.verifier}
          strokeWidth={1.5}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        />
        <text x={374} y={130} fill={colors.verifier} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" letterSpacing="0.5">
          {t('frame6_6.title', { defaultValue: 'VERIFY THE WHOLE CHAIN' })}
        </text>

        {checks.map((c, i) =>
          phase >= i + 1 ? (
            <motion.g
              key={c.key}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <circle cx={388} cy={168 + i * 52} r={11} fill={`${colors.success}22`} stroke={colors.success} strokeWidth={1.75} />
              <path d={`M 382 ${168 + i * 52} l 4 4 l 7 -8`} fill="none" stroke={colors.success} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />
              <text x={410} y={173 + i * 52} fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
                {t(c.key, { defaultValue: c.def })}
              </text>
            </motion.g>
          ) : null
        )}
      </svg>
    </Stage>
  );
};
