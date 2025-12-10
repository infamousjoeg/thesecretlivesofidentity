import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 5-11: Why It's Different
 * Visual: Comparison of SVID private key vs shared secrets
 */
export const Frame5_11: React.FC = () => {
  const { phase } = useAnimationPhase([0, 400, 400, 400, 400, 600]);

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
          Why It's Different
        </motion.text>

        {/* Header row */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <text x={250} y={100} textAnchor="middle" fill={colors.success} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            SVID Private Key
          </text>
          <text x={550} y={100} textAnchor="middle" fill={colors.attacker} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Shared Secret
          </text>
        </motion.g>

        {/* Comparison items */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={130} width={300} height={50} rx={6} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={250} y={150} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold">✓ Never shared</text>
            <text x={250} y={170} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>Stays with the workload</text>

            <rect x={400} y={130} width={300} height={50} rx={6} fill={`${colors.attacker}15`} stroke={colors.attacker} strokeWidth={1} />
            <text x={550} y={150} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold">✗ Shared by design</text>
            <text x={550} y={170} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>Multiple parties know it</text>
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={200} width={300} height={50} rx={6} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={250} y={220} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold">✓ Short-lived</text>
            <text x={250} y={240} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>Minutes to hours</text>

            <rect x={400} y={200} width={300} height={50} rx={6} fill={`${colors.attacker}15`} stroke={colors.attacker} strokeWidth={1} />
            <text x={550} y={220} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold">✗ Long-lived</text>
            <text x={550} y={240} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>Months or years</text>
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={270} width={300} height={50} rx={6} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={250} y={290} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold">✓ Auto-rotated</text>
            <text x={250} y={310} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>No human intervention</text>

            <rect x={400} y={270} width={300} height={50} rx={6} fill={`${colors.attacker}15`} stroke={colors.attacker} strokeWidth={1} />
            <text x={550} y={290} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold">✗ Manual rotation</text>
            <text x={550} y={310} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>Coordination nightmare</text>
          </motion.g>
        )}

        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={340} width={300} height={50} rx={6} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={250} y={360} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold">✓ Never leaves workload</text>
            <text x={250} y={380} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>No network exposure</text>

            <rect x={400} y={340} width={300} height={50} rx={6} fill={`${colors.attacker}15`} stroke={colors.attacker} strokeWidth={1} />
            <text x={550} y={360} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold">✗ Transmitted repeatedly</text>
            <text x={550} y={380} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>Network exposure risk</text>
          </motion.g>
        )}

        {/* Bottom line */}
        {phase >= 5 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={420} width={400} height={50} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={450} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              No human ever sees it. No human ever manages it.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
