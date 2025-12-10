import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireAgent, RegistrationEntry } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-7: Matching Against Entries
 * Visual: Agent comparing selectors to registration entries
 */
export const Frame5_7: React.FC = () => {
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
          Matching Against Entries
        </motion.text>

        {/* Collected selectors */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={50} y={120} width={180} height={120} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
          <text x={140} y={145} textAnchor="middle" fill={colors.agent} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            Collected Selectors
          </text>
          <text x={70} y={170} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">k8s:ns:payments</text>
          <text x={70} y={190} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">k8s:sa:api-svc</text>
          <text x={70} y={210} fill={colors.textSecondary} fontSize={11} fontFamily="JetBrains Mono, monospace">unix:uid:1000</text>
        </motion.g>

        {/* Agent in the middle */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SpireAgent
            label="Agent"
            position={{ x: 400, y: 180 }}
            active={true}
            animate={!prefersReducedMotion}
            size={60}
          />
        </motion.g>

        {/* Registration entries */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RegistrationEntry
              spiffeId="spiffe://acme/payments/api"
              selectors={['k8s:ns:payments', 'k8s:sa:api-svc']}
              position={{ x: 650, y: 130 }}
              highlighted={false}
            />
            <RegistrationEntry
              spiffeId="spiffe://acme/other"
              selectors={['k8s:ns:other']}
              position={{ x: 650, y: 260 }}
              highlighted={false}
            />
          </motion.g>
        )}

        {/* Comparison arrows */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={240} y1={180} x2={340} y2={180} stroke={colors.agent} strokeWidth={2} markerEnd="url(#arrow5-7)" />
            <line x1={460} y1={180} x2={540} y2={150} stroke={colors.success} strokeWidth={2} markerEnd="url(#arrow5-7-g)" />
            <defs>
              <marker id="arrow5-7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.agent} />
              </marker>
              <marker id="arrow5-7-g" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.success} />
              </marker>
            </defs>
            <text x={500} y={140} fill={colors.success} fontSize={12} fontWeight="bold">✓ Match!</text>
          </motion.g>
        )}

        {/* Result */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={380} width={400} height={80} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={410} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Match found!
            </text>
            <text x={400} y={435} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="JetBrains Mono, monospace">
              → Issue SVID for spiffe://acme/payments/api
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
