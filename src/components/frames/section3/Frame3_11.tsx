import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 3-11: Entry Example
 * Visual: Concrete example of selector matching
 */
export const Frame3_11: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
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
          Entry Example
        </motion.text>

        {/* The entry */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={150} y={70} width={500} height={100} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={400} y={100} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="Space Grotesk, sans-serif">
            Registration Entry
          </text>
          <text x={180} y={130} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            IF
          </text>
          <text x={210} y={130} fill={colors.warning} fontSize={11} fontFamily="JetBrains Mono, monospace">
            k8s:pod-label:app=payments
          </text>
          <text x={420} y={130} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            AND
          </text>
          <text x={460} y={130} fill={colors.warning} fontSize={11} fontFamily="JetBrains Mono, monospace">
            k8s:ns:prod
          </text>
          <text x={180} y={155} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            THEN SPIFFE ID =
          </text>
          <text x={400} y={155} fill={colors.success} fontSize={11} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
            spiffe://acme.com/payments/api
          </text>
        </motion.g>

        {/* Matching workload */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={200} width={280} height={150} rx={8} fill={`${colors.success}10`} stroke={colors.success} strokeWidth={2} />
            <text x={240} y={225} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              ✓ Matching Workload
            </text>
            <Workload label="payments-api" position={{ x: 180, y: 290 }} attested={true} animate={!prefersReducedMotion} size={45} />
            <text x={270} y={270} fill={colors.textMuted} fontSize={10} fontFamily="JetBrains Mono, monospace">
              pod-label: app=payments
            </text>
            <text x={270} y={290} fill={colors.textMuted} fontSize={10} fontFamily="JetBrains Mono, monospace">
              namespace: prod
            </text>
            <text x={270} y={320} fill={colors.success} fontSize={10} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              → Gets SVID!
            </text>
          </motion.g>
        )}

        {/* Non-matching workload */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={420} y={200} width={280} height={150} rx={8} fill={`${colors.attacker}10`} stroke={colors.attacker} strokeWidth={2} />
            <text x={560} y={225} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              ✗ No Match
            </text>
            <Workload label="other-service" position={{ x: 500, y: 290 }} attested={false} animate={false} size={45} showQuestionMark={true} />
            <text x={590} y={270} fill={colors.textMuted} fontSize={10} fontFamily="JetBrains Mono, monospace">
              pod-label: app=frontend
            </text>
            <text x={590} y={290} fill={colors.textMuted} fontSize={10} fontFamily="JetBrains Mono, monospace">
              namespace: prod
            </text>
            <text x={590} y={320} fill={colors.attacker} fontSize={10} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
              → No SVID
            </text>
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={380} width={500} height={70} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={410} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Only workloads matching <tspan fill={colors.warning}>ALL selectors</tspan> get the identity.
            </text>
            <text x={400} y={435} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              This is how SPIRE enforces "who gets what."
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
