import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 8-7: Platform Attestation: Kubernetes
 * Visual: K8s service account tokens
 */
export const Frame8_7: React.FC = () => {
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
          Platform Attestation: Kubernetes
        </motion.text>

        {/* K8s cluster */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={150} y={100} width={500} height={280} rx={12} fill={`${colors.server}10`} stroke={colors.server} strokeWidth={2} />
          <text x={400} y={130} textAnchor="middle" fill={colors.server} fontSize={16} fontWeight="bold">Kubernetes Cluster</text>
        </motion.g>

        {/* Pod */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={160} width={160} height={120} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
            <text x={280} y={190} textAnchor="middle" fill={colors.agent} fontSize={12} fontWeight="bold">Pod</text>
            <text x={280} y={215} textAnchor="middle" fill={colors.textMuted} fontSize={10}>+ SPIRE Agent</text>
            <rect x={220} y={230} width={120} height={30} rx={4} fill={`${colors.svid}20`} />
            <text x={280} y={250} textAnchor="middle" fill={colors.svid} fontSize={9}>Service Account</text>
          </motion.g>
        )}

        {/* Service Account Token */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={440} y={160} width={180} height={120} rx={6} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={530} y={190} textAnchor="middle" fill={colors.success} fontSize={11} fontWeight="bold">Service Account</text>
            <text x={530} y={210} textAnchor="middle" fill={colors.success} fontSize={11} fontWeight="bold">Token (PSAT)</text>
            <text x={530} y={240} textAnchor="middle" fill={colors.textMuted} fontSize={9}>Projected, auto-rotating</text>
            <text x={530} y={260} textAnchor="middle" fill={colors.textMuted} fontSize={9}>Signed by K8s</text>

            <line x1={365} y1={220} x2={435} y2={220} stroke={colors.success} strokeWidth={2} markerEnd="url(#k8s-arr)" />
            <defs>
              <marker id="k8s-arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={colors.success} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Token contents */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={310} width={400} height={90} rx={6} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={220} y={335} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">Token contains:</text>
            <text x={230} y={360} fill={colors.server} fontSize={10} fontFamily="JetBrains Mono, monospace">• namespace: production</text>
            <text x={230} y={380} fill={colors.server} fontSize={10} fontFamily="JetBrains Mono, monospace">• serviceAccount: payments-api</text>
          </motion.g>
        )}

        {/* Summary */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={440} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Kubernetes vouches for pod identity via projected tokens
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
