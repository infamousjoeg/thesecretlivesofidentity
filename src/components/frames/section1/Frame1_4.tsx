import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-4: The 2 AM Scenario
 * Visual: Pager going off, GitHub logo, time ticking
 */
export const Frame1_4: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 800, 800]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Dark background for night feel */}
        <rect x={0} y={0} width={800} height={500} fill="#0A0F1A" />

        {/* Clock showing 2:00 AM */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle cx={400} cy={120} r={60} fill={colors.surface} stroke={colors.textMuted} strokeWidth={2} />
          <text
            x={400}
            y={130}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize={28}
            fontWeight="bold"
            fontFamily="JetBrains Mono, monospace"
          >
            2:00
          </text>
          <text
            x={400}
            y={155}
            textAnchor="middle"
            fill={colors.textMuted}
            fontSize={12}
            fontFamily="IBM Plex Sans, sans-serif"
          >
            AM
          </text>
        </motion.g>

        {/* Pager/phone alert */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.rect
              x={150}
              y={250}
              width={200}
              height={120}
              rx={12}
              fill={colors.surface}
              stroke={colors.attacker}
              strokeWidth={3}
              animate={prefersReducedMotion ? {} : {
                boxShadow: ['0 0 0px #EF4444', '0 0 20px #EF4444', '0 0 0px #EF4444'],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <rect x={160} y={260} width={180} height={80} rx={4} fill="#1E1E1E" />
            <text x={250} y={290} textAnchor="middle" fill={colors.attacker} fontSize={12} fontFamily="JetBrains Mono, monospace">
              🚨 SECURITY ALERT
            </text>
            <text x={250} y={315} textAnchor="middle" fill={colors.textSecondary} fontSize={10} fontFamily="JetBrains Mono, monospace">
              API key exposed in
            </text>
            <text x={250} y={330} textAnchor="middle" fill={colors.textSecondary} fontSize={10} fontFamily="JetBrains Mono, monospace">
              public repository
            </text>
          </motion.g>
        )}

        {/* GitHub icon and commit */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={450} y={250} width={220} height={120} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <circle cx={480} cy={280} r={15} fill="#24292E" />
            <text x={480} y={285} textAnchor="middle" fill="white" fontSize={16}>
              ⬡
            </text>
            <text x={540} y={280} fill={colors.textPrimary} fontSize={12} fontFamily="Space Grotesk, sans-serif" fontWeight={600}>
              commit abc123
            </text>
            <text x={470} y={310} fill={colors.textMuted} fontSize={10} fontFamily="JetBrains Mono, monospace">
              + API_KEY="sk_live_..."
            </text>
            <text x={470} y={330} fill={colors.attacker} fontSize={10} fontFamily="JetBrains Mono, monospace">
              ⚠️ Secret detected
            </text>
            <text x={470} y={355} fill={colors.textMuted} fontSize={9} fontFamily="IBM Plex Sans, sans-serif">
              Exposed 6 hours ago
            </text>
          </motion.g>
        )}

        {/* Time elapsed indicator */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text
              x={400}
              y={430}
              textAnchor="middle"
              fill={colors.attacker}
              fontSize={18}
              fontWeight={600}
              fontFamily="Space Grotesk, sans-serif"
            >
              6 hours of exposure. Who has the key?
            </text>
            <text
              x={400}
              y={460}
              textAnchor="middle"
              fill={colors.textMuted}
              fontSize={14}
              fontFamily="IBM Plex Sans, sans-serif"
            >
              Bots scan GitHub every second for leaked secrets.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
