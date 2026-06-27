import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, SubAgent, PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-6: You Cannot Grant What You Lack
 * Visual: An agent holding a read-only slip tries to pass on a write slip — and
 * cannot. Authority does not grow by being handed onward.
 */
export const Frame5_6: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Agent A holds only a read-only slip */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AIAgent label={t('frame5_6.agentALabel', { defaultValue: 'Agent A' })} position={{ x: 150, y: 150 }} active animate={!prefersReducedMotion} />
          <PermissionSlip position={{ x: 150, y: 340 }} size={94} state="valid" scopes={['Read file']} animate={false} />
          <text x={150} y={428} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame5_6.holds', { defaultValue: 'Holds: read-only' })}
          </text>
        </motion.g>

        {/* Sub-agent waiting */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <SubAgent label={t('frame5_6.agentBLabel', { defaultValue: 'Agent B' })} position={{ x: 660, y: 160 }} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Attempt to forge a write slip — blocked */}
        {phase >= 2 && (
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            <g opacity={0.55}>
              <PermissionSlip position={{ x: 400, y: 240 }} size={100} state="valid" scopes={['Write file']} animate={false} />
            </g>
            {/* prohibition sign */}
            <circle cx={400} cy={240} r={62} fill="none" stroke={colors.attacker} strokeWidth={6} opacity={0.9} />
            <line x1={357} y1={197} x2={443} y2={283} stroke={colors.attacker} strokeWidth={6} opacity={0.9} strokeLinecap="round" />
            <text x={400} y={360} textAnchor="middle" fill={colors.attacker} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame5_6.cannot', { defaultValue: "Can't grant what you don't have" })}
            </text>
            <text x={400} y={382} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_6.noUpgrade', { defaultValue: 'read-only never becomes write' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
