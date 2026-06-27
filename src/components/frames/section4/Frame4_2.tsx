import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';

import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 4-2: Traditional vs SPIFFE
 * Visual: Comparison of traditional credential approach vs platform attestation
 */
export const Frame4_2: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 600, 600]);

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
          {t('frame4_2.title')}
        </motion.text>

        {/* Traditional approach */}
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={80} y={90} width={280} height={200} rx={12} fill={colors.surface} stroke={colors.attacker} strokeWidth={2} />
          <rect x={80} y={90} width={280} height={40} rx={12} fill={colors.attacker} />
          <text x={220} y={117} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            {t('frame4_2.traditionalLabel')}
          </text>

          <text x={220} y={160} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame4_2.traditionalDescription')}
          </text>
          <rect x={130} y={180} width={180} height={35} rx={4} fill={`${colors.attacker}15`} />
          <text x={220} y={200} textAnchor="middle" fontSize={20}>🔑</text>
          <text x={250} y={205} fill={colors.attacker} fontSize={10} fontFamily="JetBrains Mono, monospace">
            API_KEY_XYZ
          </text>

          <text x={220} y={250} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            {t('frame4_2.traditionalProblem')}
          </text>
          <text x={220} y={270} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            {/* consolidated into traditionalProblem */}
          </text>
        </motion.g>

        {/* SPIFFE approach */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={440} y={90} width={280} height={200} rx={12} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <rect x={440} y={90} width={280} height={40} rx={12} fill={colors.success} />
            <text x={580} y={117} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_2.spiffeLabel')}
            </text>

            <text x={580} y={160} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_2.spiffeDescription')}
            </text>
            <rect x={490} y={175} width={180} height={50} rx={4} fill={`${colors.success}15`} />
            <text x={520} y={200} fontSize={18}>☁️</text>
            <text x={580} y={195} fill={colors.success} fontSize={10} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              AWS / K8s / GCP
            </text>
            <text x={580} y={215} fill={colors.textMuted} fontSize={9} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_2.platformSays')}
            </text>

            <text x={580} y={260} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_2.spiffeProblem')}
            </text>
            <text x={580} y={280} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {/* consolidated into spiffeProblem */}
            </text>
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={330} width={500} height={120} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={365} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame4_2.keyInsight')}
            </text>
            <text x={400} y={395} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_2.keyInsightLine1')}
            </text>
            <text x={400} y={420} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame4_2.keyInsightLine2')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
