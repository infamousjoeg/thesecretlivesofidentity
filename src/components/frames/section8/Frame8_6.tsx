import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 8-6: Platform Attestation: AWS
 * Visual: AWS instance identity document
 */
export const Frame8_6: React.FC = () => {
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
          Platform Attestation: AWS
        </motion.text>

        {/* AWS cloud */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={200} y={100} width={400} height={280} rx={12} fill={`${colors.warning}10`} stroke={colors.warning} strokeWidth={2} />
          <text x={400} y={130} textAnchor="middle" fill={colors.warning} fontSize={16} fontWeight="bold">AWS</text>
        </motion.g>

        {/* EC2 Instance */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={250} y={160} width={150} height={100} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
            <text x={325} y={190} textAnchor="middle" fill={colors.agent} fontSize={12} fontWeight="bold">EC2 Instance</text>
            <text x={325} y={215} textAnchor="middle" fill={colors.textMuted} fontSize={10}>+ SPIRE Agent</text>
            <text x={325} y={240} textAnchor="middle" fontSize={20}>🖥️</text>
          </motion.g>
        )}

        {/* IID Document */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={160} width={130} height={100} rx={6} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={515} y={185} textAnchor="middle" fill={colors.success} fontSize={11} fontWeight="bold">Instance</text>
            <text x={515} y={200} textAnchor="middle" fill={colors.success} fontSize={11} fontWeight="bold">Identity Doc</text>
            <text x={515} y={225} textAnchor="middle" fill={colors.textMuted} fontSize={9}>Cryptographically</text>
            <text x={515} y={240} textAnchor="middle" fill={colors.textMuted} fontSize={9}>signed by AWS</text>

            <line x1={405} y1={210} x2={445} y2={210} stroke={colors.success} strokeWidth={2} markerEnd="url(#aws-arr)" />
            <defs>
              <marker id="aws-arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={colors.success} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Contents */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={220} y={300} width={360} height={110} rx={6} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={240} y={325} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">Document contains:</text>
            <text x={250} y={350} fill={colors.warning} fontSize={10} fontFamily="JetBrains Mono, monospace">• instanceId: i-1234abcd</text>
            <text x={250} y={370} fill={colors.warning} fontSize={10} fontFamily="JetBrains Mono, monospace">• accountId: 123456789</text>
            <text x={250} y={390} fill={colors.warning} fontSize={10} fontFamily="JetBrains Mono, monospace">• region: us-west-2</text>
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
              AWS cryptographically vouches for the instance identity
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
