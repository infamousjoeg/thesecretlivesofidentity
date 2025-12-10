import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 6-9: Authorization Layers
 * Visual: SPIFFE + various authorization systems
 */
export const Frame6_9: React.FC = () => {
  const { phase } = useAnimationPhase([0, 400, 400, 400, 600]);

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
          Authorization Layers
        </motion.text>

        {/* SPIFFE base layer */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={200} y={350} width={400} height={60} rx={8} fill={colors.success} />
          <text x={400} y={385} textAnchor="middle" fill="white" fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            SPIFFE Identity Layer
          </text>
        </motion.g>

        {/* Authorization options */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={260} width={150} height={60} rx={6} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
            <text x={175} y={285} textAnchor="middle" fill={colors.svid} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Your Application
            </text>
            <text x={175} y={305} textAnchor="middle" fill={colors.textMuted} fontSize={10}>Custom logic</text>
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={280} y={260} width={150} height={60} rx={6} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
            <text x={355} y={285} textAnchor="middle" fill={colors.agent} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Service Mesh
            </text>
            <text x={355} y={305} textAnchor="middle" fill={colors.textMuted} fontSize={10}>Istio, Linkerd</text>
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={460} y={260} width={150} height={60} rx={6} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={535} y={285} textAnchor="middle" fill={colors.warning} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              OPA / Rego
            </text>
            <text x={535} y={305} textAnchor="middle" fill={colors.textMuted} fontSize={10}>Policy engine</text>
          </motion.g>
        )}

        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={640} y={260} width={110} height={60} rx={6} fill={colors.surface} stroke={colors.trustBundle} strokeWidth={2} />
            <text x={695} y={285} textAnchor="middle" fill={colors.trustBundle} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              RBAC
            </text>
            <text x={695} y={305} textAnchor="middle" fill={colors.textMuted} fontSize={10}>K8s, Cloud IAM</text>
          </motion.g>
        )}

        {/* Connectors */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={175} y1={320} x2={300} y2={350} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4 2" />
            <line x1={355} y1={320} x2={400} y2={350} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4 2" />
            <line x1={535} y1={320} x2={500} y2={350} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4 2" />
            <line x1={695} y1={320} x2={600} y2={350} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={450} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              SPIFFE tells you WHO—authorization policies tell you WHAT
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
