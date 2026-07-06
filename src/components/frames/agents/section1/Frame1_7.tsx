import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-7: A Better Way
 * Visual: the master key is struck out and replaced by the hero permission slip —
 * a signed, scoped, short-lived note handed to the agent instead.
 */
export const Frame1_7: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 800, 700]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Master key — crossed out */}
        <g transform="translate(180, 250)">
          <g opacity={phase >= 1 ? 0.4 : 1}>
            <circle cx={-20} cy={0} r={16} fill="none" stroke={colors.warning} strokeWidth={6} />
            <rect x={-8} y={-4} width={46} height={8} rx={1} fill={colors.warning} />
            <rect x={34} y={-4} width={5} height={15} fill={colors.warning} />
            <rect x={22} y={-4} width={5} height={12} fill={colors.warning} />
          </g>
          <text x={5} y={48} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="JetBrains Mono, monospace">
            {t('frame1_7.masterKey', { defaultValue: 'MASTER KEY' })}
          </text>
          {phase >= 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} stroke={colors.attacker} strokeWidth={5} strokeLinecap="round">
              <line x1={-50} y1={-30} x2={50} y2={30} />
            </motion.g>
          )}
        </g>

        {/* Arrow to the better way */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <line x1={250} y1={250} x2={330} y2={250} stroke={colors.permissionSlip} strokeWidth={2} />
            <path d="M 330 250 l -10 -6 l 0 12 z" fill={colors.permissionSlip} />
          </motion.g>
        )}

        {/* The hero permission slip */}
        {phase >= 1 && (
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PermissionSlip
              position={{ x: 440, y: 250 }}
              size={150}
              onBehalfOf={t('frame1_7.onBehalfOf', { defaultValue: 'Alex (you)' })}
              actor={t('frame1_7.actor', { defaultValue: 'Travel Agent' })}
              scopes={[t('frame1_7.scope', { defaultValue: 'Read calendar' })]}
              audience="calendar-api"
              expiresIn={300}
              animate={!prefersReducedMotion}
            />
          </motion.g>
        )}

        {/* Agent receiving it */}
        {phase >= 1 && (
          <AIAgent label={t('frame1_7.agent', { defaultValue: 'AI Agent' })} position={{ x: 660, y: 250 }} size={80} active={phase >= 2} animate={!prefersReducedMotion} />
        )}

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={460}
            textAnchor="middle"
            fill={colors.permissionSlip}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame1_7.caption', { defaultValue: 'A signed slip for one narrow task, not your master key.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
