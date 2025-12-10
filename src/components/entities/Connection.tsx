import React from 'react';
import { motion } from 'framer-motion';
import type { Position, ConnectionStatus } from '@/types';
import { colors } from '@/utils/constants';

interface ConnectionProps {
  id?: string;
  from: Position;
  to: Position;
  status?: ConnectionStatus;
  showArrow?: boolean;
  bidirectional?: boolean;
  label?: string;
  animate?: boolean;
}

/**
 * Connection entity - represents communication between entities
 * Can be solid (established), dashed (attempting), or red (rejected)
 */
export const Connection: React.FC<ConnectionProps> = ({
  id: _id,
  from,
  to,
  status = 'established',
  showArrow = true,
  bidirectional = false,
  label,
  animate = true,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'established':
        return {
          color: colors.success,
          dashArray: 'none',
          width: 2,
        };
      case 'attempting':
        return {
          color: colors.textMuted,
          dashArray: '8 4',
          width: 2,
        };
      case 'rejected':
        return {
          color: colors.attacker,
          dashArray: 'none',
          width: 2,
        };
    }
  };

  const styles = getStatusStyles();

  // Calculate midpoint for label
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  // Calculate angle for arrow
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

  // Arrow offset from endpoint
  const arrowOffset = 20;
  const arrowX = to.x - Math.cos(angle * (Math.PI / 180)) * arrowOffset;
  const arrowY = to.y - Math.sin(angle * (Math.PI / 180)) * arrowOffset;

  return (
    <g aria-label={`Connection from (${from.x},${from.y}) to (${to.x},${to.y}): ${status}`}>
      {/* Main line */}
      {animate && status === 'attempting' ? (
        <motion.line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={styles.color}
          strokeWidth={styles.width}
          strokeDasharray={styles.dashArray}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={styles.color}
          strokeWidth={styles.width}
          strokeDasharray={styles.dashArray}
        />
      )}

      {/* Flow animation for established connections */}
      {status === 'established' && animate && (
        <motion.circle
          r={3}
          fill={styles.color}
          initial={{ x: from.x, y: from.y }}
          animate={{ x: to.x, y: to.y }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Arrow at end */}
      {showArrow && (
        <g transform={`translate(${arrowX}, ${arrowY}) rotate(${angle})`}>
          <polygon
            points="0,0 -10,-5 -10,5"
            fill={styles.color}
          />
        </g>
      )}

      {/* Arrow at start for bidirectional */}
      {bidirectional && showArrow && (
        <g transform={`translate(${from.x + Math.cos(angle * (Math.PI / 180)) * arrowOffset}, ${from.y + Math.sin(angle * (Math.PI / 180)) * arrowOffset}) rotate(${angle + 180})`}>
          <polygon
            points="0,0 -10,-5 -10,5"
            fill={styles.color}
          />
        </g>
      )}

      {/* Rejected X */}
      {status === 'rejected' && (
        <g transform={`translate(${midX}, ${midY})`}>
          <circle r={12} fill={colors.background} stroke={colors.attacker} strokeWidth={2} />
          <line
            x1={-5}
            y1={-5}
            x2={5}
            y2={5}
            stroke={colors.attacker}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1={5}
            y1={-5}
            x2={-5}
            y2={5}
            stroke={colors.attacker}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Label */}
      {label && (
        <g transform={`translate(${midX}, ${midY - 10})`}>
          <rect
            x={-30}
            y={-8}
            width={60}
            height={16}
            rx={3}
            fill={colors.background}
            opacity={0.9}
          />
          <text
            x={0}
            y={4}
            textAnchor="middle"
            fill={styles.color}
            fontSize={9}
            fontFamily="IBM Plex Sans, sans-serif"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};
