import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-1: Software That Acts For You
 * Visual: one AI agent in the centre reaching out to take real-world ACTIONS
 * (booking, messaging, money, systems) one by one — it doesn't just answer.
 */
export const Frame1_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  const actions = [
    { key: 'book', x: 185, y: 120, label: t('frame1_1.book', { defaultValue: 'Book travel' }) },
    { key: 'message', x: 615, y: 120, label: t('frame1_1.message', { defaultValue: 'Send messages' }) },
    { key: 'money', x: 185, y: 345, label: t('frame1_1.money', { defaultValue: 'Move money' }) },
    { key: 'systems', x: 615, y: 345, label: t('frame1_1.systems', { defaultValue: 'Change systems' }) },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <AIAgent
          label={t('frame1_1.agentLabel', { defaultValue: 'AI Agent' })}
          position={{ x: 400, y: 232 }}
          size={92}
          active
          animate={!prefersReducedMotion}
        />

        {actions.map((a, i) =>
          phase >= i + 1 ? (
            <motion.g
              key={a.key}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <line
                x1={400}
                y1={232}
                x2={a.x}
                y2={a.y}
                stroke={colors.agentAI}
                strokeWidth={1.5}
                strokeDasharray="4 4"
                opacity={0.5}
              />
              <rect x={a.x - 72} y={a.y - 24} width={144} height={48} rx={8} fill={colors.surface} stroke={colors.agentAI} strokeWidth={1.25} />
              <text x={a.x} y={a.y + 5} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
                {a.label}
              </text>
            </motion.g>
          ) : null
        )}

        {phase >= 4 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={430}
            textAnchor="middle"
            fill={colors.agentAI}
            fontSize={17}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame1_1.caption', { defaultValue: 'They don’t just answer questions. They do things.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
