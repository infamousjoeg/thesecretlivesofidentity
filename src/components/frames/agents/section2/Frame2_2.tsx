import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, Badge, AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-2: A Callback To SPIFFE
 * Visual: a callback to the SPIFFE module — the server issues the agent its own
 * verifiable identity (an SVID badge), proven without sharing secrets.
 */
export const Frame2_2: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Callback tag */}
        <g transform="translate(400, 80)">
          <rect x={-150} y={-20} width={300} height={36} rx={18} fill={`${colors.server}1A`} stroke={colors.server} strokeWidth={1.25} />
          <text x={0} y={4} textAnchor="middle" fill={colors.server} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame2_2.callback', { defaultValue: '↩ From the SPIFFE module' })}
          </text>
        </g>

        <SpireServer label={t('frame2_2.server', { defaultValue: 'Identity authority' })} position={{ x: 175, y: 270 }} size={100} active animate={!prefersReducedMotion} />

        {/* Issue arrow */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <line x1={250} y1={260} x2={350} y2={260} stroke={colors.svid} strokeWidth={2} strokeDasharray="5 4" />
            <path d="M 350 260 l -10 -6 l 0 12 z" fill={colors.svid} />
            <text x={300} y={245} textAnchor="middle" fill={colors.svid} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_2.issues', { defaultValue: 'issues identity' })}
            </text>
          </motion.g>
        )}

        {/* The agent's own badge */}
        {phase >= 1 && (
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge position={{ x: 450, y: 260 }} size={120} spiffeId="spiffe://acme/travel-agent" expiresIn={3600} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <AIAgent label={t('frame2_2.agent', { defaultValue: 'AI Agent' })} position={{ x: 660, y: 255 }} size={78} active animate={!prefersReducedMotion} />
            <text x={400} y={455} textAnchor="middle" fill={colors.agentAI} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_2.caption', { defaultValue: 'An agent is a workload — so it gets its own verifiable identity.' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
