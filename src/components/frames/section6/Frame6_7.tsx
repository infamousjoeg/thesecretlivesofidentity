import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-7: Authentication ≠ Authorization
 * Visual: Proving identity vs having access
 */
export const Frame6_7: React.FC = () => {
  const { phase } = useAnimationPhase([0, 700, 700, 600]);
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
          Authentication ≠ Authorization
        </motion.text>

        {/* Authentication side */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={100} width={250} height={200} rx={12} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={225} y={130} textAnchor="middle" fill={colors.success} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Authentication
          </text>
          <text x={225} y={155} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            "Who are you?"
          </text>
          <Workload label="service" position={{ x: 180, y: 220 }} attested={true} animate={!prefersReducedMotion} size={50} />
          <Badge spiffeId="spiffe://acme/svc" position={{ x: 270, y: 220 }} state="valid" size={40} animate={!prefersReducedMotion} />
          <text x={225} y={280} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold">✓ SPIFFE provides this</text>
        </motion.g>

        {/* Authorization side */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={100} width={250} height={200} rx={12} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={575} y={130} textAnchor="middle" fill={colors.warning} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Authorization
            </text>
            <text x={575} y={155} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              "What can you do?"
            </text>
            <rect x={500} y={190} width={150} height={70} rx={6} fill={`${colors.warning}15`} stroke={colors.warning} strokeWidth={1} />
            <text x={575} y={220} textAnchor="middle" fill={colors.warning} fontSize={11} fontFamily="JetBrains Mono, monospace">
              Policy Engine
            </text>
            <text x={575} y={245} textAnchor="middle" fill={colors.textMuted} fontSize={10}>OPA, Service Mesh, etc.</text>
            <text x={575} y={280} textAnchor="middle" fill={colors.warning} fontSize={12} fontWeight="bold">↳ Separate system</text>
          </motion.g>
        )}

        {/* Important distinction */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={340} width={500} height={70} rx={8} fill={`${colors.textPrimary}08`} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={370} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              SPIFFE provides AUTHENTICATION
            </text>
            <text x={400} y={395} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              (proving who you are), not AUTHORIZATION (what you can do)
            </text>
          </motion.g>
        )}

        {/* Clarification */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={450} textAnchor="middle" fill={colors.textMuted} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Authorization is handled separately by your application or policies
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
