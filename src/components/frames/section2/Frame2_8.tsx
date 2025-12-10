import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { TrustDomain, Workload, Connection } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 2-8: Trust Domains: Why It Matters
 * Visual: Two trust domains - same domain auto-trust, different requires federation
 */
export const Frame2_8: React.FC = () => {
  const { phase } = useAnimationPhase([0, 600, 800, 800]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Title */}
        <motion.text
          x={400}
          y={35}
          textAnchor="middle"
          fill={colors.textPrimary}
          fontSize={20}
          fontWeight="bold"
          fontFamily="Space Grotesk, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Why Trust Domains Matter
        </motion.text>

        {/* Domain 1 - acme.com */}
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TrustDomain
            domain="acme.com"
            position={{ x: 200, y: 220 }}
            width={280}
            height={200}
            animate={!prefersReducedMotion}
          />
          <Workload label="api" position={{ x: 140, y: 200 }} attested={true} animate={false} size={40} />
          <Workload label="web" position={{ x: 260, y: 200 }} attested={true} animate={false} size={40} />
        </motion.g>

        {/* Domain 2 - partner.io */}
        <motion.g
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TrustDomain
            domain="partner.io"
            position={{ x: 600, y: 220 }}
            width={280}
            height={200}
            color={colors.trustBundle}
            animate={!prefersReducedMotion}
          />
          <Workload label="svc" position={{ x: 540, y: 200 }} attested={true} animate={false} size={40} />
          <Workload label="db" position={{ x: 660, y: 200 }} attested={true} animate={false} size={40} />
        </motion.g>

        {/* Same domain - auto trust */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Connection
              from={{ x: 160, y: 200 }}
              to={{ x: 240, y: 200 }}
              status="established"
              animate={false}
            />
            <rect x={130} y={270} width={140} height={30} rx={4} fill={`${colors.success}20`} />
            <text x={200} y={290} textAnchor="middle" fill={colors.success} fontSize={10} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Auto-trust
            </text>
          </motion.g>
        )}

        {/* Different domains - federation required */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <line x1={340} y1={200} x2={460} y2={200} stroke={colors.warning} strokeWidth={2} strokeDasharray="8 4" />
            <rect x={365} y={180} width={70} height={24} rx={4} fill={colors.background} stroke={colors.warning} strokeWidth={1} />
            <text x={400} y={196} textAnchor="middle" fill={colors.warning} fontSize={9} fontFamily="Space Grotesk, sans-serif">
              Federation?
            </text>
          </motion.g>
        )}

        {/* Explanation boxes */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Same domain */}
            <rect x={80} y={360} width={260} height={70} rx={8} fill={colors.surface} stroke={colors.success} strokeWidth={1} />
            <text x={210} y={390} textAnchor="middle" fill={colors.success} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Same Trust Domain
            </text>
            <text x={210} y={415} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Automatic mutual trust
            </text>

            {/* Different domains */}
            <rect x={460} y={360} width={260} height={70} rx={8} fill={colors.surface} stroke={colors.warning} strokeWidth={1} />
            <text x={590} y={390} textAnchor="middle" fill={colors.warning} fontSize={13} fontWeight="600" fontFamily="Space Grotesk, sans-serif">
              Different Domains
            </text>
            <text x={590} y={415} textAnchor="middle" fill={colors.textMuted} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
              Requires explicit federation
            </text>
          </motion.g>
        )}

        {/* Bottom note */}
        {phase >= 3 && (
          <motion.text
            x={400}
            y={470}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={12}
            fontFamily="IBM Plex Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Federation = explicitly agreeing to trust another domain's identities
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
