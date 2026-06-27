import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-5: Audience Binding
 * Visual: A downscoped slip is stamped for one service (orders-api). It works
 * there, but cannot be replayed at a service it was never meant for.
 */
export const Frame5_5: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, x: 12 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.45, delay } };

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a5-5-ok" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.success} />
          </marker>
          <marker id="a5-5-no" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.attacker} />
          </marker>
        </defs>

        {/* Slip stamped for orders-api */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <PermissionSlip position={{ x: 210, y: 250 }} size={138} state="valid" narrowed audience="orders-api" scopes={[t('frame5_5.scopePlaceOrder', { defaultValue: 'Place order' })]} animate={!prefersReducedMotion} />
        </motion.g>

        {/* Correct destination */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <line x1={290} y1={210} x2={520} y2={155} stroke={colors.success} strokeWidth={2.5} markerEnd="url(#a5-5-ok)" />
            <ToolResource label="orders-api" position={{ x: 600, y: 150 }} size={86} kind="API" locked={false} animate={!prefersReducedMotion} />
            <text x={600} y={228} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_5.stamped', { defaultValue: 'Stamped destination → works' })}
            </text>
          </motion.g>
        )}

        {/* Replay blocked */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <line x1={290} y1={300} x2={520} y2={355} stroke={colors.attacker} strokeWidth={2.5} strokeDasharray="7 5" markerEnd="url(#a5-5-no)" />
            <ToolResource label="payments-api" position={{ x: 600, y: 360 }} size={86} kind="API" locked animate={!prefersReducedMotion} />
            <text x={600} y={438} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame5_5.replay', { defaultValue: 'Replay elsewhere → blocked' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
