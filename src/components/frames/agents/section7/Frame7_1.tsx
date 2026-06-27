import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, ToolResource } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-1: Agents Need Tools
 * Visual: an AI agent reaches out to several tool/MCP servers (DB, mail, API).
 */
export const Frame7_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 500, 500, 500]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const agentPos = { x: 180, y: 250 };
  const tools = [
    { x: 600, y: 120, kind: 'DB', label: t('frame7_1.toolDb', { defaultValue: 'Database' }) },
    { x: 640, y: 250, kind: 'API', label: t('frame7_1.toolApi', { defaultValue: 'Payments API' }) },
    { x: 600, y: 390, kind: 'MAIL', label: t('frame7_1.toolMail', { defaultValue: 'Mail Server' }) },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Reach lines from agent to each tool */}
        {tools.map((tool, i) => (
          phase >= 2 && (
            <motion.line
              key={`line-${tool.kind}`}
              x1={agentPos.x + 40}
              y1={agentPos.y}
              x2={tool.x - 40}
              y2={tool.y}
              stroke={colors.agentAI}
              strokeWidth={2}
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animate ? { pathLength: 1, opacity: 0.5 } : { opacity: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            />
          )
        ))}

        {/* The agent */}
        <motion.g
          initial={animate ? { opacity: 0, scale: 0.6 } : { opacity: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AIAgent
            position={agentPos}
            label={t('frame7_1.agentLabel', { defaultValue: 'AI Agent' })}
            active={phase >= 1}
            animate={animate}
          />
        </motion.g>

        {/* Tools appearing one by one */}
        {tools.map((tool, i) => (
          phase >= i + 1 && (
            <motion.g
              key={tool.kind}
              initial={animate ? { opacity: 0, x: 30 } : { opacity: 1 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ToolResource
                position={{ x: tool.x, y: tool.y }}
                kind={tool.kind}
                label={tool.label}
                locked={true}
                animate={animate}
              />
            </motion.g>
          )
        ))}

        {/* Caption */}
        {phase >= 4 && (
          <motion.text
            x={400}
            y={470}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t('frame7_1.caption', { defaultValue: 'Every tool it reaches is a guarded resource.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
