import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, Verifier } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-4: Acting As You vs Acting For You
 * Visual: the agent wears a "YOU" mask. To a watching system it is
 * indistinguishable from the real principal — no way to tell them apart.
 */
export const Frame1_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <Principal label={t('frame1_4.you', { defaultValue: 'You' })} position={{ x: 175, y: 250 }} size={78} active animate={!prefersReducedMotion} />
        <AIAgent label={t('frame1_4.agent', { defaultValue: 'AI Agent' })} position={{ x: 400, y: 250 }} size={88} active animate={!prefersReducedMotion} />

        {/* "YOU" mask drawn over the agent's face */}
        {phase >= 1 && (
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ellipse cx={400} cy={233} rx={40} ry={30} fill={colors.principal} opacity={0.9} stroke="#4F46E5" strokeWidth={2} />
            <text x={400} y={239} textAnchor="middle" fill="#FFFFFF" fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" letterSpacing="1">
              {t('frame1_4.mask', { defaultValue: 'YOU' })}
            </text>
            <text x={400} y={194} textAnchor="middle" fill={colors.textSecondary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame1_4.maskNote', { defaultValue: 'wearing your credentials' })}
            </text>
          </motion.g>
        )}

        {/* Watching system can't tell them apart */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Verifier label={t('frame1_4.system', { defaultValue: 'System' })} position={{ x: 645, y: 235 }} size={80} state="accept" animate={!prefersReducedMotion} />
            <g transform="translate(645, 330)">
              <rect x={-78} y={0} width={156} height={34} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
              <text x={0} y={21} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
                {t('frame1_4.thinks', { defaultValue: '“That was you.”' })}
              </text>
            </g>
            <text x={400} y={460} textAnchor="middle" fill={colors.attacker} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame1_4.caption', { defaultValue: 'No way to tell the agent apart from you.' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
