import React from 'react';
import { section1Frames } from './section1';
import { section2Frames } from './section2';
import { section3Frames } from './section3';
import { section4Frames } from './section4';
import { section5Frames } from './section5';
import { section6Frames } from './section6';
import { section7Frames } from './section7';
import { section8Frames } from './section8';
import { section9Frames } from './section9';

// Export section frame maps
export { section1Frames } from './section1';
export { section2Frames } from './section2';
export { section3Frames } from './section3';
export { section4Frames } from './section4';
export { section5Frames } from './section5';
export { section6Frames } from './section6';
export { section7Frames } from './section7';
export { section8Frames } from './section8';
export { section9Frames } from './section9';

// Combined frame map for all sections
export const allFrames: Record<string, React.FC> = {
  ...section1Frames,
  ...section2Frames,
  ...section3Frames,
  ...section4Frames,
  ...section5Frames,
  ...section6Frames,
  ...section7Frames,
  ...section8Frames,
  ...section9Frames,
};

// Placeholder frame for sections not yet implemented
export const PlaceholderFrame: React.FC<{ frameId: string }> = ({ frameId }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 bg-surface rounded-xl border border-textMuted/20">
        <p className="text-textMuted text-lg mb-2">Frame {frameId}</p>
        <p className="text-textSecondary text-sm">Coming soon in Phase 4-6</p>
      </div>
    </div>
  );
};

// Get frame component by ID
export const getFrameComponent = (frameId: string): React.FC | null => {
  return allFrames[frameId] || null;
};
