import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, TrustBundle } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-4: The Handshake
 * Visual: Step-by-step mTLS handshake
 */
export const Frame6_4: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500, 500, 600]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={40}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={22}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          The Handshake
        </motion.text>

        {/* Two workloads */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Workload label="A" position={{ x: 150, y: 150 }} attested={true} animate={!prefersReducedMotion} size={50} />
          <Workload label="B" position={{ x: 650, y: 150 }} attested={true} animate={!prefersReducedMotion} size={50} />
        </motion.g>

        {/* Step 1 */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={50} y={210} width={180} height={35} rx={4} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={60} y={232} fill={colors.success} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">1. A presents SVID</text>
            <line x1={230} y1={227} x2={350} y2={227} stroke={colors.success} strokeWidth={2} markerEnd="url(#arr6-4)" />
          </motion.g>
        )}

        {/* Step 2 */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={570} y={210} width={180} height={35} rx={4} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={1} />
            <text x={580} y={232} fill={colors.svid} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">2. B validates SVID</text>
            <TrustBundle position={{ x: 650, y: 265 }} size={30} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Step 3 */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={570} y={300} width={180} height={35} rx={4} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={1} />
            <text x={580} y={322} fill={colors.svid} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">3. B presents SVID</text>
            <line x1={570} y1={317} x2={450} y2={317} stroke={colors.svid} strokeWidth={2} markerEnd="url(#arr6-4b)" />
          </motion.g>
        )}

        {/* Step 4 */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={50} y={300} width={180} height={35} rx={4} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={60} y={322} fill={colors.success} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">4. A validates SVID</text>
            <TrustBundle position={{ x: 150, y: 355 }} size={30} animate={!prefersReducedMotion} />
          </motion.g>
        )}

        {/* Step 5 */}
        {phase >= 5 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={250} y={390} width={300} height={50} rx={8} fill={colors.success} />
            <text x={400} y={420} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              5. Encrypted channel established!
            </text>
            <line x1={200} y1={160} x2={600} y2={160} stroke={colors.success} strokeWidth={4} strokeDasharray="10 5" />
          </motion.g>
        )}

        <defs>
          <marker id="arr6-4" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.success} />
          </marker>
          <marker id="arr6-4b" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={colors.svid} />
          </marker>
        </defs>
      </svg>
    </Stage>
  );
};
