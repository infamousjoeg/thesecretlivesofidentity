import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, PermissionSlip } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-7: The Slip Is Not The Identity
 * Visual: The agent keeps its stable identity (a fixed name) while permission
 * slips come and go — the slip is authorization, not who the agent is.
 */
export const Frame4_7: React.FC = () => {
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
        {/* Agent with a persistent identity nameplate */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AIAgent label="" position={{ x: 220, y: 215 }} active animate={!prefersReducedMotion} />
          <rect x={120} y={300} width={200} height={40} rx={8} fill={colors.surface} stroke={colors.agentAI} strokeWidth={1.5} />
          <text x={220} y={318} textAnchor="middle" fill={colors.textSecondary} fontSize={9} fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
            {t('frame4_7.identityLabel', { defaultValue: 'PERMANENT IDENTITY' })}
          </text>
          <text x={220} y={333} textAnchor="middle" fill={colors.agentAI} fontSize={12} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
            travel-agent
          </text>
          <text x={220} y={372} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame4_7.stays', { defaultValue: 'The name never changes' })}
          </text>
        </motion.g>

        {/* Current slip */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <PermissionSlip position={{ x: 560, y: 200 }} size={120} state="valid" animate={!prefersReducedMotion} />
            <text x={560} y={300} textAnchor="middle" fill={colors.permissionSlip} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_7.current', { defaultValue: "Today's slip" })}
            </text>
          </motion.g>
        )}

        {/* Discarded / expired slips come and go */}
        {phase >= 2 && (
          <motion.g
            initial={prefersReducedMotion ? { opacity: 0.55 } : { opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.5 }}
          >
            <g transform="rotate(-10 690 380)">
              <PermissionSlip position={{ x: 690, y: 380 }} size={84} state="expired" showCountdown={false} animate={false} />
            </g>
            <text x={560} y={420} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontStyle="italic" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_7.discarded', { defaultValue: 'Yesterday’s slips expire and fall away' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
