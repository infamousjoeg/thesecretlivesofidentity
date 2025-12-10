import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 9-3: No More 2 AM Pages
 * Visual: Comparison of before/after SPIFFE
 */
export const Frame9_3: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);

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
          No More 2 AM Pages
        </motion.text>

        {/* Before - Problems */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={100} width={250} height={250} rx={12} fill={`${colors.attacker}10`} stroke={colors.attacker} strokeWidth={2} />
          <text x={225} y={130} textAnchor="middle" fill={colors.attacker} fontSize={16} fontWeight="bold">Without SPIFFE</text>

          <text x={120} y={165} fill={colors.attacker} fontSize={12}>✗ Secrets to leak</text>
          <text x={120} y={195} fill={colors.attacker} fontSize={12}>✗ Keys to rotate manually</text>
          <text x={120} y={225} fill={colors.attacker} fontSize={12}>✗ Coordination nightmares</text>
          <text x={120} y={255} fill={colors.attacker} fontSize={12}>✗ 2 AM incident response</text>
          <text x={120} y={285} fill={colors.attacker} fontSize={12}>✗ Blast radius unknown</text>
          <text x={120} y={315} fill={colors.attacker} fontSize={12}>✗ Trust based on secrets</text>

          <text x={225} y={340} textAnchor="middle" fontSize={30}>😰</text>
        </motion.g>

        {/* After - SPIFFE */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={100} width={250} height={250} rx={12} fill={`${colors.success}10`} stroke={colors.success} strokeWidth={2} />
            <text x={575} y={130} textAnchor="middle" fill={colors.success} fontSize={16} fontWeight="bold">With SPIFFE</text>

            <text x={470} y={165} fill={colors.success} fontSize={12}>✓ No secrets to leak</text>
            <text x={470} y={195} fill={colors.success} fontSize={12}>✓ Auto rotation</text>
            <text x={470} y={225} fill={colors.success} fontSize={12}>✓ Zero coordination</text>
            <text x={470} y={255} fill={colors.success} fontSize={12}>✓ Sleep through the night</text>
            <text x={470} y={285} fill={colors.success} fontSize={12}>✓ Short-lived = limited blast</text>
            <text x={470} y={315} fill={colors.success} fontSize={12}>✓ Cryptographic identity</text>

            <text x={575} y={340} textAnchor="middle" fontSize={30}>😌</text>
          </motion.g>
        )}

        {/* Arrow */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={360} y1={225} x2={440} y2={225} stroke={colors.success} strokeWidth={4} markerEnd="url(#big-arr)" />
            <defs>
              <marker id="big-arr" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
                <path d="M0,0 L0,8 L12,4 z" fill={colors.success} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Final message */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={400} width={400} height={70} rx={8} fill={colors.success} />
            <text x={400} y={435} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Identity done right.
            </text>
            <text x={400} y={458} textAnchor="middle" fill="white" fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
              Automatic. Cryptographic. Secure.
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
