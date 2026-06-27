import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-4: User Consent
 * Visual: the principal explicitly approves ("yes, read my calendar") before the
 * agent receives a slip for the tool. Consent is theirs to give or refuse.
 */
export const Frame7_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 500]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const principalPos = { x: 160, y: 270 };
  const agentPos = { x: 410, y: 270 };
  const toolPos = { x: 650, y: 270 };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Consent prompt above the principal */}
        <motion.g
          initial={animate ? { opacity: 0, y: -10 } : { opacity: 1 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <rect x={80} y={70} width={300} height={70} rx={10} fill={colors.surface} stroke={colors.principal} strokeWidth={1.5} />
          <text x={230} y={98} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame7_4.promptTitle', { defaultValue: 'Allow access?' })}
          </text>
          <text x={230} y={122} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame7_4.promptBody', { defaultValue: 'The travel agent may read your calendar.' })}
          </text>
        </motion.g>

        {/* Approve checkmark */}
        {phase >= 1 && (
          <motion.g
            initial={animate ? { opacity: 0, scale: 0.4 } : { opacity: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <circle cx={350} cy={155} r={20} fill={colors.success} />
            <path d="M 341 155 l 6 7 l 12 -14" fill="none" stroke="white" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            <text x={350} y={195} textAnchor="middle" fill={colors.success} fontSize={13} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame7_4.approved', { defaultValue: 'You approve' })}
            </text>
          </motion.g>
        )}

        {/* Grant arrow principal -> agent */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <line x1={principalPos.x + 45} y1={principalPos.y} x2={agentPos.x - 55} y2={agentPos.y} stroke={colors.permissionSlip} strokeWidth={2.5} markerEnd="url(#arrow74)" />
            <defs>
              <marker id="arrow74" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill={colors.permissionSlip} />
              </marker>
            </defs>
            <text x={(principalPos.x + agentPos.x) / 2} y={principalPos.y - 16} textAnchor="middle" fill={colors.permissionSlip} fontSize={12} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              {t('frame7_4.slipLabel', { defaultValue: 'scoped slip' })}
            </text>
          </motion.g>
        )}

        {/* Entities */}
        <Principal position={principalPos} label={t('frame7_4.principalLabel', { defaultValue: 'You' })} active={phase >= 1} animate={animate} />
        <AIAgent position={agentPos} label={t('frame7_4.agentLabel', { defaultValue: 'Travel Agent' })} active={phase >= 2} animate={animate} />
        <ToolResource position={toolPos} kind="MCP" label={t('frame7_4.toolLabel', { defaultValue: 'Calendar' })} locked={phase < 3} animate={animate} />

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
            {t('frame7_4.caption', { defaultValue: 'Consent is explicit — yours to give or refuse.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
