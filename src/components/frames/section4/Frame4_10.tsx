import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Attacker } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 4-10: Why Attackers Can't Spoof
 * Visual: Attacker unable to fake node attestation
 */
export const Frame4_10: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

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
          Why Attackers Can't Spoof
        </motion.text>

        {/* Attacker scenario */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Attacker */}
          <Attacker label="Attacker" position={{ x: 200, y: 200 }} size={70} blocked={false} animate={!prefersReducedMotion} />

          {/* Thought bubble */}
          <ellipse cx={300} cy={130} rx={80} ry={40} fill={colors.surface} stroke={colors.attacker} strokeWidth={1} />
          <circle cx={240} cy={160} r={8} fill={colors.surface} stroke={colors.attacker} strokeWidth={1} />
          <circle cx={220} cy={175} r={5} fill={colors.surface} stroke={colors.attacker} strokeWidth={1} />
          <text x={300} y={125} textAnchor="middle" fill={colors.attacker} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
            I'll pretend to be
          </text>
          <text x={300} y={140} textAnchor="middle" fill={colors.attacker} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
            a trusted Agent!
          </text>
        </motion.g>

        {/* Failed attempt */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={270} y1={200} x2={380} y2={200} stroke={colors.attacker} strokeWidth={3} strokeDasharray="10 5" />
            <text x={325} y={185} textAnchor="middle" fill={colors.attacker} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              "I'm node X!"
            </text>

            {/* Big X */}
            <circle cx={430} cy={200} r={30} fill={colors.attacker} opacity={0.2} />
            <text x={430} y={210} textAnchor="middle" fill={colors.attacker} fontSize={30} fontWeight="bold">✗</text>
          </motion.g>
        )}

        {/* Platform verification */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={500} y={130} width={230} height={140} rx={12} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={615} y={165} textAnchor="middle" fontSize={24}>☁️</text>
            <text x={615} y={195} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Platform Says:
            </text>
            <text x={615} y={220} textAnchor="middle" fill={colors.textPrimary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              "I have no record of
            </text>
            <text x={615} y={240} textAnchor="middle" fill={colors.textPrimary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              this supposed Agent."
            </text>
            <text x={615} y={260} textAnchor="middle" fill={colors.attacker} fontSize={10} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              REJECTED
            </text>
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={320} width={600} height={140} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={355} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Why This Works
            </text>
            <text x={400} y={385} textAnchor="middle" fill={colors.textPrimary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              To fake node attestation, an attacker would need to:
            </text>
            <text x={400} y={410} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              Compromise the platform itself (AWS, K8s, GCP...)
            </text>
            <text x={400} y={440} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              A much harder target than stealing a credential
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
