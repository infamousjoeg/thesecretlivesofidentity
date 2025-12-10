import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 8-3: The Badge Metaphor (Federation)
 * Visual: Partnership agreement for badge acceptance
 */
export const Frame8_3: React.FC = () => {
  const { phase } = useAnimationPhase([0, 700, 700, 600]);
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
          The Badge Metaphor
        </motion.text>

        {/* Two buildings */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Acme building */}
          <rect x={100} y={150} width={180} height={200} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={190} y={130} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold">ACME Corp</text>
          <text x={190} y={250} textAnchor="middle" fontSize={50}>🏢</text>

          {/* Partner building */}
          <rect x={520} y={150} width={180} height={200} rx={8} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
          <text x={610} y={130} textAnchor="middle" fill={colors.svid} fontSize={14} fontWeight="bold">Partner Inc</text>
          <text x={610} y={250} textAnchor="middle" fontSize={50}>🏢</text>
        </motion.g>

        {/* Partnership agreement */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={300} y={180} width={200} height={80} rx={8} fill={`${colors.trustBundle}20`} stroke={colors.trustBundle} strokeWidth={2} />
            <text x={400} y={205} textAnchor="middle" fill={colors.trustBundle} fontSize={12} fontWeight="bold">Partnership Agreement</text>
            <text x={400} y={230} textAnchor="middle" fill={colors.textSecondary} fontSize={11}>"We'll accept your badges"</text>
            <text x={400} y={250} textAnchor="middle" fontSize={20}>🤝</text>
          </motion.g>
        )}

        {/* Badge being accepted */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge spiffeId="Acme Employee" position={{ x: 400, y: 320 }} state="valid" size={50} animate={!prefersReducedMotion} />
            <line x1={285} y1={280} x2={370} y2={310} stroke={colors.success} strokeWidth={2} strokeDasharray="6 3" />
            <text x={350} y={285} fill={colors.success} fontSize={10}>accepted at Partner!</text>
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={400} width={500} height={70} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={430} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              "We'll accept badges from Partner Corp at our facilities"
            </text>
            <text x={400} y={455} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Federation = Cross-company badge recognition
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
