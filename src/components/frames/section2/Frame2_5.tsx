import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';
import { colors } from '@/utils/constants';

/**
 * Frame 2-5: Real Examples
 * Visual: Multiple real-world SPIFFE ID examples
 */
export const Frame2_5: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  const { phase } = useAnimationPhase([0, 400, 400, 400, 400]);

  const examples = [
    {
      id: 'spiffe://acme.com/payments/processor',
      domain: 'acme.com',
      descKey: 'frame2_5.example1Description',
    },
    {
      id: 'spiffe://prod.mycompany.io/api/users',
      domain: 'prod.mycompany.io',
      descKey: 'frame2_5.example2Description',
    },
    {
      id: 'spiffe://k8s.example.org/ns/default/sa/frontend',
      domain: 'k8s.example.org',
      descKey: 'frame2_5.example3Description',
    },
    {
      id: 'spiffe://aws.acme.com/region/us-east-1/service/db',
      domain: 'aws.acme.com',
      descKey: 'frame2_5.example4Description',
    },
  ];

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
          {t('frame2_5.title')}
        </motion.text>

        {/* Examples */}
        {examples.map((example, index) => (
          phase >= index + 1 && (
            <motion.g
              key={example.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect
                x={100}
                y={90 + index * 95}
                width={600}
                height={80}
                rx={8}
                fill={colors.surface}
                stroke={colors.textMuted}
                strokeWidth={1}
              />

              {/* SPIFFE ID */}
              <text
                x={130}
                y={125 + index * 95}
                fill={colors.svid}
                fontSize={13}
                fontFamily="JetBrains Mono, monospace"
              >
                {example.id}
              </text>

              {/* Description */}
              <text
                x={130}
                y={150 + index * 95}
                fill={colors.textMuted}
                fontSize={11}
                fontFamily="IBM Plex Sans, sans-serif"
              >
                {t(example.descKey)}
              </text>

              {/* Trust domain highlight */}
              <rect
                x={560}
                y={105 + index * 95}
                width={120}
                height={24}
                rx={4}
                fill={`${colors.success}15`}
              />
              <text
                x={620}
                y={122 + index * 95}
                textAnchor="middle"
                fill={colors.success}
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
              >
                {example.domain}
              </text>
            </motion.g>
          )
        ))}

        {/* Key insight */}
        {phase >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <text
              x={400}
              y={480}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={14}
              fontFamily="IBM Plex Sans, sans-serif"
            >
              {t('frame2_5.pathNote')}
            </text>
          </motion.g>
        )}
      </svg>
    </Stage>
  );
};
