import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { TrustDomain, Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-6: Trust Domains: The Boundary
 * Visual: Trust domain as a security boundary
 */
export const Frame2_6: React.FC = () => {
  const { t } = useTranslation('frames');
  const { phase } = useAnimationPhase([0, 600, 600, 600]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={40}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={24}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('frame2_6.title')}
        </motion.text>

        {/* Trust domain */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <TrustDomain
            domain="acme.com"
            position={{ x: 400, y: 270 }}
            width={500}
            height={280}
            animate={!prefersReducedMotion}
          />
        </motion.g>

        {/* Workloads inside the domain */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Workload label="api" position={{ x: 250, y: 230 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Workload label="web" position={{ x: 400, y: 200 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Workload label="db" position={{ x: 550, y: 230 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Workload label="cache" position={{ x: 300, y: 330 }} attested={true} animate={!prefersReducedMotion} size={50} />
            <Workload label="queue" position={{ x: 500, y: 330 }} attested={true} animate={!prefersReducedMotion} size={50} />
          </motion.g>
        )}

        {/* Definition box */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={150} y={420} width={500} height={60} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={400} y={448} textAnchor="middle" fill={colors.textPrimary} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_6.description1').split('zone of trust').map((part, i) => (
                i === 0 ? <tspan key={i}>{part}</tspan> : <tspan key={i}><tspan fill={colors.success} fontWeight="bold">zone of trust</tspan>{part}</tspan>
              ))}
            </text>
            <text x={400} y={468} textAnchor="middle" fill={colors.textMuted} fontSize={12} fontFamily="IBM Plex Sans, sans-serif">
              {t('frame2_6.description2')}
            </text>
          </motion.g>
        )}

        {/* Authority indicator */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect x={585} y={70} width={170} height={50} rx={6} fill={colors.server} opacity={0.8} />
            <text x={670} y={100} textAnchor="middle" fill="white" fontSize={12} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              {t('frame2_6.identityAuthority')}
            </text>
            <line x1={584} y1={95} x2={490} y2={130} stroke={colors.server} strokeWidth={2} strokeDasharray="5 3" />
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
