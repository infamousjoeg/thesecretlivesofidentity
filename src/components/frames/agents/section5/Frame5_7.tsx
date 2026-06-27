import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

interface Step {
  x: number;
  y: number;
  size: number;
  scopes: string[];
  revoked: string[];
  narrowed: boolean;
}

/**
 * Frame 5-7: The Shrinking Slip
 * Visual: Each hop tears the slip a little smaller, until the last helper holds a
 * slip that permits just one tiny action — exactly the goal.
 */
export const Frame5_7: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 450, 450, 450, 500]);
  const prefersReducedMotion = useReducedMotion();

  const steps: Step[] = [
    { x: 150, y: 245, size: 146, scopes: ['Read calendar', 'Send invite', 'Add notes'], revoked: [], narrowed: false },
    { x: 372, y: 252, size: 114, scopes: ['Read calendar', 'Send invite'], revoked: ['Add notes'], narrowed: true },
    { x: 562, y: 258, size: 90, scopes: ['Read calendar'], revoked: ['Send invite'], narrowed: true },
    { x: 712, y: 262, size: 68, scopes: ['Read 1 event'], revoked: [], narrowed: true },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <marker id="a5-7-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={colors.textMuted} />
          </marker>
        </defs>

        {steps.map((s, i) => (
          <React.Fragment key={s.x}>
            {phase >= i && i > 0 && (
              <motion.line
                x1={steps[i - 1].x + steps[i - 1].size / 2 - 8}
                y1={steps[i - 1].y}
                x2={s.x - s.size / 2 - 6}
                y2={s.y}
                stroke={colors.textMuted}
                strokeWidth={2}
                markerEnd="url(#a5-7-arrow)"
                initial={prefersReducedMotion ? { opacity: 0.6 } : { opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.4 }}
              />
            )}
            {phase >= i && (
              <motion.g
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <PermissionSlip
                  position={{ x: s.x, y: s.y }}
                  size={s.size}
                  state="valid"
                  narrowed={s.narrowed}
                  scopes={s.scopes}
                  revokedScopes={s.revoked}
                  animate={!prefersReducedMotion && i === steps.length - 1}
                />
              </motion.g>
            )}
          </React.Fragment>
        ))}

        {phase >= 4 && (
          <motion.text
            x={400}
            y={430}
            textAnchor="middle"
            fill={colors.permissionSlip}
            fontSize={15}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {t('frame5_7.caption', { defaultValue: 'By the last helper: just one tiny action' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
