import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-1: Principal And Agent
 * Visual: the principal (owns the authority) and the agent (does the acting),
 * with a delegation link — "on behalf of" — drawn between them.
 */
export const Frame3_1: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Principal */}
        <Principal label={t('frame3_1.principal', { defaultValue: 'Principal' })} position={{ x: 200, y: 250 }} size={86} active animate={!prefersReducedMotion} />
        <g transform="translate(200, 350)">
          <rect x={-82} y={0} width={164} height={28} rx={6} fill={`${colors.principal}1A`} stroke={colors.principal} strokeWidth={1} />
          <text x={0} y={19} textAnchor="middle" fill={colors.principal} fontSize={12} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
            {t('frame3_1.owns', { defaultValue: 'owns the authority' })}
          </text>
        </g>

        {/* Agent */}
        {phase >= 1 && (
          <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <AIAgent label={t('frame3_1.agent', { defaultValue: 'Agent' })} position={{ x: 600, y: 250 }} size={84} active animate={!prefersReducedMotion} />
            <g transform="translate(600, 350)">
              <rect x={-70} y={0} width={140} height={28} rx={6} fill={`${colors.agentAI}1A`} stroke={colors.agentAI} strokeWidth={1} />
              <text x={0} y={19} textAnchor="middle" fill={colors.agentAI} fontSize={12} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
                {t('frame3_1.acts', { defaultValue: 'does the acting' })}
              </text>
            </g>
          </motion.g>
        )}

        {/* Delegation link */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <line x1={270} y1={240} x2={520} y2={240} stroke={colors.permissionSlip} strokeWidth={2.5} />
            <path d="M 520 240 l -12 -7 l 0 14 z" fill={colors.permissionSlip} />
            <g transform="translate(395, 222)">
              <rect x={-86} y={-18} width={172} height={28} rx={14} fill={colors.background} stroke={colors.permissionSlip} strokeWidth={1.25} />
              <text x={0} y={1} textAnchor="middle" fill={colors.permissionSlip} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {t('frame3_1.delegation', { defaultValue: 'delegation' })}
              </text>
            </g>
            <text x={400} y={440} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_1.caption', { defaultValue: 'The agent acts on behalf of the principal.' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
