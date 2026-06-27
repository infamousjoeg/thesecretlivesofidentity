import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface PrincipalProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  /** When active, the principal glows — they are exercising / granting authority. */
  active?: boolean;
  animate?: boolean;
}

/**
 * Principal entity — the human (or service) who OWNS the authority.
 *
 * Metaphor: the "boss" who writes and signs the permission slip. Authoritative
 * and calm, never frantic. Indigo (#6366F1). A signet/seal emblem on the chest
 * marks them as the source of authority (the one whose signature makes a slip
 * genuine); a small star above signals ownership/standing.
 */
export const Principal: React.FC<PrincipalProps> = ({
  id,
  label = 'Principal',
  position,
  size = entitySizes.principal,
  active = false,
  animate = true,
}) => {
  const uniqueId = id || Math.random().toString(36).substr(2, 9);
  const r = size / 2;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Principal${label ? `: ${label}` : ''}${active ? ' (active)' : ''}`}
    >
      <defs>
        <linearGradient id={`principal-body-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor={colors.principal} />
        </linearGradient>
        <radialGradient id={`principal-head-${uniqueId}`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#A5B4FC" />
        </radialGradient>
      </defs>

      {/* Authority aura when active */}
      {active && animate && (
        <motion.circle
          cx={0}
          cy={0}
          r={r + 6}
          fill="none"
          stroke={colors.principal}
          strokeWidth={2}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
      )}

      {/* Standing pedestal — conveys authority/standing */}
      <ellipse cx={0} cy={r * 0.92} rx={r * 0.78} ry={r * 0.16} fill={colors.principal} opacity={0.18} />

      {/* Ownership star above the head */}
      <path
        d="M0 -3 L1.6 0.6 L5.4 1.1 L2.6 3.8 L3.3 7.6 L0 5.7 L-3.3 7.6 L-2.6 3.8 L-5.4 1.1 L-1.6 0.6 Z"
        transform={`translate(0, ${-r - 4})`}
        fill={active ? colors.permissionSlip : '#A5B4FC'}
        stroke={colors.principal}
        strokeWidth={0.6}
      />

      {/* Shoulders / torso */}
      <path
        d={`M ${-r * 0.62} ${r * 0.82}
            Q ${-r * 0.62} ${r * 0.08} ${-r * 0.28} ${-r * 0.02}
            Q 0 ${-r * 0.1} ${r * 0.28} ${-r * 0.02}
            Q ${r * 0.62} ${r * 0.08} ${r * 0.62} ${r * 0.82}
            Z`}
        fill={`url(#principal-body-${uniqueId})`}
        stroke="#4F46E5"
        strokeWidth={1.5}
      />

      {/* Collar accent */}
      <path
        d={`M ${-r * 0.18} ${r * 0.02} L 0 ${r * 0.34} L ${r * 0.18} ${r * 0.02}`}
        fill="none"
        stroke="#4F46E5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Head */}
      <circle
        cx={0}
        cy={-r * 0.36}
        r={r * 0.34}
        fill={`url(#principal-head-${uniqueId})`}
        stroke="#4F46E5"
        strokeWidth={1.25}
      />

      {/* Signet / seal emblem on the chest — the source of the signature on slips */}
      <g transform={`translate(0, ${r * 0.46})`}>
        <circle cx={0} cy={0} r={r * 0.2} fill="#EEF2FF" stroke={colors.slipSeal} strokeWidth={1.5} />
        {/* monogram-ish mark, reads as a wax-seal imprint */}
        <path
          d={`M ${-r * 0.08} ${-r * 0.06} L ${-r * 0.08} ${r * 0.07} M ${-r * 0.08} ${-r * 0.06}
              Q ${r * 0.1} ${-r * 0.06} ${r * 0.08} ${r * 0.0}
              Q ${r * 0.1} ${r * 0.06} ${-r * 0.02} ${r * 0.04}`}
          fill="none"
          stroke={colors.slipSeal}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Label */}
      {label && (
        <text
          x={0}
          y={r + 22}
          textAnchor="middle"
          fill={active ? colors.textPrimary : colors.textSecondary}
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
