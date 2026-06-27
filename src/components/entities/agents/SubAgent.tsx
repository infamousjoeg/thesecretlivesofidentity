import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface SubAgentProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  /** Eyes light up and the unit glows when active. */
  active?: boolean;
  animate?: boolean;
}

/**
 * SubAgent entity — a smaller, secondary agent that an AI Agent delegates to.
 *
 * Metaphor: a smaller sibling of the AI Agent (same robot lineage, one eye,
 * lighter cyan #22D3EE) carrying a "SUB" tag and a delegation hook (↳) so it
 * reads as "delegated to" rather than a peer. Used in agent-to-agent frames.
 */
export const SubAgent: React.FC<SubAgentProps> = ({
  id,
  label = 'Sub-Agent',
  position,
  size = entitySizes.subAgent,
  active = false,
  animate = true,
}) => {
  const uniqueId = id || Math.random().toString(36).substr(2, 9);
  const headW = size * 0.6;
  const headH = size * 0.5;
  const headTop = -size * 0.22;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Sub-Agent${label ? `: ${label}` : ''}${active ? ' (active)' : ''}`}
    >
      <defs>
        <linearGradient id={`subagent-head-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A5F3FC" />
          <stop offset="100%" stopColor={colors.subAgent} />
        </linearGradient>
      </defs>

      {/* Delegation hook — visually anchors it as "handed down to" */}
      <path
        d={`M ${-size * 0.6} ${headTop - size * 0.05} L ${-size * 0.6} ${headTop + headH * 0.4} L ${-headW * 0.5 - 4} ${headTop + headH * 0.4}`}
        fill="none"
        stroke={colors.subAgent}
        strokeWidth={1.5}
        strokeDasharray="3 3"
        opacity={0.7}
      />
      <path
        d={`M ${-headW * 0.5 - 9} ${headTop + headH * 0.4 - 3} L ${-headW * 0.5 - 4} ${headTop + headH * 0.4} L ${-headW * 0.5 - 9} ${headTop + headH * 0.4 + 3}`}
        fill="none"
        stroke={colors.subAgent}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glow when active */}
      {active && animate && (
        <motion.rect
          x={-headW / 2 - 6}
          y={headTop - 6}
          width={headW + 12}
          height={headH + 12}
          rx={10}
          fill="none"
          stroke={colors.subAgent}
          strokeWidth={2}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Antenna */}
      <line x1={0} y1={headTop} x2={0} y2={headTop - size * 0.13} stroke={colors.subAgent} strokeWidth={1.5} />
      <circle cx={0} cy={headTop - size * 0.15} r={size * 0.05} fill={active ? colors.subAgent : colors.textMuted} />

      {/* Body */}
      <rect
        x={-headW * 0.4}
        y={headTop + headH - size * 0.05}
        width={headW * 0.8}
        height={size * 0.22}
        rx={5}
        fill="#0E7490"
      />

      {/* Head */}
      <rect
        x={-headW / 2}
        y={headTop}
        width={headW}
        height={headH}
        rx={10}
        fill={`url(#subagent-head-${uniqueId})`}
        stroke="#0E7490"
        strokeWidth={1.25}
      />

      {/* Face screen */}
      <rect
        x={-headW / 2 + 5}
        y={headTop + 5}
        width={headW - 10}
        height={headH - 12}
        rx={6}
        fill={active ? '#06283D' : '#0F2A33'}
        stroke={active ? '#67E8F9' : '#155E69'}
        strokeWidth={1}
      />

      {/* Single eye — the "smaller sibling" cue */}
      <circle cx={0} cy={headTop + headH * 0.4} r={size * 0.07} fill={active ? '#A5F3FC' : '#475569'} />
      <path
        d={`M ${-headW * 0.14} ${headTop + headH * 0.64} Q 0 ${headTop + headH * 0.76} ${headW * 0.14} ${headTop + headH * 0.64}`}
        fill="none"
        stroke={active ? '#A5F3FC' : '#475569'}
        strokeWidth={1.25}
        strokeLinecap="round"
      />

      {/* SUB tag */}
      <g transform={`translate(0, ${headTop + headH + size * 0.14})`}>
        <rect x={-size * 0.18} y={-size * 0.08} width={size * 0.36} height={size * 0.16} rx={3} fill={colors.background} stroke={colors.subAgent} strokeWidth={1} />
        <text
          x={0}
          y={size * 0.04}
          textAnchor="middle"
          fill={colors.subAgent}
          fontSize={size * 0.11}
          fontWeight="bold"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.5"
        >
          SUB
        </text>
      </g>

      {/* Label */}
      {label && (
        <text
          x={0}
          y={headTop + headH + size * 0.44}
          textAnchor="middle"
          fill={active ? colors.textPrimary : colors.textSecondary}
          fontSize={11}
          fontWeight={500}
          fontFamily="IBM Plex Sans, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
};
