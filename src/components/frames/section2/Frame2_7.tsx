import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-7: Trust Domains: Your Company
 * Visual: Company badge system metaphor
 */
export const Frame2_7: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

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
          Think of it Like a Company
        </motion.text>

        {/* Company building outline */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={150} y={80} width={500} height={320} rx={12} fill={`${colors.server}08`} stroke={colors.server} strokeWidth={2} strokeDasharray="10 5" />
          <rect x={340} y={60} width={120} height={35} rx={8} fill={colors.background} stroke={colors.server} strokeWidth={2} />
          <text x={400} y={83} textAnchor="middle" fill={colors.server} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            ACME Corp
          </text>
        </motion.g>

        {/* Employees with badges */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Employee 1 */}
            <Workload label="Alice" position={{ x: 250, y: 200 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Badge spiffeId="EMP-001" position={{ x: 250, y: 140 }} state="valid" size={40} showCountdown={false} animate={false} />

            {/* Employee 2 */}
            <Workload label="Bob" position={{ x: 400, y: 200 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Badge spiffeId="EMP-002" position={{ x: 400, y: 140 }} state="valid" size={40} showCountdown={false} animate={false} />

            {/* Employee 3 */}
            <Workload label="Carol" position={{ x: 550, y: 200 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Badge spiffeId="EMP-003" position={{ x: 550, y: 140 }} state="valid" size={40} showCountdown={false} animate={false} />
          </motion.g>
        )}

        {/* Security desk */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={320} y={280} width={160} height={60} rx={8} fill={colors.agent} />
            <text x={400} y={305} textAnchor="middle" fill="white" fontSize={11} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Security Desk
            </text>
            <text x={400} y={325} textAnchor="middle" fill="white" fontSize={10} opacity={0.8} fontFamily="IBM Plex Sans, sans-serif">
              Issues badges
            </text>
          </motion.g>
        )}

        {/* Metaphor explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={420} width={500} height={60} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={448} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              Everyone inside shares the <tspan fill={colors.svid} fontWeight="bold">same badge system</tspan>
            </text>
            <text x={400} y={468} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              issued by the same security authority
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
