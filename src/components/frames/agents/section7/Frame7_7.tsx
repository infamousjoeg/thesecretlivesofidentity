import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, PermissionSlip, Verifier, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 7-7: Same Slip, New Setting
 * Visual: the familiar flow — agent presents a signed, scoped, short-lived slip;
 * the verifier accepts; the MCP tool opens. Nothing new was needed.
 */
export const Frame7_7: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 500, 500, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const properties = [
    t('frame7_7.prop1', { defaultValue: 'Signed' }),
    t('frame7_7.prop2', { defaultValue: 'Scoped' }),
    t('frame7_7.prop3', { defaultValue: 'Short-lived' }),
  ];

  // Size each chip to its text so longer translations (pt-BR/es-419) do not
  // overflow. Approximate glyph width for 13px bold IBM Plex Sans, then lay the
  // row out centered on x=400 with a fixed gap between chips.
  const chipGap = 16;
  const chipWidths = properties.map((p) => Math.max(84, Math.round(p.length * 7.7) + 30));
  const chipsTotal = chipWidths.reduce((a, b) => a + b, 0) + chipGap * (properties.length - 1);
  let chipCursor = 400 - chipsTotal / 2;
  const chips = properties.map((p, i) => {
    const width = chipWidths[i];
    const cx = chipCursor + width / 2;
    chipCursor += width + chipGap;
    return { label: p, width, cx };
  });

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Agent */}
        <AIAgent position={{ x: 120, y: 230 }} label={t('frame7_7.agentLabel', { defaultValue: 'AI Agent' })} active={true} animate={animate} />

        {/* Slip presented */}
        <g transform="translate(0,0)">
          <PermissionSlip
            position={{ x: 320, y: 240 }}
            size={140}
            state="valid"
            onBehalfOf={t('frame7_7.onBehalfOf', { defaultValue: 'Alex (you)' })}
            actor={t('frame7_7.actor', { defaultValue: 'Travel Agent' })}
            scopes={[t('frame7_7.scope', { defaultValue: 'Read calendar' })]}
            audience="calendar-api"
            expiresIn={300}
            animate={animate}
          />
        </g>

        {/* Verifier accepts */}
        {phase >= 1 && (
          <motion.g initial={animate ? { opacity: 0, scale: 0.7 } : { opacity: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <Verifier position={{ x: 540, y: 230 }} size={80} label={t('frame7_7.verifierLabel', { defaultValue: 'MCP guard' })} state="accept" animate={animate} />
          </motion.g>
        )}

        {/* Tool opens */}
        {phase >= 2 && (
          <motion.g initial={animate ? { opacity: 0, x: 20 } : { opacity: 1 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <ToolResource position={{ x: 700, y: 230 }} size={78} kind="MCP" label={t('frame7_7.toolLabel', { defaultValue: 'Calendar' })} locked={false} animate={animate} />
          </motion.g>
        )}

        {/* Property chips — "nothing new was needed" */}
        {phase >= 3 && (
          <motion.g initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {chips.map((c) => (
              <g key={c.label} transform={`translate(${c.cx}, 420)`}>
                <rect x={-c.width / 2} y={-16} width={c.width} height={32} rx={16} fill={colors.surface} stroke={colors.permissionSlip} strokeWidth={1.5} />
                <text x={0} y={5} textAnchor="middle" fill={colors.permissionSlip} fontSize={13} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
                  {c.label}
                </text>
              </g>
            ))}
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
