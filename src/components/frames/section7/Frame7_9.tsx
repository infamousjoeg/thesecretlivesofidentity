import React from 'react';
import { motion } from 'framer-motion';
import { RotationSimulator } from '@/components/interactive';
import { colors } from '@/utils/constants';

/**
 * Frame 7-9: Interactive: Rotation Simulator
 * Visual: Time-lapse SVID lifecycle with speed controls
 */
export const Frame7_9: React.FC = () => {
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
          Try It: Rotation Simulator
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: colors.textSecondary }}
        >
          Watch SVIDs rotate while the SPIFFE ID stays constant
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
        <RotationSimulator />
      </motion.div>
    </div>
  );
};
