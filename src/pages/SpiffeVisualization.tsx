import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { TrackFrame } from '@/components/visualization';
import { useTrackNavigation } from '@/hooks';
import { getFrameComponent, PlaceholderFrame } from '@/components/frames';

export const SpiffeVisualization: React.FC = () => {
  const { frameData, currentTrack, currentPosition } = useTrackNavigation();

  // Get the frame component based on track navigation
  const frameId = frameData?.frame.id;
  const FrameComponent = frameId ? getFrameComponent(frameId) : null;

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <TrackFrame key={`${currentTrack}-${currentPosition}`}>
          {FrameComponent ? (
            <FrameComponent />
          ) : (
            <PlaceholderFrame frameId={frameId || 'unknown'} />
          )}
        </TrackFrame>
      </AnimatePresence>
    </div>
  );
};
