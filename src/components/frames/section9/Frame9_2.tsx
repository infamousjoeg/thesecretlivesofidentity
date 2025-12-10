import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge, SpireAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 9-2: The Badge Summary
 * Visual: Complete badge metaphor recap
 */
export const Frame9_2: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

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
          The Badge Summary
        </motion.text>

        {/* Employee ID - SPIFFE ID */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={120} width={200} height={100} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
          <text x={200} y={150} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold">Your Employee ID</text>
          <text x={200} y={175} textAnchor="middle" fill={colors.success} fontSize={12}>(SPIFFE ID)</text>
          <text x={200} y={205} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Never changes</text>
        </motion.g>

        {/* Badge - SVID */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={350} y={120} width={200} height={100} rx={8} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={2} />
            <text x={450} y={150} textAnchor="middle" fill={colors.svid} fontSize={14} fontWeight="bold">Your Badge</text>
            <text x={450} y={175} textAnchor="middle" fill={colors.svid} fontSize={12}>(SVID)</text>
            <text x={450} y={205} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Expires & auto-renews</text>
            <Badge spiffeId="" position={{ x: 520, y: 170 }} state="valid" size={30} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Security Desk - Agent */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={550} y={120} width={200} height={100} rx={8} fill={`${colors.agent}15`} stroke={colors.agent} strokeWidth={2} />
            <text x={650} y={150} textAnchor="middle" fill={colors.agent} fontSize={14} fontWeight="bold">Security Desk</text>
            <text x={650} y={175} textAnchor="middle" fill={colors.agent} fontSize={12}>(SPIRE Agent)</text>
            <text x={650} y={205} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>Handles it all</text>
            <SpireAgent label="" position={{ x: 720, y: 170 }} active={true} animate={!prefersReducedMotion} size={30} />
          </motion.g>
        )}

        {/* Flow visualization */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={280} width={500} height={150} rx={12} fill={colors.surface} stroke={colors.success} strokeWidth={2} />

            {/* Employee */}
            <circle cx={250} cy={355} r={30} fill={`${colors.svid}20`} stroke={colors.svid} strokeWidth={2} />
            <text x={250} y={365} textAnchor="middle" fontSize={24}>👤</text>
            <text x={250} y={410} textAnchor="middle" fill={colors.textSecondary} fontSize={10}>You (Workload)</text>

            {/* Arrow to desk */}
            <line x1={290} y1={355} x2={350} y2={355} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#sum-arr)" />

            {/* Desk */}
            <rect x={360} y={325} width={80} height={60} rx={4} fill={`${colors.agent}20`} stroke={colors.agent} strokeWidth={1} />
            <text x={400} y={365} textAnchor="middle" fontSize={20}>🖥️</text>

            {/* Arrow to badge */}
            <line x1={450} y1={355} x2={510} y2={355} stroke={colors.success} strokeWidth={2} markerEnd="url(#sum-arr-g)" />

            {/* Result */}
            <Badge spiffeId="✓" position={{ x: 560, y: 355 }} state="valid" size={40} animate={!prefersReducedMotion} />

            <defs>
              <marker id="sum-arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={colors.textMuted} />
              </marker>
              <marker id="sum-arr-g" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={colors.success} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Summary */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <text x={400} y={470} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              The Agent handles everything—you just work
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
