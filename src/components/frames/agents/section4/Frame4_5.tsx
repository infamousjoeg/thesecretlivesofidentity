import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-5: Bound To A Purpose
 * Visual: The slip is stamped for one audience (calendar-api). It opens the
 * calendar service, but simply does not work at the bank.
 */
export const Frame4_5: React.FC = () => {
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
          <marker id="a4-5-ok" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.success} />
          </marker>
          <marker id="a4-5-no" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.attacker} />
          </marker>
        </defs>

        {/* Slip bound to calendar-api */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <PermissionSlip position={{ x: 220, y: 250 }} size={140} state="valid" audience="calendar-api" animate={!prefersReducedMotion} />
        </motion.g>

        {/* Calendar service — accepts */}
        {phase >= 1 && (
          <motion.g {...reveal(0)}>
            <line x1={300} y1={210} x2={520} y2={155} stroke={colors.success} strokeWidth={2.5} markerEnd="url(#a4-5-ok)" />
            <ToolResource label={t('frame4_5.calendarLabel', { defaultValue: 'Calendar service' })} position={{ x: 600, y: 150 }} size={86} kind="API" locked={false} animate={!prefersReducedMotion} />
            <text x={600} y={228} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_5.opens', { defaultValue: 'Audience matches → opens' })}
            </text>
          </motion.g>
        )}

        {/* Bank — rejects */}
        {phase >= 2 && (
          <motion.g {...reveal(0)}>
            <line x1={300} y1={300} x2={520} y2={355} stroke={colors.attacker} strokeWidth={2.5} strokeDasharray="7 5" markerEnd="url(#a4-5-no)" />
            <ToolResource label={t('frame4_5.bankLabel', { defaultValue: 'Bank service' })} position={{ x: 600, y: 360 }} size={86} kind="API" locked animate={!prefersReducedMotion} />
            <text x={600} y={438} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_5.refuses', { defaultValue: 'Wrong audience → refused' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
