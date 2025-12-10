import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 4-4: The Badge Metaphor for Node Attestation
 * Visual: Building verification before badge printer installation
 */
export const Frame4_4: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);

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
          The Badge Metaphor
        </motion.text>

        {/* Building visual */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Building */}
          <rect x={300} y={100} width={200} height={180} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
          <rect x={370} y={80} width={60} height={30} rx={4} fill={colors.agent} />
          <text x={400} y={100} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            BUILDING
          </text>

          {/* Windows */}
          <rect x={320} y={130} width={30} height={30} fill={`${colors.agent}30`} />
          <rect x={360} y={130} width={30} height={30} fill={`${colors.agent}30`} />
          <rect x={410} y={130} width={30} height={30} fill={`${colors.agent}30`} />
          <rect x={450} y={130} width={30} height={30} fill={`${colors.agent}30`} />

          {/* Door */}
          <rect x={375} y={220} width={50} height={60} fill={colors.agent} rx={4} />
        </motion.g>

        {/* Inspector */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={180} width={120} height={80} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <text x={160} y={210} textAnchor="middle" fontSize={24}>🏛️</text>
            <text x={160} y={235} textAnchor="middle" fill={colors.success} fontSize={10} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              City Hall
            </text>
            <text x={160} y={250} textAnchor="middle" fill={colors.textMuted} fontSize={9} fontFamily="IBM Plex Sans, sans-serif">
              Verifies buildings
            </text>
          </motion.g>
        )}

        {/* Verification arrow */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <line x1={230} y1={220} x2={290} y2={220} stroke={colors.success} strokeWidth={2} />
            <polygon points="300,220 290,215 290,225" fill={colors.success} />
            <text x={260} y={210} textAnchor="middle" fill={colors.success} fontSize={9} fontFamily="IBM Plex Sans, sans-serif">
              Verifies
            </text>
          </motion.g>
        )}

        {/* Badge printer */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={560} y={180} width={120} height={80} rx={8} fill={colors.surface} stroke={colors.agent} strokeWidth={2} />
            <text x={620} y={210} textAnchor="middle" fontSize={24}>🖨️</text>
            <text x={620} y={235} textAnchor="middle" fill={colors.agent} fontSize={10} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Badge Printer
            </text>
            <text x={620} y={250} textAnchor="middle" fill={colors.textMuted} fontSize={9} fontFamily="IBM Plex Sans, sans-serif">
              (SPIRE Agent)
            </text>

            <line x1={510} y1={220} x2={550} y2={220} stroke={colors.agent} strokeWidth={2} strokeDasharray="5 3" />
            <polygon points="560,220 550,215 550,225" fill={colors.agent} />
            <text x={530} y={210} textAnchor="middle" fill={colors.textMuted} fontSize={9} fontFamily="IBM Plex Sans, sans-serif">
              Install
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
            <rect x={100} y={320} width={600} height={130} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={355} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Real-World Analogy
            </text>
            <text x={400} y={385} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Before installing a badge printer in a new building,
            </text>
            <text x={400} y={410} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              you verify the building is a <tspan fill={colors.success} fontWeight="bold">legitimate company facility</tspan>—
            </text>
            <text x={400} y={435} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              not just any random building claiming to be yours.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
