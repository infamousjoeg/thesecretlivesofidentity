import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 7-8: Contrast with Secrets
 * Visual: API key rotation nightmare vs SVID simplicity
 */
export const Frame7_8: React.FC = () => {
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
          Contrast with Secrets
        </motion.text>

        {/* API Key rotation - left side */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={50} y={100} width={300} height={280} rx={8} fill={colors.surface} stroke={colors.attacker} strokeWidth={2} />
          <text x={200} y={130} textAnchor="middle" fill={colors.attacker} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            API Key Rotation
          </text>
        </motion.g>

        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <text x={70} y={165} fill={colors.attacker} fontSize={11}>1. Generate new key</text>
            <text x={70} y={190} fill={colors.attacker} fontSize={11}>2. Update 47 services</text>
            <text x={70} y={215} fill={colors.attacker} fontSize={11}>3. Coordinate deployments</text>
            <text x={70} y={240} fill={colors.attacker} fontSize={11}>4. Roll back if broken</text>
            <text x={70} y={265} fill={colors.attacker} fontSize={11}>5. Delete old key</text>
            <text x={70} y={290} fill={colors.attacker} fontSize={11}>6. Pray nothing breaks</text>

            <text x={200} y={340} textAnchor="middle" fill={colors.attacker} fontSize={18}>😱</text>
            <text x={200} y={365} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold">Manual nightmare</text>
          </motion.g>
        )}

        {/* SVID rotation - right side */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={100} width={300} height={280} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={600} y={130} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              SVID Rotation
            </text>

            <text x={600} y={200} textAnchor="middle" fill={colors.success} fontSize={48}>🤖</text>
            <text x={600} y={260} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold">Fully automatic</text>
            <text x={600} y={290} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Zero human intervention</text>
            <text x={600} y={320} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Zero coordination</text>
            <text x={600} y={350} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Zero downtime</text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={410} width={400} height={60} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={445} textAnchor="middle" fill={colors.success} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              No more 2 AM rotation nightmares
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
