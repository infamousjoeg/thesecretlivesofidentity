import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-4: Developer Experience
 * Visual: Simple workload API call, getting identity
 */
export const Frame5_4: React.FC = () => {
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
          Developer Experience
        </motion.text>

        {/* Subtitle */}
        <motion.text
          x={400}
          y={80}
          textAnchor="middle"
          fill={colors.success}
          fontSize={16}
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Beautifully Simple
        </motion.text>

        {/* Workload */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Workload
            label="my-service"
            position={{ x: 200, y: 250 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* API Call */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={320} y={200} width={280} height={100} rx={8} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
            <text x={460} y={225} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Code:
            </text>
            <text x={340} y={250} fill={colors.svid} fontSize={13} fontFamily="JetBrains Mono, monospace">
              svid = workload_api.
            </text>
            <text x={340} y={275} fill={colors.svid} fontSize={13} fontFamily="JetBrains Mono, monospace">
              &nbsp;&nbsp;fetch_svid()
            </text>
          </motion.g>
        )}

        {/* Arrow and result */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={610} y1={250} x2={680} y2={250} stroke={colors.success} strokeWidth={2} markerEnd="url(#arrow5-4)" />
            <defs>
              <marker id="arrow5-4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.success} />
              </marker>
            </defs>
            <Badge
              spiffeId="spiffe://acme/my-service"
              position={{ x: 700, y: 250 }}
              state="valid"
              size={50}
              animate={!prefersReducedMotion}
            />
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={380} width={500} height={80} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={410} textAnchor="middle" fill={colors.textPrimary} fontSize={16} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Call the Workload API, get your identity
            </text>
            <text x={400} y={435} textAnchor="middle" fill={colors.textSecondary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              No credentials needed. No secrets to manage.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
