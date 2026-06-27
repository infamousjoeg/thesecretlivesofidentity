import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-8: The Real Problem
 * Visual: Highlighting that shared secrets AS identity is the root issue
 */
export const Frame1_8: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 800, 800, 800]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Two workloads sharing a secret */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Workload
            label={t('frame1_8.serviceA', { defaultValue: 'Service A' })}
            position={{ x: 200, y: 250 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
          <Workload
            label={t('frame1_8.serviceB', { defaultValue: 'Service B' })}
            position={{ x: 600, y: 250 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Shared secret in the middle */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Key traveling between them */}
            <rect x={330} y={225} width={140} height={50} rx={10} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={400} y={245} textAnchor="middle" fontSize={20}>
              🔑
            </text>
            <text x={400} y={265} textAnchor="middle" fill={colors.warning} fontSize={10} fontFamily="JetBrains Mono, monospace">
              {t('frame1_8.sharedSecret', { defaultValue: 'SHARED_SECRET' })}
            </text>

            {/* Arrows showing sharing */}
            <line x1={240} y1={250} x2={317} y2={250} stroke={colors.warning} strokeWidth={2} markerEnd="url(#arrow)" />
            <line x1={475} y1={250} x2={555} y2={250} stroke={colors.warning} strokeWidth={2} markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" markerWidth="20" markerHeight="10" refX="2" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.warning} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* The insight */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={350} width={400} height={50} rx={8} fill={`${colors.attacker}20`} stroke={colors.attacker} strokeWidth={1} strokeDasharray="4 4" />
            <text x={400} y={380} textAnchor="middle" fill={colors.attacker} fontSize={14} fontFamily="Space Grotesk, sans-serif" fontWeight="600">
              {t('frame1_8.title')}
            </text>
          </motion.g>
        )}

        {/* Realization */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={440} textAnchor="middle" fill={colors.textPrimary} fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame1_8.subtitle')}
            </text>
            <text x={400} y={470} textAnchor="middle" fill={colors.textSecondary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame1_8.conclusion')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
