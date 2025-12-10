import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-10: But Wait—Is There a Secret?
 * Visual: Revealing that SVIDs do have private keys
 */
export const Frame5_10: React.FC = () => {
  const { phase } = useAnimationPhase([0, 800, 800, 600]);
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
          But Wait—Is There a Secret?
        </motion.text>

        {/* Badge */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            spiffeId="spiffe://acme/api"
            position={{ x: 300, y: 200 }}
            state="valid"
            size={70}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Question */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={420} y={150} width={280} height={100} rx={8} fill={colors.surface} stroke={colors.warning} strokeWidth={2} />
            <text x={560} y={180} textAnchor="middle" fill={colors.warning} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Wait a minute...
            </text>
            <text x={560} y={210} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Doesn't the SVID have
            </text>
            <text x={560} y={230} textAnchor="middle" fill={colors.warning} fontSize={14} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              a private key?
            </text>
          </motion.g>
        )}

        {/* Answer */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={300} width={500} height={60} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={330} textAnchor="middle" fill={colors.success} fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Yes! But it's fundamentally different.
            </text>
            <text x={400} y={350} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Let's see why...
            </text>
          </motion.g>
        )}

        {/* Teaser */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={420} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              The difference between an SVID private key
            </text>
            <text x={400} y={445} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              and a traditional shared secret is night and day.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
