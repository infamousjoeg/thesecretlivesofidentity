import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 3-10: Selectors: The Criteria
 * Visual: Various selector types
 */
export const Frame3_10: React.FC = () => {
  const { phase } = useAnimationPhase([0, 400, 400, 400, 400]);

  const selectors = [
    { type: 'Kubernetes', examples: ['k8s:ns:production', 'k8s:pod-label:app=api', 'k8s:sa:payments'], color: colors.server },
    { type: 'Unix', examples: ['unix:uid:1000', 'unix:gid:docker', 'unix:path:/usr/bin/app'], color: colors.agent },
    { type: 'Docker', examples: ['docker:label:env=prod', 'docker:image-id:abc123'], color: colors.svid },
    { type: 'AWS', examples: ['aws:iid:account:123', 'aws:iid:region:us-east-1'], color: colors.trustBundle },
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
          Selectors: The Criteria
        </motion.text>

        <motion.text
          x={400}
          y={75}
          textAnchor="middle"
          fill={colors.textMuted}
          fontSize={14}
          fontFamily="IBM Plex Sans, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Selectors describe workload properties the Agent can verify
        </motion.text>

        {/* Selector types */}
        {selectors.map((sel, index) => (
          phase >= index + 1 && (
            <motion.g
              key={sel.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect
                x={100}
                y={100 + index * 90}
                width={600}
                height={75}
                rx={8}
                fill={colors.surface}
                stroke={sel.color}
                strokeWidth={2}
              />
              <rect
                x={100}
                y={100 + index * 90}
                width={120}
                height={75}
                rx={8}
                fill={sel.color}
              />
              <text x={160} y={145 + index * 90} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
                {sel.type}
              </text>
              {sel.examples.map((ex, i) => (
                <text
                  key={ex}
                  x={240 + i * 180}
                  y={145 + index * 90}
                  fill={colors.textPrimary}
                  fontSize={10}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {ex}
                </text>
              ))}
            </motion.g>
          )
        ))}

        {/* Key insight */}
        {phase >= 4 && (
          <motion.text
            x={400}
            y={480}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={13}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Different platforms expose different properties—selectors are extensible.
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
