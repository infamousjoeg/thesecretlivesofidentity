import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface WorkloadProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  attested?: boolean;
  showBadge?: boolean;
  showQuestionMark?: boolean;
  animate?: boolean;
}

/**
 * Workload entity - represents a service/application that needs identity
 *
 * REDESIGNED as a circuit chip/processor to emphasize MACHINE identity
 * (SPIFFE is about non-human workload identity, NOT human login)
 *
 * Features:
 * - Center square "identity core" where badge/status appears
 * - 8 radiating circuit traces with terminal nodes
 * - Chip aesthetic clearly says "machine/software identity"
 * - Attested state: golden glow with pulsing traces
 * - Unattested state: gray/muted with dashed traces
 */
export const Workload: React.FC<WorkloadProps> = ({
  id,
  label,
  position,
  size = entitySizes.workload,
  attested = false,
  showBadge = true,
  showQuestionMark: _showQuestionMark = false,
  animate = true,
}) => {
  const uniqueId = id || Math.random().toString(36).substr(2, 9);

  // Chip dimensions
  const chipSize = size * 0.45; // Center chip square
  const traceLength = size * 0.42; // Length of radiating traces
  const nodeRadius = size * 0.06; // Terminal node size
  const traceWidth = size * 0.04; // Trace line width

  // Colors based on state
  const chipBorder = attested ? '#FCD34D' : '#6B7280';
  const traceColor = attested ? '#F59E0B' : '#6B7280';

  // 8 traces at 45° intervals
  const traceAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Workload${label ? `: ${label}` : ''}${attested ? ' (attested)' : ' (unattested)'}`}
    >
      <defs>
        {/* Gradient for chip surface */}
        <linearGradient id={`chip-gradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={attested ? '#FBBF24' : '#6B7280'} />
          <stop offset="50%" stopColor={attested ? '#F59E0B' : '#4B5563'} />
          <stop offset="100%" stopColor={attested ? '#D97706' : '#374151'} />
        </linearGradient>

        {/* Glow filter for attested state */}
        <filter id={`chip-glow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor={attested ? '#F59E0B' : '#6B7280'} floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inner shadow for chip depth */}
        <filter id={`chip-shadow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Outer glow ring when attested */}
      {attested && animate && (
        <motion.circle
          cx={0}
          cy={0}
          r={size / 2 + 4}
          fill="none"
          stroke={colors.svid}
          strokeWidth={2}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      {/* Background circle for visual containment */}
      <circle
        cx={0}
        cy={0}
        r={size / 2}
        fill={attested ? 'rgba(251, 191, 36, 0.08)' : 'rgba(107, 114, 128, 0.08)'}
        stroke={attested ? 'rgba(251, 191, 36, 0.3)' : 'rgba(107, 114, 128, 0.3)'}
        strokeWidth={1}
      />

      {/* Radiating circuit traces */}
      {traceAngles.map((angle, i) => {
        // Offset start point from chip edge
        const startOffset = chipSize / 2 + 2;
        const endOffset = traceLength;

        return (
          <g key={i} transform={`rotate(${angle})`}>
            {/* Trace line */}
            {attested && animate ? (
              <motion.line
                x1={startOffset}
                y1={0}
                x2={endOffset}
                y2={0}
                stroke={traceColor}
                strokeWidth={traceWidth}
                strokeLinecap="round"
                initial={{ pathLength: 0.8 }}
                animate={{
                  pathLength: [0.8, 1, 0.8],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ) : (
              <line
                x1={startOffset}
                y1={0}
                x2={endOffset}
                y2={0}
                stroke={traceColor}
                strokeWidth={traceWidth}
                strokeLinecap="round"
                strokeDasharray={attested ? 'none' : '3,3'}
                opacity={attested ? 1 : 0.5}
              />
            )}

            {/* Terminal node at end of trace */}
            {attested && animate ? (
              <motion.circle
                cx={endOffset}
                cy={0}
                r={nodeRadius}
                fill={attested ? '#FCD34D' : '#6B7280'}
                stroke={attested ? '#F59E0B' : '#4B5563'}
                strokeWidth={1}
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 0.8] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ) : (
              <circle
                cx={endOffset}
                cy={0}
                r={nodeRadius}
                fill={attested ? '#FCD34D' : '#4B5563'}
                stroke={attested ? '#F59E0B' : '#6B7280'}
                strokeWidth={1}
                opacity={attested ? 1 : 0.5}
              />
            )}
          </g>
        );
      })}

      {/* Center chip - shadow layer */}
      <rect
        x={-chipSize / 2 + 2}
        y={-chipSize / 2 + 2}
        width={chipSize}
        height={chipSize}
        rx={4}
        fill="rgba(0,0,0,0.3)"
      />

      {/* Center chip - main body */}
      <rect
        x={-chipSize / 2}
        y={-chipSize / 2}
        width={chipSize}
        height={chipSize}
        rx={4}
        fill={`url(#chip-gradient-${uniqueId})`}
        stroke={chipBorder}
        strokeWidth={2}
        filter={attested ? `url(#chip-glow-${uniqueId})` : undefined}
      />

      {/* Chip surface details - corner notch (like real chips) */}
      <circle
        cx={-chipSize / 2 + 6}
        cy={-chipSize / 2 + 6}
        r={3}
        fill={attested ? '#D97706' : '#374151'}
      />

      {/* Inner circuit pattern on chip */}
      <g opacity={0.4}>
        <line
          x1={-chipSize / 4}
          y1={-chipSize / 4}
          x2={chipSize / 4}
          y2={-chipSize / 4}
          stroke={attested ? '#FEF3C7' : '#9CA3AF'}
          strokeWidth={1}
        />
        <line
          x1={-chipSize / 4}
          y1={0}
          x2={chipSize / 4}
          y2={0}
          stroke={attested ? '#FEF3C7' : '#9CA3AF'}
          strokeWidth={1}
        />
        <line
          x1={-chipSize / 4}
          y1={chipSize / 4}
          x2={chipSize / 4}
          y2={chipSize / 4}
          stroke={attested ? '#FEF3C7' : '#9CA3AF'}
          strokeWidth={1}
        />
      </g>

      {/* Center status indicator */}
      {attested ? (
        // Checkmark / verified icon when attested
        <g>
          <circle
            cx={0}
            cy={0}
            r={chipSize / 4}
            fill="#15803D"
          />
          <path
            d={`M ${-chipSize / 8} ${0} L ${-chipSize / 16} ${chipSize / 8} L ${chipSize / 8} ${-chipSize / 10}`}
            stroke="#FFFFFF"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      ) : (
        // Question mark when unattested
        <text
          x={0}
          y={chipSize / 8}
          textAnchor="middle"
          fill="#D1D5DB"
          fontSize={chipSize / 2}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
        >
          ?
        </text>
      )}

      {/* Mini badge indicator when attested (positioned at corner) */}
      {attested && showBadge && (
        <g transform={`translate(${chipSize / 2 + 2}, ${-chipSize / 2 - 2})`}>
          {/* Mini badge shadow */}
          <rect
            x={-8}
            y={-10}
            width={16}
            height={20}
            rx={2}
            fill="rgba(0,0,0,0.3)"
            transform="translate(1, 1)"
          />
          {/* Mini badge body */}
          <rect
            x={-8}
            y={-10}
            width={16}
            height={20}
            rx={2}
            fill="#F5F0E6"
            stroke="#B45309"
            strokeWidth={1}
          />
          {/* Badge header stripe */}
          <rect
            x={-8}
            y={-10}
            width={16}
            height={6}
            rx={2}
            fill={colors.svid}
          />
          <rect
            x={-8}
            y={-6}
            width={16}
            height={2}
            fill={colors.svid}
          />
          {/* Valid indicator dot */}
          <circle
            cx={5}
            cy={-7}
            r={3}
            fill="#22C55E"
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        </g>
      )}

      {/* Label */}
      {label && (
        <text
          x={0}
          y={size / 2 + 14}
          textAnchor="middle"
          fill={attested ? colors.textPrimary : colors.textSecondary}
          fontSize={11}
          fontWeight={attested ? '500' : '400'}
          fontFamily="IBM Plex Sans, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
};
