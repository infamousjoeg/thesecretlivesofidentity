import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-2: The Tempting Shortcut
 * Visual: the principal simply hands the agent the MASTER KEY. It "works" on the
 * first try (green tick) — but a warning hints this is the start of trouble.
 */
export const Frame1_2: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 800, 800]);
  const prefersReducedMotion = useReducedMotion();

  const keyX = phase >= 1 ? 470 : 250;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <Principal
          label={t('frame1_2.principal', { defaultValue: 'You' })}
          position={{ x: 180, y: 240 }}
          size={80}
          active
          animate={!prefersReducedMotion}
        />
        <AIAgent
          label={t('frame1_2.agent', { defaultValue: 'AI Agent' })}
          position={{ x: 600, y: 240 }}
          size={88}
          active={phase >= 2}
          animate={!prefersReducedMotion}
        />

        {/* Master key handed across */}
        <motion.g
          initial={false}
          animate={{ x: keyX, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: 'easeInOut' }}
        >
          <g transform="translate(0, 235)">
            <circle cx={-16} cy={0} r={11} fill="none" stroke={colors.warning} strokeWidth={5} />
            <rect x={-7} y={-3} width={32} height={6} rx={1} fill={colors.warning} />
            <rect x={21} y={-3} width={4} height={11} fill={colors.warning} />
            <rect x={13} y={-3} width={4} height={9} fill={colors.warning} />
            <text x={4} y={26} textAnchor="middle" fill={colors.warning} fontSize={11} fontWeight="bold" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">
              {t('frame1_2.masterKey', { defaultValue: 'MASTER KEY' })}
            </text>
          </g>
        </motion.g>

        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* it "works" */}
            <g transform="translate(600, 150)">
              <circle cx={0} cy={0} r={14} fill={`${colors.success}22`} stroke={colors.success} strokeWidth={2} />
              <path d="M -5 0 l 3.5 4 l 6.5 -8" fill="none" stroke={colors.success} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text x={600} y={195} textAnchor="middle" fill={colors.success} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame1_2.works', { defaultValue: 'It works on the first try.' })}
            </text>

            {/* …but */}
            <text x={400} y={425} textAnchor="middle" fill={colors.warning} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame1_2.warning', { defaultValue: '…and the start of every horror story.' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
