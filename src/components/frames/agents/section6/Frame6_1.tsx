import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

interface Node {
  x: number;
  label: string;
  def: string;
  id: string;
}

/**
 * Frame 6-1: Agents Call Agents
 * Visual: A planning agent calls a booking agent, which calls a payment agent —
 * each a separate workload with its own identity.
 */
export const Frame6_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 550, 550, 500]);
  const prefersReducedMotion = useReducedMotion();

  const nodes: Node[] = [
    { x: 150, label: 'frame6_1.plan', def: 'Planner', id: 'planner' },
    { x: 400, label: 'frame6_1.book', def: 'Booker', id: 'booker' },
    { x: 650, label: 'frame6_1.pay', def: 'Payer', id: 'payment' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a6-1-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.agentAI} />
          </marker>
        </defs>

        {nodes.map((n, i) => (
          <React.Fragment key={n.id}>
            {i > 0 && phase >= i && (
              <motion.g
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <line x1={nodes[i - 1].x + 55} y1={235} x2={n.x - 55} y2={235} stroke={colors.agentAI} strokeWidth={2.5} markerEnd="url(#a6-1-arrow)" />
                <text x={(nodes[i - 1].x + n.x) / 2} y={222} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontStyle="italic" fontFamily="IBM Plex Sans, sans-serif">
                  {t('frame6_1.calls', { defaultValue: 'calls' })}
                </text>
              </motion.g>
            )}
            {phase >= i && (
              <motion.g
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
              >
                <AIAgent label={t(n.label, { defaultValue: n.def })} position={{ x: n.x, y: 235 }} active animate={!prefersReducedMotion} />
                <rect x={n.x - 70} y={320} width={140} height={26} rx={6} fill={colors.surface} stroke={colors.agentAI} strokeWidth={1} />
                <text x={n.x} y={337} textAnchor="middle" fill={colors.agentAI} fontSize={11} fontFamily="JetBrains Mono, monospace">
                  {n.id}
                </text>
              </motion.g>
            )}
          </React.Fragment>
        ))}

        {phase >= 3 && (
          <motion.text
            x={400}
            y={400}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize={15}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {t('frame6_1.caption', { defaultValue: 'Each one is a separate workload with its own identity' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
