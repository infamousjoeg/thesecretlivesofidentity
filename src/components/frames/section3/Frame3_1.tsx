import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 3-1: SPIFFE Needs an Implementation
 * Visual: SPIFFE spec document leading to SPIRE implementation
 */
export const Frame3_1: React.FC = () => {
  const { t } = useTranslation('frames');
  const { phase } = useAnimationPhase([0, 600, 600]);

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={50}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={24}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('frame3_1.title')}
        </motion.text>

        {/* SPIFFE Spec */}
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={150} y={120} width={200} height={250} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <rect x={150} y={120} width={200} height={40} rx={8} fill={colors.success} />
          <text x={250} y={147} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            SPIFFE
          </text>
          <text x={250} y={185} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame3_1.specLabel')}
          </text>
          <text x={250} y={210} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            • {t('frame3_1.specBullet1')}
          </text>
          <text x={250} y={235} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            • {t('frame3_1.specBullet2')}
          </text>
          <text x={250} y={260} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            • Trust Bundle format
          </text>
          <text x={250} y={285} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            • {t('frame3_1.specBullet3')}
          </text>
          <text x={250} y={340} textAnchor="middle" fill={colors.textSecondary} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
            "{t('frame3_1.specTagline')}"
          </text>
        </motion.g>

        {/* Arrow */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <line x1={370} y1={245} x2={430} y2={245} stroke={colors.textMuted} strokeWidth={3} />
            <polygon points="440,245 425,238 425,252" fill={colors.textMuted} />
          </motion.g>
        )}

        {/* SPIRE */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={120} width={200} height={250} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
            <rect x={450} y={120} width={200} height={40} rx={8} fill={colors.agent} />
            <text x={550} y={147} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              SPIRE
            </text>
            <text x={550} y={185} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_1.implLabel')}
            </text>
            <text x={550} y={210} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              • {t('frame3_1.implBullet1')}
            </text>
            <text x={550} y={235} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              • {t('frame3_1.implBullet2')}
            </text>
            <text x={550} y={260} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              • {t('frame3_1.implBullet3')}
            </text>
            <text x={550} y={285} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              • Management tools
            </text>
            <text x={550} y={340} textAnchor="middle" fill={colors.textSecondary} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              "{t('frame3_1.implTagline')}"
            </text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={410} width={400} height={60} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={445} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame3_1.conclusion').split('reference implementation').map((part, i) =>
                i === 0 ? <tspan key={i}>{part}</tspan> : <tspan key={i}><tspan fill={colors.agent} fontWeight="bold">reference implementation</tspan>{part}</tspan>
              )}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
