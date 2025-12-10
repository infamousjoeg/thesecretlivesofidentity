import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface TrustBundleProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  domains?: string[];
  certCount?: number;
  expanded?: boolean;
  highlighted?: boolean;
  animate?: boolean;
}

/**
 * Trust Bundle entity - represents the list of trusted authorities
 * Shown as a stack of certificates/documents
 * Purple color (#8B5CF6)
 */
export const TrustBundle: React.FC<TrustBundleProps> = ({
  id: _id,
  label = 'Trust Bundle',
  position,
  size = entitySizes.trustBundle,
  domains,
  certCount = 1,
  expanded = false,
  highlighted = false,
  animate = true,
}) => {
  // Use domains length if provided, otherwise use certCount
  const effectiveCertCount = domains ? domains.length : certCount;
  const width = size * 0.9;
  const height = size * 0.7;
  const stackOffset = 4;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Trust Bundle containing ${effectiveCertCount} certificate(s)`}
    >
      {/* Highlight glow */}
      {highlighted && animate && (
        <motion.rect
          x={-width / 2 - 6}
          y={-height / 2 - 6 - stackOffset * 2}
          width={width + 12}
          height={height + 12 + stackOffset * 2}
          rx={8}
          fill="none"
          stroke={colors.trustBundle}
          strokeWidth={2}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Stacked documents (back to front) */}
      {(expanded ? [Math.min(effectiveCertCount - 1, 4), Math.min(effectiveCertCount - 1, 3), Math.min(effectiveCertCount - 1, 2), 1, 0] : [2, 1, 0])
        .filter((i, idx, arr) => expanded ? i >= 0 && arr.indexOf(i) === idx : true)
        .map((i) => (
        <rect
          key={i}
          x={-width / 2 + i * 2}
          y={-height / 2 - i * stackOffset}
          width={width}
          height={height}
          rx={4}
          fill={i === 0 ? colors.trustBundle : `${colors.trustBundle}${i === 1 ? 'CC' : '99'}`}
          stroke={colors.background}
          strokeWidth={1}
        />
      ))}

      {/* Certificate seal on top document */}
      <circle
        cx={width / 2 - 15}
        cy={-height / 2 + 15}
        r={10}
        fill="#DDD6FE"
        stroke={colors.trustBundle}
        strokeWidth={1.5}
      />
      <text
        x={width / 2 - 15}
        y={-height / 2 + 18}
        textAnchor="middle"
        fill={colors.trustBundle}
        fontSize={8}
        fontWeight="bold"
        fontFamily="Space Grotesk, sans-serif"
      >
        CA
      </text>

      {/* Lines representing text on document */}
      <rect
        x={-width / 2 + 8}
        y={-height / 2 + 10}
        width={width * 0.5}
        height={4}
        rx={1}
        fill="#DDD6FE"
      />
      <rect
        x={-width / 2 + 8}
        y={-height / 2 + 20}
        width={width * 0.7}
        height={3}
        rx={1}
        fill="#DDD6FE"
        opacity={0.7}
      />
      <rect
        x={-width / 2 + 8}
        y={-height / 2 + 28}
        width={width * 0.6}
        height={3}
        rx={1}
        fill="#DDD6FE"
        opacity={0.5}
      />

      {/* Domain count badge */}
      <rect
        x={width / 2 - 24}
        y={height / 2 - 18}
        width={20}
        height={14}
        rx={3}
        fill={colors.background}
      />
      <text
        x={width / 2 - 14}
        y={height / 2 - 8}
        textAnchor="middle"
        fill={colors.trustBundle}
        fontSize={9}
        fontWeight="bold"
        fontFamily="JetBrains Mono, monospace"
      >
        {effectiveCertCount}
      </text>

      {/* Label */}
      {label && (
        <text
          x={0}
          y={height / 2 + 18}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={10}
          fontFamily="IBM Plex Sans, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
};
