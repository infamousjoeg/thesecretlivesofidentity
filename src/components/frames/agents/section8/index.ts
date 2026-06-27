import type React from 'react';
import { Frame8_1 } from './Frame8_1';
import { Frame8_2 } from './Frame8_2';
import { Frame8_3 } from './Frame8_3';
import { Frame8_4 } from './Frame8_4';
import { Frame8_5 } from './Frame8_5';
import { Frame8_6 } from './Frame8_6';
import { Frame8_7 } from './Frame8_7';

export { Frame8_1 } from './Frame8_1';
export { Frame8_2 } from './Frame8_2';
export { Frame8_3 } from './Frame8_3';
export { Frame8_4 } from './Frame8_4';
export { Frame8_5 } from './Frame8_5';
export { Frame8_6 } from './Frame8_6';
export { Frame8_7 } from './Frame8_7';

// Frame component map for dynamic rendering — section 8 ("What Goes Wrong").
export const agentsSection8Frames: Record<string, React.FC> = {
  '8-1': Frame8_1,
  '8-2': Frame8_2,
  '8-3': Frame8_3,
  '8-4': Frame8_4,
  '8-5': Frame8_5,
  '8-6': Frame8_6,
  '8-7': Frame8_7,
};
