import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, Verifier, ToolResource } from '@/components/entities/agents';
import { Attacker } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-4: Scope Is The Defense
 * Visual: even when tricked, a narrow slip means the verifier rejects the
 * delete attempt — the attacker is blocked and the tool stays safe.
 */
export const Frame8_4: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Attacker trying to push a delete */}
        <Attacker position={{ x: 110, y: 230 }} label={t('frame8_4.attackerLabel', { defaultValue: 'Tries "delete"' })} blocked={phase >= 2} animate={animate} />

        {/* Narrow slip — read only */}
        <PermissionSlip
          position={{ x: 300, y: 250 }}
          size={140}
          state="valid"
          narrowed={true}
          onBehalfOf={t('frame8_4.onBehalfOf', { defaultValue: 'Alex (you)' })}
          actor={t('frame8_4.actor', { defaultValue: 'Agent' })}
          scopes={[t('frame8_4.scope', { defaultValue: 'Read records' })]}
          revokedScopes={[t('frame8_4.revoked', { defaultValue: 'Delete records' })]}
          audience="db-api"
          expiresIn={300}
          animate={animate}
        />

        {/* Verifier rejects the out-of-scope action */}
        {phase >= 1 && (
          <motion.g initial={animate ? { opacity: 0, scale: 0.7 } : { opacity: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <line x1={375} y1={250} x2={470} y2={250} stroke={colors.attacker} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
            <Verifier position={{ x: 540, y: 250 }} size={80} label={t('frame8_4.verifierLabel', { defaultValue: 'Out of scope' })} state="reject" animate={animate} />
          </motion.g>
        )}

        {/* Tool safe */}
        {phase >= 2 && (
          <motion.g initial={animate ? { opacity: 0, x: 20 } : { opacity: 1 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <ToolResource position={{ x: 710, y: 250 }} size={78} kind="DB" label={t('frame8_4.toolLabel', { defaultValue: 'Records (safe)' })} locked={true} animate={animate} />
          </motion.g>
        )}

        {/* Caption */}
        {phase >= 2 && (
          <motion.text
            x={400}
            y={460}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('frame8_4.caption', { defaultValue: 'It literally cannot do what it was never granted.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
