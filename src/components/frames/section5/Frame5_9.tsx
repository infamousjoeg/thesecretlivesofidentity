import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 5-9: What's in the SVID?
 * Visual: SVID document with labeled components
 */
export const Frame5_9: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500, 600]);
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
          What's in the SVID?
        </motion.text>

        {/* Central badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            spiffeId="spiffe://acme/payments/api"
            position={{ x: 400, y: 180 }}
            state="valid"
            size={80}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Component labels */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={130} width={150} height={40} rx={6} fill={colors.surface} stroke={colors.svid} strokeWidth={1} />
            <text x={175} y={155} textAnchor="middle" fill={colors.svid} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              SPIFFE ID
            </text>
            <line x1={255} y1={150} x2={330} y2={170} stroke={colors.svid} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={550} y={130} width={150} height={40} rx={6} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={625} y={155} textAnchor="middle" fill={colors.success} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Public Key
            </text>
            <line x1={545} y1={150} x2={470} y2={170} stroke={colors.success} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={220} width={150} height={40} rx={6} fill={colors.surface} stroke={colors.warning} strokeWidth={1} />
            <text x={175} y={245} textAnchor="middle" fill={colors.warning} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Validity Period
            </text>
            <line x1={255} y1={240} x2={330} y2={200} stroke={colors.warning} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={550} y={220} width={150} height={40} rx={6} fill={colors.surface} stroke={colors.server} strokeWidth={1} />
            <text x={625} y={245} textAnchor="middle" fill={colors.server} fontSize={12} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              CA Signature
            </text>
            <line x1={545} y1={240} x2={470} y2={200} stroke={colors.server} strokeWidth={1} strokeDasharray="4 2" />
          </motion.g>
        )}

        {/* Summary */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={320} width={500} height={130} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={350} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              The SVID contains:
            </text>
            <text x={200} y={380} fill={colors.svid} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">• SPIFFE ID - who you are</text>
            <text x={200} y={400} fill={colors.success} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">• Public key - for cryptographic proofs</text>
            <text x={200} y={420} fill={colors.warning} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">• Validity period - when it expires</text>
            <text x={200} y={440} fill={colors.server} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">• CA signature - proof from authority</text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
