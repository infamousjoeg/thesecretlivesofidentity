import React from 'react';
import { motion } from 'framer-motion';
import type { Position, Selector } from '@/types';
import { colors } from '@/utils/constants';

interface RegistrationEntryProps {
  id?: string;
  position: Position;
  size?: number;
  selectors?: (Selector | string)[];
  spiffeId?: string;
  highlighted?: boolean;
  animate?: boolean;
}

/**
 * Registration Entry entity - represents HR record mapping selectors to SPIFFE ID
 * Shown as a clipboard/document with selector conditions and resulting SPIFFE ID
 */
export const RegistrationEntry: React.FC<RegistrationEntryProps> = ({
  id: _id,
  position,
  size = 100,
  selectors: propSelectors,
  spiffeId = 'spiffe://acme.com/payment/api',
  highlighted = false,
  animate = true,
}) => {
  // Parse selectors - can be Selector[] or string[]
  const selectors: Selector[] = propSelectors?.map((s) => {
    if (typeof s === 'string') {
      const parts = s.split(':');
      if (parts.length >= 2) {
        return { type: parts.slice(0, -1).join(':'), value: parts[parts.length - 1] };
      }
      return { type: 'unknown', value: s };
    }
    return s;
  }) || [
    { type: 'k8s:ns', value: 'production' },
    { type: 'k8s:sa', value: 'payment-api' },
  ];
  const width = size * 1.1;
  const height = size * 1.4;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Registration Entry: ${selectors.map((s) => `${s.type}=${s.value}`).join(', ')} → ${spiffeId}`}
    >
      {/* Highlight glow */}
      {highlighted && animate && (
        <motion.rect
          x={-width / 2 - 4}
          y={-height / 2 - 4}
          width={width + 8}
          height={height + 8}
          rx={8}
          fill="none"
          stroke={colors.success}
          strokeWidth={2}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Clipboard backing */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={6}
        fill={colors.surface}
        stroke={colors.textMuted}
        strokeWidth={1}
      />

      {/* Clipboard clip at top */}
      <rect
        x={-15}
        y={-height / 2 - 8}
        width={30}
        height={16}
        rx={3}
        fill={colors.textMuted}
      />
      <rect
        x={-12}
        y={-height / 2 - 2}
        width={24}
        height={8}
        rx={2}
        fill={colors.surface}
      />

      {/* "IF" section header */}
      <text
        x={-width / 2 + 10}
        y={-height / 2 + 25}
        fill={colors.agent}
        fontSize={10}
        fontWeight="bold"
        fontFamily="Space Grotesk, sans-serif"
      >
        IF:
      </text>

      {/* Selectors */}
      {selectors.slice(0, 3).map((selector, index) => (
        <g key={index} transform={`translate(0, ${-height / 2 + 35 + index * 18})`}>
          <rect
            x={-width / 2 + 8}
            y={0}
            width={width - 16}
            height={14}
            rx={2}
            fill={`${colors.agent}20`}
          />
          <text
            x={-width / 2 + 12}
            y={10}
            fill={colors.textSecondary}
            fontSize={8}
            fontFamily="JetBrains Mono, monospace"
          >
            {`${selector.type}=${selector.value}`.slice(0, 20)}
          </text>
        </g>
      ))}

      {/* Arrow */}
      <g transform={`translate(0, ${height / 2 - 55})`}>
        <line
          x1={0}
          y1={-5}
          x2={0}
          y2={10}
          stroke={colors.textMuted}
          strokeWidth={2}
        />
        <polygon
          points="0,15 -5,5 5,5"
          fill={colors.textMuted}
        />
      </g>

      {/* "THEN" section header */}
      <text
        x={-width / 2 + 10}
        y={height / 2 - 35}
        fill={colors.svid}
        fontSize={10}
        fontWeight="bold"
        fontFamily="Space Grotesk, sans-serif"
      >
        THEN:
      </text>

      {/* SPIFFE ID result */}
      <rect
        x={-width / 2 + 8}
        y={height / 2 - 28}
        width={width - 16}
        height={18}
        rx={3}
        fill={`${colors.svid}30`}
        stroke={colors.svid}
        strokeWidth={1}
      />
      <text
        x={0}
        y={height / 2 - 15}
        textAnchor="middle"
        fill={colors.svid}
        fontSize={7}
        fontFamily="JetBrains Mono, monospace"
      >
        {spiffeId.length > 28 ? '...' + spiffeId.slice(-25) : spiffeId}
      </text>
    </g>
  );
};
