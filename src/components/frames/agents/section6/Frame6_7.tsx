import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-7: Accountability By Design
 * Visual: Delegation chains turn "some agent did something" into a precise,
 * named, time-stamped account — that clarity is the entire point.
 */
export const Frame6_7: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 650, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a6-7-arrow" markerWidth="10" markerHeight="10" refX="6" refY="4" orient="auto">
            <path d="M0,0 L0,8 L9,4 z" fill={colors.success} />
          </marker>
        </defs>

        {/* Before — vague */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <rect x={150} y={75} width={500} height={80} rx={14} fill={`${colors.attacker}0D`} stroke={colors.attacker} strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={400} y={108} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
            {t('frame6_7.beforeLabel', { defaultValue: 'WITHOUT DELEGATION' })}
          </text>
          <text x={400} y={134} textAnchor="middle" fill={colors.attacker} fontSize={17} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame6_7.before', { defaultValue: '“Some agent did something.”' })}
          </text>
        </motion.g>

        {/* Transform arrow */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <line x1={400} y1={170} x2={400} y2={250} stroke={colors.success} strokeWidth={3} markerEnd="url(#a6-7-arrow)" />
            <text x={418} y={218} fill={colors.success} fontSize={12} fontStyle="italic" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame6_7.with', { defaultValue: 'with delegation chains' })}
            </text>
          </motion.g>
        )}

        {/* After — precise */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <rect x={90} y={270} width={620} height={150} rx={16} fill={`${colors.success}12`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={304} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.5">
              {t('frame6_7.afterLabel', { defaultValue: 'ACCOUNTABILITY BY DESIGN' })}
            </text>
            <text x={400} y={342} textAnchor="middle" fill={colors.textPrimary} fontSize={19} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame6_7.after1', { defaultValue: 'Agent B, acting for you through Agent A,' })}
            </text>
            <text x={400} y={372} textAnchor="middle" fill={colors.textPrimary} fontSize={19} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame6_7.after2', { defaultValue: 'read your calendar at 2:00 PM.' })}
            </text>
            <text x={400} y={402} textAnchor="middle" fill={colors.success} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame6_7.point', { defaultValue: 'Named · scoped · time-stamped' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
