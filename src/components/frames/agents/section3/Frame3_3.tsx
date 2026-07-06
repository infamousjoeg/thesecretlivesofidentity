import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, AIAgent, PermissionSlip, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-3: Acting On Behalf Of
 * Visual: the agent does something the principal is allowed to do — presenting a
 * slip at a resource — while everyone can still see it is the agent doing it.
 */
export const Frame3_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Principal stands behind, the source of authority */}
        <Principal label={t('frame3_3.principal', { defaultValue: 'Principal' })} position={{ x: 130, y: 250 }} size={66} active animate={!prefersReducedMotion} />
        <text x={130} y={330} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
          {t('frame3_3.allows', { defaultValue: 'allows the action' })}
        </text>

        {/* Agent doing the acting, visibly */}
        <AIAgent label={t('frame3_3.agent', { defaultValue: 'Agent' })} position={{ x: 350, y: 250 }} size={80} active animate={!prefersReducedMotion} />

        {/* Slip presented */}
        {phase >= 1 && (
          <motion.g initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <PermissionSlip
              position={{ x: 500, y: 245 }}
              size={110}
              onBehalfOf={t('frame3_3.onBehalfOf', { defaultValue: 'Principal' })}
              actor={t('frame3_3.actor', { defaultValue: 'Agent' })}
              scopes={[t('frame3_3.scope', { defaultValue: 'Read calendar' })]}
              audience="calendar-api"
              expiresIn={300}
              animate={!prefersReducedMotion}
            />
          </motion.g>
        )}

        {/* Resource */}
        {phase >= 1 && (
          <ToolResource label={t('frame3_3.resource', { defaultValue: 'Calendar' })} position={{ x: 680, y: 245 }} size={78} locked={phase < 2} animate={!prefersReducedMotion} />
        )}

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={445}
            textAnchor="middle"
            fill={colors.agentAI}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame3_3.caption', { defaultValue: 'With permission — and everyone sees it was the agent.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
