import React from 'react';
import { motion } from 'framer-motion';
import { E2ESimulator } from '@/components/interactive';
import { colors } from '@/utils/constants';

/**
 * Frame 6-10: Interactive: E2E Simulator
 * Visual: Complete mTLS handshake visualization with step-by-step controls
 */
export const Frame6_10: React.FC = () => {
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
          Try It: mTLS Handshake
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: colors.textSecondary }}
        >
          Step through a complete mutual TLS handshake between workloads
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
        <E2ESimulator />
      </motion.div>
    </div>
  );
};
