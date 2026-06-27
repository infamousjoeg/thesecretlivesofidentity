import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-2: The Errand Metaphor
 * Visual: sending an assistant on an errand — you write a short note (a slip),
 * NOT hand over your house keys and bank card (both struck out).
 */
export const Frame3_2: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <Principal label={t('frame3_2.you', { defaultValue: 'You' })} position={{ x: 165, y: 215 }} size={78} active animate={!prefersReducedMotion} />

        {/* The short note handed over */}
        {phase >= 1 && (
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PermissionSlip
              position={{ x: 400, y: 210 }}
              size={130}
              onBehalfOf={t('frame3_2.onBehalfOf', { defaultValue: 'Alex (you)' })}
              actor={t('frame3_2.actor', { defaultValue: 'Assistant' })}
              scopes={[t('frame3_2.scope', { defaultValue: 'Pick up parcel' })]}
              audience="post-office"
              expiresIn={600}
              animate={!prefersReducedMotion}
            />
          </motion.g>
        )}

        {phase >= 1 && (
          <AIAgent label={t('frame3_2.agent', { defaultValue: 'Assistant' })} position={{ x: 650, y: 215 }} size={78} active={phase >= 2} animate={!prefersReducedMotion} />
        )}

        {/* NOT your house keys and bank card */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <text x={400} y={355} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_2.notThese', { defaultValue: 'NOT your house keys and bank card' })}
            </text>
            {/* house key */}
            <g transform="translate(320, 400)">
              <circle cx={-14} cy={0} r={10} fill="none" stroke={colors.textSecondary} strokeWidth={4} />
              <rect x={-5} y={-2.5} width={28} height={5} fill={colors.textSecondary} />
              <rect x={18} y={-2.5} width={4} height={9} fill={colors.textSecondary} />
              <line x1={-30} y1={-16} x2={32} y2={16} stroke={colors.attacker} strokeWidth={4} strokeLinecap="round" />
            </g>
            {/* bank card */}
            <g transform="translate(470, 400)">
              <rect x={-28} y={-18} width={56} height={36} rx={5} fill={colors.surface} stroke={colors.textSecondary} strokeWidth={2} />
              <rect x={-20} y={-9} width={12} height={9} rx={1.5} fill={colors.warning} />
              <line x1={-20} y1={8} x2={20} y2={8} stroke={colors.textSecondary} strokeWidth={2} />
              <line x1={-34} y1={-22} x2={34} y2={22} stroke={colors.attacker} strokeWidth={4} strokeLinecap="round" />
            </g>
            <text x={400} y={460} textAnchor="middle" fill={colors.permissionSlip} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame3_2.caption', { defaultValue: 'A short note authorizing one specific task.' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
