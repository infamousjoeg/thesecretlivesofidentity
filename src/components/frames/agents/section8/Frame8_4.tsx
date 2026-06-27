import React from 'react';
import { ConfusedDeputy } from '@/components/interactive';

/**
 * Frame 8-4: Scope Is The Defense (interactive)
 * Hosts the ConfusedDeputy simulator: the learner sets the agent's slip
 * over-broad or narrow (and optionally expired / revoked), fires a malicious
 * "delete all records" instruction, and watches the verifier ACCEPT (damage) or
 * REJECT (blocked). The frame title and body copy are rendered by the track
 * shell from the `agents-content` namespace.
 */
export const Frame8_4: React.FC = () => {
  return <ConfusedDeputy />;
};
