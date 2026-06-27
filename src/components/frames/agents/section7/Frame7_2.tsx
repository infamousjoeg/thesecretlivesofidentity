import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, ToolResource } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-2: MCP, Briefly
 * Visual: the agent connects through a central MCP hub to several MCP servers,
 * each a guarded resource.
 */
export const Frame7_2: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 500, 600, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const agentPos = { x: 150, y: 250 };
  const hub = { x: 400, y: 250 };
  const servers = [
    { x: 650, y: 130 },
    { x: 650, y: 250 },
    { x: 650, y: 370 },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Agent -> hub link */}
        {phase >= 1 && (
          <motion.line
            x1={agentPos.x + 40}
            y1={agentPos.y}
            x2={hub.x - 60}
            y2={hub.y}
            stroke={colors.agentAI}
            strokeWidth={2.5}
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 0.6 } : { opacity: 0.6 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Hub -> servers links */}
        {servers.map((s, i) => (
          phase >= 2 && (
            <motion.line
              key={`hublink-${i}`}
              x1={hub.x + 60}
              y1={hub.y}
              x2={s.x - 36}
              y2={s.y}
              stroke={colors.toolResource}
              strokeWidth={2}
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animate ? { pathLength: 1, opacity: 0.5 } : { opacity: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            />
          )
        ))}

        {/* Agent */}
        <AIAgent
          position={agentPos}
          label={t('frame7_2.agentLabel', { defaultValue: 'AI Agent' })}
          active={phase >= 1}
          animate={animate}
        />

        {/* MCP hub */}
        {phase >= 1 && (
          <motion.g
            initial={animate ? { opacity: 0, scale: 0.6 } : { opacity: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={hub.x - 60} y={hub.y - 34} width={120} height={68} rx={12} fill={colors.surface} stroke={colors.toolResource} strokeWidth={2} />
            <text x={hub.x} y={hub.y - 6} textAnchor="middle" fill={colors.toolResource} fontSize={22} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              MCP
            </text>
            <text x={hub.x} y={hub.y + 16} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame7_2.hubSubtitle', { defaultValue: 'Model Context Protocol' })}
            </text>
          </motion.g>
        )}

        {/* MCP servers */}
        {servers.map((s, i) => (
          phase >= 2 && (
            <motion.g
              key={`srv-${i}`}
              initial={animate ? { opacity: 0, x: 24 } : { opacity: 1 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <ToolResource position={s} size={72} kind="MCP" label={t(`frame7_2.server${i + 1}`, { defaultValue: ['Email', 'Files', 'Calendar'][i] })} locked={true} animate={animate} />
            </motion.g>
          )
        ))}

        {/* Caption */}
        {phase >= 3 && (
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
            {t('frame7_2.caption', { defaultValue: 'Each MCP server is a resource to be guarded.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
