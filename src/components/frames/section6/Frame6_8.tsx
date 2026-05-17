import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 6-8: The Badge Metaphor (AuthN vs AuthZ)
 * Visual: Badge proves identity, but access list determines entry
 */
export const Frame6_8: React.FC = () => {
  const { t } = useTranslation('frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
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
          {t('frame6_8.title', { defaultValue: 'The Badge Metaphor' })}
        </motion.text>

        {/* Employee with badge */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle cx={200} cy={180} r={45} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
          <text x={200} y={195} textAnchor="middle" fontSize={35}>👤</text>
          <Badge spiffeId="Alice @ Acme" position={{ x: 200, y: 270 }} state="valid" size={50} animate={!prefersReducedMotion} />
          <text x={200} y={330} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold">
            {t('frame6_8.aliceProves', { defaultValue: '✓ Proves: "I\'m Alice"' })}
          </text>
        </motion.g>

        {/* Door with access control */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={120} width={200} height={180} rx={8} fill={colors.surface} stroke={colors.warning} strokeWidth={3} />
            <text x={550} y={150} textAnchor="middle" fill={colors.warning} fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame6_8.serverRoom', { defaultValue: 'Server Room' })}
            </text>
            <rect x={470} y={170} width={160} height={100} rx={6} fill={`${colors.warning}10`} stroke={colors.warning} strokeWidth={1} />
            <text x={550} y={195} textAnchor="middle" fill={colors.warning} fontSize={11} fontWeight="bold">
              {t('frame6_8.accessList', { defaultValue: 'Access List:' })}
            </text>
            <text x={490} y={220} fill={colors.textSecondary} fontSize={11}>
              {t('frame6_8.accessItem1', { defaultValue: '• Bob (Admin)' })}
            </text>
            <text x={490} y={240} fill={colors.textSecondary} fontSize={11}>
              {t('frame6_8.accessItem2', { defaultValue: '• Carol (Ops)' })}
            </text>
            <text x={490} y={260} fill={colors.attacker} fontSize={11}>
              {t('frame6_8.accessItem3', { defaultValue: '✗ Alice not listed' })}
            </text>
          </motion.g>
        )}

        {/* Arrow showing rejection */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={280} y1={200} x2={420} y2={200} stroke={colors.attacker} strokeWidth={2} strokeDasharray="6 3" />
            <circle cx={430} cy={200} r={18} fill={colors.attacker} />
            <text x={430} y={206} textAnchor="middle" fill="white" fontSize={16}>✗</text>
          </motion.g>
        )}

        {/* Explanation */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={380} width={600} height={90} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={415} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              {t('frame6_8.badgeProvesEmployee', { defaultValue: "Your badge proves you're an employee" })}
            </text>
            <text x={400} y={445} textAnchor="middle" fill={colors.textSecondary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame6_8.separatePolicy', { defaultValue: "It doesn't determine which rooms you can enter—that's a separate policy" })}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
