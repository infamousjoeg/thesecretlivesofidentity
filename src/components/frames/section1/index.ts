import React from 'react';
import { Frame1_1 } from './Frame1_1';
import { Frame1_2 } from './Frame1_2';
import { Frame1_3 } from './Frame1_3';
import { Frame1_4 } from './Frame1_4';
import { Frame1_5 } from './Frame1_5';
import { Frame1_6 } from './Frame1_6';
import { Frame1_7 } from './Frame1_7';
import { Frame1_8 } from './Frame1_8';
import { Frame1_9 } from './Frame1_9';
import { Frame1_10 } from './Frame1_10';

export { Frame1_1 } from './Frame1_1';
export { Frame1_2 } from './Frame1_2';
export { Frame1_3 } from './Frame1_3';
export { Frame1_4 } from './Frame1_4';
export { Frame1_5 } from './Frame1_5';
export { Frame1_6 } from './Frame1_6';
export { Frame1_7 } from './Frame1_7';
export { Frame1_8 } from './Frame1_8';
export { Frame1_9 } from './Frame1_9';
export { Frame1_10 } from './Frame1_10';

// Frame component map for dynamic rendering
export const section1Frames: Record<string, React.FC> = {
  '1-1': Frame1_1,
  '1-2': Frame1_2,
  '1-3': Frame1_3,
  '1-4': Frame1_4,
  '1-5': Frame1_5,
  '1-6': Frame1_6,
  '1-7': Frame1_7,
  '1-8': Frame1_8,
  '1-9': Frame1_9,
  '1-10': Frame1_10,
};
