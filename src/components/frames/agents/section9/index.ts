import type React from 'react';
import { Frame9_1 } from './Frame9_1';
import { Frame9_2 } from './Frame9_2';
import { Frame9_3 } from './Frame9_3';
import { Frame9_4 } from './Frame9_4';

export { Frame9_1 } from './Frame9_1';
export { Frame9_2 } from './Frame9_2';
export { Frame9_3 } from './Frame9_3';
export { Frame9_4 } from './Frame9_4';

// Frame component map for dynamic rendering — section 9 ("Conclusion").
export const agentsSection9Frames: Record<string, React.FC> = {
  '9-1': Frame9_1,
  '9-2': Frame9_2,
  '9-3': Frame9_3,
  '9-4': Frame9_4,
};
