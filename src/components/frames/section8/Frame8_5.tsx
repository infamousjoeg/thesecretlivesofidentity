import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 8-5: Federation Topologies
 * Visual: Different federation patterns
 */
export const Frame8_5: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500]);

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
          Federation Topologies
        </motion.text>

        {/* Point-to-point */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <text x={130} y={120} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontWeight="bold">Point-to-Point</text>
          <circle cx={80} cy={180} r={25} fill={colors.success} />
          <circle cx={180} cy={180} r={25} fill={colors.svid} />
          <line x1={105} y1={180} x2={155} y2={180} stroke={colors.textMuted} strokeWidth={2} />
          <text x={130} y={230} textAnchor="middle" fill={colors.textMuted} fontSize={10}>Direct trust</text>
        </motion.g>

        {/* Hub and spoke */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={120} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontWeight="bold">Hub-and-Spoke</text>
            <circle cx={400} cy={180} r={30} fill={colors.server} />
            <circle cx={330} cy={140} r={20} fill={colors.success} />
            <circle cx={470} cy={140} r={20} fill={colors.svid} />
            <circle cx={340} cy={230} r={20} fill={colors.agent} />
            <circle cx={460} cy={230} r={20} fill={colors.warning} />
            <line x1={370} y1={175} x2={345} y2={155} stroke={colors.textMuted} strokeWidth={2} />
            <line x1={430} y1={175} x2={455} y2={155} stroke={colors.textMuted} strokeWidth={2} />
            <line x1={375} y1={195} x2={355} y2={215} stroke={colors.textMuted} strokeWidth={2} />
            <line x1={425} y1={195} x2={445} y2={215} stroke={colors.textMuted} strokeWidth={2} />
            <text x={400} y={270} textAnchor="middle" fill={colors.textMuted} fontSize={10}>Central broker</text>
          </motion.g>
        )}

        {/* Mesh */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text x={670} y={120} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontWeight="bold">Mesh</text>
            <circle cx={620} cy={160} r={20} fill={colors.success} />
            <circle cx={720} cy={160} r={20} fill={colors.svid} />
            <circle cx={620} cy={220} r={20} fill={colors.agent} />
            <circle cx={720} cy={220} r={20} fill={colors.warning} />
            <line x1={640} y1={160} x2={700} y2={160} stroke={colors.textMuted} strokeWidth={1} />
            <line x1={620} y1={180} x2={620} y2={200} stroke={colors.textMuted} strokeWidth={1} />
            <line x1={720} y1={180} x2={720} y2={200} stroke={colors.textMuted} strokeWidth={1} />
            <line x1={640} y1={220} x2={700} y2={220} stroke={colors.textMuted} strokeWidth={1} />
            <line x1={640} y1={170} x2={700} y2={210} stroke={colors.textMuted} strokeWidth={1} />
            <line x1={700} y1={170} x2={640} y2={210} stroke={colors.textMuted} strokeWidth={1} />
            <text x={670} y={260} textAnchor="middle" fill={colors.textMuted} fontSize={10}>Everyone trusts everyone</text>
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
            <text x={400} y={355} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Choose based on your trust relationships
            </text>
            <text x={200} y={390} fill={colors.success} fontSize={12}>• Point-to-point: Simple, direct</text>
            <text x={200} y={415} fill={colors.server} fontSize={12}>• Hub-and-spoke: Centralized control</text>
            <text x={200} y={440} fill={colors.agent} fontSize={12}>• Mesh: Maximum connectivity</text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
