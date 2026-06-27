import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, Verifier, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-6: Scoped To The Task
 * Visual: a narrow slip (one approved action) passes the verifier; the tool opens
 * and sees only what was allowed.
 */
export const Frame7_6: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Narrow, scoped slip */}
        <PermissionSlip
          position={{ x: 150, y: 250 }}
          size={150}
          state="valid"
          narrowed={true}
          onBehalfOf={t('frame7_6.onBehalfOf', { defaultValue: 'Alex (you)' })}
          actor={t('frame7_6.actor', { defaultValue: 'Travel Agent' })}
          scopes={[t('frame7_6.scope', { defaultValue: 'Read calendar' })]}
          revokedScopes={[t('frame7_6.revoked', { defaultValue: 'Edit events' })]}
          audience="calendar-api"
          expiresIn={300}
          animate={animate}
        />

        {/* Flow line */}
        {phase >= 1 && (
          <motion.line
            x1={250}
            y1={250}
            x2={430}
            y2={250}
            stroke={colors.success}
            strokeWidth={2}
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 0.6 } : { opacity: 0.6 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Verifier accepts the narrow scope */}
        {phase >= 1 && (
          <motion.g
            initial={animate ? { opacity: 0, scale: 0.7 } : { opacity: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Verifier position={{ x: 500, y: 250 }} label={t('frame7_6.verifierLabel', { defaultValue: 'Checks scope' })} state="accept" animate={animate} />
          </motion.g>
        )}

        {/* Tool unlocked, only allowed view */}
        {phase >= 2 && (
          <motion.g
            initial={animate ? { opacity: 0, x: 24 } : { opacity: 1 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ToolResource position={{ x: 690, y: 250 }} kind="MCP" label={t('frame7_6.toolLabel', { defaultValue: 'Calendar (read-only)' })} locked={false} animate={animate} />
          </motion.g>
        )}

        {/* Caption */}
        {phase >= 2 && (
          <motion.text
            x={400}
            y={460}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t('frame7_6.caption', { defaultValue: 'The tool sees only what you allowed — nothing more.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
