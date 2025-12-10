import React from 'react';
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { Workload } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Frame 1-1: Every System Needs Identity
 * Visual: Multiple gray workloads with question marks appearing one by one
 */
export const Frame1_1: React.FC = () => {
  const { phase } = useAnimationPhase([0, 500, 500, 500, 500, 500]);
  const prefersReducedMotion = useReducedMotion();

  const workloads = [
    { x: 200, y: 200, label: 'api' },
    { x: 400, y: 150, label: 'database' },
    { x: 600, y: 200, label: 'cache' },
    { x: 300, y: 350, label: 'auth' },
    { x: 500, y: 350, label: 'payment' },
  ];

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Connection lines (dashed, showing attempted communication) */}
        {phase >= 3 && (
          <g>
            {workloads.slice(0, -1).map((w, i) => (
              <motion.line
                key={`line-${i}`}
                x1={w.x}
                y1={w.y}
                x2={workloads[i + 1].x}
                y2={workloads[i + 1].y}
                stroke="#64748B"
                strokeWidth={1}
                strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={prefersReducedMotion ? { opacity: 0.3 } : { pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              />
            ))}
          </g>
        )}

        {/* Workloads appearing one by one */}
        {workloads.map((w, index) => (
          phase >= index + 1 && (
            <motion.g
              key={w.label}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Workload
                label={w.label}
                position={{ x: w.x, y: w.y }}
                attested={false}
                showQuestionMark={true}
                animate={!prefersReducedMotion}
              />
            </motion.g>
          )
        ))}

        {/* Question bubbles showing identity confusion */}
        {phase >= 5 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <text
              x={400}
              y={80}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize={16}
              fontFamily="IBM Plex Sans, sans-serif"
            >
              "Who are you?"
            </text>
            <text
              x={400}
              y={450}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize={16}
              fontFamily="IBM Plex Sans, sans-serif"
            >
              "How can I trust you?"
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
