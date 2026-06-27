import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, Verifier, ToolResource } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-3: Servers Are Protected Resources
 * Visual: an MCP server holding email/files sits behind a verifier that demands
 * a valid slip — exactly like any guarded API.
 */
export const Frame7_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const agentPos = { x: 150, y: 250 };
  const verifierPos = { x: 430, y: 250 };
  const toolPos = { x: 650, y: 250 };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Approach line agent -> verifier */}
        {phase >= 1 && (
          <motion.line
            x1={agentPos.x + 40}
            y1={agentPos.y}
            x2={verifierPos.x - 60}
            y2={verifierPos.y}
            stroke={colors.agentAI}
            strokeWidth={2}
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 0.5 } : { opacity: 0.5 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* The protected resource */}
        <ToolResource
          position={toolPos}
          kind="MCP"
          label={t('frame7_3.toolLabel', { defaultValue: 'Your Email & Files' })}
          locked={true}
          animate={animate}
        />

        {/* The guard demanding a slip */}
        {phase >= 1 && (
          <motion.g
            initial={animate ? { opacity: 0, scale: 0.7 } : { opacity: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* animate={false}: the idle scan-sweep line animates SVG y1/y2 as
                keyframes, which framer-motion briefly resolves to undefined and
                logs as a console error. The booth still reads as "waiting". */}
            <Verifier position={verifierPos} label={t('frame7_3.verifierLabel', { defaultValue: 'Demands a slip' })} state="idle" animate={false} />
          </motion.g>
        )}

        {/* Agent */}
        <AIAgent position={agentPos} label={t('frame7_3.agentLabel', { defaultValue: 'AI Agent' })} active={phase >= 1} animate={animate} />

        {/* "Protected resource" badge over the tool */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={toolPos.x - 80} y={70} width={160} height={30} rx={6} fill={colors.surface} stroke={colors.toolResource} strokeWidth={1.5} />
            <text x={toolPos.x} y={90} textAnchor="middle" fill={colors.toolResource} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame7_3.protectedBadge', { defaultValue: 'PROTECTED RESOURCE' })}
            </text>
          </motion.g>
        )}

        {/* Caption */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={460}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t('frame7_3.caption', { defaultValue: 'No valid slip, no access — just like any guarded API.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
