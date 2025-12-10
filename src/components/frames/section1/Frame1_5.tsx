import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Connection } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-5: The Cascade
 * Visual: Payment service connected to many other services, showing blast radius
 */
export const Frame1_5: React.FC = () => {
  const { phase } = useAnimationPhase([0, 400, 400, 400, 600]);
  const prefersReducedMotion = useReducedMotion();

  // Services connected to the compromised payment service
  const services = [
    { x: 150, y: 100, label: 'orders' },
    { x: 300, y: 80, label: 'users' },
    { x: 450, y: 70, label: 'inventory' },
    { x: 600, y: 90, label: 'shipping' },
    { x: 700, y: 150, label: 'analytics' },
    { x: 720, y: 260, label: 'reports' },
    { x: 680, y: 370, label: 'notify' },
    { x: 580, y: 430, label: 'audit' },
    { x: 420, y: 450, label: 'billing' },
    { x: 260, y: 440, label: 'refunds' },
    { x: 120, y: 400, label: 'support' },
    { x: 80, y: 290, label: 'crm' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Central compromised service */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Warning pulse */}
          {!prefersReducedMotion && (
            <motion.circle
              cx={400}
              cy={250}
              r={50}
              fill="none"
              stroke={colors.attacker}
              strokeWidth={2}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <Workload
            label="payment"
            position={{ x: 400, y: 250 }}
            attested={false}
            animate={!prefersReducedMotion}
          />
          {/* Compromised indicator */}
          <circle cx={430} cy={220} r={12} fill={colors.attacker} />
          <text x={430} y={225} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">
            !
          </text>
        </motion.g>

        {/* Connected services appearing in waves */}
        {services.map((service, index) => {
          const showPhase = Math.floor(index / 4) + 1;
          return phase >= showPhase && (
            <motion.g
              key={service.label}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: (index % 4) * 0.1 }}
            >
              <Connection
                from={{ x: 400, y: 250 }}
                to={{ x: service.x, y: service.y }}
                status="established"
                showArrow={false}
                animate={false}
              />
              <Workload
                label={service.label}
                position={{ x: service.x, y: service.y }}
                attested={false}
                size={40}
                animate={false}
              />
            </motion.g>
          );
        })}

        {/* Count indicator */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x={320} y={300} width={160} height={40} rx={8} fill={colors.attacker} />
            <text
              x={400}
              y={325}
              textAnchor="middle"
              fill="white"
              fontSize={14}
              fontWeight="bold"
              fontFamily="Space Grotesk, sans-serif"
            >
              47 services affected
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
