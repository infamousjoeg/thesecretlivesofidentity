import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

interface Callout {
  key: string;
  def: string;
  side: 'left' | 'right';
  x: number;
  y: number;
  anchorX: number;
  anchorY: number;
}

/**
 * Frame 4-6: What Is Inside
 * Visual: The slip annotated with its five fields — subject, actor, scope,
 * audience and expiry: everything a slip carries, in one picture.
 */
export const Frame4_6: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 450, 450, 450, 450, 450]);
  const prefersReducedMotion = useReducedMotion();

  const callouts: Callout[] = [
    { key: 'frame4_6.subject', def: 'Subject: on whose behalf', side: 'left', x: 40, y: 150, anchorX: 318, anchorY: 168 },
    { key: 'frame4_6.actor', def: 'Actor: who is acting', side: 'left', x: 40, y: 220, anchorX: 318, anchorY: 205 },
    { key: 'frame4_6.expiry', def: 'Expiry: until when', side: 'left', x: 40, y: 360, anchorX: 318, anchorY: 352 },
    { key: 'frame4_6.scope', def: 'Scope: what is allowed', side: 'right', x: 560, y: 165, anchorX: 482, anchorY: 250 },
    { key: 'frame4_6.audience', def: 'Audience: where', side: 'right', x: 560, y: 320, anchorX: 482, anchorY: 318 },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Annotated slip */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <PermissionSlip position={{ x: 400, y: 250 }} size={168} state="valid" animate={!prefersReducedMotion} />
        </motion.g>

        {callouts.map((c, i) =>
          phase >= i + 1 ? (
            <motion.g
              key={c.key}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <line x1={c.side === 'left' ? c.x + 200 : c.x} y1={c.y + 16} x2={c.anchorX} y2={c.anchorY} stroke={colors.permissionSlip} strokeWidth={1.25} strokeDasharray="4 3" opacity={0.7} />
              <circle cx={c.anchorX} cy={c.anchorY} r={4} fill={colors.permissionSlip} />
              <rect x={c.x} y={c.y} width={200} height={32} rx={6} fill={colors.surface} stroke={colors.permissionSlip} strokeWidth={1.25} />
              <text x={c.x + 100} y={c.y + 21} textAnchor="middle" fill={colors.textPrimary} fontSize={12} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
                {t(c.key, { defaultValue: c.def })}
              </text>
            </motion.g>
          ) : null
        )}
      </svg>
    </Stage>
  );
};
