import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Badge, PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-4: Identity Before Authority
 * Visual: an ordered two-step — first identity ("who are you?" = a badge), then
 * authority ("what may you do?" = a permission slip). Identity must come first.
 */
export const Frame2_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 800]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Step 1 — Identity */}
        <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <g transform="translate(225, 100)">
            <circle cx={0} cy={0} r={16} fill={colors.svid} />
            <text x={0} y={5} textAnchor="middle" fill={colors.background} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">1</text>
          </g>
          <Badge position={{ x: 225, y: 235 }} size={116} spiffeId="spiffe://acme/agent" expiresIn={3600} animate={!prefersReducedMotion} />
          <text x={225} y={350} textAnchor="middle" fill={colors.svid} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame2_4.identity', { defaultValue: 'Identity' })}
          </text>
          <text x={225} y={372} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame2_4.whoAreYou', { defaultValue: 'Who are you?' })}
          </text>
        </motion.g>

        {/* Ordered arrow */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <line x1={335} y1={230} x2={455} y2={230} stroke={colors.permissionSlip} strokeWidth={2.5} />
            <path d="M 455 230 l -12 -7 l 0 14 z" fill={colors.permissionSlip} />
            <text x={395} y={215} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_4.then', { defaultValue: 'then' })}
            </text>
          </motion.g>
        )}

        {/* Step 2 — Authority */}
        {phase >= 1 && (
          <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <g transform="translate(575, 100)">
              <circle cx={0} cy={0} r={16} fill={colors.permissionSlip} />
              <text x={0} y={5} textAnchor="middle" fill={colors.background} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">2</text>
            </g>
            <PermissionSlip position={{ x: 575, y: 230 }} size={116} animate={!prefersReducedMotion} />
            <text x={575} y={350} textAnchor="middle" fill={colors.permissionSlip} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_4.authority', { defaultValue: 'Authority' })}
            </text>
            <text x={575} y={372} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_4.whatMayYouDo', { defaultValue: 'What may you do?' })}
            </text>
          </motion.g>
        )}

        {phase >= 1 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            x={400}
            y={420}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
          >
            {t('frame2_4.caption', { defaultValue: 'You cannot delegate to something you cannot even name.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
