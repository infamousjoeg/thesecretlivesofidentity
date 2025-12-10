import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-2: Three Core Ideas
 * Visual: Three pillars of SPIFFE
 */
export const Frame2_2: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500]);
  const prefersReducedMotion = useReducedMotion();

  const pillars = [
    { icon: '🏷️', title: 'NAME', desc: 'A way to name workloads', color: colors.server },
    { icon: '📜', title: 'PROVE', desc: 'A way to prove that name', color: colors.svid },
    { icon: '✓', title: 'VERIFY', desc: 'A way to verify proofs', color: colors.success },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={60}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={24}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Three Core Ideas
        </motion.text>

        {/* Three pillars */}
        {pillars.map((pillar, index) => (
          phase >= index + 1 && (
            <motion.g
              key={pillar.title}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Pillar */}
              <rect
                x={140 + index * 220}
                y={150}
                width={160}
                height={250}
                rx={8}
                fill={colors.surface}
                stroke={pillar.color}
                strokeWidth={2}
              />

              {/* Top cap */}
              <rect
                x={140 + index * 220}
                y={150}
                width={160}
                height={50}
                rx={8}
                fill={pillar.color}
              />

              {/* Number */}
              <circle cx={170 + index * 220} cy={175} r={15} fill="white" opacity={0.9} />
              <text
                x={170 + index * 220}
                y={181}
                textAnchor="middle"
                fill={pillar.color}
                fontSize={16}
                fontWeight="bold"
                fontFamily="Space Grotesk, sans-serif"
              >
                {index + 1}
              </text>

              {/* Icon */}
              <text
                x={220 + index * 220}
                y={260}
                textAnchor="middle"
                fontSize={48}
              >
                {pillar.icon}
              </text>

              {/* Title */}
              <text
                x={220 + index * 220}
                y={320}
                textAnchor="middle"
                fill={colors.textPrimary}
                fontSize={18}
                fontWeight="bold"
                fontFamily="Space Grotesk, sans-serif"
              >
                {pillar.title}
              </text>

              {/* Description */}
              <text
                x={220 + index * 220}
                y={350}
                textAnchor="middle"
                fill={colors.textMuted}
                fontSize={12}
                fontFamily="IBM Plex Sans, sans-serif"
              >
                {pillar.desc}
              </text>
            </motion.g>
          )
        ))}

        {/* Connecting arrows */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <path
              d="M 310 275 L 350 275"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth={2}
              markerEnd="url(#arrowGray)"
            />
            <path
              d="M 530 275 L 570 275"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth={2}
              markerEnd="url(#arrowGray)"
            />
            <defs>
              <marker id="arrowGray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.textMuted} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Summary */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={450}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={14}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Together, these enable secure workload identity.
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
