import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface SpireServerProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  active?: boolean;
  animate?: boolean;
}

/**
 * SPIRE Server entity - represents Corporate HQ / Central Authority
 * Shown as a building with authority presence
 * Blue color (#3B82F6), glows when active
 */
export const SpireServer: React.FC<SpireServerProps> = ({
  id: _id,
  label = 'SPIRE Server',
  position,
  size = entitySizes.server,
  active = false,
  animate = true,
}) => {
  const halfWidth = size * 0.45;
  const height = size * 0.8;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`SPIRE Server${active ? ' (active)' : ''}`}
    >
      {/* Glow effect when active */}
      {active && animate && (
        <motion.rect
          x={-halfWidth - 8}
          y={-height / 2 - 8}
          width={halfWidth * 2 + 16}
          height={height + 16}
          rx={8}
          fill="none"
          stroke={colors.server}
          strokeWidth={2}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Building base */}
      <rect
        x={-halfWidth}
        y={-height / 2}
        width={halfWidth * 2}
        height={height}
        rx={4}
        fill={colors.server}
      />

      {/* Building top / roof accent */}
      <rect
        x={-halfWidth + 5}
        y={-height / 2 - 10}
        width={halfWidth * 2 - 10}
        height={15}
        rx={3}
        fill={colors.server}
      />

      {/* Windows (3 rows of 2) */}
      {[0, 1, 2].map((row) => (
        <React.Fragment key={row}>
          <rect
            x={-halfWidth + 8}
            y={-height / 2 + 15 + row * 20}
            width={12}
            height={10}
            rx={1}
            fill={active ? '#93C5FD' : colors.background}
            opacity={active ? 1 : 0.5}
          />
          <rect
            x={halfWidth - 20}
            y={-height / 2 + 15 + row * 20}
            width={12}
            height={10}
            rx={1}
            fill={active ? '#93C5FD' : colors.background}
            opacity={active ? 1 : 0.5}
          />
        </React.Fragment>
      ))}

      {/* Shield icon in center */}
      <g transform={`translate(0, ${-5})`}>
        <path
          d="M0 -12 L10 -6 L10 6 Q10 12 0 18 Q-10 12 -10 6 L-10 -6 Z"
          fill={active ? '#DBEAFE' : colors.background}
          stroke={colors.server}
          strokeWidth={1}
        />
        {/* Checkmark inside shield */}
        {active && (
          <path
            d="M-4 2 L-1 5 L5 -3"
            fill="none"
            stroke={colors.server}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </g>

      {/* Label */}
      {label && (
        <text
          x={0}
          y={height / 2 + 18}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={12}
          fontWeight={500}
          fontFamily="IBM Plex Sans, sans-serif"
        >
          {label}
        </text>
      )}

      {/* HQ badge */}
      <rect
        x={-12}
        y={height / 2 - 18}
        width={24}
        height={14}
        rx={2}
        fill={colors.background}
      />
      <text
        x={0}
        y={height / 2 - 8}
        textAnchor="middle"
        fill={colors.server}
        fontSize={9}
        fontWeight="bold"
        fontFamily="Space Grotesk, sans-serif"
      >
        HQ
      </text>
    </g>
  );
};
