import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SelectorMatcher } from '@/components/interactive';
import { colors } from '@/utils/constants';

/**
 * Frame 5-12: Interactive: Selector Matcher
 * Visual: Interactive quiz matching workloads to registration entries
 */
export const Frame5_12: React.FC = () => {
  const { t } = useTranslation('spiffe-frames');
  return (
    <div className="w-full h-full flex flex-col">
      {/* Title */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          className="text-2xl font-bold"
          style={{ color: colors.textPrimary, fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {t('frame5_12.title')}
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: colors.textSecondary }}
        >
          {t('frame5_12.subtitle')}
        </p>
      </motion.div>

      {/* Interactive component */}
      <motion.div
        className="flex-1 rounded-xl p-4"
        style={{ backgroundColor: colors.surface }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SelectorMatcher />
      </motion.div>
    </div>
  );
};
