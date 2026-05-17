import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useTrackNavigation } from '@/hooks/useTrackNavigation';
import { colors } from '@/utils/constants';

/**
 * Frame 9-4: Get Started
 * Visual: Resources and next steps
 */
export const Frame9_4: React.FC = () => {
  const { t } = useTranslation('frames');
  const { phase } = useAnimationPhase([0, 400, 400, 400, 600]);
  const { totalFrames } = useTrackNavigation();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={60}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={28}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('frame9_4.title', { defaultValue: 'Get Started' })}
        </motion.text>

        {/* SPIFFE.io */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <rect x={200} y={120} width={400} height={60} rx={8} fill={colors.success} />
          <text x={400} y={145} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">{t('frame9_4.spiffeSpecLabel', { defaultValue: 'SPIFFE Specification' })}</text>
          <text x={400} y={168} textAnchor="middle" fill="white" fontSize={16} fontFamily="JetBrains Mono, monospace">
            spiffe.io
          </text>
        </motion.g>

        {/* SPIRE GitHub */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={200} y={200} width={400} height={60} rx={8} fill={colors.server} />
            <text x={400} y={225} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">{t('frame9_4.spireImplLabel', { defaultValue: 'SPIRE Implementation' })}</text>
            <text x={400} y={248} textAnchor="middle" fill="white" fontSize={16} fontFamily="JetBrains Mono, monospace">
              github.com/spiffe/spire
            </text>
          </motion.g>
        )}

        {/* Slack */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={200} y={280} width={400} height={60} rx={8} fill={colors.svid} />
            <text x={400} y={305} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">{t('frame9_4.communityLabel', { defaultValue: 'Community' })}</text>
            <text x={400} y={328} textAnchor="middle" fill="white" fontSize={16} fontFamily="JetBrains Mono, monospace">
              slack.spiffe.io
            </text>
          </motion.g>
        )}

        {/* Celebration */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={380} textAnchor="middle" fontSize={50}>🎉</text>
          </motion.g>
        )}

        {/* Final message */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={430} textAnchor="middle" fill={colors.textPrimary} fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame9_4.youNowUnderstand', { defaultValue: 'You now understand SPIFFE!' })}
            </text>
            <text x={400} y={460} textAnchor="middle" fill={colors.textSecondary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame9_4.fromZeroToExpert', { totalFrames, defaultValue: `From zero to workload identity expert in ${totalFrames} frames.` })}
            </text>
            <text x={400} y={485} textAnchor="middle" fill={colors.success} fontSize={13} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              {t('frame9_4.thanks', { defaultValue: 'Thanks for learning with us! ✨' })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
