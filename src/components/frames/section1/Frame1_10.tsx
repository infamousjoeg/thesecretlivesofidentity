import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge, SpireServer } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-10: Enter SPIFFE
 * Visual: Introduction of SPIFFE - workloads with real cryptographic identity
 */
export const Frame1_10: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600, 800]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* SPIFFE logo/title reveal */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <text
            x={400}
            y={60}
            textAnchor="middle"
            fill={colors.success}
            fontSize={36}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            SPIFFE
          </text>
          <text
            x={400}
            y={90}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={14}
            fontFamily="IBM Plex Sans, sans-serif"
          >
            Secure Production Identity Framework for Everyone
          </text>
        </motion.g>

        {/* Central authority (hint at SPIRE) */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpireServer
              label="Identity Authority"
              position={{ x: 400, y: 200 }}
              animate={!prefersReducedMotion}
              size={80}
            />
          </motion.g>
        )}

        {/* Workloads with badges */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Workload
              label="Service A"
              position={{ x: 200, y: 380 }}
              attested={true}
              showBadge={false}
              animate={!prefersReducedMotion}
            />
            <Badge
              spiffeId="spiffe://acme/a"
              position={{ x: 200, y: 260 }}
              state="valid"
              size={60}
              animate={!prefersReducedMotion}
            />

            <Workload
              label="Service B"
              position={{ x: 600, y: 380 }}
              attested={true}
              showBadge={false}
              animate={!prefersReducedMotion}
            />
            <Badge
              spiffeId="spiffe://acme/b"
              position={{ x: 600, y: 260 }}
              state="valid"
              size={60}
              animate={!prefersReducedMotion}
            />
          </motion.g>
        )}

        {/* Connection lines from authority to workloads */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={340} y1={240} x2={200} y2={290} stroke={colors.success} strokeWidth={2} strokeDasharray="6 3" />
            <line x1={460} y1={240} x2={600} y2={290} stroke={colors.success} strokeWidth={2} strokeDasharray="6 3" />
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={440} width={400} height={50} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={465} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Cryptographic identity without shared secrets
            </text>
            <text x={400} y={485} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Let's see how it works...
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
