import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, SubAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-3: The Actor Chain
 * Visual: Each slip records the chain of actors — principal, then agent A, then
 * agent B — everyone who touched the request, listed in order.
 */
export const Frame6_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 500, 500, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a6-3-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.textMuted} />
          </marker>
        </defs>

        {/* The chain of actors, in order */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Principal label={t('frame6_3.principalLabel', { defaultValue: 'Principal' })} position={{ x: 180, y: 130 }} active animate={!prefersReducedMotion} />
          {phase >= 1 && (
            <motion.g {...reveal(0)}>
              <line x1={228} y1={130} x2={352} y2={130} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#a6-3-arrow)" />
              <AIAgent label={t('frame6_3.agentALabel', { defaultValue: 'Agent A' })} position={{ x: 400, y: 130 }} active animate={!prefersReducedMotion} />
            </motion.g>
          )}
          {phase >= 2 && (
            <motion.g {...reveal(0)}>
              <line x1={452} y1={130} x2={576} y2={135} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#a6-3-arrow)" />
              <SubAgent label={t('frame6_3.agentBLabel', { defaultValue: 'Agent B' })} position={{ x: 630, y: 140 }} active animate={!prefersReducedMotion} />
            </motion.g>
          )}
        </motion.g>

        {/* Recorded on the slip */}
        {phase >= 3 && (
          <motion.g {...reveal(0)}>
            <rect x={170} y={300} width={460} height={110} rx={12} fill={colors.surface} stroke={colors.permissionSlip} strokeWidth={1.5} />
            <text x={400} y={328} textAnchor="middle" fill={colors.permissionSlip} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" letterSpacing="0.5">
              {t('frame6_3.recorded', { defaultValue: 'RECORDED ON THE SLIP' })}
            </text>
            <text x={400} y={360} textAnchor="middle" fill={colors.agentAI} fontSize={14} fontFamily="JetBrains Mono, monospace">
              {t('frame6_3.actorLine', { defaultValue: 'actor: principal → agent-a → agent-b' })}
            </text>
            <text x={400} y={388} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame6_3.inOrder', { defaultValue: 'Everyone who touched the request, in order' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
