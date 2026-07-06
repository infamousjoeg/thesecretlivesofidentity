import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-8: Where The Metaphor Ends
 * Visual: The paper slip is really a cryptographic token, issued and checked by
 * machines in milliseconds. The slip is a model, but its properties are real.
 */
export const Frame4_8: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 500]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, x: 14 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.45, delay } };

  const tokenLines = ['eyJhbGciOiJFUzI1NiIs', 'InR5cCI6IkpXVCJ9.eyJz', 'dWIiOiJhbGV4Iiwic2Nv', 'cGUiOiJjYWwucmVhZCJ9'];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a4-8-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.textSecondary} />
          </marker>
        </defs>

        {/* The metaphor: paper slip */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <PermissionSlip position={{ x: 200, y: 250 }} size={140} state="valid" animate={!prefersReducedMotion} />
          <text x={200} y={400} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame4_8.model', { defaultValue: 'The model' })}
          </text>
        </motion.g>

        {/* Bridge arrow */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <line x1={300} y1={245} x2={430} y2={245} stroke={colors.textSecondary} strokeWidth={2.5} markerEnd="url(#a4-8-arrow)" />
            <text x={365} y={232} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontStyle="italic" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_8.inReality', { defaultValue: 'in reality' })}
            </text>
          </motion.g>
        )}

        {/* The reality: cryptographic token */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <rect x={470} y={165} width={250} height={170} rx={10} fill={colors.surface} stroke={colors.permissionSlip} strokeWidth={1.5} />
            <rect x={470} y={165} width={250} height={30} rx={10} fill={colors.permissionSlip} />
            <rect x={470} y={180} width={250} height={15} fill={colors.permissionSlip} />
            <text x={486} y={186} fill="#3F3522" fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" letterSpacing="0.5">
              {t('frame4_8.tokenTitle', { defaultValue: 'ACCESS TOKEN' })}
            </text>
            {tokenLines.map((ln, i) => (
              <text key={i} x={488} y={224 + i * 20} fill={colors.agentAI} fontSize={12} fontFamily="JetBrains Mono, monospace">
                {ln}
              </text>
            ))}
            <rect x={488} y={302} width={214} height={22} rx={5} fill={`${colors.success}1A`} stroke={colors.success} strokeWidth={1} />
            <text x={595} y={317} textAnchor="middle" fill={colors.success} fontSize={11} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_8.ms', { defaultValue: '⚡ issued & checked in milliseconds' })}
            </text>
            <text x={595} y={400} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_8.real', { defaultValue: 'Same properties: signed, scoped, short-lived' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
