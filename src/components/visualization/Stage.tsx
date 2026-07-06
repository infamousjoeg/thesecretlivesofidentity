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
      className={`relative mx-auto w-full max-w-4xl flex items-center justify-center ${className}`}
      // aspectRatio gives the stage an intrinsic height derived from its
      // (capped) width so it never collapses, while maxHeight:100% lets it
      // shrink to fit when a height-constrained parent (the track frame's
      // flex-1 visualization region) is shorter than that intrinsic height.
      // preserveAspectRatio keeps the diagram centered and correctly scaled
      // at every size — it grows to fill on tall screens and shrinks on short
      // laptop viewports instead of overflowing and pushing the title away.
      style={{ aspectRatio: `${width} / ${height}`, maxHeight: '100%' }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
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
