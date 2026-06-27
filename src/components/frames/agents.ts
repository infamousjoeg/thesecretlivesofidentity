import React from 'react';
import { agentsSection1Frames } from './agents/section1';
import { agentsSection2Frames } from './agents/section2';
import { agentsSection3Frames } from './agents/section3';
import { agentsSection4Frames } from './agents/section4';
import { agentsSection5Frames } from './agents/section5';
import { agentsSection6Frames } from './agents/section6';
import { agentsSection7Frames } from './agents/section7';
import { agentsSection8Frames } from './agents/section8';
import { agentsSection9Frames } from './agents/section9';

/**
 * Combined frame map for the AI Agent Identity module (frameId -> component).
 *
 * Kept in its own file (separate from `index.tsx`) so the module registry can
 * import it without creating an import cycle with `getFrameComponent`, which
 * resolves components through the registry. Mirrors `spiffe.ts`.
 *
 * Sections are populated in Phase C2 (one builder group per section range);
 * any not-yet-built frame id is simply absent, so `getFrameComponent('agents',
 * id)` returns null and the shared `PlaceholderFrame` renders while the real
 * title/body still come from the `agents-content` i18n namespace.
 */
export const agentsFrames: Record<string, React.FC> = {
  ...agentsSection1Frames,
  ...agentsSection2Frames,
  ...agentsSection3Frames,
  ...agentsSection4Frames,
  ...agentsSection5Frames,
  ...agentsSection6Frames,
  ...agentsSection7Frames,
  ...agentsSection8Frames,
  ...agentsSection9Frames,
};
