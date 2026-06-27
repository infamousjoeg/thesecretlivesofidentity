import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, PermissionSlip, Verifier, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-3: How Confusion Happens
 * Visual: a broad slip lets the verifier wave through the malicious "delete"
 * action — damage follows. A narrow slip (inset) would simply have refused.
 */
export const Frame8_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Bad instruction tag */}
        <motion.g initial={animate ? { opacity: 0 } : { opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <rect x={40} y={70} width={300} height={34} rx={8} fill={colors.surface} stroke={colors.attacker} strokeWidth={1.5} />
          <text x={190} y={92} textAnchor="middle" fill={colors.attacker} fontSize={13} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
            {t('frame8_3.badInput', { defaultValue: 'Malicious input: "also delete the records"' })}
          </text>
        </motion.g>

        {/* Agent */}
        <AIAgent position={{ x: 110, y: 250 }} label={t('frame8_3.agentLabel', { defaultValue: 'Agent' })} active={true} animate={animate} />

        {/* Broad slip */}
        <PermissionSlip
          position={{ x: 290, y: 250 }}
          size={140}
          state="valid"
          onBehalfOf={t('frame8_3.onBehalfOf', { defaultValue: 'Alex (you)' })}
          actor={t('frame8_3.actor', { defaultValue: 'Agent' })}
          scopes={[
            t('frame8_3.scope1', { defaultValue: 'Read records' }),
            t('frame8_3.scope2', { defaultValue: 'Delete records' }),
          ]}
          audience="db-api"
          expiresIn={300}
          animate={animate}
        />

        {/* Verifier accepts because the broad slip allows delete */}
        {phase >= 1 && (
          <motion.g initial={animate ? { opacity: 0, scale: 0.7 } : { opacity: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <line x1={365} y1={250} x2={470} y2={250} stroke={colors.attacker} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
            <Verifier position={{ x: 530, y: 250 }} size={78} label={t('frame8_3.verifierLabel', { defaultValue: 'Allows it' })} state="accept" animate={animate} />
          </motion.g>
        )}

        {/* Damaged tool */}
        {phase >= 2 && (
          <motion.g initial={animate ? { opacity: 0, x: 20 } : { opacity: 1 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <ToolResource position={{ x: 700, y: 250 }} size={78} kind="DB" label={t('frame8_3.toolLabel', { defaultValue: 'Records' })} locked={false} animate={animate} />
            <text x={700} y={330} textAnchor="middle" fill={colors.attacker} fontSize={26}>⚠️</text>
          </motion.g>
        )}

        {/* Contrast note */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={465}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={15}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t('frame8_3.caption', { defaultValue: 'A properly narrow slip would simply have refused.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
