import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 2-4: SPIFFE ID Anatomy
 * Visual: Breaking down the SPIFFE ID into components
 */
export const Frame2_4: React.FC = () => {
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
          SPIFFE ID Anatomy
        </motion.text>

        {/* Full SPIFFE ID */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={100} y={120} width={600} height={60} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
          <text
            x={400}
            y={158}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize={20}
            fontFamily="JetBrains Mono, monospace"
          >
            spiffe://acme.com/payments/api
          </text>
        </motion.g>

        {/* Scheme breakdown */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={100} y={220} width={150} height={80} rx={8} fill={`${colors.server}15`} stroke={colors.server} strokeWidth={2} />
            <text x={175} y={250} textAnchor="middle" fill={colors.server} fontSize={14} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              spiffe://
            </text>
            <text x={175} y={275} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              The scheme
            </text>
            <text x={175} y={290} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              (always spiffe)
            </text>

            {/* Arrow pointing up */}
            <line x1={175} y1={200} x2={175} y2={218} stroke={colors.server} strokeWidth={2} />
            <polygon points="175,195 170,205 180,205" fill={colors.server} />
          </motion.g>
        )}

        {/* Trust domain breakdown */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={280} y={220} width={180} height={80} rx={8} fill={`${colors.success}15`} stroke={colors.success} strokeWidth={2} />
            <text x={370} y={250} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              acme.com
            </text>
            <text x={370} y={275} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Trust domain
            </text>
            <text x={370} y={290} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              (your organization)
            </text>

            {/* Arrow pointing up */}
            <line x1={370} y1={200} x2={370} y2={218} stroke={colors.success} strokeWidth={2} />
            <polygon points="370,195 365,205 375,205" fill={colors.success} />
          </motion.g>
        )}

        {/* Path breakdown */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={490} y={220} width={210} height={80} rx={8} fill={`${colors.svid}15`} stroke={colors.svid} strokeWidth={2} />
            <text x={595} y={250} textAnchor="middle" fill={colors.svid} fontSize={14} fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              /payments/api
            </text>
            <text x={595} y={275} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Path
            </text>
            <text x={595} y={290} textAnchor="middle" fill={colors.textMuted} fontSize={10} fontFamily="IBM Plex Sans, sans-serif">
              (identifies workload)
            </text>

            {/* Arrow pointing up */}
            <line x1={595} y1={200} x2={595} y2={218} stroke={colors.svid} strokeWidth={2} />
            <polygon points="595,195 590,205 600,205" fill={colors.svid} />
          </motion.g>
        )}

        {/* Summary */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <rect x={150} y={340} width={500} height={100} rx={8} fill={colors.surface} stroke={colors.textMuted} strokeWidth={1} />
            <text x={400} y={380} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              <tspan x={400} dy={0}>The SPIFFE ID is a URI that uniquely identifies</tspan>
              <tspan x={400} dy={20}>a workload within its trust domain.</tspan>
            </text>
            <text x={400} y={425} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              Like an email address for services: user@company.com
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
