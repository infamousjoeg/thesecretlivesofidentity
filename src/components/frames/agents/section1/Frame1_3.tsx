import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { AIAgent, ToolResource } from '@/components/entities';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

/**
 * Frame 1-3: One Key To Rule Them All
 * Visual: three agents all holding the SAME master key, each wired to every
 * resource — a dense all-to-all tangle. No containment.
 */
export const Frame1_3: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const { phase } = useAnimationPhase([0, 700, 700]);
  const prefersReducedMotion = useReducedMotion();

  const agents = [200, 400, 600].map((x) => ({ x, y: 130 }));
  const resources = [200, 400, 600].map((x) => ({ x, y: 380 }));

  return (
    <Stage>
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* All-to-all access tangle */}
        {phase >= 1 &&
          agents.map((a, ai) =>
            resources.map((r, ri) => (
              <motion.line
                key={`l-${ai}-${ri}`}
                x1={a.x}
                y1={a.y + 30}
                x2={r.x}
                y2={r.y - 45}
                stroke={colors.attacker}
                strokeWidth={1}
                strokeDasharray="3 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ duration: 0.4, delay: (ai * 3 + ri) * 0.05 }}
              />
            ))
          )}

        {agents.map((a, i) => (
          <g key={`a-${i}`}>
            <AIAgent label={t('frame1_3.agent', { defaultValue: 'Agent' })} position={{ x: a.x, y: a.y }} size={62} active animate={!prefersReducedMotion} />
            {/* same master key on each */}
            <g transform={`translate(${a.x + 24}, ${a.y - 26})`}>
              <circle cx={-8} cy={0} r={6} fill="none" stroke={colors.warning} strokeWidth={3} />
              <rect x={-3} y={-1.6} width={18} height={3.2} fill={colors.warning} />
              <rect x={12} y={-1.6} width={2.5} height={6} fill={colors.warning} />
            </g>
          </g>
        ))}

        {resources.map((r, i) => (
          <ToolResource
            key={`r-${i}`}
            label={t(`frame1_3.res${i}`, { defaultValue: ['Bank', 'Files', 'Email'][i] })}
            position={{ x: r.x, y: r.y }}
            size={68}
            kind={['API', 'API', 'API'][i]}
            locked={false}
            animate={false}
          />
        ))}

        {phase >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            x={400}
            y={470}
            textAnchor="middle"
            fill={colors.attacker}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif"
          >
            {t('frame1_3.caption', { defaultValue: 'Any agent can do anything, anywhere. No containment.' })}
          </motion.text>
        )}
      </svg>
    </Stage>
  );
};
