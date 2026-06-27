import type { Section } from '@/types';
import data from './data.json';

/**
 * AI Agent Identity module content.
 *
 * Central metaphor: the signed, scoped, short-lived "permission slip" /
 * work-order. A principal hands an agent a slip authorizing ONE narrow task
 * for a short time, never their master key; an agent can hand a NARROWER slip
 * to a sub-agent; any verifier can check the whole chain; slips expire and are
 * logged. Concept-anchored (delegation / scope / lifetime / on-behalf-of /
 * audit / revocation), deliberately not bound to any single wire format.
 *
 * The canonical data lives in `data.json` so the i18n `agents-content`
 * namespace can be generated from the exact same source (keeping the English
 * `defaultValue` fallbacks in sync with the locale file).
 */
export const sections: Section[] = data as Section[];

// Helper to get total frame count
export const getTotalFrameCount = (): number =>
  sections.reduce((sum, section) => sum + section.frames.length, 0);

// Helper to get section by ID
export const getSectionById = (id: string): Section | undefined =>
  sections.find((section) => section.id === id);
