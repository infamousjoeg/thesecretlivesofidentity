import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-9: The Badge Metaphor
 * Visual: Corporate badge analogy - Employee ID vs Physical Badge
 */
export const Frame2_9: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

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
          Let's use a familiar analogy
        </motion.text>

        {/* Employee ID (SPIFFE ID) */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={100} y={120} width={250} height={200} rx={12} fill={colors.surface} stroke={colors.server} strokeWidth={2} />
            <text x={225} y={155} textAnchor="middle" fill={colors.server} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Employee ID
            </text>

            {/* HR record visual */}
            <rect x={130} y={175} width={190} height={100} rx={6} fill={colors.background} />
            <text x={225} y={200} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              HR Record
            </text>
            <text x={225} y={230} textAnchor="middle" fill={colors.server} fontSize={14} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              EMP-12345
            </text>
            <text x={225} y={255} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Never changes
            </text>

            {/* Label */}
            <rect x={130} y={290} width={190} height={25} rx={4} fill={`${colors.server}15`} />
            <text x={225} y={307} textAnchor="middle" fill={colors.server} fontSize={11} fontFamily="Space Grotesk, sans-serif">
              = SPIFFE ID
            </text>
          </motion.g>
        )}

        {/* Physical Badge (SVID) */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={450} y={120} width={250} height={200} rx={12} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
            <text x={575} y={155} textAnchor="middle" fill={colors.svid} fontSize={16} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              Physical Badge
            </text>

            {/* Badge visual */}
            <Badge
              spiffeId="EMP-12345"
              position={{ x: 575, y: 230 }}
              state="valid"
              size={70}
              expiresIn={3600}
              showCountdown={true}
              animate={!prefersReducedMotion}
            />

            {/* Label */}
            <rect x={480} y={290} width={190} height={25} rx={4} fill={`${colors.svid}15`} />
            <text x={575} y={307} textAnchor="middle" fill={colors.svid} fontSize={11} fontFamily="Space Grotesk, sans-serif">
              = SVID (expires & renews)
            </text>
          </motion.g>
        )}

        {/* Arrow connecting them */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <line x1={360} y1={220} x2={440} y2={220} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#arrowMeta)" />
            <text x={400} y={205} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              proves
            </text>
            <defs>
              <marker id="arrowMeta" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={colors.textMuted} />
              </marker>
            </defs>
          </motion.g>
        )}

        {/* Key insight */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={360} width={500} height={80} rx={8} fill={`${colors.success}10`} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={395} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontFamily="IBM Plex Sans, sans-serif">
              Your <tspan fill={colors.server} fontWeight="bold">SPIFFE ID</tspan> is your identity (permanent).
            </text>
            <text x={400} y={420} textAnchor="middle" fill={colors.textPrimary} fontSize={15} fontFamily="IBM Plex Sans, sans-serif">
              Your <tspan fill={colors.svid} fontWeight="bold">SVID</tspan> is proof of that identity (temporary).
            </text>
          </motion.g>
        )}

        {/* Metaphor note */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={475}
            textAnchor="middle"
            fill={colors.textMuted}
            fontSize={12}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            We'll use this metaphor throughout—it maps surprisingly well.
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
