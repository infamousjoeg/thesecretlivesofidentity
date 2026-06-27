import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, PermissionSlip } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-1: The Hero Concept
 * Visual: The principal hands a signed permission slip (the hero entity) to the
 * agent — an access token: a signed, scoped, short-lived authorization to act.
 */
export const Frame4_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a4-1-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.permissionSlip} />
          </marker>
        </defs>

        {/* Principal (owner of authority) and Agent (actor) */}
        <motion.g {...reveal(0)}>
          <Principal label="Alex (you)" position={{ x: 130, y: 250 }} active animate={!prefersReducedMotion} />
          <AIAgent label="Travel Agent" position={{ x: 670, y: 250 }} active={phase >= 2} animate={!prefersReducedMotion} />
        </motion.g>

        {/* The hero: a signed permission slip, centre stage */}
        {phase >= 1 && (
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <PermissionSlip position={{ x: 400, y: 240 }} size={150} state="valid" animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Hand-off arrows */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <line x1={185} y1={245} x2={315} y2={245} stroke={colors.permissionSlip} strokeWidth={2.5} markerEnd="url(#a4-1-arrow)" />
            <line x1={485} y1={245} x2={605} y2={245} stroke={colors.permissionSlip} strokeWidth={2.5} markerEnd="url(#a4-1-arrow)" />
          </motion.g>
        )}

        {/* Caption */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={448}
            textAnchor="middle"
            fill={colors.permissionSlip}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
            {...reveal(0)}
          >
            {t('frame4_1.caption', { defaultValue: 'Signed · Scoped · Short-lived — an authorization to act' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
