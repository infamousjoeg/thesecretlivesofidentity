import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Workload, AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-1: An Agent Is A Workload
 * Visual: a node/platform hosting ordinary workloads — and the AI agent sits
 * right there among them. It is just software running somewhere.
 */
export const Frame2_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Platform / node */}
        <rect x={120} y={150} width={560} height={220} rx={14} fill={`${colors.server}0D`} stroke={colors.server} strokeWidth={1.5} strokeDasharray="8 5" />
        <rect x={300} y={132} width={200} height={32} rx={8} fill={colors.background} stroke={colors.server} strokeWidth={1.5} />
        <text x={400} y={153} textAnchor="middle" fill={colors.server} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
          {t('frame2_1.node', { defaultValue: 'A node, somewhere' })}
        </text>

        {/* Ordinary workloads */}
        <Workload label={t('frame2_1.service', { defaultValue: 'service' })} position={{ x: 220, y: 265 }} size={56} attested={false} showQuestionMark={false} animate={!prefersReducedMotion} />
        <Workload label={t('frame2_1.database', { defaultValue: 'database' })} position={{ x: 580, y: 265 }} size={56} attested={false} showQuestionMark={false} animate={!prefersReducedMotion} />

        {/* The agent — highlighted as "also just a workload" */}
        {phase >= 1 && (
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AIAgent label={t('frame2_1.agent', { defaultValue: 'AI Agent' })} position={{ x: 400, y: 250 }} size={78} active animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={420}
            textAnchor="middle"
            fill={colors.agentAI}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame2_1.caption', { defaultValue: 'An agent is a workload, like any other service.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
