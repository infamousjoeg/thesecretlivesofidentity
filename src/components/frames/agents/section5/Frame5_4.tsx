import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-4: Token Exchange
 * Visual: A broad slip is traded at an exchange for a narrower one scoped to a
 * single downstream task. The original authority stays behind; only a slice goes on.
 */
export const Frame5_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 500, 500, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, x: 14 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a5-4-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.permissionSlip} />
          </marker>
        </defs>

        {/* Broad slip going in */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <PermissionSlip position={{ x: 150, y: 250 }} size={118} state="valid" scopes={['Read calendar', 'Send invite']} animate={false} />
          <text x={150} y={385} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame5_4.broad', { defaultValue: 'Broad slip' })}
          </text>
        </motion.g>

        {/* Exchange */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <line x1={215} y1={245} x2={318} y2={245} stroke={colors.permissionSlip} strokeWidth={2.5} markerEnd="url(#a5-4-arrow)" />
            <rect x={330} y={185} width={140} height={120} rx={12} fill={colors.surface} stroke={colors.permissionSlip} strokeWidth={1.5} />
            <text x={400} y={212} textAnchor="middle" fill={colors.permissionSlip} fontSize={11} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" letterSpacing="0.5">
              {t('frame5_4.exchange', { defaultValue: 'TOKEN EXCHANGE' })}
            </text>
            <text x={400} y={262} textAnchor="middle" fill={colors.permissionSlip} fontSize={34} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              ⇄
            </text>
            <text x={400} y={292} textAnchor="middle" fill={colors.textSecondary} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_4.downscope', { defaultValue: 'down-scope' })}
            </text>
          </motion.g>
        )}

        {/* Narrow slip coming out */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <line x1={482} y1={245} x2={575} y2={245} stroke={colors.permissionSlip} strokeWidth={2.5} markerEnd="url(#a5-4-arrow)" />
            <PermissionSlip position={{ x: 660, y: 250 }} size={108} state="valid" narrowed scopes={['Read calendar']} revokedScopes={['Send invite']} animate={!prefersReducedMotion} />
            <text x={660} y={375} textAnchor="middle" fill={colors.permissionSlip} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_4.narrow', { defaultValue: 'Narrow slip for one task' })}
            </text>
          </motion.g>
        )}

        {/* Original stays behind */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={345}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={11}
            fontStyle="italic"
            fontFamily="IBM Plex Sans, sans-serif"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {t('frame5_4.staysBehind', { defaultValue: 'Original authority stays behind' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
