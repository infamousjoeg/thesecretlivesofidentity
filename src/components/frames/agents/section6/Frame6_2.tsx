import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, SubAgent, PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-2: Sub-Delegation
 * Visual: Agent A hands Agent B a narrower slip for just its part of the job —
 * still on behalf of the same original principal.
 */
export const Frame6_2: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 550, 550, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a6-2-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.agentAI} />
          </marker>
        </defs>

        {/* Actor chain */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Principal label={t('frame6_2.principalLabel', { defaultValue: 'Principal' })} position={{ x: 110, y: 140 }} active animate={!prefersReducedMotion} />
          <AIAgent label={t('frame6_2.agentALabel', { defaultValue: 'Agent A' })} position={{ x: 400, y: 140 }} active animate={!prefersReducedMotion} />
        </motion.g>

        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <line x1={165} y1={140} x2={345} y2={140} stroke={colors.agentAI} strokeWidth={2.5} markerEnd="url(#a6-2-arrow)" />
            <SubAgent label={t('frame6_2.agentBLabel', { defaultValue: 'Agent B' })} position={{ x: 690, y: 140 }} active={phase >= 2} animate={!prefersReducedMotion} />
            <line x1={455} y1={140} x2={630} y2={140} stroke={colors.agentAI} strokeWidth={2.5} markerEnd="url(#a6-2-arrow)" />
            <text x={545} y={125} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontStyle="italic" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame6_2.subDelegates', { defaultValue: 'sub-delegates' })}
            </text>
          </motion.g>
        )}

        {/* Narrower slip handed to B, still on behalf of the principal */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <PermissionSlip
              position={{ x: 545, y: 340 }}
              size={104}
              state="valid"
              narrowed
              onBehalfOf={t('frame6_2.principalLabel', { defaultValue: 'Principal' })}
              actor={t('frame6_2.agentBLabel', { defaultValue: 'Agent B' })}
              audience="payments-api"
              scopes={[t('frame6_2.scopeChargeCard', { defaultValue: 'Charge card' })]}
              animate={!prefersReducedMotion}
            />
            {/* thread linking the slip's subject back to the principal */}
            <path d="M 110 175 Q 250 430 495 320" fill="none" stroke={colors.principal} strokeWidth={1.5} strokeDasharray="5 4" opacity={0.6} />
          </motion.g>
        )}

        {/* Caption sits in the empty band below the scene so it never crosses
            the purple principal-thread that sweeps through the middle. */}
        {phase >= 3 && (
          <motion.text
            x={255}
            y={455}
            textAnchor="middle"
            fill={colors.principal}
            fontSize={13}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
            {...reveal(0)}
          >
            {t('frame6_2.samePrincipal', { defaultValue: 'Still on behalf of the same principal' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
