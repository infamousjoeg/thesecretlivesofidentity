import type React from 'react';
import { Frame6_1 } from './Frame6_1';
import { Frame6_2 } from './Frame6_2';
import { Frame6_3 } from './Frame6_3';
import { Frame6_4 } from './Frame6_4';
import { Frame6_5 } from './Frame6_5';
import { Frame6_6 } from './Frame6_6';
import { Frame6_7 } from './Frame6_7';

export { Frame6_1 } from './Frame6_1';
export { Frame6_2 } from './Frame6_2';
export { Frame6_3 } from './Frame6_3';
export { Frame6_4 } from './Frame6_4';
export { Frame6_5 } from './Frame6_5';
export { Frame6_6 } from './Frame6_6';
export { Frame6_7 } from './Frame6_7';

// Section 6 — "Agent-To-Agent" (principal → agent → sub-agent chain + audit trail)
export const agentsSection6Frames: Record<string, React.FC> = {
  '6-1': Frame6_1,
  '6-2': Frame6_2,
  '6-3': Frame6_3,
  '6-4': Frame6_4,
  '6-5': Frame6_5,
  '6-6': Frame6_6,
  '6-7': Frame6_7,
};
