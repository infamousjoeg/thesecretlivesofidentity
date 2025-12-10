import React from 'react';
import { motion } from 'framer-motion';
import { AttestationSimulator } from '@/components/interactive';
import { colors } from '@/utils/constants';

/**
 * Frame 4-11: Interactive: Attestation Simulator
 * Visual: Interactive attestation flow with success, failure, and attack scenarios
 */
export const Frame4_11: React.FC = () => {
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
          Try It: Attestation Simulator
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: colors.textSecondary }}
        >
          Explore how node attestation works in different scenarios
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
        <AttestationSimulator />
      </motion.div>
    </div>
  );
};
