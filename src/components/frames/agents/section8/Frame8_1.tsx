import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-1: When Slips Are Too Broad
 * Visual: an over-broad "do anything" slip (red, risky) next to a narrow slip
 * (safe). The broad one turns a small bug into a large breach.
 */
export const Frame8_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Over-broad slip (left) */}
        <g>
          <PermissionSlip
            position={{ x: 220, y: 250 }}
            size={150}
            state="valid"
            onBehalfOf={t('frame8_1.broadOnBehalf', { defaultValue: 'Alex (you)' })}
            actor={t('frame8_1.broadActor', { defaultValue: 'Agent' })}
            scopes={[
              t('frame8_1.broadScope1', { defaultValue: 'Read everything' }),
              t('frame8_1.broadScope2', { defaultValue: 'Delete records' }),
              t('frame8_1.broadScope3', { defaultValue: 'Send as you' }),
            ]}
            audience="*"
            expiresIn={300}
            animate={animate}
          />
          {/* Danger overlay */}
          {phase >= 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <rect x={140} y={90} width={160} height={30} rx={6} fill={colors.attacker} opacity={0.9} />
              <text x={220} y={110} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {t('frame8_1.tooBroad', { defaultValue: 'TOO BROAD' })}
              </text>
            </motion.g>
          )}
        </g>

        {/* Narrow slip (right) */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <PermissionSlip
              position={{ x: 580, y: 250 }}
              size={150}
              state="valid"
              narrowed={true}
              onBehalfOf={t('frame8_1.narrowOnBehalf', { defaultValue: 'Alex (you)' })}
              actor={t('frame8_1.narrowActor', { defaultValue: 'Agent' })}
              scopes={[t('frame8_1.narrowScope', { defaultValue: 'Read one file' })]}
              audience="files-api"
              expiresIn={300}
              animate={animate}
            />
            <rect x={500} y={90} width={160} height={30} rx={6} fill={colors.success} opacity={0.9} />
            <text x={580} y={110} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame8_1.justEnough', { defaultValue: 'JUST ENOUGH' })}
            </text>
          </motion.g>
        )}

        {/* Caption */}
        {phase >= 2 && (
          <motion.text
            x={400}
            y={465}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('frame8_1.caption', { defaultValue: 'A broad slip turns a small bug into a large breach.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
