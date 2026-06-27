import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, SubAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-4: On Whose Behalf, Still
 * Visual: However many hops occur, the subject stays the same principal. The
 * chain shows the path; the principal remains accountable for the authority.
 */
export const Frame6_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 550, 550, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  const hops = [
    { from: 165, to: 270, label: 'frame6_4.actorA', def: 'actor: A' },
    { from: 380, to: 480, label: 'frame6_4.actorB', def: 'actor: B' },
    { from: 590, to: 645, label: 'frame6_4.actorC', def: 'actor: C' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a6-4-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.textMuted} />
          </marker>
        </defs>

        {/* Multi-hop chain */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Principal label={t('frame6_4.principalLabel', { defaultValue: 'Principal' })} position={{ x: 115, y: 130 }} active animate={!prefersReducedMotion} />
          <AIAgent label={t('frame6_4.agentALabel', { defaultValue: 'Agent A' })} position={{ x: 325, y: 130 }} active animate={!prefersReducedMotion} />
          <AIAgent label={t('frame6_4.agentBLabel', { defaultValue: 'Agent B' })} position={{ x: 535, y: 130 }} active animate={!prefersReducedMotion} />
          <SubAgent label={t('frame6_4.agentCLabel', { defaultValue: 'Agent C' })} position={{ x: 700, y: 140 }} active animate={!prefersReducedMotion} />
        </motion.g>

        {phase >= 1 &&
          hops.map((h, i) => (
            <motion.g key={i} {...reveal(i * 0.08)}>
              <line x1={h.from} y1={130} x2={h.to} y2={130} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#a6-4-arrow)" />
              <text x={(h.from + h.to) / 2} y={114} textAnchor="middle" fill={colors.agentAI} fontSize={9} fontFamily="JetBrains Mono, monospace">
                {t(h.label, { defaultValue: h.def })}
              </text>
            </motion.g>
          ))}

        {/* Constant subject bar */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <rect x={120} y={285} width={560} height={64} rx={12} fill={`${colors.principal}1A`} stroke={colors.principal} strokeWidth={1.75} />
            <Principal label="" position={{ x: 168, y: 317 }} size={44} active animate={false} />
            <text x={206} y={312} fill={colors.textSecondary} fontSize={10} fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
              {t('frame6_4.subjectLabel', { defaultValue: 'SUBJECT (unchanged)' })}
            </text>
            <text x={206} y={332} fill={colors.principal} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame6_4.subjectValue', { defaultValue: 'On behalf of the same principal — every hop' })}
            </text>
          </motion.g>
        )}

        {/* Caption */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={400}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize={14}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
            {...reveal(0)}
          >
            {t('frame6_4.caption', { defaultValue: 'The chain shows the path; the principal stays accountable' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
