import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Badge } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-12: X.509 vs JWT
 * Visual: Two SVID formats side by side
 */
export const Frame2_12: React.FC = () => {
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
          Two SVID Formats
        </motion.text>

        {/* X.509 SVID */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={80} y={100} width={280} height={280} rx={12} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />
            <text x={220} y={135} textAnchor="middle" fill={colors.svid} fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              X.509-SVID
            </text>

            <Badge
              spiffeId="spiffe://acme/api"
              position={{ x: 220, y: 220 }}
              state="valid"
              variant="x509"
              size={80}
              animate={!prefersReducedMotion}
            />

            {/* Properties */}
            <g transform="translate(100, 290)">
              <text fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
                <tspan x={0} dy={0}>• Standard TLS certificate</tspan>
                <tspan x={0} dy={18}>• Great for mTLS</tspan>
                <tspan x={0} dy={18}>• Binary format (ASN.1)</tspan>
                <tspan x={0} dy={18}>• Long-lived connections</tspan>
              </text>
            </g>
          </motion.g>
        )}

        {/* JWT SVID */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={440} y={100} width={280} height={280} rx={12} fill={colors.surface} stroke={colors.trustBundle} strokeWidth={2} />
            <text x={580} y={135} textAnchor="middle" fill={colors.trustBundle} fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              JWT-SVID
            </text>

            <Badge
              spiffeId="spiffe://acme/api"
              position={{ x: 580, y: 220 }}
              state="valid"
              variant="jwt"
              size={80}
              animate={!prefersReducedMotion}
            />

            {/* Properties */}
            <g transform="translate(460, 290)">
              <text fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
                <tspan x={0} dy={0}>• JSON Web Token</tspan>
                <tspan x={0} dy={18}>• Great for APIs/HTTP</tspan>
                <tspan x={0} dy={18}>• Text format (base64)</tspan>
                <tspan x={0} dy={18}>• Request-by-request</tspan>
              </text>
            </g>
          </motion.g>
        )}

        {/* Metaphor */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={410} width={500} height={70} rx={8} fill={`${colors.success}10`} stroke={colors.success} strokeWidth={1} />

            <text x={280} y={445} textAnchor="middle" fill={colors.svid} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              X.509 = Permanent badge
            </text>
            <text x={280} y={465} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              (on your lanyard)
            </text>

            <text x={520} y={445} textAnchor="middle" fill={colors.trustBundle} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              JWT = Visitor pass
            </text>
            <text x={520} y={465} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              (single-use sticker)
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
