import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, SubAgent, PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-3: Each Hop Shrinks
 * Visual: Principal → agent → sub-agent. Each hop carries a narrower slip than
 * the last — authority only ever decreases as you move down the chain.
 */
export const Frame5_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a5-3-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.permissionSlip} />
          </marker>
        </defs>

        {/* Chain of actors */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Principal label={t('frame5_3.principalLabel', { defaultValue: 'Principal' })} position={{ x: 110, y: 140 }} active animate={!prefersReducedMotion} />
          <AIAgent label={t('frame5_3.agentALabel', { defaultValue: 'Agent A' })} position={{ x: 400, y: 140 }} active={phase >= 1} animate={!prefersReducedMotion} />
          <SubAgent label={t('frame5_3.agentBLabel', { defaultValue: 'Agent B' })} position={{ x: 680, y: 150 }} active={phase >= 2} animate={!prefersReducedMotion} />
        </motion.g>

        {/* Hop 1: broad slip */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <line x1={165} y1={140} x2={335} y2={140} stroke={colors.permissionSlip} strokeWidth={2.5} markerEnd="url(#a5-3-arrow)" />
            <PermissionSlip
              position={{ x: 250, y: 350 }}
              size={104}
              state="valid"
              scopes={['Read calendar', 'Send invite']}
              animate={false}
            />
            <line x1={250} y1={195} x2={250} y2={262} stroke={colors.permissionSlip} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
          </motion.g>
        )}

        {/* Hop 2: narrower slip */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <line x1={455} y1={140} x2={620} y2={145} stroke={colors.permissionSlip} strokeWidth={2.5} markerEnd="url(#a5-3-arrow)" />
            <PermissionSlip
              position={{ x: 540, y: 360 }}
              size={84}
              state="valid"
              narrowed
              scopes={['Read calendar']}
              revokedScopes={['Send invite']}
              animate={!prefersReducedMotion}
            />
            <line x1={540} y1={205} x2={540} y2={295} stroke={colors.permissionSlip} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
          </motion.g>
        )}

        {/* Caption */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={455}
            textAnchor="middle"
            fill={colors.permissionSlip}
            fontSize={15}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
            {...reveal(0)}
          >
            {t('frame5_3.caption', { defaultValue: 'Authority only ever decreases down the chain' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
