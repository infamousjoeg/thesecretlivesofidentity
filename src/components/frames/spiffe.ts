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

/**
 * Combined frame map for the SPIFFE module (frameId -> component).
 *
 * Kept in its own file (separate from `index.tsx`) so the module registry
 * can import it without creating an import cycle with `getFrameComponent`,
 * which resolves components through the registry.
 */
export const spiffeFrames: Record<string, React.FC> = {
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
