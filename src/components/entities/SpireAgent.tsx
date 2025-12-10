import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface SpireAgentProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  active?: boolean;
  issuing?: boolean;
  animate?: boolean;
}

/**
 * SPIRE Agent entity - represents local security desk with badge printer
 * Redesigned with:
 * - Clear security desk appearance
 * - Prominent badge printer element
 * - Screen showing agent status
 * - Realistic badge printing animation
 */
export const SpireAgent: React.FC<SpireAgentProps> = ({
  id,
  label = 'SPIRE Agent',
  position,
  size = entitySizes.agent,
  active = false,
  issuing = false,
  animate = true,
}) => {
  const width = size * 0.85;
  const height = size * 0.65;
  const uniqueId = id || Math.random().toString(36).substr(2, 9);

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`SPIRE Agent${active ? ' (active)' : ''}${issuing ? ' (issuing SVID)' : ''}`}
    >
      <defs>
        {/* Gradient for the kiosk body */}
        <linearGradient id={`agent-gradient-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Screen glow when active */}
        <filter id={`screen-glow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Platform/node the agent sits on */}
      <rect
        x={-width * 0.75}
        y={height / 2 + 2}
        width={width * 1.5}
        height={10}
        rx={3}
        fill={colors.surface}
        stroke={colors.textMuted}
        strokeWidth={1}
      />

      {/* Glow effect when active */}
      {(active || issuing) && animate && (
        <motion.rect
          x={-width / 2 - 8}
          y={-height / 2 - 8}
          width={width + 16}
          height={height + 16}
          rx={10}
          fill="none"
          stroke={colors.agent}
          strokeWidth={2.5}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: issuing ? 0.4 : 2, repeat: Infinity }}
        />
      )}

      {/* Main kiosk shadow */}
      <rect
        x={-width / 2 + 3}
        y={-height / 2 + 3}
        width={width}
        height={height}
        rx={8}
        fill="rgba(0,0,0,0.25)"
      />

      {/* Main desk/kiosk body */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={8}
        fill={`url(#agent-gradient-${uniqueId})`}
        stroke="#047857"
        strokeWidth={1.5}
      />

      {/* Screen area with status */}
      <rect
        x={-width / 2 + 6}
        y={-height / 2 + 6}
        width={width - 12}
        height={height * 0.45}
        rx={4}
        fill={active ? '#ECFDF5' : colors.background}
        stroke={active ? '#A7F3D0' : colors.textMuted}
        strokeWidth={1}
      />

      {/* Status indicator on screen */}
      {active && (
        <g transform={`translate(${-width / 2 + 12}, ${-height / 2 + 12})`}>
          <circle cx={0} cy={4} r={4} fill="#22C55E" />
          <text
            x={8}
            y={7}
            fill="#059669"
            fontSize={8}
            fontWeight="bold"
            fontFamily="JetBrains Mono, monospace"
          >
            READY
          </text>
        </g>
      )}
      {!active && (
        <g transform={`translate(${-width / 2 + 12}, ${-height / 2 + 12})`}>
          <circle cx={0} cy={4} r={4} fill="#9CA3AF" />
          <text
            x={8}
            y={7}
            fill="#6B7280"
            fontSize={8}
            fontFamily="JetBrains Mono, monospace"
          >
            IDLE
          </text>
        </g>
      )}

      {/* Badge printer section */}
      <g transform={`translate(0, ${height / 2 - 16})`}>
        {/* Printer housing */}
        <rect
          x={-width / 2 + 6}
          y={-4}
          width={width - 12}
          height={16}
          rx={3}
          fill="#047857"
        />
        {/* Printer slot */}
        <rect
          x={-width / 2 + 10}
          y={0}
          width={width - 20}
          height={8}
          rx={2}
          fill={colors.background}
        />
        {/* Printer slot inner shadow */}
        <rect
          x={-width / 2 + 12}
          y={2}
          width={width - 24}
          height={4}
          rx={1}
          fill="rgba(0,0,0,0.15)"
        />
      </g>

      {/* Badge being printed (when issuing) */}
      {issuing && animate && (
        <motion.g
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.8 }}
        >
          {/* Mini badge matching the new design */}
          <rect
            x={-14}
            y={height / 2 - 12}
            width={28}
            height={36}
            rx={4}
            fill="#F5F0E6"
            stroke="#B45309"
            strokeWidth={1}
          />
          {/* Badge header */}
          <rect
            x={-14}
            y={height / 2 - 12}
            width={28}
            height={10}
            rx={4}
            fill={colors.svid}
          />
          <rect
            x={-14}
            y={height / 2 - 6}
            width={28}
            height={4}
            fill={colors.svid}
          />
          {/* Photo area */}
          <circle cx={0} cy={height / 2 + 6} r={7} fill="#DBEAFE" />
          <circle cx={0} cy={height / 2 + 4} r={3} fill="#60A5FA" />
          <ellipse cx={0} cy={height / 2 + 10} rx={5} ry={2.5} fill="#60A5FA" />
        </motion.g>
      )}

      {/* Security badge icon */}
      <g transform={`translate(${width / 2 - 16}, ${-height / 2 + 8})`}>
        <circle cx={0} cy={0} r={10} fill="#ECFDF5" stroke="#A7F3D0" strokeWidth={1} />
        {/* Shield icon */}
        <path
          d="M0 -5 L6 -2 L6 2 Q6 6 0 9 Q-6 6 -6 2 L-6 -2 Z"
          fill="#10B981"
          transform="scale(0.6)"
        />
      </g>

      {/* Label */}
      {label && (
        <text
          x={0}
          y={height / 2 + 28}
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
