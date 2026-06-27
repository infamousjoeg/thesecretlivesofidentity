import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Badge, PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-6: Two Questions, Two Answers
 * Visual: a split panel. Left = "Who is the agent?" → Identity (badge). Right =
 * "On whose behalf?" → Delegation (slip). Next chapter tackles the right side.
 */
export const Frame2_6: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 800]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Divider */}
        <line x1={400} y1={90} x2={400} y2={420} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="6 6" opacity={0.5} />

        {/* LEFT — Identity */}
        <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <text x={200} y={120} textAnchor="middle" fill={colors.textPrimary} fontSize={17} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame2_6.q1', { defaultValue: 'Who is the agent?' })}
          </text>
          <Badge position={{ x: 200, y: 265 }} size={110} spiffeId="spiffe://acme/agent" expiresIn={3600} animate={!prefersReducedMotion} />
          <g transform="translate(200, 380)">
            <rect x={-70} y={0} width={140} height={30} rx={15} fill={`${colors.svid}1A`} stroke={colors.svid} strokeWidth={1.25} />
            <text x={0} y={20} textAnchor="middle" fill={colors.svid} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_6.identity', { defaultValue: 'Identity' })}
            </text>
          </g>
        </motion.g>

        {/* RIGHT — Delegation */}
        {phase >= 1 && (
          <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <text x={600} y={120} textAnchor="middle" fill={colors.textPrimary} fontSize={17} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_6.q2', { defaultValue: 'On whose behalf?' })}
            </text>
            <PermissionSlip position={{ x: 600, y: 260 }} size={130} animate={!prefersReducedMotion} />
            <g transform="translate(600, 380)">
              <rect x={-78} y={0} width={156} height={30} rx={15} fill={`${colors.permissionSlip}1A`} stroke={colors.permissionSlip} strokeWidth={1.25} />
              <text x={0} y={20} textAnchor="middle" fill={colors.permissionSlip} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {t('frame2_6.delegation', { defaultValue: 'Delegation' })}
              </text>
            </g>
            <text x={600} y={448} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontStyle="italic" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_6.next', { defaultValue: 'Next: we tackle this one →' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
