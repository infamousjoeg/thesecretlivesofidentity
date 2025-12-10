import React from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { colors } from '@/utils/constants';

interface MessageProps {
  id?: string;
  from: Position;
  to: Position;
  type?: 'request' | 'response' | 'svid' | 'attestation';
  animate?: boolean;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}

/**
 * Message entity - represents data/packets moving between entities
 * Animated envelope/packet that travels along a path
 */
export const Message: React.FC<MessageProps> = ({
  id: _id,
  from,
  to,
  type = 'request',
  animate = true,
  duration = 1,
  delay = 0,
  onComplete,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'request':
        return { color: colors.textSecondary, icon: 'arrow' };
      case 'response':
        return { color: colors.success, icon: 'check' };
      case 'svid':
        return { color: colors.svid, icon: 'badge' };
      case 'attestation':
        return { color: colors.agent, icon: 'shield' };
    }
  };

  const styles = getTypeStyles();

  // Calculate path for animation
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2 - 20; // Arc upward slightly

  const renderIcon = () => {
    switch (styles.icon) {
      case 'badge':
        return (
          <g>
            <rect x={-8} y={-10} width={16} height={20} rx={2} fill={styles.color} />
            <circle cx={0} cy={-4} r={3} fill={colors.background} />
            <rect x={-5} y={2} width={10} height={2} fill={colors.background} />
          </g>
        );
      case 'shield':
        return (
          <path
            d="M0 -8 L8 -4 L8 4 Q8 8 0 12 Q-8 8 -8 4 L-8 -4 Z"
            fill={styles.color}
          />
        );
      case 'check':
        return (
          <g>
            <circle r={8} fill={styles.color} />
            <path
              d="M-3 0 L-1 2 L4 -3"
              fill="none"
              stroke={colors.background}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </g>
        );
      default:
        return (
          <g>
            <rect x={-10} y={-7} width={20} height={14} rx={2} fill={styles.color} />
            <path
              d="M-8 -5 L0 0 L8 -5"
              fill="none"
              stroke={colors.background}
              strokeWidth={1.5}
            />
          </g>
        );
    }
  };

  if (!animate) {
    return (
      <g transform={`translate(${midX}, ${midY})`}>
        {renderIcon()}
      </g>
    );
  }

  return (
    <motion.g
      initial={{ x: from.x, y: from.y, opacity: 0, scale: 0.5 }}
      animate={{
        x: [from.x, midX, to.x],
        y: [from.y, midY, to.y],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        times: [0, 0.5, 0.9, 1],
        ease: 'easeInOut',
      }}
      onAnimationComplete={onComplete}
    >
      {renderIcon()}
    </motion.g>
  );
};
