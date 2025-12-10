import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-4: Server Responsibilities
 * Visual: Server with its three main responsibilities
 */
export const Frame3_4: React.FC = () => {
  const { phase } = useAnimationPhase([0, 400, 400, 400]);
  const prefersReducedMotion = useReducedMotion();

  const responsibilities = [
    { title: 'Registry', desc: 'Maintains workload entries', icon: '📋' },
    { title: 'SVID Issuer', desc: 'Signs identity documents', icon: '✍️' },
    { title: 'Trust Manager', desc: 'Manages trust bundles', icon: '🔐' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={45}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={22}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Server Responsibilities
        </motion.text>

        {/* Server */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpireServer
            label="SPIRE Server"
            position={{ x: 400, y: 150 }}
            size={70}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Responsibilities */}
        {responsibilities.map((resp, index) => (
          phase >= index + 1 && (
            <motion.g
              key={resp.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <line
                x1={400}
                y1={200}
                x2={150 + index * 250}
                y2={290}
                stroke={colors.server}
                strokeWidth={2}
                strokeDasharray="5 3"
              />
              <rect
                x={75 + index * 250}
                y={300}
                width={150}
                height={100}
                rx={8}
                fill={colors.surface}
                stroke={colors.server}
                strokeWidth={2}
              />
              <text x={150 + index * 250} y={335} textAnchor="middle" fontSize={24}>
                {resp.icon}
              </text>
              <text x={150 + index * 250} y={365} textAnchor="middle" fill={colors.server} fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {resp.title}
              </text>
              <text x={150 + index * 250} y={385} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
                {resp.desc}
              </text>
            </motion.g>
          )
        ))}

        {/* Summary */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={450}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={13}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            The Server is the brain of the operation—it knows who should get which identity.
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
