import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 9-4: Get Started
 * Visual: next-step resources — WIMSE, the MCP authorization spec, A2A, and
 * SPIFFE — and a closing call to build agents that carry slips, not master keys.
 */
export const Frame9_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 350, 350, 350, 350, 500]);

  const resources = [
    {
      title: t('frame9_4.wimseTitle', { defaultValue: 'WIMSE — Workload Identity' }),
      url: 'datatracker.ietf.org/wg/wimse',
      color: colors.principal,
    },
    {
      title: t('frame9_4.mcpTitle', { defaultValue: 'MCP Authorization Spec' }),
      url: 'modelcontextprotocol.io',
      color: colors.toolResource,
    },
    {
      title: t('frame9_4.a2aTitle', { defaultValue: 'A2A — Agent-to-Agent' }),
      url: 'a2a-protocol.org',
      color: colors.subAgent,
    },
    {
      title: t('frame9_4.spiffeTitle', { defaultValue: 'SPIFFE — Identity Foundation' }),
      url: 'spiffe.io',
      color: colors.server,
    },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={56}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={28}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('frame9_4.title', { defaultValue: 'Get Started' })}
        </motion.text>

        {/* Resource cards */}
        {resources.map((r, i) => (
          phase >= i + 1 && (
            <motion.g
              key={r.url}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect x={180} y={90 + i * 72} width={440} height={58} rx={8} fill={colors.surface} stroke={r.color} strokeWidth={1.75} />
              <rect x={180} y={90 + i * 72} width={6} height={58} rx={3} fill={r.color} />
              <text x={210} y={118 + i * 72} fill={colors.textPrimary} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {r.title}
              </text>
              <text x={210} y={138 + i * 72} fill={colors.textSecondary} fontSize={14} fontFamily="JetBrains Mono, monospace">
                {r.url}
              </text>
            </motion.g>
          )
        ))}

        {/* Closing message */}
        {phase >= 5 && (
          <motion.g
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={415} textAnchor="middle" fill={colors.permissionSlip} fontSize={17} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame9_4.closing', { defaultValue: 'Build agents that carry slips, not master keys.' })}
            </text>
            <text x={400} y={445} textAnchor="middle" fontSize={26}>🎟️</text>
            <text x={400} y={478} textAnchor="middle" fill={colors.success} fontSize={13} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame9_4.thanks', { defaultValue: 'Thanks for learning with us! ✨' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
