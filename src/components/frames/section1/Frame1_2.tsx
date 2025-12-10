import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-2: The Old Way: Secrets
 * Visual: Workloads connected by lines with key/lock icons representing API keys
 */
export const Frame1_2: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  const secrets = [
    { x: 300, y: 150, label: 'API_KEY_1' },
    { x: 500, y: 150, label: 'DB_PASSWORD' },
    { x: 300, y: 350, label: 'JWT_SECRET' },
    { x: 500, y: 350, label: 'OAUTH_TOKEN' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Central service */}
        <Workload
          label="your-service"
          position={{ x: 400, y: 250 }}
          attested={false}
          animate={!prefersReducedMotion}
        />

        {/* Secrets floating around */}
        {secrets.map((secret, index) => (
          phase >= index + 1 && (
            <motion.g
              key={secret.label}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Key icon */}
              <rect
                x={secret.x - 40}
                y={secret.y - 15}
                width={80}
                height={30}
                rx={4}
                fill={colors.surface}
                stroke={colors.warning}
                strokeWidth={2}
              />
              <text
                x={secret.x - 32}
                y={secret.y + 4}
                fill={colors.warning}
                fontSize={10}
                fontFamily="JetBrains Mono, monospace"
              >
                🔑
              </text>
              <text
                x={secret.x - 15}
                y={secret.y + 4}
                fill={colors.textSecondary}
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
              >
                {secret.label}
              </text>

              {/* Dashed line to center */}
              <motion.line
                x1={secret.x}
                y1={secret.y + 15}
                x2={400}
                y2={250 + (secret.y < 250 ? -30 : 30)}
                stroke={colors.warning}
                strokeWidth={1}
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.g>
          )
        ))}

        {/* Caption */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={460}
            textAnchor="middle"
            fill={colors.textMuted}
            fontSize={14}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Secrets everywhere: distributed, stored, rotated...
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
