import React from 'react';
import { Badge } from './Badge';
import type { Position, BadgeState, SVIDVariant } from '@/types';

interface SVIDProps {
  id?: string;
  spiffeId?: string;
  position: Position;
  size?: number;
  state?: BadgeState;
  variant?: SVIDVariant;
  expiresIn?: number;
  showCountdown?: boolean;
  animate?: boolean;
}

/**
 * SVID entity - Wrapper around Badge for SVID-specific context
 * This is essentially the Badge component with SVID semantics
 */
export const SVID: React.FC<SVIDProps> = (props) => {
  return <Badge {...props} />;
};
