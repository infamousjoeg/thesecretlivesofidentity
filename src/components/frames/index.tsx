import React from 'react';
import { getModule } from '@/content/modules';

// Re-export section frame maps (SPIFFE)
export { section1Frames } from './section1';
export { section2Frames } from './section2';
export { section3Frames } from './section3';
export { section4Frames } from './section4';
export { section5Frames } from './section5';
export { section6Frames } from './section6';
export { section7Frames } from './section7';
export { section8Frames } from './section8';
export { section9Frames } from './section9';

// Combined per-module map (SPIFFE)
export { spiffeFrames } from './spiffe';

// Placeholder frame for frames not yet implemented
export const PlaceholderFrame: React.FC<{ frameId: string }> = ({ frameId }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 bg-surface rounded-xl border border-textMuted/20">
        <p className="text-textMuted text-lg mb-2">Frame {frameId}</p>
        <p className="text-textSecondary text-sm">Coming soon</p>
      </div>
    </div>
  );
};

/**
 * Resolve a frame component by module + frame id.
 *
 * Frame ids (e.g. `1-1`) are namespaced by module, so the same id can exist in
 * two modules without colliding. The lookup reads the module's own
 * `frameComponents` map from the registry.
 */
export const getFrameComponent = (
  moduleId: string | undefined,
  frameId: string | undefined
): React.FC | null => {
  if (!moduleId || !frameId) return null;
  const config = getModule(moduleId);
  return config?.frameComponents[frameId] ?? null;
};
