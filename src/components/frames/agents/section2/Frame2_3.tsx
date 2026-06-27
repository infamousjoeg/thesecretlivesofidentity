import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-3: The Agent Needs Its Own Name
 * Visual: the principal plus two distinctly-named agents (Travel, Billing), each
 * with its own identity tag — systems can now tell them apart, and apart from you.
 */
export const Frame2_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  const agents = [
    { x: 290, label: t('frame2_3.travel', { defaultValue: 'Travel Agent' }), id: 'spiffe://acme/travel' },
    { x: 540, label: t('frame2_3.billing', { defaultValue: 'Billing Agent' }), id: 'spiffe://acme/billing' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <Principal label={t('frame2_3.you', { defaultValue: 'You' })} position={{ x: 415, y: 120 }} size={74} active animate={!prefersReducedMotion} />

        {agents.map((a, i) =>
          phase >= i + 1 ? (
            <motion.g
              key={a.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <line x1={415} y1={160} x2={a.x} y2={250} stroke={colors.agentAI} strokeWidth={1.25} strokeDasharray="4 4" opacity={0.4} />
              <AIAgent label={a.label} position={{ x: a.x, y: 300 }} size={78} active animate={!prefersReducedMotion} />
              {/* distinct identity name tag */}
              <g transform={`translate(${a.x}, 360)`}>
                <rect x={-92} y={0} width={184} height={26} rx={5} fill={colors.surface} stroke={colors.agentAI} strokeWidth={1} />
                <text x={0} y={17} textAnchor="middle" fill={colors.agentAI} fontSize={11} fontFamily="JetBrains Mono, monospace">{a.id}</text>
              </g>
            </motion.g>
          ) : null
        )}

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={425}
            textAnchor="middle"
            fill={colors.agentAI}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame2_3.caption', { defaultValue: 'Each agent has its own name — distinct from you and from each other.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
