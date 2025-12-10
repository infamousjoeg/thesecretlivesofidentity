import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { TrustBundle } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-2: Federation
 * Visual: Trust bundles being exchanged
 */
export const Frame8_2: React.FC = () => {
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
          Federation
        </motion.text>

        {/* Two domains */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={150} width={200} height={200} rx={12} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={200} y={190} textAnchor="middle" fill={colors.success} fontSize={16} fontWeight="bold">acme.com</text>
          <TrustBundle position={{ x: 200, y: 260 }} size={50} animate={!prefersReducedMotion} />

          <rect x={500} y={150} width={200} height={200} rx={12} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
          <text x={600} y={190} textAnchor="middle" fill={colors.svid} fontSize={16} fontWeight="bold">partner.io</text>
          <TrustBundle position={{ x: 600, y: 260 }} size={50} animate={!prefersReducedMotion} />
        </motion.g>

        {/* Federation arrows */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={310} y1={230} x2={490} y2={230} stroke={colors.trustBundle} strokeWidth={3} markerEnd="url(#fed-arrow)" />
            <line x1={490} y1={290} x2={310} y2={290} stroke={colors.trustBundle} strokeWidth={3} markerEnd="url(#fed-arrow)" />
            <text x={400} y={215} textAnchor="middle" fill={colors.trustBundle} fontSize={11}>trust bundle</text>
            <text x={400} y={320} textAnchor="middle" fill={colors.trustBundle} fontSize={11}>trust bundle</text>
            <defs>
              <marker id="fed-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.trustBundle} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Connected */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={300} y={380} width={200} height={50} rx={8} fill={colors.success} />
            <text x={400} y={410} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">
              Federated! ✓
            </text>
          </motion.g>
        )}

        {/* Description */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={470} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Domains exchange trust bundles to verify each other's SVIDs
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
