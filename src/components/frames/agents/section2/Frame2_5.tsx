import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-5: Do Not Borrow The Human's Identity
 * Visual: the agent reaches for the human's own identity badge — struck out in
 * red — and the chain of accountability snaps in the middle.
 */
export const Frame2_5: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <Principal label={t('frame2_5.you', { defaultValue: 'You' })} position={{ x: 175, y: 240 }} size={78} active animate={!prefersReducedMotion} />

        {/* Human's identity badge, being grabbed */}
        <Badge position={{ x: 400, y: 235 }} size={128} spiffeId="human://alex" expiresIn={3600} animate={false} />

        <AIAgent label={t('frame2_5.agent', { defaultValue: 'AI Agent' })} position={{ x: 645, y: 240 }} size={80} active animate={!prefersReducedMotion} />

        {/* Forbidden: agent reusing the human's badge */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <line x1={560} y1={235} x2={465} y2={235} stroke={colors.attacker} strokeWidth={2} strokeDasharray="5 4" />
            <g transform="translate(400, 235)" stroke={colors.attacker} strokeWidth={6} strokeLinecap="round">
              <circle cx={0} cy={0} r={70} fill="none" strokeWidth={4} />
              <line x1={-48} y1={-48} x2={48} y2={48} />
            </g>
            <text x={512} y={300} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_5.never', { defaultValue: 'never reuse your login' })}
            </text>
          </motion.g>
        )}

        {/* Broken accountability chain */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <g transform="translate(400, 380)">
              {[-60, -34].map((x) => (
                <ellipse key={x} cx={x} cy={0} rx={13} ry={9} fill="none" stroke={colors.textSecondary} strokeWidth={3} />
              ))}
              {[34, 60].map((x) => (
                <ellipse key={x} cx={x} cy={0} rx={13} ry={9} fill="none" stroke={colors.textSecondary} strokeWidth={3} />
              ))}
              {/* snapped middle link */}
              <path d="M -14 -8 q 8 8 0 16" fill="none" stroke={colors.attacker} strokeWidth={3} strokeLinecap="round" />
              <path d="M 14 -8 q -8 8 0 16" fill="none" stroke={colors.attacker} strokeWidth={3} strokeLinecap="round" />
            </g>
            <text x={400} y={455} textAnchor="middle" fill={colors.attacker} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_5.caption', { defaultValue: 'Borrow your identity and accountability collapses.' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
