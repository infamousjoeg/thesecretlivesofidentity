import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-2: Start Narrow
 * Visual: The wrong path (start broad, trim later) leaves extra authority lying
 * around; the right path begins with exactly the scope the task requires.
 */
export const Frame5_2: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Wrong approach panel */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <rect x={40} y={70} width={330} height={380} rx={14} fill={`${colors.attacker}0D`} stroke={colors.attacker} strokeWidth={1.5} />
            <text x={205} y={104} textAnchor="middle" fill={colors.attacker} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame5_2.wrong', { defaultValue: 'Start broad, trim later' })}
            </text>
            <PermissionSlip
              position={{ x: 205, y: 270 }}
              size={140}
              state="valid"
              scopes={['Read calendar', 'Send email', 'Delete events']}
              animate={false}
            />
            <text x={205} y={420} textAnchor="middle" fill={colors.attacker} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_2.wrongSub', { defaultValue: 'Extra authority lying around' })}
            </text>
          </motion.g>
        )}

        {/* Right approach panel */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <rect x={430} y={70} width={330} height={380} rx={14} fill={`${colors.success}0D`} stroke={colors.success} strokeWidth={1.5} />
            <text x={595} y={104} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame5_2.right', { defaultValue: 'Start narrow' })}
            </text>
            <PermissionSlip
              position={{ x: 595, y: 270 }}
              size={140}
              state="valid"
              scopes={['Read calendar']}
              animate={!prefersReducedMotion}
            />
            <text x={595} y={420} textAnchor="middle" fill={colors.success} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_2.rightSub', { defaultValue: 'Exactly what the task requires' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
