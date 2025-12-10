import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-3: The SPIFFE ID
 * Visual: Workload with its SPIFFE ID label
 */
export const Frame2_3: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 800]);
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
          The SPIFFE ID
        </motion.text>

        {/* Workload */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Workload
            label="payment-api"
            position={{ x: 400, y: 200 }}
            attested={true}
            animate={!prefersReducedMotion}
            size={80}
          />
        </motion.g>

        {/* SPIFFE ID appearing */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect
              x={200}
              y={300}
              width={400}
              height={60}
              rx={8}
              fill={colors.surface}
              stroke={colors.svid}
              strokeWidth={2}
            />
            <text
              x={400}
              y={320}
              textAnchor="middle"
              fill={colors.textMuted}
              fontSize={12}
              fontFamily="IBM Plex Sans, sans-serif"
            >
              SPIFFE ID
            </text>
            <text
              x={400}
              y={345}
              textAnchor="middle"
              fill={colors.svid}
              fontSize={16}
              fontWeight="bold"
              fontFamily="JetBrains Mono, monospace"
            >
              spiffe://trust-domain/path
            </text>
          </motion.g>
        )}

        {/* Real example */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect
              x={200}
              y={380}
              width={400}
              height={50}
              rx={8}
              fill={`${colors.success}15`}
              stroke={colors.success}
              strokeWidth={1}
            />
            <text
              x={400}
              y={412}
              textAnchor="middle"
              fill={colors.success}
              fontSize={14}
              fontFamily="JetBrains Mono, monospace"
            >
              spiffe://acme.com/payments/api
            </text>
          </motion.g>
        )}

        {/* Key point */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text
              x={400}
              y={470}
              textAnchor="middle"
              fill={colors.textPrimary}
              fontSize={16}
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              A unique, permanent name in URI format
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
