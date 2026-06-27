import type React from 'react';
import { Frame2_1 } from './Frame2_1';
import { Frame2_2 } from './Frame2_2';
import { Frame2_3 } from './Frame2_3';
import { Frame2_4 } from './Frame2_4';
import { Frame2_5 } from './Frame2_5';
import { Frame2_6 } from './Frame2_6';

export { Frame2_1 } from './Frame2_1';
export { Frame2_2 } from './Frame2_2';
export { Frame2_3 } from './Frame2_3';
export { Frame2_4 } from './Frame2_4';
export { Frame2_5 } from './Frame2_5';
export { Frame2_6 } from './Frame2_6';

// Section 2 ("Who Is This Agent?") frame map.
export const agentsSection2Frames: Record<string, React.FC> = {
  '2-1': Frame2_1,
  '2-2': Frame2_2,
  '2-3': Frame2_3,
  '2-4': Frame2_4,
  '2-5': Frame2_5,
  '2-6': Frame2_6,
};
