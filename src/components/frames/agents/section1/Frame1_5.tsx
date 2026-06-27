import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-5: The Blast Radius
 * Visual: a confused/compromised agent holding the master key at the centre,
 * an expanding red blast wave striking every surrounding resource.
 */
export const Frame1_5: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  const targets = [
    { x: 180, y: 160, label: t('frame1_5.accounts', { defaultValue: 'Accounts' }) },
    { x: 620, y: 160, label: t('frame1_5.data', { defaultValue: 'Data' }) },
    { x: 180, y: 360, label: t('frame1_5.contacts', { defaultValue: 'Contacts' }) },
    { x: 620, y: 360, label: t('frame1_5.systems', { defaultValue: 'Systems' }) },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Expanding blast wave */}
        {phase >= 1 && !prefersReducedMotion && (
          <motion.circle
            cx={400}
            cy={260}
            r={40}
            fill="none"
            stroke={colors.attacker}
            strokeWidth={3}
            initial={{ opacity: 0.7, scale: 0.4 }}
            animate={{ opacity: [0.7, 0], scale: [0.4, 6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: '400px 260px' }}
          />
        )}
        {phase >= 1 && (
          <circle cx={400} cy={260} r={200} fill={`${colors.attacker}10`} stroke={colors.attacker} strokeWidth={1} strokeDasharray="6 6" opacity={0.5} />
        )}

        {/* Damaged resources */}
        {targets.map((tg, i) =>
          phase >= 1 ? (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <ToolResource label={tg.label} position={{ x: tg.x, y: tg.y }} size={62} locked={false} animate={false} />
              <g transform={`translate(${tg.x}, ${tg.y})`} stroke={colors.attacker} strokeWidth={4} strokeLinecap="round">
                <line x1={-18} y1={-18} x2={18} y2={18} />
                <line x1={18} y1={-18} x2={-18} y2={18} />
              </g>
            </motion.g>
          ) : null
        )}

        {/* Compromised agent with master key */}
        <AIAgent label={t('frame1_5.agent', { defaultValue: 'Compromised agent' })} position={{ x: 400, y: 250 }} size={84} active animate={!prefersReducedMotion} />
        <g transform="translate(430, 224)">
          <circle cx={-8} cy={0} r={7} fill="none" stroke={colors.warning} strokeWidth={3.5} />
          <rect x={-2} y={-2} width={20} height={4} fill={colors.warning} />
          <rect x={14} y={-2} width={3} height={7} fill={colors.warning} />
        </g>

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={472}
            textAnchor="middle"
            fill={colors.attacker}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame1_5.caption', { defaultValue: 'One mistake, effectively unlimited damage.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
