import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface AIAgentProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  /** Eyes light up and the unit glows when active (currently acting). */
  active?: boolean;
  animate?: boolean;
}

/**
 * AI Agent entity — a friendly assistant robot that acts ON BEHALF OF a principal.
 *
 * Metaphor: clearly software (a little robot, antenna, screen face), and clearly
 * subordinate — smaller and lighter than the Principal, with a "FOR YOU" tag that
 * marks it as acting for someone else rather than as itself. Cyan (#06B6D4) so it
 * never reads as the green SPIRE Agent from the SPIFFE module.
 */
export const AIAgent: React.FC<AIAgentProps> = ({
  id,
  label = 'AI Agent',
  position,
  size = entitySizes.agentAI,
  active = false,
  animate = true,
}) => {
  const { t } = useTranslation('agents-frames');
  const uniqueId = id || Math.random().toString(36).substr(2, 9);
  const headW = size * 0.62;
  const headH = size * 0.52;
  const headTop = -size * 0.28;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`AI Agent${label ? `: ${label}` : ''}${active ? ' (active)' : ''}`}
    >
      <defs>
        <linearGradient id={`aiagent-head-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor={colors.agentAI} />
        </linearGradient>
      </defs>

      {/* Glow when active */}
      {active && animate && (
        <motion.rect
          x={-headW / 2 - 7}
          y={headTop - 7}
          width={headW + 14}
          height={headH + 14}
          rx={12}
          fill="none"
          stroke={colors.agentAI}
          strokeWidth={2}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Antenna */}
      <line x1={0} y1={headTop} x2={0} y2={headTop - size * 0.16} stroke={colors.agentAI} strokeWidth={2} />
      {active && animate ? (
        <motion.circle
          cx={0}
          cy={headTop - size * 0.18}
          r={size * 0.05}
          fill={colors.agentAI}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      ) : (
        <circle cx={0} cy={headTop - size * 0.18} r={size * 0.05} fill={active ? colors.agentAI : colors.textMuted} />
      )}

      {/* Body — small/subordinate torso behind the head */}
      <rect
        x={-headW * 0.42}
        y={headTop + headH - size * 0.06}
        width={headW * 0.84}
        height={size * 0.26}
        rx={6}
        fill="#0E7490"
      />

      {/* Head shadow */}
      <rect x={-headW / 2 + 2} y={headTop + 2} width={headW} height={headH} rx={12} fill="rgba(0,0,0,0.25)" />

      {/* Head body */}
      <rect
        x={-headW / 2}
        y={headTop}
        width={headW}
        height={headH}
        rx={12}
        fill={`url(#aiagent-head-${uniqueId})`}
        stroke="#0E7490"
        strokeWidth={1.5}
      />

      {/* Face screen */}
      <rect
        x={-headW / 2 + 6}
        y={headTop + 7}
        width={headW - 12}
        height={headH - 16}
        rx={7}
        fill={active ? '#06283D' : '#0F2A33'}
        stroke={active ? '#22D3EE' : '#155E69'}
        strokeWidth={1}
      />

      {/* Friendly eyes */}
      <circle cx={-headW * 0.16} cy={headTop + headH * 0.42} r={size * 0.06} fill={active ? '#67E8F9' : '#475569'} />
      <circle cx={headW * 0.16} cy={headTop + headH * 0.42} r={size * 0.06} fill={active ? '#67E8F9' : '#475569'} />
      {/* Friendly smile */}
      <path
        d={`M ${-headW * 0.16} ${headTop + headH * 0.66} Q 0 ${headTop + headH * 0.82} ${headW * 0.16} ${headTop + headH * 0.66}`}
        fill="none"
        stroke={active ? '#67E8F9' : '#475569'}
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* "FOR YOU" delegation tag — marks it as acting on someone's behalf.
          Box widened + letter-spacing trimmed so longer translations
          (pt-BR "PARA VOCÊ") stay inside the pill. */}
      <g transform={`translate(0, ${headTop + headH + size * 0.16})`}>
        <rect x={-size * 0.31} y={-size * 0.08} width={size * 0.62} height={size * 0.16} rx={4} fill={colors.background} stroke={colors.agentAI} strokeWidth={1} />
        <text
          x={0}
          y={size * 0.035}
          textAnchor="middle"
          fill={colors.agentAI}
          fontSize={size * 0.095}
          fontWeight="bold"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.3"
        >
          {t('entities.forYou', { defaultValue: 'FOR YOU' })}
        </text>
      </g>

      {/* Label */}
      {label && (
        <text
          x={0}
          y={headTop + headH + size * 0.46}
          textAnchor="middle"
          fill={active ? colors.textPrimary : colors.textSecondary}
          fontSize={12}
          fontWeight={500}
          fontFamily="IBM Plex Sans, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
};
