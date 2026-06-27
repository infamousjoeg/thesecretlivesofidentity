import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 4-7: Attestation Types
 * Visual: Different platform attestation methods
 */
export const Frame4_7: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 400, 400, 400, 400]);

  const attestors = [
    { nameKey: 'frame4_7.awsAttestor', icon: '☁️', proofKey: 'frame4_7.awsProof', descKey: 'frame4_7.awsDescription' },
    { nameKey: 'frame4_7.k8sAttestor', icon: '⎈', proofKey: 'frame4_7.k8sProof', descKey: 'frame4_7.k8sDescription' },
    { nameKey: 'frame4_7.gcpAttestor', icon: '🔷', proofKey: 'frame4_7.gcpProof', descKey: 'frame4_7.gcpDescription' },
    { nameKey: 'frame4_7.azureAttestor', icon: '◈', proofKey: 'frame4_7.azureProof', descKey: 'frame4_7.azureDescription' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={45}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={22}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('frame4_7.title')}
        </motion.text>

        <motion.text
          x={400}
          y={75}
          textAnchor="middle"
          fill={colors.textMuted}
          fontSize={13}
          fontFamily="IBM Plex Sans, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('frame4_7.description')}
        </motion.text>

        {/* Attestors */}
        {attestors.map((att, index) => (
          phase >= index + 1 && (
            <motion.g
              key={att.nameKey}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect
                x={100}
                y={100 + index * 90}
                width={600}
                height={75}
                rx={8}
                fill={colors.surface}
                stroke={colors.success}
                strokeWidth={1}
              />
              <rect
                x={100}
                y={100 + index * 90}
                width={100}
                height={75}
                rx={8}
                fill={colors.success}
              />
              <text x={150} y={135 + index * 90} textAnchor="middle" fontSize={24}>
                {att.icon}
              </text>
              <text x={150} y={160 + index * 90} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {t(att.nameKey)}
              </text>

              <text x={220} y={130 + index * 90} fill={colors.textPrimary} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {t(att.proofKey)}
              </text>
              <text x={220} y={155 + index * 90} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
                {t(att.descKey)}
              </text>
            </motion.g>
          )
        ))}

        {/* Key insight */}
        {phase >= 4 && (
          <motion.text
            x={400}
            y={480}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={12}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t('frame4_7.conclusion')}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
