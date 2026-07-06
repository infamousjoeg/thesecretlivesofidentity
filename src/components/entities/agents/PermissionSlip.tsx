import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Position, BadgeState } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface PermissionSlipProps {
  id?: string;
  position: Position;
  size?: number;
  /** valid | expiring | expired — mirrors the Badge lifecycle states. */
  state?: BadgeState;
  /** The principal the slip authorizes action on behalf of (the subject). */
  onBehalfOf?: string;
  /** The agent actually acting (the actor). */
  actor?: string;
  /** Permitted actions — rendered as ticked checklist rows. */
  scopes?: string[];
  /** Actions that were removed when this slip was narrowed — rendered struck-through. */
  revokedScopes?: string[];
  /** Where the slip may be used (audience binding). */
  audience?: string;
  /** Seconds remaining before expiry. */
  expiresIn?: number;
  showCountdown?: boolean;
  /** A narrowed sub-slip: torn edge + ribbon, signalling fewer permissions than its parent. */
  narrowed?: boolean;
  animate?: boolean;
}

/**
 * PermissionSlip entity — THE HERO VISUAL of the Agent Identity module.
 *
 * Metaphor: a physical, signed, tear-off WORK ORDER / permission slip — NOT a
 * certificate and NOT a JWT/code blob. It is filled in like a paper form:
 *   • "On behalf of <principal>"  (the subject)
 *   • "Acting: <agent>"           (the actor)
 *   • "Good for:" a ticked checklist of scopes (struck rows = removed by narrowing)
 *   • "Valid at: <audience>"      (audience binding)
 *   • an expiry countdown          (short-lived)
 *   • a handwritten signature + burgundy wax seal (signed)
 *
 * A `narrowed` sub-slip tears smaller, gains a NARROWED ribbon, and shows fewer
 * ticked permissions than its parent — authority only ever shrinks down a chain.
 */
export const PermissionSlip: React.FC<PermissionSlipProps> = ({
  id,
  position,
  size = entitySizes.permissionSlip,
  state = 'valid',
  onBehalfOf,
  actor,
  scopes,
  revokedScopes = [],
  audience = 'calendar-api',
  expiresIn = 300,
  showCountdown = true,
  narrowed = false,
  animate = true,
}) => {
  const { t } = useTranslation('agents-frames');
  // Human-readable prop values fall back to localized defaults when a call site
  // omits them, so the slip never shows hardcoded English in pt-BR / es-419.
  const displayOnBehalfOf = onBehalfOf ?? t('permissionSlip.defaultOnBehalfOf', { defaultValue: 'Alex (you)' });
  const displayActor = actor ?? t('permissionSlip.defaultActor', { defaultValue: 'Travel Agent' });
  const displayScopes = scopes ?? [t('permissionSlip.defaultScope', { defaultValue: 'Read calendar' })];
  const uniqueId = id || Math.random().toString(36).substr(2, 9);
  // The slip is drawn at a canonical base size and then uniformly scaled, so
  // every field stays legible and correctly spaced at any `size`.
  const BASE = 120;
  const scale = size / BASE;
  const W = BASE;
  const H = BASE * 1.55;
  const top = -H / 2;
  const left = -W / 2;

  const [countdown, setCountdown] = useState(expiresIn);

  useEffect(() => {
    if (!showCountdown || state === 'expired') return;
    const timer = setInterval(() => setCountdown((p) => Math.max(0, p - 1)), 1000);
    return () => clearInterval(timer);
  }, [showCountdown, state]);

  useEffect(() => setCountdown(expiresIn), [expiresIn]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const palette = {
    valid: { header: colors.permissionSlip, headerDark: '#B45309', paper: '#FBF6E6', paperEdge: '#EFE6CC', ink: '#3F3522', seal: colors.slipSeal },
    expiring: { header: '#F97316', headerDark: '#C2410C', paper: '#FEF6E7', paperEdge: '#F6E4C4', ink: '#3F3522', seal: '#B45309' },
    expired: { header: '#9CA3AF', headerDark: '#6B7280', paper: '#E7E5E4', paperEdge: '#D6D3D1', ink: '#9CA3AF', seal: '#9CA3AF' },
  }[state];

  // Build the perforated/torn top edge as a zigzag path
  const teeth = Math.max(6, Math.round(W / 11));
  const toothW = W / teeth;
  let topEdge = `M ${left} ${top + 7}`;
  for (let i = 0; i < teeth; i++) {
    const x0 = left + i * toothW;
    topEdge += ` L ${x0 + toothW / 2} ${top} L ${x0 + toothW} ${top + 7}`;
  }

  // Combined scope rows: granted (ticked) first, then revoked (struck). Cap to keep it legible.
  const grantedRows = displayScopes.map((s) => ({ text: s, granted: true }));
  const revokedRows = revokedScopes.map((s) => ({ text: s, granted: false }));
  const rows = [...grantedRows, ...revokedRows].slice(0, 3);
  const rowStartY = top + 118;
  const rowGap = 14;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`Permission slip on behalf of ${displayOnBehalfOf}, ${state}${narrowed ? ', narrowed' : ''}`}
    >
      <defs>
        <linearGradient id={`slip-paper-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.paper} />
          <stop offset="100%" stopColor={palette.paperEdge} />
        </linearGradient>
        <linearGradient id={`slip-header-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.header} />
          <stop offset="100%" stopColor={palette.headerDark} />
        </linearGradient>
      </defs>

      <g transform={`scale(${scale})`}>
      {/* Valid glow */}
      {state === 'valid' && animate && (
        <motion.rect
          x={left - 6}
          y={top - 6}
          width={W + 12}
          height={H + 12}
          rx={8}
          fill="none"
          stroke={colors.permissionSlip}
          strokeWidth={2}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}
      {/* Expiring pulse */}
      {state === 'expiring' && animate && (
        <motion.rect
          x={left - 6}
          y={top - 6}
          width={W + 12}
          height={H + 12}
          rx={8}
          fill="none"
          stroke="#F97316"
          strokeWidth={3}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      )}

      {/* Paper shadow */}
      <rect x={left + 3} y={top + 3} width={W} height={H} rx={4} fill="rgba(0,0,0,0.28)" />

      {/* Paper body with torn top edge */}
      <path
        d={`${topEdge} L ${left + W} ${top + 7} L ${left + W} ${top + H - 4} Q ${left + W} ${top + H} ${left + W - 4} ${top + H} L ${left + 4} ${top + H} Q ${left} ${top + H} ${left} ${top + H - 4} Z`}
        fill={`url(#slip-paper-${uniqueId})`}
        stroke={palette.headerDark}
        strokeWidth={1.25}
      />

      {/* Perforation dotted line just below the torn edge */}
      <line
        x1={left + 4}
        y1={top + 11}
        x2={left + W - 4}
        y2={top + 11}
        stroke={palette.headerDark}
        strokeWidth={0.75}
        strokeDasharray="2 2"
        opacity={0.5}
      />

      {/* Header band */}
      <rect x={left} y={top + 15} width={W} height={24} fill={`url(#slip-header-${uniqueId})`} />
      {/* little note/paper icon */}
      <g transform={`translate(${left + 12}, ${top + 27})`} opacity={0.95}>
        <rect x={-5} y={-6} width={10} height={12} rx={1.5} fill="#FFFFFF" opacity={0.9} />
        <line x1={-2.5} y1={-2.5} x2={2.5} y2={-2.5} stroke={palette.headerDark} strokeWidth={1} />
        <line x1={-2.5} y1={0.5} x2={2.5} y2={0.5} stroke={palette.headerDark} strokeWidth={1} />
        <line x1={-2.5} y1={3.5} x2={1} y2={3.5} stroke={palette.headerDark} strokeWidth={1} />
      </g>
      <text
        x={2}
        y={top + 31}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={11}
        fontWeight="bold"
        fontFamily="Space Grotesk, sans-serif"
        letterSpacing="0.5"
      >
        {t('permissionSlip.title', { defaultValue: 'PERMISSION SLIP' })}
      </text>

      {/* ON BEHALF OF — own band: label, then value written on a ruled line */}
      <text x={left + 10} y={top + 52} fill={palette.ink} fontSize={7.5} opacity={0.6} fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
        {t('permissionSlip.onBehalfOf', { defaultValue: 'ON BEHALF OF' })}
      </text>
      <line x1={left + 10} y1={top + 65} x2={left + W - 10} y2={top + 65} stroke={palette.ink} strokeWidth={0.5} opacity={0.3} />
      <text x={left + 12} y={top + 63} fill={palette.ink} fontSize={9.5} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
        {displayOnBehalfOf}
      </text>

      {/* ACTING (actor) — own band, mirroring the ON BEHALF OF block so longer
          translations and longer actor names never overflow the ruled line. */}
      <text x={left + 10} y={top + 79} fill={palette.ink} fontSize={7.5} opacity={0.6} fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
        {t('permissionSlip.acting', { defaultValue: 'ACTING' })}
      </text>
      <line x1={left + 10} y1={top + 92} x2={left + W - 10} y2={top + 92} stroke={palette.ink} strokeWidth={0.5} opacity={0.3} />
      <text x={left + 12} y={top + 90} fill={palette.ink} fontSize={9} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
        {displayActor}
      </text>

      {/* section divider */}
      <line x1={left + 10} y1={top + 99} x2={left + W - 10} y2={top + 99} stroke={palette.ink} strokeWidth={0.5} opacity={0.25} />

      {/* GOOD FOR — section header for the ticked checklist below. The old
          right-aligned "{{count}} action(s)" tally was removed: it collided with
          longer translations of the label (e.g. pt-BR "VÁLIDO PARA:") and simply
          restated what the visible checklist already shows. */}
      <text x={left + 10} y={top + 109} fill={palette.ink} fontSize={8} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" letterSpacing="0.5">
        {t('permissionSlip.goodFor', { defaultValue: 'GOOD FOR:' })}
      </text>

      {/* Scope checklist rows */}
      {rows.map((row, i) => {
        const y = rowStartY + i * rowGap;
        const ok = row.granted && state !== 'expired';
        return (
          <g key={i}>
            {/* tick / cross marker */}
            {row.granted ? (
              <>
                <circle cx={left + 14} cy={y - 2} r={5} fill={ok ? '#DCFCE7' : '#E5E7EB'} stroke={ok ? colors.success : '#9CA3AF'} strokeWidth={1} />
                <path d={`M ${left + 11.5} ${y - 2} l 1.8 2 l 3 -3.6`} fill="none" stroke={ok ? '#15803D' : '#9CA3AF'} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <>
                <circle cx={left + 14} cy={y - 2} r={5} fill="#FEE2E2" stroke="#9CA3AF" strokeWidth={1} />
                <path d={`M ${left + 11.5} ${y - 4.5} l 5 5 M ${left + 16.5} ${y - 4.5} l -5 5`} fill="none" stroke="#9CA3AF" strokeWidth={1.2} strokeLinecap="round" />
              </>
            )}
            <text
              x={left + 24}
              y={y + 1}
              fill={row.granted ? palette.ink : '#9CA3AF'}
              fontSize={8.5}
              fontWeight={row.granted ? '500' : '400'}
              fontFamily="IBM Plex Sans, sans-serif"
              textDecoration={row.granted ? 'none' : 'line-through'}
            >
              {row.text}
            </text>
          </g>
        );
      })}

      {/* footer divider */}
      <line x1={left + 10} y1={top + 151} x2={left + W - 10} y2={top + 151} stroke={palette.ink} strokeWidth={0.5} opacity={0.25} />

      {/* Footer: audience + countdown stack down the LEFT column; the wax seal
          sits in the RIGHT column where no text reaches — so nothing overlaps. */}
      {/* VALID AT (audience) */}
      <text x={left + 10} y={top + 160} fill={palette.ink} fontSize={7} opacity={0.6} fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
        {t('permissionSlip.validAt', { defaultValue: 'VALID AT' })}
      </text>
      <text x={left + 10} y={top + 170} fill={palette.ink} fontSize={7.5} fontWeight="600" fontFamily="JetBrains Mono, monospace">
        {audience}
      </text>

      {/* EXPIRES countdown */}
      <text x={left + 10} y={top + 181} fill={palette.ink} fontSize={7} opacity={0.6} fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
        {t('permissionSlip.expiresIn', { defaultValue: 'EXPIRES IN' })}
      </text>
      <rect x={left + 58} y={top + 174} width={30} height={12} rx={2} fill={state === 'expired' ? '#9CA3AF' : palette.headerDark} />
      <text x={left + 73} y={top + 183} textAnchor="middle" fill="#FFFFFF" fontSize={8} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
        {state === 'expired' ? t('permissionSlip.expiredShort', { defaultValue: 'EXP' }) : formatTime(countdown)}
      </text>

      {/* Wax seal / signature — right column, clear of every field */}
      <g transform={`translate(${left + W - 20}, ${top + 168})`}>
        <circle cx={0} cy={0} r={9} fill={state === 'expired' ? '#D6D3D1' : palette.seal} opacity={state === 'expired' ? 0.6 : 1} />
        <circle cx={0} cy={0} r={9} fill="none" stroke="#FFFFFF" strokeWidth={0.75} strokeDasharray="1.5 1.5" opacity={0.7} />
        <text x={0} y={2.6} textAnchor="middle" fill="#FFFFFF" fontSize={8.5} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
          ✓
        </text>
        {/* tiny handwritten signature beneath the seal */}
        <path
          d="M -10 15 q 2 -5 4 -1 q 1 3 2 -1 q 1 -4 3 1 q 1 2 3 -1"
          fill="none"
          stroke={state === 'expired' ? '#9CA3AF' : palette.seal}
          strokeWidth={1.1}
          strokeLinecap="round"
          opacity={state === 'expired' ? 0.5 : 0.85}
        />
      </g>

      {/* NARROWED ribbon (top-right corner) — sits BELOW the header band so it
          never clips the "PERMISSION SLIP" header text. */}
      {narrowed && (
        <g transform={`translate(${left + W - 1}, ${top + 41})`}>
          <path d="M 0 0 L 0 30 L -30 0 Z" fill={colors.slipSeal} opacity={0.92} />
          <text
            transform="rotate(-45) translate(-15, -5)"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize={7.5}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
            letterSpacing="0.5"
          >
            {t('permissionSlip.narrowed', { defaultValue: 'NARROWED' })}
          </text>
        </g>
      )}

      {/* Expired diagonal stamp */}
      {state === 'expired' && (
        <g transform="rotate(-14)">
          <rect x={-38} y={-13} width={76} height={26} rx={3} fill="none" stroke={colors.attacker} strokeWidth={3} opacity={0.85} />
          <text x={0} y={6} textAnchor="middle" fill={colors.attacker} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" opacity={0.85}>
            {t('permissionSlip.expired', { defaultValue: 'EXPIRED' })}
          </text>
        </g>
      )}
      </g>
    </g>
  );
};
