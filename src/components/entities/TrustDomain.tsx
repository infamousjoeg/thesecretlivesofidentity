import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors } from '@/utils/constants';

interface TrustDomainProps {
  id?: string;
  label?: string;
  domain?: string; // Alias for label
  position: Position;
  width?: number;
  height?: number;
  color?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

/**
 * Trust Domain entity - represents a security boundary
 * Shown as a rounded boundary with soft glow edge
 * Contains other entities (workloads, agents, etc.)
 */
export const TrustDomain: React.FC<TrustDomainProps> = ({
  id,
  label,
  domain,
  position,
  width = 300,
  height = 200,
  color = colors.server,
  children,
  animate = true,
}) => {
  // Use domain if provided, otherwise fall back to label
  const displayLabel = domain || label || 'acme.com';
  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Trust Domain: ${displayLabel}`}
    >
      {/* Outer glow effect */}
      <defs>
        <filter id={`domain-glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background with subtle animation */}
      {animate ? (
        <motion.rect
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          rx={20}
          fill={`${color}10`}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="8 4"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          filter={`url(#domain-glow-${id})`}
        />
      ) : (
        <rect
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          rx={20}
          fill={`${color}10`}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="8 4"
        />
      )}

      {/* Label at top */}
      <rect
        x={-60}
        y={-height / 2 - 10}
        width={120}
        height={20}
        rx={10}
        fill={colors.background}
        stroke={color}
        strokeWidth={1}
      />
      <text
        x={0}
        y={-height / 2 + 5}
        textAnchor="middle"
        fill={color}
        fontSize={12}
        fontWeight={600}
        fontFamily="JetBrains Mono, monospace"
      >
        {displayLabel}
      </text>

      {/* Corner decorations */}
      <circle cx={-width / 2 + 15} cy={-height / 2 + 15} r={4} fill={color} opacity={0.5} />
      <circle cx={width / 2 - 15} cy={-height / 2 + 15} r={4} fill={color} opacity={0.5} />
      <circle cx={-width / 2 + 15} cy={height / 2 - 15} r={4} fill={color} opacity={0.5} />
      <circle cx={width / 2 - 15} cy={height / 2 - 15} r={4} fill={color} opacity={0.5} />

      {/* Children container */}
      {children}
    </g>
  );
};
