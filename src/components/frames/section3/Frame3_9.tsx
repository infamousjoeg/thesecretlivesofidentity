import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { RegistrationEntry } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 3-9: Registration Entries Explained
 * Visual: Registration entry as HR record
 */
export const Frame3_9: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500]);

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
          Registration Entries
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
          The HR records of the identity system
        </motion.text>

        {/* HR metaphor */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={110} width={260} height={200} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={2} />
            <rect x={100} y={110} width={260} height={35} rx={8} fill={colors.textMuted} />
            <text x={230} y={133} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              HR EMPLOYEE RECORD
            </text>
            <text x={130} y={170} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Name:
            </text>
            <text x={200} y={170} fill={colors.textPrimary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Alice Smith
            </text>
            <text x={130} y={195} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Department:
            </text>
            <text x={220} y={195} fill={colors.textPrimary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Engineering
            </text>
            <text x={130} y={220} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Role:
            </text>
            <text x={200} y={220} fill={colors.textPrimary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Developer
            </text>
            <line x1={120} y1={240} x2={340} y2={240} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4 2" />
            <text x={130} y={265} fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Employee ID:
            </text>
            <text x={240} y={265} fill={colors.success} fontSize={11} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              EMP-12345
            </text>
            <text x={230} y={295} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              Properties → ID
            </text>
          </motion.g>
        )}

        {/* Arrow */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <line x1={380} y1={210} x2={420} y2={210} stroke={colors.textMuted} strokeWidth={2} />
            <polygon points="430,210 420,205 420,215" fill={colors.textMuted} />
          </motion.g>
        )}

        {/* Registration Entry */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RegistrationEntry
              spiffeId="spiffe://acme.com/payments/api"
              selectors={['k8s:pod-label:app=payments', 'k8s:ns:production']}
              position={{ x: 570, y: 210 }}
              size={1}
            />
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={380} width={500} height={80} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={410} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              Registration entries map <tspan fill={colors.warning} fontWeight="bold">selectors</tspan> (workload properties)
            </text>
            <text x={400} y={435} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              to <tspan fill={colors.success} fontWeight="bold">SPIFFE IDs</tspan> (identity)
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
