import React from 'react';
import type { StageProps } from '@/types';
import { stageDimensions } from '@/utils/constants';

export const Stage: React.FC<StageProps> = ({
  children,
  width = stageDimensions.width,
  height = stageDimensions.height,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full flex items-center justify-center ${className}`}
      style={{ minHeight: height }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-4xl h-auto"
        role="img"
        aria-label="Visualization stage"
      >
        {/* Background gradient */}
        <defs>
          <radialGradient id="stageGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#stageGradient)"
        />
        {children}
      </svg>
    </div>
  );
};
