import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('spiffe-frames');
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
          {t('frame2_12.title')}
        </motion.text>

        {/* X.509 SVID */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={80} y={75} width={280} height={290} rx={12} fill={colors.surface} stroke={colors.svid} strokeWidth={2} />

            {/* Title — outside and above badge */}
            <text x={220} y={102} textAnchor="middle" fill={colors.svid} fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_12.x509Title')}
            </text>

            {/* Badge — centered in upper portion of card */}
            <Badge
              spiffeId="spiffe://acme/api"
              position={{ x: 220, y: 188 }}
              state="valid"
              variant="x509"
              size={80}
              animate={!prefersReducedMotion}
            />

            {/* SPIFFE ID — outside badge, below it */}
            <text
              x={220}
              y={270}
              textAnchor="middle"
              fill={colors.svid}
              fontSize={11}
              fontWeight="600"
              fontFamily="JetBrains Mono, monospace"
            >
              spiffe://acme/api
            </text>

            {/* Properties */}
            <g transform="translate(100, 300)">
              <text fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
                <tspan x={0} dy={0}>• {t('frame2_12.x509Prop1')}</tspan>
                <tspan x={0} dy={18}>• {t('frame2_12.x509Prop2')}</tspan>
                <tspan x={0} dy={18}>• {t('frame2_12.x509Prop3')}</tspan>
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
            <rect x={440} y={75} width={280} height={290} rx={12} fill={colors.surface} stroke={colors.trustBundle} strokeWidth={2} />

            {/* Title — outside and above badge */}
            <text x={580} y={102} textAnchor="middle" fill={colors.trustBundle} fontSize={18} fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_12.jwtTitle')}
            </text>

            {/* Badge — centered in upper portion of card */}
            <Badge
              spiffeId="spiffe://acme/api"
              position={{ x: 580, y: 188 }}
              state="valid"
              variant="jwt"
              size={80}
              animate={!prefersReducedMotion}
            />

            {/* SPIFFE ID — outside badge, below it */}
            <text
              x={580}
              y={270}
              textAnchor="middle"
              fill={colors.trustBundle}
              fontSize={11}
              fontWeight="600"
              fontFamily="JetBrains Mono, monospace"
            >
              spiffe://acme/api
            </text>

            {/* Properties */}
            <g transform="translate(460, 300)">
              <text fill={colors.textSecondary} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
                <tspan x={0} dy={0}>• {t('frame2_12.jwtProp1')}</tspan>
                <tspan x={0} dy={18}>• {t('frame2_12.jwtProp2')}</tspan>
                <tspan x={0} dy={18}>• {t('frame2_12.jwtProp3')}</tspan>
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
            <rect x={150} y={408} width={500} height={70} rx={8} fill={`${colors.success}10`} stroke={colors.success} strokeWidth={1} />

            <text x={280} y={443} textAnchor="middle" fill={colors.svid} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_12.x509Metaphor')}
            </text>
            <text x={280} y={463} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_12.x509MetaphorNote')}
            </text>

            <text x={520} y={443} textAnchor="middle" fill={colors.trustBundle} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_12.jwtMetaphor')}
            </text>
            <text x={520} y={463} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_12.jwtMetaphorNote')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
