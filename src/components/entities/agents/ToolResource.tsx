import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface ToolResourceProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  /** Short tag for the kind of tool (e.g. MCP, API, DB). */
  kind?: string;
  /** Locked = demands a valid slip; unlocked = a correctly-scoped slip opened the door. */
  locked?: boolean;
  animate?: boolean;
}

/**
 * ToolResource entity — the protected tool / MCP server an agent wants to use.
 *
 * Metaphor: a guarded resource behind a door with a padlock. It only opens for
 * a valid, correctly-scoped permission slip. Teal (#14B8A6) ties it to the agent
 * ecosystem while staying distinct. Locked: steel padlock shut, door dim. Unlocked:
 * gold padlock open, door ajar with light spilling out, gentle glow.
 */
export const ToolResource: React.FC<ToolResourceProps> = ({
  id,
  label = 'Calendar API',
  position,
  size = entitySizes.toolResource,
  kind = 'MCP',
  locked = true,
  animate = true,
}) => {
  const { t } = useTranslation('agents-frames');
  const uniqueId = id || Math.random().toString(36).substr(2, 9);
  const W = size * 0.8;
  const H = size * 0.92;
  const top = -H / 2;
  const left = -W / 2;
  const lockColor = locked ? '#94A3B8' : colors.permissionSlip;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Tool resource${label ? `: ${label}` : ''} (${locked ? 'locked' : 'unlocked'})`}
    >
      <defs>
        <linearGradient id={`tool-body-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={locked ? '#0F766E' : '#2DD4BF'} />
          <stop offset="100%" stopColor={locked ? '#115E59' : colors.toolResource} />
        </linearGradient>
        <linearGradient id={`tool-open-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>

      {/* Unlocked glow */}
      {!locked && animate && (
        <motion.rect
          x={left - 7}
          y={top - 7}
          width={W + 14}
          height={H + 14}
          rx={10}
          fill="none"
          stroke={colors.toolResource}
          strokeWidth={2}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      )}

      {/* Cabinet shadow */}
      <rect x={left + 3} y={top + 3} width={W} height={H} rx={8} fill="rgba(0,0,0,0.28)" />

      {/* Door frame / cabinet body */}
      <rect x={left} y={top} width={W} height={H} rx={8} fill={`url(#tool-body-${uniqueId})`} stroke={locked ? '#134E4A' : '#0D9488'} strokeWidth={1.5} />

      {/* Header plate with kind tag */}
      <rect x={left} y={top} width={W} height={20} rx={8} fill="#0B3D3A" />
      <rect x={left} y={top + 12} width={W} height={8} fill="#0B3D3A" />
      {/* letterSpacing trimmed from 1 to 0.25 so the word-order-flipped
          translation ("SERVIDOR MCP") stays comfortably inside the header plate. */}
      <text x={0} y={top + 14} textAnchor="middle" fill="#5EEAD4" fontSize={size * 0.1} fontWeight="bold" fontFamily="JetBrains Mono, monospace" letterSpacing="0.25">
        {t('entities.serverLabel', { kind, defaultValue: '{{kind}} SERVER' })}
      </text>

      {locked ? (
        /* Closed door with a tool glyph */
        <>
          <rect x={left + 8} y={top + 26} width={W - 16} height={H - 40} rx={4} fill="#0B3D3A" stroke="#134E4A" strokeWidth={1} />
          {/* gear (tool) glyph, dim */}
          <g transform={`translate(0, ${top + H * 0.46})`} opacity={0.5}>
            <circle cx={0} cy={0} r={size * 0.11} fill="none" stroke="#5EEAD4" strokeWidth={2} />
            <circle cx={0} cy={0} r={size * 0.045} fill="#5EEAD4" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <rect key={a} x={-1.5} y={-size * 0.16} width={3} height={size * 0.05} fill="#5EEAD4" transform={`rotate(${a})`} />
            ))}
          </g>
        </>
      ) : (
        /* Door ajar — light spills out */
        <>
          {/* opening (light) */}
          <rect x={left + 8} y={top + 26} width={W - 16} height={H - 40} rx={4} fill={`url(#tool-open-${uniqueId})`} opacity={0.85} />
          {/* swung door panel */}
          <g transform={`translate(${left + 8}, ${top + 26})`}>
            <path d={`M 0 0 L ${(W - 16) * 0.42} 6 L ${(W - 16) * 0.42} ${H - 46} L 0 ${H - 40} Z`} fill="#0D9488" stroke="#0B3D3A" strokeWidth={1} />
          </g>
          {/* gear glyph lit */}
          <g transform={`translate(${W * 0.12}, ${top + H * 0.46})`}>
            <circle cx={0} cy={0} r={size * 0.1} fill="none" stroke="#115E59" strokeWidth={2} />
            <circle cx={0} cy={0} r={size * 0.04} fill="#115E59" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <rect key={a} x={-1.5} y={-size * 0.145} width={3} height={size * 0.045} fill="#115E59" transform={`rotate(${a})`} />
            ))}
          </g>
        </>
      )}

      {/* Padlock — the "protected" affordance */}
      <g transform={`translate(${left + W - 16}, ${top + 32})`}>
        {/* shackle */}
        {locked ? (
          <path d="M -6 0 v -4 a 6 6 0 0 1 12 0 v 4" fill="none" stroke={lockColor} strokeWidth={2.2} strokeLinecap="round" />
        ) : (
          <path d="M -6 0 v -4 a 6 6 0 0 1 12 0" fill="none" stroke={lockColor} strokeWidth={2.2} strokeLinecap="round" />
        )}
        {/* body */}
        <rect x={-8} y={0} width={16} height={13} rx={2.5} fill={lockColor} stroke={locked ? '#475569' : '#B45309'} strokeWidth={1} />
        <circle cx={0} cy={6} r={2} fill={locked ? '#1E293B' : '#7C2D12'} />
        <rect x={-0.9} y={6} width={1.8} height={4} fill={locked ? '#1E293B' : '#7C2D12'} />
      </g>

      {/* Label */}
      {label && (
        <text
          x={0}
          y={top + H + 18}
          textAnchor="middle"
          fill={locked ? colors.textSecondary : colors.toolResource}
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
