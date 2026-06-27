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
      href: 'https://datatracker.ietf.org/wg/wimse/about/',
      color: colors.principal,
    },
    {
      title: t('frame9_4.mcpTitle', { defaultValue: 'MCP Authorization Spec' }),
      url: 'modelcontextprotocol.io',
      href: 'https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization',
      color: colors.toolResource,
    },
    {
      title: t('frame9_4.a2aTitle', { defaultValue: 'A2A — Agent-to-Agent' }),
      url: 'a2a-protocol.org',
      href: 'https://a2a-protocol.org/',
      color: colors.subAgent,
    },
    {
      title: t('frame9_4.spiffeTitle', { defaultValue: 'SPIFFE — Identity Foundation' }),
      url: 'spiffe.io',
      href: 'https://spiffe.io',
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

        {/* Callback to our SPIFFE module (distinct from the external spiffe.io card) */}
        <a href="/spiffe" target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }} className="group">
          <motion.g
            transform="translate(400, 76)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <rect x={-118} y={-12} width={236} height={24} rx={12} fill={`${colors.server}1A`} stroke={colors.server} strokeWidth={1} className="transition-opacity group-hover:opacity-80" />
            <text x={-6} y={4} textAnchor="middle" fill={colors.server} fontSize={12} fontFamily="IBM Plex Sans, sans-serif" className="group-hover:underline" style={{ textDecorationColor: colors.server }}>
              {t('frame9_4.spiffeCallback', { defaultValue: '↩ Revisit the SPIFFE module' })}
            </text>
            <g transform="translate(96, -4)" stroke={colors.server} strokeWidth={1} fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 1 h6 v6" />
              <path d="M9 1 L2 8" />
            </g>
          </motion.g>
        </a>

        {/* Resource cards — each links to its full https URL in a new tab */}
        {resources.map((r, i) => (
          phase >= i + 1 && (
            <a
              key={r.url}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ cursor: 'pointer' }}
              className="group"
            >
              <motion.g
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <rect x={180} y={102 + i * 72} width={440} height={58} rx={8} fill={colors.surface} stroke={r.color} strokeWidth={1.75} className="transition-all group-hover:brightness-125" />
                <rect x={180} y={102 + i * 72} width={6} height={58} rx={3} fill={r.color} />
                <text x={210} y={130 + i * 72} fill={colors.textPrimary} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                  {r.title}
                </text>
                <text x={210} y={150 + i * 72} fill={colors.textSecondary} fontSize={14} fontFamily="JetBrains Mono, monospace">
                  {r.url}
                </text>
                {/* External-link affordance at the card's right edge */}
                <g transform={`translate(592, ${122 + i * 72})`} stroke={r.color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-opacity opacity-60 group-hover:opacity-100">
                  <path d="M4 1 h7 v7" />
                  <path d="M11 1 L2 10" />
                </g>
              </motion.g>
            </a>
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
