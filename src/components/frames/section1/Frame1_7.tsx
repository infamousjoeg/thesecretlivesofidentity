import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-7: It Gets Worse
 * Visual: Pile of secrets/credentials growing, operational burden
 */
export const Frame1_7: React.FC = () => {
  const { phase } = useAnimationPhase([0, 300, 300, 300, 300, 300, 600]);
  const prefersReducedMotion = useReducedMotion();

  const secrets = [
    { label: 'API_KEY_PROD', days: 180 },
    { label: 'DB_PASSWORD', days: 365 },
    { label: 'JWT_SECRET', days: 90 },
    { label: 'OAUTH_CLIENT', days: 730 },
    { label: 'SSH_KEY', days: 1095 },
    { label: 'TLS_CERT', days: 30 },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <text
          x={400}
          y={50}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={20}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
        >
          Every Secret is a Liability
        </text>

        {/* Secrets stacking up */}
        {secrets.map((secret, index) => (
          phase >= index + 1 && (
            <motion.g
              key={secret.label}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <rect
                x={200}
                y={80 + index * 55}
                width={400}
                height={45}
                rx={6}
                fill={colors.surface}
                stroke={secret.days > 365 ? colors.attacker : secret.days > 90 ? colors.warning : colors.textMuted}
                strokeWidth={secret.days > 365 ? 2 : 1}
              />

              {/* Key icon */}
              <text x={220} y={110 + index * 55} fontSize={18}>
                🔑
              </text>

              {/* Secret name */}
              <text
                x={250}
                y={108 + index * 55}
                fill={colors.textPrimary}
                fontSize={12}
                fontFamily="JetBrains Mono, monospace"
              >
                {secret.label}
              </text>

              {/* Age indicator */}
              <text
                x={550}
                y={108 + index * 55}
                textAnchor="end"
                fill={secret.days > 365 ? colors.attacker : secret.days > 90 ? colors.warning : colors.textMuted}
                fontSize={11}
                fontFamily="IBM Plex Sans, sans-serif"
              >
                {secret.days} days old
              </text>

              {/* Warning icon for old secrets */}
              {secret.days > 365 && (
                <text x={560} y={108 + index * 55} fontSize={14}>
                  ⚠️
                </text>
              )}
            </motion.g>
          )
        ))}

        {/* Burden indicator */}
        {phase >= 6 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={420} width={400} height={60} rx={8} fill={`${colors.warning}15`} stroke={colors.warning} strokeWidth={1} />
            <text x={400} y={448} textAnchor="middle" fill={colors.warning} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              Each secret requires: storage • access control • rotation • auditing
            </text>
            <text x={400} y={468} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Multiply by hundreds of services...
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
