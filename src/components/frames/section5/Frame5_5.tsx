import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, SpireAgent } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-5: The Workload API
 * Visual: Unix socket connection, no credentials
 */
export const Frame5_5: React.FC = () => {
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
          The Workload API
        </motion.text>

        {/* Agent */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireAgent
            label="SPIRE Agent"
            position={{ x: 600, y: 200 }}
            active={true}
            animate={!prefersReducedMotion}
            size={70}
          />
        </motion.g>

        {/* Workload */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Workload
            label="my-service"
            position={{ x: 200, y: 200 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Unix socket */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={330} y={170} width={140} height={60} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
            <text x={400} y={195} textAnchor="middle" fill={colors.agent} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Unix Socket
            </text>
            <text x={400} y={215} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="JetBrains Mono, monospace">
              /run/spire/agent.sock
            </text>
          </motion.g>
        )}

        {/* Connection lines */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={270} y1={200} x2={325} y2={200} stroke={colors.agent} strokeWidth={2} />
            <line x1={475} y1={200} x2={530} y2={200} stroke={colors.agent} strokeWidth={2} />
          </motion.g>
        )}

        {/* Key point - no credentials */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={250} y={280} width={300} height={80} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={310} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              No credentials needed!
            </text>
            <text x={400} y={335} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Workloads just connect to the socket
            </text>
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={420} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              The Agent uses the connection itself
            </text>
            <text x={400} y={445} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              to identify who's calling (process info)
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
