import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 2-13: Metaphor Limits
 * Visual: Acknowledging where the badge metaphor breaks down
 */
export const Frame2_13: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 600, 600, 800]);

  const differences = [
    { metaphorKey: 'frame2_13.row1Badge', realityKey: 'frame2_13.row1Reality' },
    { metaphorKey: 'frame2_13.row2Badge', realityKey: 'frame2_13.row2Reality' },
    { metaphorKey: 'frame2_13.row3Badge', realityKey: 'frame2_13.row3Reality' },
    { metaphorKey: 'frame2_13.row4Badge', realityKey: 'frame2_13.row4Reality' },
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
          {t('frame2_13.title')}
        </motion.text>

        <motion.text
          x={400}
          y={75}
          textAnchor="middle"
          fill={colors.textMuted}
          fontSize={14}
          fontFamily="IBM Plex Sans, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('frame2_13.intro')}
        </motion.text>

        {/* Headers */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={110} width={250} height={40} rx={6} fill={colors.svid} />
            <text x={225} y={136} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_13.badgeMetaphorCol')}
            </text>

            <rect x={450} y={110} width={250} height={40} rx={6} fill={colors.success} />
            <text x={575} y={136} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_13.spiffeRealityCol')}
            </text>
          </motion.g>
        )}

        {/* Comparison rows */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {differences.map((diff, i) => (
              <g key={diff.metaphorKey} transform={`translate(0, ${i * 60})`}>
                <rect x={100} y={165} width={250} height={50} rx={4} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
                <text x={225} y={195} textAnchor="middle" fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
                  {t(diff.metaphorKey)}
                </text>

                {/* Arrow */}
                <line x1={360} y1={190} x2={440} y2={190} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#arrowLimit)" />

                <rect x={450} y={165} width={250} height={50} rx={4} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
                <text x={575} y={195} textAnchor="middle" fill={colors.success} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
                  {t(diff.realityKey)}
                </text>
              </g>
            ))}

            <defs>
              <marker id="arrowLimit" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.textMuted} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Conclusion */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={420} width={500} height={60} rx={8} fill={`${colors.server}10`} stroke={colors.server} strokeWidth={1} />
            <text x={400} y={448} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_13.remember')}
            </text>
            <text x={400} y={468} textAnchor="middle" fill={colors.server} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_13.machineSpeed')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
