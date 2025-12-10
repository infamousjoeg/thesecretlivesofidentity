import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Position, BadgeState, SVIDVariant } from '@/types';
import { colors, entitySizes } from '@/utils/constants';

interface BadgeProps {
  id?: string;
  spiffeId?: string;
  position: Position;
  size?: number;
  state?: BadgeState;
  variant?: SVIDVariant;
  expiresIn?: number; // seconds remaining
  showCountdown?: boolean;
  animate?: boolean;
}

/**
 * Badge/SVID entity - THE CENTRAL VISUAL ELEMENT
 * Redesigned to look like an ACTUAL corporate ID badge
 *
 * Features:
 * - Lanyard clip hole at top (like real badges)
 * - Company header with trust domain
 * - Realistic photo area with professional silhouette
 * - Prominent SPIFFE ID display
 * - Holographic security seal
 * - QR-style type indicator
 * - Authentic badge proportions and materials
 */
export const Badge: React.FC<BadgeProps> = ({
  id,
  spiffeId = 'spiffe://acme.com/workload',
  position,
  size = entitySizes.badge,
  state = 'valid',
  variant = 'x509',
  expiresIn = 3600,
  showCountdown = true,
  animate = true,
}) => {
  const [countdown, setCountdown] = useState(expiresIn);
  const width = size;
  const height = size * 1.5; // Taller badge proportions

  // Extract trust domain from SPIFFE ID
  const trustDomain = spiffeId.replace('spiffe://', '').split('/')[0] || 'acme.com';

  // Countdown timer
  useEffect(() => {
    if (!showCountdown || state === 'expired') return;

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, state]);

  // Reset countdown when expiresIn changes
  useEffect(() => {
    setCountdown(expiresIn);
  }, [expiresIn]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStateColors = () => {
    switch (state) {
      case 'valid':
        return {
          bg: '#F5F0E6', // Cream/off-white like real badges
          header: colors.svid,
          headerDark: '#B45309',
          text: '#1F2937',
          accent: colors.svid,
          seal: '#22C55E',
        };
      case 'expiring':
        return {
          bg: '#FEF9E7',
          header: colors.warning,
          headerDark: '#A16207',
          text: '#1F2937',
          accent: colors.warning,
          seal: colors.warning,
        };
      case 'expired':
        return {
          bg: '#E5E7EB',
          header: '#6B7280',
          headerDark: '#4B5563',
          text: '#9CA3AF',
          accent: '#6B7280',
          seal: '#6B7280',
        };
    }
  };

  const stateColors = getStateColors();

  // Truncate SPIFFE ID for display
  const displayId = spiffeId.length > 28
    ? spiffeId.slice(0, 12) + '...' + spiffeId.slice(-12)
    : spiffeId;

  const uniqueId = id || Math.random().toString(36).substr(2, 9);

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      aria-label={`SVID Badge: ${spiffeId}, ${state}`}
    >
      <defs>
        {/* Badge gradient for realistic card look */}
        <linearGradient id={`badge-bg-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={stateColors.bg} />
          <stop offset="100%" stopColor={state === 'expired' ? '#D1D5DB' : '#EDE9DD'} />
        </linearGradient>

        {/* Header gradient */}
        <linearGradient id={`badge-header-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={stateColors.header} />
          <stop offset="100%" stopColor={stateColors.headerDark} />
        </linearGradient>

        {/* Holographic effect for seal */}
        <linearGradient id={`holo-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="25%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="75%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* Outer glow for valid state */}
      {state === 'valid' && animate && (
        <motion.rect
          x={-width / 2 - 6}
          y={-height / 2 - 6}
          width={width + 12}
          height={height + 12}
          rx={8}
          fill="none"
          stroke={colors.svid}
          strokeWidth={2}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      {/* Expiring pulse */}
      {state === 'expiring' && animate && (
        <motion.rect
          x={-width / 2 - 6}
          y={-height / 2 - 6}
          width={width + 12}
          height={height + 12}
          rx={8}
          fill="none"
          stroke={colors.warning}
          strokeWidth={3}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}

      {/* Card shadow - deeper for realism */}
      <rect
        x={-width / 2 + 4}
        y={-height / 2 + 4}
        width={width}
        height={height}
        rx={6}
        fill="rgba(0,0,0,0.25)"
      />

      {/* Main card body */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={6}
        fill={`url(#badge-bg-${uniqueId})`}
        stroke={state === 'expired' ? '#9CA3AF' : stateColors.headerDark}
        strokeWidth={1.5}
      />

      {/* Lanyard clip hole at top */}
      <ellipse
        cx={0}
        cy={-height / 2 + 12}
        rx={10}
        ry={5}
        fill={stateColors.bg}
        stroke={stateColors.headerDark}
        strokeWidth={2}
      />
      <ellipse
        cx={0}
        cy={-height / 2 + 12}
        rx={6}
        ry={3}
        fill={colors.background}
      />

      {/* Company/Trust Domain header bar */}
      <rect
        x={-width / 2}
        y={-height / 2 + 20}
        width={width}
        height={28}
        fill={`url(#badge-header-${uniqueId})`}
      />
      <text
        x={0}
        y={-height / 2 + 39}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={10}
        fontWeight="bold"
        fontFamily="Space Grotesk, sans-serif"
        letterSpacing="0.5"
      >
        {trustDomain.toUpperCase()}
      </text>

      {/* Photo area - professional badge photo style */}
      <rect
        x={-width / 2 + 15}
        y={-height / 2 + 58}
        width={width - 30}
        height={55}
        rx={4}
        fill={state === 'expired' ? '#D1D5DB' : '#DBEAFE'}
        stroke={state === 'expired' ? '#9CA3AF' : '#93C5FD'}
        strokeWidth={1}
      />

      {/* Professional silhouette in photo */}
      <g transform={`translate(0, ${-height / 2 + 78})`}>
        {/* Head */}
        <circle
          cx={0}
          cy={0}
          r={14}
          fill={state === 'expired' ? '#9CA3AF' : '#60A5FA'}
        />
        {/* Shoulders */}
        <path
          d="M -22 28 Q -22 15 0 15 Q 22 15 22 28 L 22 32 L -22 32 Z"
          fill={state === 'expired' ? '#9CA3AF' : '#60A5FA'}
        />
      </g>

      {/* SPIFFE ID label */}
      <text
        x={0}
        y={-height / 2 + 128}
        textAnchor="middle"
        fill={stateColors.text}
        fontSize={6}
        fontFamily="Space Grotesk, sans-serif"
        opacity={0.7}
      >
        IDENTITY
      </text>

      {/* SPIFFE ID text - prominent */}
      <text
        x={0}
        y={-height / 2 + 142}
        textAnchor="middle"
        fill={stateColors.text}
        fontSize={7}
        fontWeight="600"
        fontFamily="JetBrains Mono, monospace"
      >
        {displayId}
      </text>

      {/* Divider line */}
      <line
        x1={-width / 2 + 10}
        y1={-height / 2 + 150}
        x2={width / 2 - 10}
        y2={-height / 2 + 150}
        stroke={stateColors.headerDark}
        strokeWidth={0.5}
        opacity={0.3}
      />

      {/* Bottom section with countdown and type */}
      <g transform={`translate(0, ${height / 2 - 30})`}>
        {/* Countdown timer */}
        {showCountdown && (
          <g transform="translate(-25, 0)">
            <rect
              x={-18}
              y={-8}
              width={36}
              height={16}
              rx={3}
              fill={state === 'expired' ? '#6B7280' : stateColors.headerDark}
            />
            <text
              x={0}
              y={4}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={9}
              fontWeight="bold"
              fontFamily="JetBrains Mono, monospace"
            >
              {state === 'expired' ? 'EXP' : formatTime(countdown)}
            </text>
          </g>
        )}

        {/* QR-style type indicator */}
        <g transform="translate(25, 0)">
          <rect
            x={-14}
            y={-8}
            width={28}
            height={16}
            rx={2}
            fill={stateColors.text}
            opacity={0.1}
          />
          {/* Mini QR pattern */}
          <g transform="translate(-10, -4)">
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 5}
                  y={row * 4}
                  width={4}
                  height={3}
                  rx={0.5}
                  fill={stateColors.text}
                  opacity={(row + col) % 2 === 0 ? 0.8 : 0.3}
                />
              ))
            )}
          </g>
        </g>
      </g>

      {/* Type badge at bottom */}
      <text
        x={0}
        y={height / 2 - 8}
        textAnchor="middle"
        fill={stateColors.text}
        fontSize={7}
        fontWeight="bold"
        fontFamily="Space Grotesk, sans-serif"
        opacity={0.5}
      >
        {variant.toUpperCase()}
      </text>

      {/* Holographic VALID seal */}
      {state === 'valid' && (
        <g transform={`translate(${width / 2 - 24}, ${-height / 2 + 65})`}>
          <motion.circle
            cx={0}
            cy={0}
            r={18}
            fill="none"
            stroke={`url(#holo-${uniqueId})`}
            strokeWidth={2.5}
            animate={animate ? { rotate: 360 } : undefined}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <circle
            cx={0}
            cy={0}
            r={14}
            fill="#DCFCE7"
            stroke="#22C55E"
            strokeWidth={1}
          />
          <text
            x={0}
            y={1}
            textAnchor="middle"
            fill="#15803D"
            fontSize={5}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            VALID
          </text>
          <text
            x={0}
            y={8}
            textAnchor="middle"
            fill="#15803D"
            fontSize={4}
            fontFamily="Space Grotesk, sans-serif"
          >
            SVID
          </text>
        </g>
      )}

      {/* Expiring warning seal */}
      {state === 'expiring' && (
        <g transform={`translate(${width / 2 - 24}, ${-height / 2 + 65})`}>
          <motion.circle
            cx={0}
            cy={0}
            r={18}
            fill="none"
            stroke={colors.warning}
            strokeWidth={2.5}
            strokeDasharray="6 3"
            animate={animate ? { rotate: -360 } : undefined}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <circle
            cx={0}
            cy={0}
            r={14}
            fill="#FEF9C3"
            stroke={colors.warning}
            strokeWidth={1}
          />
          <text
            x={0}
            y={1}
            textAnchor="middle"
            fill="#A16207"
            fontSize={5}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            EXPIRING
          </text>
          <text
            x={0}
            y={8}
            textAnchor="middle"
            fill="#A16207"
            fontSize={4}
            fontFamily="Space Grotesk, sans-serif"
          >
            SOON
          </text>
        </g>
      )}

      {/* Expired X overlay */}
      {state === 'expired' && (
        <g>
          <rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            rx={6}
            fill="rgba(0,0,0,0.2)"
          />
          <line
            x1={-width / 2 + 20}
            y1={-height / 2 + 30}
            x2={width / 2 - 20}
            y2={height / 2 - 20}
            stroke={colors.attacker}
            strokeWidth={5}
            strokeLinecap="round"
          />
          <line
            x1={width / 2 - 20}
            y1={-height / 2 + 30}
            x2={-width / 2 + 20}
            y2={height / 2 - 20}
            stroke={colors.attacker}
            strokeWidth={5}
            strokeLinecap="round"
          />
          {/* EXPIRED stamp */}
          <g transform="translate(0, 0) rotate(-15)">
            <rect
              x={-35}
              y={-12}
              width={70}
              height={24}
              rx={3}
              fill="none"
              stroke={colors.attacker}
              strokeWidth={3}
            />
            <text
              x={0}
              y={6}
              textAnchor="middle"
              fill={colors.attacker}
              fontSize={14}
              fontWeight="bold"
              fontFamily="Space Grotesk, sans-serif"
            >
              EXPIRED
            </text>
          </g>
        </g>
      )}
    </g>
  );
};
