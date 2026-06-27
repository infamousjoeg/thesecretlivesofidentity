import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

type VerifierState = 'idle' | 'accept' | 'reject';

interface VerifierProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
  /** idle (waiting) | accept (slip valid, barrier up) | reject (slip bad, barrier down). */
  state?: VerifierState;
  animate?: boolean;
}

/**
 * Verifier entity — the checkpoint / guard that inspects a permission slip
 * (and the whole delegation chain) and accepts or rejects it.
 *
 * Metaphor: a reception desk / bouncer's booth with a scanner slot and a
 * striped barrier arm. Authority blue (#3B82F6, shared with the SPIRE server
 * family). The screen shows ✓ (accept, barrier raised) or ✗ (reject, barrier
 * lowered); idle shows a neutral scan prompt.
 */
export const Verifier: React.FC<VerifierProps> = ({
  id,
  label = 'Verifier',
  position,
  size = entitySizes.verifier,
  state = 'idle',
  animate = true,
}) => {
  const uniqueId = id || Math.random().toString(36).substr(2, 9);
  const W = size * 0.92;
  const H = size * 0.7;
  const top = -H / 2;
  const left = -W / 2;

  const accent = state === 'accept' ? colors.success : state === 'reject' ? colors.attacker : colors.verifier;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Verifier${label ? `: ${label}` : ''} (${state})`}
    >
      <defs>
        <linearGradient id={`verifier-body-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor={colors.verifier} />
        </linearGradient>
      </defs>

      {/* Result glow */}
      {state !== 'idle' && animate && (
        <motion.rect
          x={left - 7}
          y={top - 7}
          width={W + 14}
          height={H + 14}
          rx={10}
          fill="none"
          stroke={accent}
          strokeWidth={2.5}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: state === 'reject' ? 0.6 : 1.6, repeat: Infinity }}
        />
      )}

      {/* Ground line */}
      <rect x={-W * 0.62} y={top + H + 2} width={W * 1.24} height={8} rx={3} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />

      {/* Booth shadow */}
      <rect x={left + 3} y={top + 3} width={W} height={H} rx={8} fill="rgba(0,0,0,0.25)" />

      {/* Booth body */}
      <rect x={left} y={top} width={W} height={H} rx={8} fill={`url(#verifier-body-${uniqueId})`} stroke="#1D4ED8" strokeWidth={1.5} />

      {/* Roof / canopy */}
      <rect x={left - 5} y={top - 7} width={W + 10} height={9} rx={3} fill="#1D4ED8" />

      {/* Inspection screen showing the verdict */}
      <rect
        x={left + 8}
        y={top + 9}
        width={W - 16}
        height={H * 0.46}
        rx={5}
        fill="#0B1B33"
        stroke={accent}
        strokeWidth={1.25}
      />
      {state === 'accept' && (
        <path
          d={`M ${-W * 0.1} ${top + H * 0.3} l ${W * 0.06} ${W * 0.07} l ${W * 0.13} ${-W * 0.15}`}
          fill="none"
          stroke={colors.success}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {state === 'reject' && (
        <g stroke={colors.attacker} strokeWidth={3} strokeLinecap="round">
          <line x1={-W * 0.1} y1={top + H * 0.18} x2={W * 0.1} y2={top + H * 0.38} />
          <line x1={W * 0.1} y1={top + H * 0.18} x2={-W * 0.1} y2={top + H * 0.38} />
        </g>
      )}
      {state === 'idle' && (
        <>
          {/* scanning prompt */}
          <text x={0} y={top + H * 0.32} textAnchor="middle" fill={colors.verifier} fontSize={size * 0.1} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
            SCAN
          </text>
          {animate && (
            <motion.line
              x1={left + 12}
              x2={left + W - 12}
              stroke={colors.verifier}
              strokeWidth={1.5}
              opacity={0.7}
              initial={{ y1: top + 12, y2: top + 12 }}
              animate={{ y1: [top + 12, top + H * 0.46 + 4, top + 12], y2: [top + 12, top + H * 0.46 + 4, top + 12] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </>
      )}

      {/* Scanner slot where the slip is inserted */}
      <rect x={left + 10} y={top + H - 16} width={W - 20} height={8} rx={2} fill="#0B1B33" />
      <rect x={left + 13} y={top + H - 14} width={W - 26} height={3} rx={1.5} fill={accent} opacity={0.7} />

      {/* Barrier arm — raised on accept, lowered (blocking) on reject, half on idle */}
      {(() => {
        const pivotX = left + W + 4;
        const pivotY = top + H * 0.3;
        const angle = state === 'accept' ? -70 : state === 'reject' ? 0 : -35;
        const armLen = W * 0.9;
        return (
          <g transform={`translate(${pivotX}, ${pivotY}) rotate(${angle})`}>
            <circle cx={0} cy={0} r={4} fill="#1D4ED8" />
            <rect x={0} y={-3} width={armLen} height={6} rx={2} fill="#E5E7EB" stroke="#1D4ED8" strokeWidth={1} />
            {/* hazard stripes */}
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={6 + i * (armLen / 4)} y={-3} width={armLen / 8} height={6} fill={state === 'reject' ? colors.attacker : '#1D4ED8'} opacity={0.85} />
            ))}
          </g>
        );
      })()}

      {/* Label */}
      {label && (
        <text
          x={0}
          y={top + H + 24}
          textAnchor="middle"
          fill={state === 'idle' ? colors.textSecondary : accent}
          fontSize={12}
          fontWeight={500}
          fontFamily="IBM Plex Sans, sans-serif"
        >
          {state === 'reject' ? 'REJECTED' : state === 'accept' ? 'ACCEPTED' : label}
        </text>
      )}
    </g>
  );
};
