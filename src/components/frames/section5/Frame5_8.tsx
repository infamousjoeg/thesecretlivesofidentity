import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-8: The Magic Moment
 * Visual: Workload receiving its cryptographic identity
 */
export const Frame5_8: React.FC = () => {
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
          The Magic Moment
        </motion.text>

        {/* Workload before */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Workload
            label="payments-api"
            position={{ x: 250, y: 200 }}
            attested={phase < 2}
            animate={!prefersReducedMotion}
            size={70}
          />
          {phase < 2 && (
            <text x={250} y={260} textAnchor="middle" fill={colors.textMuted} fontSize={12}>
              No identity
            </text>
          )}
        </motion.g>

        {/* Magic sparkle animation */}
        {phase >= 1 && phase < 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: 1 }}
          >
            <circle cx={400} cy={200} r={100} fill="none" stroke={colors.svid} strokeWidth={2} strokeDasharray="8 4" />
            {!prefersReducedMotion && (
              <>
                <circle cx={350} cy={150} r={4} fill={colors.svid} />
                <circle cx={450} cy={160} r={3} fill={colors.svid} />
                <circle cx={380} cy={250} r={5} fill={colors.svid} />
              </>
            )}
          </motion.g>
        )}

        {/* Workload with badge after */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Workload
              label="payments-api"
              position={{ x: 550, y: 200 }}
              attested={true}
              animate={!prefersReducedMotion}
              size={70}
            />
            <Badge
              spiffeId="spiffe://acme/payments/api"
              position={{ x: 550, y: 300 }}
              state="valid"
              size={60}
              animate={!prefersReducedMotion}
            />
            <line x1={550} y1={250} x2={550} y2={265} stroke={colors.success} strokeWidth={2} />
          </motion.g>
        )}

        {/* Arrow */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <line x1={340} y1={200} x2={450} y2={200} stroke={colors.success} strokeWidth={3} markerEnd="url(#arrow5-8)" />
            <defs>
              <marker id="arrow5-8" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.success} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={400} width={500} height={70} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={400} y={430} textAnchor="middle" fill={colors.success} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Cryptographically signed identity
            </text>
            <text x={400} y={455} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Without ever providing a secret to get it!
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
