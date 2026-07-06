import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, Verifier } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-2: Signed
 * Visual: A verifier inspects the slip's wax seal / signature and confirms it is
 * genuine — signed by an authority the verifier trusts, not forged or altered.
 */
export const Frame4_2: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 700]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* The slip */}
        <motion.g {...reveal(0)}>
          <PermissionSlip position={{ x: 280, y: 250 }} size={150} state="valid" animate={!prefersReducedMotion} />
        </motion.g>

        {/* Callout to the wax seal / signature */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <line x1={360} y1={318} x2={470} y2={360} stroke={colors.slipSeal} strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={360} cy={318} r={5} fill="none" stroke={colors.slipSeal} strokeWidth={2} />
            <rect x={470} y={342} width={250} height={56} rx={8} fill={`${colors.slipSeal}22`} stroke={colors.slipSeal} strokeWidth={1.5} />
            <text x={484} y={365} fill={colors.textPrimary} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_2.sealTitle', { defaultValue: 'Sealed by a trusted authority' })}
            </text>
            <text x={484} y={385} fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_2.sealSub', { defaultValue: 'Genuine, not forged or altered' })}
            </text>
          </motion.g>
        )}

        {/* Verifier confirms the signature */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <Verifier label={t('frame4_2.resourceLabel', { defaultValue: 'Resource' })} position={{ x: 600, y: 180 }} size={100} state="accept" animate={!prefersReducedMotion} />
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
