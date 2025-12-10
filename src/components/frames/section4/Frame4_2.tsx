import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';

import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 4-2: Traditional vs SPIFFE
 * Visual: Comparison of traditional credential approach vs platform attestation
 */
export const Frame4_2: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600]);

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
          Traditional vs SPIFFE Approach
        </motion.text>

        {/* Traditional approach */}
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={80} y={90} width={280} height={200} rx={12} fill={colors.surface} stroke={colors.attacker} strokeWidth={2} />
          <rect x={80} y={90} width={280} height={40} rx={12} fill={colors.attacker} />
          <text x={220} y={117} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            ❌ Traditional
          </text>

          <text x={220} y={160} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
            Agent presents credentials
          </text>
          <rect x={130} y={180} width={180} height={35} rx={4} fill={`${colors.attacker}15`} />
          <text x={220} y={200} textAnchor="middle" fontSize={20}>🔑</text>
          <text x={250} y={205} fill={colors.attacker} fontSize={10} fontFamily="JetBrains Mono, monospace">
            API_KEY_XYZ
          </text>

          <text x={220} y={250} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            Problem: Secrets can be stolen
          </text>
          <text x={220} y={270} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
            and used by attackers
          </text>
        </motion.g>

        {/* SPIFFE approach */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={440} y={90} width={280} height={200} rx={12} fill={colors.surface} stroke={colors.success} strokeWidth={2} />
            <rect x={440} y={90} width={280} height={40} rx={12} fill={colors.success} />
            <text x={580} y={117} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              ✓ SPIFFE/SPIRE
            </text>

            <text x={580} y={160} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Platform vouches for Agent
            </text>
            <rect x={490} y={175} width={180} height={50} rx={4} fill={`${colors.success}15`} />
            <text x={520} y={200} fontSize={18}>☁️</text>
            <text x={580} y={195} fill={colors.success} fontSize={10} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              AWS / K8s / GCP
            </text>
            <text x={580} y={215} fill={colors.textMuted} fontSize={9} fontFamily="IBM Plex Sans, sans-serif">
              "This is a real node"
            </text>

            <text x={580} y={260} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Can't be faked without
            </text>
            <text x={580} y={280} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              compromising the platform
            </text>
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={330} width={500} height={120} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={365} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              The Key Insight
            </text>
            <text x={400} y={395} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              The Agent doesn't claim its own identity—
            </text>
            <text x={400} y={420} textAnchor="middle" fill={colors.textPrimary} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              the <tspan fill={colors.success} fontWeight="bold">underlying platform</tspan> vouches for it.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
