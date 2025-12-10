import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-6: How the Agent Decides
 * Visual: Agent gathering workload metadata
 */
export const Frame5_6: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500, 600]);
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
          How the Agent Decides
        </motion.text>

        {/* Workload */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Workload
            label="workload"
            position={{ x: 150, y: 250 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Agent */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SpireAgent
            label="Agent"
            position={{ x: 650, y: 250 }}
            active={true}
            animate={!prefersReducedMotion}
            size={60}
          />
        </motion.g>

        {/* Properties being examined */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={280} y={130} width={200} height={40} rx={6} fill={colors.surface} stroke={colors.agent} strokeWidth={1} />
            <text x={290} y={155} fill={colors.agent} fontSize={12} fontFamily="JetBrains Mono, monospace">PID: 12345</text>
            <line x1={220} y1={230} x2={275} y2={150} stroke={colors.agent} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={280} y={190} width={200} height={40} rx={6} fill={colors.surface} stroke={colors.agent} strokeWidth={1} />
            <text x={290} y={215} fill={colors.agent} fontSize={12} fontFamily="JetBrains Mono, monospace">UID: 1000 (app)</text>
            <line x1={220} y1={250} x2={275} y2={210} stroke={colors.agent} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={280} y={250} width={200} height={40} rx={6} fill={colors.surface} stroke={colors.agent} strokeWidth={1} />
            <text x={290} y={275} fill={colors.agent} fontSize={12} fontFamily="JetBrains Mono, monospace">Container: abc123</text>
            <line x1={220} y1={260} x2={275} y2={270} stroke={colors.agent} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={280} y={310} width={200} height={40} rx={6} fill={colors.surface} stroke={colors.agent} strokeWidth={1} />
            <text x={290} y={335} fill={colors.agent} fontSize={12} fontFamily="JetBrains Mono, monospace">K8s: ns/payments</text>
            <line x1={220} y1={270} x2={275} y2={330} stroke={colors.agent} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {/* Arrows to Agent */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={490} y1={200} x2={590} y2={240} stroke={colors.agent} strokeWidth={2} markerEnd="url(#arrow5-6)" />
            <defs>
              <marker id="arrow5-6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.agent} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Question */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={420} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Agent examines: What process? What user?
            </text>
            <text x={400} y={445} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              What container? What K8s metadata?
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
