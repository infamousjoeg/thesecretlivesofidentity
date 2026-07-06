import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 9-3: Why It Matters
 * Visual: a master key has a huge blast radius; a scoped slip keeps the blast
 * radius small. Delegation done right keeps you accountable.
 */
export const Frame9_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Divider */}
        <line x1={400} y1={90} x2={400} y2={410} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4 6" opacity={0.4} />

        {/* LEFT — master key, large blast radius */}
        <text x={200} y={80} textAnchor="middle" fill={colors.attacker} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
          {t('frame9_3.masterKeyTitle', { defaultValue: 'Master key' })}
        </text>
        {phase >= 1 && (
          <motion.circle
            cx={200} cy={250} r={150}
            fill={colors.attacker} opacity={0.12}
            stroke={colors.attacker} strokeWidth={2} strokeDasharray="6 6"
            initial={animate ? { scale: 0.4, opacity: 0 } : { opacity: 0.12 }}
            animate={{ scale: 1, opacity: 0.12 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: '200px 250px' }}
          />
        )}
        <text x={200} y={420} textAnchor="middle" fill={colors.attacker} fontSize={13} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
          {t('frame9_3.largeBlast', { defaultValue: 'Large blast radius' })}
        </text>
        <text x={200} y={250} textAnchor="middle" fontSize={40} opacity={0.6}>🔑</text>

        {/* RIGHT — scoped slip, tiny blast radius, contained agent */}
        <text x={600} y={80} textAnchor="middle" fill={colors.success} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
          {t('frame9_3.scopedTitle', { defaultValue: 'Scoped slip' })}
        </text>
        {phase >= 2 && (
          <motion.circle
            cx={600} cy={250} r={70}
            fill={colors.success} opacity={0.14}
            stroke={colors.success} strokeWidth={2} strokeDasharray="6 6"
            initial={animate ? { scale: 0.4, opacity: 0 } : { opacity: 0.14 }}
            animate={{ scale: 1, opacity: 0.14 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: '600px 250px' }}
          />
        )}
        <AIAgent position={{ x: 600, y: 250 }} label="" active={phase >= 2} animate={animate} />
        <text x={600} y={420} textAnchor="middle" fill={colors.success} fontSize={13} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
          {t('frame9_3.smallBlast', { defaultValue: 'Small, contained blast radius' })}
        </text>

        {/* Caption */}
        {phase >= 2 && (
          <motion.text
            x={400}
            y={470}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('frame9_3.caption', { defaultValue: 'Just enough power to help, and you stay accountable.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
