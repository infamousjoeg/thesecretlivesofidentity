import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { ToolResource } from '@/components/entities/agents';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-7: Defense In Depth
 * Visual: concentric protective layers around the resource — narrow scope, short
 * lifetime, audience binding, revocation, audit trail. No single control is enough.
 */
export const Frame8_7: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 450, 450, 450, 450, 450]);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const cx = 300;
  const cy = 250;

  const layers = [
    { r: 70, label: t('frame8_7.layer1', { defaultValue: 'Narrow scope' }), color: colors.permissionSlip },
    { r: 105, label: t('frame8_7.layer2', { defaultValue: 'Short lifetime' }), color: '#F97316' },
    { r: 140, label: t('frame8_7.layer3', { defaultValue: 'Audience binding' }), color: colors.verifier },
    { r: 175, label: t('frame8_7.layer4', { defaultValue: 'Revocation' }), color: colors.subAgent },
    { r: 210, label: t('frame8_7.layer5', { defaultValue: 'Audit trail' }), color: colors.success },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Concentric protective rings (outer first so inner draws on top) */}
        {[...layers].reverse().map((layer) => {
          const idx = layers.indexOf(layer);
          return phase >= idx + 1 && (
            <motion.g
              key={layer.label}
              initial={animate ? { opacity: 0, scale: 0.9 } : { opacity: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <circle cx={cx} cy={cy} r={layer.r} fill="none" stroke={layer.color} strokeWidth={2} opacity={0.7} strokeDasharray="4 4" />
            </motion.g>
          );
        })}

        {/* Central protected resource */}
        <ToolResource position={{ x: cx, y: cy }} size={74} kind="MCP" label="" locked={true} animate={animate} />

        {/* Layer legend on the right */}
        <g transform="translate(560, 130)">
          {layers.map((layer, i) => (
            phase >= i + 1 && (
              <motion.g
                key={`legend-${layer.label}`}
                initial={animate ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <circle cx={0} cy={i * 44} r={8} fill={layer.color} />
                <text x={20} y={i * 44 + 5} fill={colors.textPrimary} fontSize={15} fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">
                  {layer.label}
                </text>
              </motion.g>
            )
          ))}
        </g>

        {/* Caption */}
        {phase >= 5 && (
          <motion.text
            x={300}
            y={485}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={14}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t('frame8_7.caption', { defaultValue: 'Together, these layers contain failure.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
