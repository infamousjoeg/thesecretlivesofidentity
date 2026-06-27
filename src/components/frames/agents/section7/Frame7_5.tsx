import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, Verifier, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-5: Bound To One Server
 * Visual: the slip is stamped for one MCP server (audience binding). It unlocks
 * that server, but the same slip is rejected when reused against a different tool.
 */
export const Frame7_5: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 700]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* The audience-bound slip, centre-left */}
        <g>
          <PermissionSlip
            position={{ x: 150, y: 250 }}
            size={150}
            state="valid"
            onBehalfOf={t('frame7_5.onBehalfOf', { defaultValue: 'Alex (you)' })}
            actor={t('frame7_5.actor', { defaultValue: 'Travel Agent' })}
            scopes={[t('frame7_5.scope', { defaultValue: 'Read calendar' })]}
            audience="calendar-api"
            expiresIn={300}
            animate={animate}
          />
        </g>

        {/* Top lane — correct server, accepted */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <line x1={250} y1={210} x2={470} y2={140} stroke={colors.success} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
            <Verifier position={{ x: 530, y: 140 }} size={72} label="calendar-api" state="accept" animate={animate} />
            <ToolResource position={{ x: 700, y: 140 }} size={70} kind="MCP" label={t('frame7_5.rightTool', { defaultValue: 'Calendar' })} locked={false} animate={animate} />
          </motion.g>
        )}

        {/* Bottom lane — wrong server, rejected reuse */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <line x1={250} y1={290} x2={470} y2={360} stroke={colors.attacker} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
            <Verifier position={{ x: 530, y: 360 }} size={72} label="mail-api" state="reject" animate={animate} />
            <ToolResource position={{ x: 700, y: 360 }} size={70} kind="MCP" label={t('frame7_5.wrongTool', { defaultValue: 'Mail Server' })} locked={true} animate={animate} />
            <text x={530} y={430} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame7_5.cannotReuse', { defaultValue: 'Cannot be reused here' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
