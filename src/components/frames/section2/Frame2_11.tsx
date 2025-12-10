import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 2-11: SVIDs Are Short-Lived
 * Visual: Timeline showing SVID expiration and renewal
 */
export const Frame2_11: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600, 600]);

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
          SVIDs Are Short-Lived
        </motion.text>

        {/* Timeline */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <line x1={100} y1={300} x2={700} y2={300} stroke={colors.textMuted} strokeWidth={2} />

          {/* Time markers */}
          {['0h', '1h', '2h', '3h', '4h', '5h'].map((time, i) => (
            <g key={time} transform={`translate(${150 + i * 100}, 300)`}>
              <line y1={-5} y2={5} stroke={colors.textMuted} strokeWidth={2} />
              <text y={25} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="JetBrains Mono, monospace">
                {time}
              </text>
            </g>
          ))}
        </motion.g>

        {/* First SVID */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={200} width={200} height={80} rx={8} fill={`${colors.svid}20`} stroke={colors.svid} strokeWidth={2} />
            <Badge spiffeId="SVID #1" position={{ x: 200, y: 240 }} state="valid" size={40} showCountdown={false} animate={false} />
            <text x={300} y={245} fill={colors.svid} fontSize={12} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Valid: 0-2h
            </text>
          </motion.g>
        )}

        {/* Second SVID (overlapping) */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={300} y={200} width={200} height={80} rx={8} fill={`${colors.success}20`} stroke={colors.success} strokeWidth={2} />
            <Badge spiffeId="SVID #2" position={{ x: 350, y: 240 }} state="valid" size={40} showCountdown={false} animate={false} />
            <text x={450} y={245} fill={colors.success} fontSize={12} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Valid: 1.5-3.5h
            </text>
          </motion.g>
        )}

        {/* Third SVID */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={200} width={200} height={80} rx={8} fill={`${colors.agent}20`} stroke={colors.agent} strokeWidth={2} />
            <Badge spiffeId="SVID #3" position={{ x: 500, y: 240 }} state="valid" size={40} showCountdown={false} animate={false} />
            <text x={600} y={245} fill={colors.agent} fontSize={12} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Valid: 3-5h
            </text>
          </motion.g>
        )}

        {/* Overlap indicator */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={300} y={170} width={100} height={25} rx={4} fill={colors.background} stroke={colors.textMuted} strokeWidth={1} />
            <text x={350} y={187} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              Overlap
            </text>
          </motion.g>
        )}

        {/* Comparison */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={380} width={500} height={90} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />

            {/* Password comparison */}
            <text x={275} y={410} textAnchor="middle" fill={colors.attacker} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Passwords
            </text>
            <text x={275} y={435} textAnchor="middle" fill={colors.textMuted} fontSize={24} fontFamily="JetBrains Mono, monospace">
              90+ days
            </text>

            {/* Divider */}
            <line x1={400} y1={395} x2={400} y2={455} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={390} textAnchor="middle" fill={colors.textMuted} fontSize={10}>vs</text>

            {/* SVID comparison */}
            <text x={525} y={410} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              SVIDs
            </text>
            <text x={525} y={435} textAnchor="middle" fill={colors.success} fontSize={24} fontFamily="JetBrains Mono, monospace">
              minutes
            </text>
          </motion.g>
        )}

        {/* Key message */}
        {phase >= 4 && (
          <motion.text
            x={400}
            y={490}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={13}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Short lifetimes = limited blast radius if compromised
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
