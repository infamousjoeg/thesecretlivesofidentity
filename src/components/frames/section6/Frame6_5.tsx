import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { TrustBundle, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-5: Trust Bundle: The Verifier
 * Visual: Trust bundle containing public keys
 */
export const Frame6_5: React.FC = () => {
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
          Trust Bundle: The Verifier
        </motion.text>

        {/* Question */}
        <motion.text
          x={400}
          y={90}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={14}
          fontFamily="IBM Plex Sans, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          How does a workload know to trust another's SVID?
        </motion.text>

        {/* Trust bundle */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TrustBundle position={{ x: 400, y: 200 }} size={80} animate={!prefersReducedMotion} />
          <text x={400} y={260} textAnchor="middle" fill={colors.trustBundle} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Trust Bundle
          </text>
        </motion.g>

        {/* Contents */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={290} width={400} height={100} rx={8} fill={colors.surface} stroke={colors.trustBundle} strokeWidth={2} />
            <text x={400} y={320} textAnchor="middle" fill={colors.trustBundle} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Contains:
            </text>
            <text x={400} y={350} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Public keys of trusted Certificate Authorities
            </text>
            <text x={400} y={375} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="JetBrains Mono, monospace">
              (from SPIRE Server)
            </text>
          </motion.g>
        )}

        {/* Incoming badge verification */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge spiffeId="spiffe://acme/other" position={{ x: 100, y: 200 }} state="valid" size={50} animate={!prefersReducedMotion} />
            <line x1={160} y1={200} x2={310} y2={200} stroke={colors.svid} strokeWidth={2} strokeDasharray="6 3" />
            <text x={235} y={185} textAnchor="middle" fill={colors.textMuted} fontSize={10}>verify?</text>
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <circle cx={530} cy={200} r={20} fill={colors.success} />
            <text x={530} y={207} textAnchor="middle" fill="white" fontSize={16}>✓</text>
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={430} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              If the SVID was signed by a CA in my trust bundle,
            </text>
            <text x={400} y={455} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              I can trust it!
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
