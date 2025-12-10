import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 8-9: Platform Attestation: TPM
 * Visual: Hardware root of trust
 */
export const Frame8_9: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);

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
          Platform Attestation: TPM
        </motion.text>

        {/* Physical machine */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={200} y={120} width={400} height={250} rx={12} fill={colors.surface} stroke={colors.textMuted} strokeWidth={3} />
          <text x={400} y={155} textAnchor="middle" fill={colors.textSecondary} fontSize={14} fontWeight="bold">Physical Server</text>
          <text x={400} y={180} textAnchor="middle" fontSize={30}>🖥️</text>
        </motion.g>

        {/* TPM chip */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={320} y={210} width={160} height={80} rx={8} fill={colors.success} />
            <text x={400} y={240} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">TPM Chip</text>
            <text x={400} y={265} textAnchor="middle" fill="white" fontSize={11}>Hardware Security</text>
            <text x={400} y={280} textAnchor="middle" fill="white" fontSize={20}>🔐</text>
          </motion.g>
        )}

        {/* What TPM provides */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={520} y={200} width={200} height={120} rx={6} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={620} y={225} textAnchor="middle" fill={colors.success} fontSize={11} fontWeight="bold">TPM Provides:</text>
            <text x={540} y={250} fill={colors.textSecondary} fontSize={10}>• Unique device identity</text>
            <text x={540} y={270} fill={colors.textSecondary} fontSize={10}>• Tamper evidence</text>
            <text x={540} y={290} fill={colors.textSecondary} fontSize={10}>• Sealed secrets</text>
            <text x={540} y={310} fill={colors.textSecondary} fontSize={10}>• Boot attestation</text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={400} width={500} height={70} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={430} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Hardware root of trust
            </text>
            <text x={400} y={455} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Proves the physical machine's identity—strongest attestation
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
