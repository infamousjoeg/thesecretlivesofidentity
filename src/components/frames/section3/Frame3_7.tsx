import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent, Workload, Connection } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-7: The Architecture
 * Visual: Full Server + multiple Agents + workloads architecture
 */
export const Frame3_7: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500]);
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
          The Architecture
        </motion.text>

        {/* Server at top */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SpireServer label="SPIRE Server" position={{ x: 400, y: 100 }} size={60} animate={!prefersReducedMotion} />
          <text x={400} y={150} textAnchor="middle" fill={colors.server} fontSize={11} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
            Central Authority
          </text>
        </motion.g>

        {/* Connections to Agents */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Connection from={{ x: 400, y: 130 }} to={{ x: 200, y: 220 }} status="established" animate={false} />
            <Connection from={{ x: 400, y: 130 }} to={{ x: 400, y: 220 }} status="established" animate={false} />
            <Connection from={{ x: 400, y: 130 }} to={{ x: 600, y: 220 }} status="established" animate={false} />
          </motion.g>
        )}

        {/* Agents */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Node 1 */}
            <rect x={120} y={200} width={160} height={150} rx={8} fill={`${colors.agent}08`} stroke={colors.agent} strokeWidth={1} strokeDasharray="5 3" />
            <SpireAgent label="Agent" position={{ x: 200, y: 250 }} size={40} active={true} animate={false} />

            {/* Node 2 */}
            <rect x={320} y={200} width={160} height={150} rx={8} fill={`${colors.agent}08`} stroke={colors.agent} strokeWidth={1} strokeDasharray="5 3" />
            <SpireAgent label="Agent" position={{ x: 400, y: 250 }} size={40} active={true} animate={false} />

            {/* Node 3 */}
            <rect x={520} y={200} width={160} height={150} rx={8} fill={`${colors.agent}08`} stroke={colors.agent} strokeWidth={1} strokeDasharray="5 3" />
            <SpireAgent label="Agent" position={{ x: 600, y: 250 }} size={40} active={true} animate={false} />
          </motion.g>
        )}

        {/* Workloads */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Workload label="api" position={{ x: 170, y: 320 }} attested={true} animate={false} size={30} />
            <Workload label="web" position={{ x: 230, y: 320 }} attested={true} animate={false} size={30} />

            <Workload label="auth" position={{ x: 370, y: 320 }} attested={true} animate={false} size={30} />
            <Workload label="db" position={{ x: 430, y: 320 }} attested={true} animate={false} size={30} />

            <Workload label="cache" position={{ x: 570, y: 320 }} attested={true} animate={false} size={30} />
            <Workload label="queue" position={{ x: 630, y: 320 }} attested={true} animate={false} size={30} />
          </motion.g>
        )}

        {/* Summary boxes */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={390} width={200} height={50} rx={6} fill={colors.surface} stroke={colors.server} strokeWidth={1} />
            <text x={250} y={415} textAnchor="middle" fill={colors.server} fontSize={11} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Server: Central management
            </text>
            <text x={250} y={432} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              Identity policy & signing
            </text>

            <rect x={450} y={390} width={200} height={50} rx={6} fill={colors.surface} stroke={colors.agent} strokeWidth={1} />
            <text x={550} y={415} textAnchor="middle" fill={colors.agent} fontSize={11} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Agents: Local distribution
            </text>
            <text x={550} y={432} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              Fast, local badge issuance
            </text>
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={475}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={12}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Together they form a distributed identity system.
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
