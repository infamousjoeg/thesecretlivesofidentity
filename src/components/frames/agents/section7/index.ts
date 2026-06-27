import type React from 'react';
import { Frame7_1 } from './Frame7_1';
import { Frame7_2 } from './Frame7_2';
import { Frame7_3 } from './Frame7_3';
import { Frame7_4 } from './Frame7_4';
import { Frame7_5 } from './Frame7_5';
import { Frame7_6 } from './Frame7_6';
import { Frame7_7 } from './Frame7_7';

export { Frame7_1 } from './Frame7_1';
export { Frame7_2 } from './Frame7_2';
export { Frame7_3 } from './Frame7_3';
export { Frame7_4 } from './Frame7_4';
export { Frame7_5 } from './Frame7_5';
export { Frame7_6 } from './Frame7_6';
export { Frame7_7 } from './Frame7_7';

// Frame component map for dynamic rendering — section 7 ("Reaching For Tools").
export const agentsSection7Frames: Record<string, React.FC> = {
  '7-1': Frame7_1,
  '7-2': Frame7_2,
  '7-3': Frame7_3,
  '7-4': Frame7_4,
  '7-5': Frame7_5,
  '7-6': Frame7_6,
  '7-7': Frame7_7,
};
