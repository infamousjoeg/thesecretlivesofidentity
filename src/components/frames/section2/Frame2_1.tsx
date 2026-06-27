import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 2-1: SPIFFE: A Specification
 * Visual: SPIFFE as open standards document
 */
export const Frame2_1: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600]);

  const standards = [
    { label: 'SPIFFE ID', descKey: 'frame2_1.standard1' },
    { label: 'SVID', descKey: 'frame2_1.standard2' },
    { label: 'Trust Bundle', descKey: 'frame2_1.standard3' },
    { label: 'Workload API', descKey: 'frame2_1.standard4' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* SPIFFE logo */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <text
            x={400}
            y={60}
            textAnchor="middle"
            fill={colors.success}
            fontSize={32}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            SPIFFE
          </text>
          <text
            x={400}
            y={90}
            textAnchor="middle"
            fill={colors.textMuted}
            fontSize={14}
            fontFamily="IBM Plex Sans, sans-serif"
          >
            {t('frame2_1.fullName')}
          </text>
        </motion.g>

        {/* Specification document visual */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect
              x={250}
              y={120}
              width={300}
              height={280}
              rx={8}
              fill={colors.surface}
              stroke={colors.success}
              strokeWidth={2}
            />
            {/* Document header */}
            <rect x={250} y={120} width={300} height={40} rx={8} fill={colors.success} />
            <text x={400} y={147} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_1.openStandards')}
            </text>

            {/* Standards list */}
            {standards.map((std, index) => (
              <g key={std.label} transform={`translate(0, ${index * 55})`}>
                <rect x={270} y={175} width={260} height={45} rx={4} fill={`${colors.success}10`} />
                <text x={290} y={198} fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
                  {std.label}
                </text>
                <text x={290} y={214} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
                  {t(std.descKey)}
                </text>
              </g>
            ))}
          </motion.g>
        )}

        {/* Open source badge */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={580} y={200} width={150} height={60} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={655} y={225} textAnchor="middle" fill={colors.textPrimary} fontSize={12} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_1.openSource')}
            </text>
            <text x={655} y={245} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_1.cncfProject')}
            </text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={450}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={16}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t('frame2_1.notAProduct')}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
