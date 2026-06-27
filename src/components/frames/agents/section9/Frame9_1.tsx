import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 9-1: What We Have Learned
 * Visual: an agent is a workload with its own identity, acting on behalf of a
 * principal with a signed, scoped, short-lived slip — never the master key.
 */
export const Frame9_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 500]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Principal — owns the authority */}
        <Principal position={{ x: 150, y: 250 }} label={t('frame9_1.principalLabel', { defaultValue: 'You (principal)' })} active={true} animate={animate} />

        {/* On-behalf-of arrow */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <line x1={210} y1={250} x2={300} y2={250} stroke={colors.permissionSlip} strokeWidth={2.5} markerEnd="url(#arrow91)" />
            <defs>
              <marker id="arrow91" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill={colors.permissionSlip} />
              </marker>
            </defs>
            <text x={255} y={235} textAnchor="middle" fill={colors.permissionSlip} fontSize={12} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              {t('frame9_1.onBehalf', { defaultValue: 'on behalf of' })}
            </text>
          </motion.g>
        )}

        {/* The agent, a workload with its own identity */}
        {phase >= 1 && (
          <motion.g initial={animate ? { opacity: 0, scale: 0.7 } : { opacity: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <AIAgent position={{ x: 400, y: 250 }} label={t('frame9_1.agentLabel', { defaultValue: 'Agent (a workload)' })} active={true} animate={animate} />
          </motion.g>
        )}

        {/* Carries a slip, not a master key */}
        {phase >= 2 && (
          <motion.g initial={animate ? { opacity: 0, x: 20 } : { opacity: 1 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <PermissionSlip
              position={{ x: 600, y: 250 }}
              size={140}
              state="valid"
              onBehalfOf={t('frame9_1.onBehalfOf', { defaultValue: 'Alex (you)' })}
              actor={t('frame9_1.actor', { defaultValue: 'Agent' })}
              scopes={[t('frame9_1.scope', { defaultValue: 'Read calendar' })]}
              audience="calendar-api"
              expiresIn={300}
              animate={animate}
            />
          </motion.g>
        )}

        {/* Master key, crossed out */}
        {phase >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <text x={400} y={400} textAnchor="middle" fontSize={34} opacity={0.5}>🔑</text>
            <line x1={372} y1={372} x2={428} y2={404} stroke={colors.attacker} strokeWidth={4} strokeLinecap="round" />
            <text x={400} y={440} textAnchor="middle" fill={colors.attacker} fontSize={14} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame9_1.neverMasterKey', { defaultValue: 'Never your master key' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
