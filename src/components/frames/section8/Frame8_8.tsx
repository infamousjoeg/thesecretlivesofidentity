import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 8-8: Platform Attestation: GCP/Azure
 * Visual: Various cloud attestation methods
 */
export const Frame8_8: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 600]);

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
          Platform Attestation: GCP/Azure
        </motion.text>

        {/* GCP */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={120} width={250} height={180} rx={12} fill={`${colors.agent}10`} stroke={colors.agent} strokeWidth={2} />
          <text x={225} y={155} textAnchor="middle" fill={colors.agent} fontSize={16} fontWeight="bold">Google Cloud</text>
          <text x={225} y={200} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Instance Metadata</text>
          <text x={225} y={225} textAnchor="middle" fill={colors.textMuted} fontSize={11}>identity-token endpoint</text>
          <rect x={140} y={245} width={170} height={35} rx={4} fill={colors.surface} stroke={colors.agent} strokeWidth={1} />
          <text x={225} y={268} textAnchor="middle" fill={colors.agent} fontSize={10} fontFamily="JetBrains Mono, monospace">signed JWT</text>
        </motion.g>

        {/* Azure */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={120} width={250} height={180} rx={12} fill={`${colors.server}10`} stroke={colors.server} strokeWidth={2} />
            <text x={575} y={155} textAnchor="middle" fill={colors.server} fontSize={16} fontWeight="bold">Azure</text>
            <text x={575} y={200} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Managed Identity</text>
            <text x={575} y={225} textAnchor="middle" fill={colors.textMuted} fontSize={11}>MSI token endpoint</text>
            <rect x={490} y={245} width={170} height={35} rx={4} fill={colors.surface} stroke={colors.server} strokeWidth={1} />
            <text x={575} y={268} textAnchor="middle" fill={colors.server} fontSize={10} fontFamily="JetBrains Mono, monospace">access token</text>
          </motion.g>
        )}

        {/* Common pattern */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={330} width={400} height={80} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={365} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Common Pattern
            </text>
            <text x={400} y={390} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Platform provides cryptographic proof of instance identity
            </text>
          </motion.g>
        )}

        {/* Summary */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={450} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Each cloud has native attestation—SPIRE supports them all
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
