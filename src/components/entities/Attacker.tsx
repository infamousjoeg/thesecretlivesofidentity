import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface AttackerProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  blocked?: boolean;
  animate?: boolean;
}

/**
 * Attacker entity - represents a threat/malicious actor
 * Shown as a hooded figure, red color (#EF4444)
 * Can show "blocked" state with X overlay
 */
export const Attacker: React.FC<AttackerProps> = ({
  id: _id,
  label = 'Attacker',
  position,
  size = entitySizes.attacker,
  blocked = false,
  animate = true,
}) => {
  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Attacker${blocked ? ' (blocked)' : ''}`}
    >
      {/* Menacing aura when not blocked */}
      {!blocked && animate && (
        <motion.circle
          cx={0}
          cy={0}
          r={size * 0.6}
          fill="none"
          stroke={colors.attacker}
          strokeWidth={2}
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Hood/cloak shape */}
      <path
        d={`
          M 0 ${-size * 0.4}
          C ${size * 0.4} ${-size * 0.4} ${size * 0.5} ${-size * 0.1} ${size * 0.45} ${size * 0.2}
          L ${size * 0.35} ${size * 0.45}
          L ${-size * 0.35} ${size * 0.45}
          L ${-size * 0.45} ${size * 0.2}
          C ${-size * 0.5} ${-size * 0.1} ${-size * 0.4} ${-size * 0.4} 0 ${-size * 0.4}
        `}
        fill={blocked ? colors.textMuted : colors.attacker}
        opacity={blocked ? 0.5 : 1}
      />

      {/* Face shadow */}
      <ellipse
        cx={0}
        cy={-size * 0.05}
        rx={size * 0.25}
        ry={size * 0.2}
        fill={colors.background}
        opacity={0.8}
      />

      {/* Eyes - menacing dots */}
      {!blocked && (
        <>
          <motion.circle
            cx={-size * 0.1}
            cy={-size * 0.1}
            r={3}
            fill={colors.attacker}
            animate={animate ? { opacity: [1, 0.5, 1] } : undefined}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.circle
            cx={size * 0.1}
            cy={-size * 0.1}
            r={3}
            fill={colors.attacker}
            animate={animate ? { opacity: [1, 0.5, 1] } : undefined}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </>
      )}

      {/* Blocked overlay */}
      {blocked && (
        <g>
          {/* Circle with X */}
          <circle
            cx={0}
            cy={0}
            r={size * 0.5}
            fill="none"
            stroke={colors.attacker}
            strokeWidth={3}
          />
          <line
            x1={-size * 0.35}
            y1={-size * 0.35}
            x2={size * 0.35}
            y2={size * 0.35}
            stroke={colors.attacker}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <line
            x1={size * 0.35}
            y1={-size * 0.35}
            x2={-size * 0.35}
            y2={size * 0.35}
            stroke={colors.attacker}
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* Shield block effect */}
          {animate && (
            <motion.circle
              cx={0}
              cy={0}
              r={size * 0.6}
              fill="none"
              stroke={colors.agent}
              strokeWidth={3}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 1.5] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
            />
          )}
        </g>
      )}

      {/* Skull hint in hood when blocked */}
      {blocked && (
        <g opacity={0.5}>
          <circle cx={-size * 0.08} cy={-size * 0.1} r={4} fill="#9CA3AF" />
          <circle cx={size * 0.08} cy={-size * 0.1} r={4} fill="#9CA3AF" />
          <ellipse cx={0} cy={size * 0.05} rx={3} ry={4} fill="#9CA3AF" />
        </g>
      )}

      {/* Label */}
      {label && (
        <text
          x={0}
          y={size * 0.7}
          textAnchor="middle"
          fill={blocked ? colors.textMuted : colors.attacker}
          fontSize={11}
          fontWeight={500}
          fontFamily="IBM Plex Sans, sans-serif"
        >
          {blocked ? 'BLOCKED' : label}
        </text>
      )}
    </g>
  );
};
