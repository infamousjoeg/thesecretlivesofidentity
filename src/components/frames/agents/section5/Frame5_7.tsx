import React from 'react';
import { DelegationBuilder } from '@/components/interactive';

/**
 * Frame 5-7: The Shrinking Slip (interactive)
 * Hosts the DelegationBuilder simulator: the learner narrows a slip down a
 * Principal → Agent → Sub-Agent chain (only ever removing scopes), then presents
 * the final slip at a tool to see per-action ACCEPT / REJECT. The frame title and
 * body copy are rendered by the track shell from the `agents-content` namespace.
 */
export const Frame5_7: React.FC = () => {
  return <DelegationBuilder />;
};
