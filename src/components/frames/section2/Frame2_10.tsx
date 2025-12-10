import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-10: Badge = SVID
 * Visual: SVID as the document proving identity
 */
export const Frame2_10: React.FC = () => {
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
          SVID: Your Identity Document
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
          SPIFFE Verifiable Identity Document
        </motion.text>

        {/* Large SVID Badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            spiffeId="spiffe://acme.com/api"
            position={{ x: 400, y: 220 }}
            state="valid"
            size={120}
            expiresIn={3600}
            showCountdown={true}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* What it contains */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <text x={400} y={330} textAnchor="middle" fill={colors.textSecondary} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              An SVID contains:
            </text>
          </motion.g>
        )}

        {/* Contents list */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <g transform="translate(250, 350)">
              {[
                { icon: '🏷️', text: 'The SPIFFE ID' },
                { icon: '🔑', text: 'A public key' },
                { icon: '⏰', text: 'Expiration time' },
                { icon: '✍️', text: 'Authority signature' },
              ].map((item, i) => (
                <g key={item.text} transform={`translate(${(i % 2) * 180}, ${Math.floor(i / 2) * 40})`}>
                  <text x={0} y={0} fontSize={16}>
                    {item.icon}
                  </text>
                  <text x={25} y={0} fill={colors.textSecondary} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
                    {item.text}
                  </text>
                </g>
              ))}
            </g>
          </motion.g>
        )}

        {/* Key point */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={200} y={440} width={400} height={45} rx={8} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={1} />
            <text x={400} y={468} textAnchor="middle" fill={colors.svid} fontSize={14} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              The physical badge that proves your identity
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
