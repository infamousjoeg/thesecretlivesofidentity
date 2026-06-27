/**
 * Module Registry — single source of truth for every learning module.
 *
 * This replaces the scattered `import { sections } from '@/content/spiffe'`
 * couplings throughout the app. Routing, the store, navigation, the frame
 * lookup, and i18n all resolve their module-specific data through `getModule`.
 *
 * To add a module (e.g. `agents`):
 *   1. Author its `Section[]` data and frame components.
 *   2. Register its three i18n namespaces (`<prefix>-content/-frames/-tracks`).
 *   3. Add an entry to `modules` below. Nothing else in the app needs to change.
 */

import type React from 'react';
import type { Section } from '@/types';
import {
  buildTracks,
  trackOrder as defaultTrackOrder,
  type Track,
  type TrackFrame,
  type TrackId,
  type TrackMeta,
} from '@/content/tracks';
import { sections as spiffeSections } from '@/content/spiffe';
import { spiffeFrames } from '@/components/frames/spiffe';
import { sections as agentsSections } from '@/content/agents';
import { agentsFrames } from '@/components/frames/agents';

export type ModuleId = 'spiffe' | 'agents';

export interface ModuleConfig {
  id: ModuleId;
  /** URL base for the module, e.g. '/spiffe'. No trailing slash. */
  basePath: string;
  /** i18n namespace prefix; resolves to `<prefix>-content/-frames/-tracks`. */
  i18nPrefix: string;
  /** Ordered section content. */
  sections: Section[];
  /** Bronze/Silver/Gold tracks built from the sections. */
  tracks: Record<TrackId, Track>;
  /** Track display order for the selector. */
  trackOrder: TrackId[];
  /** Which track is highlighted as recommended in the selector. */
  recommendedTrack: TrackId;
  /** 1-indexed global frame number where each track's content ends. */
  trackContentEnd: Record<TrackId, number>;
  /** CTA frame appended to Bronze/Silver. */
  getStartedFrame: TrackFrame;
  /** frameId -> React component, scoped to this module. */
  frameComponents: Record<string, React.FC>;
}

// ---------------------------------------------------------------------------
// SPIFFE module
// ---------------------------------------------------------------------------

/**
 * Track content end points (1-indexed global frame numbers).
 * Bronze: end of Section 2 ("What is SPIFFE?")
 * Silver: end of Section 6 ("Using Your Identity")
 * Gold:   all 95 frames (including "Get Started")
 */
const spiffeTrackContentEnd: Record<TrackId, number> = {
  bronze: 23,
  silver: 69,
  gold: 95,
};

/** The "Get Started" CTA frame (9-4), appended to Bronze/Silver. */
const spiffeGetStartedFrame: TrackFrame = {
  sectionIndex: 8, // Section 9 (0-indexed)
  frameIndex: 3, // Frame 9-4 (0-indexed within section)
  frameId: '9-4',
};

/** English defaults; overridden at render via the `spiffe-tracks` namespace. */
const spiffeTrackMeta: Record<TrackId, TrackMeta> = {
  bronze: {
    icon: '🥉',
    title: 'Bronze',
    subtitle: 'What is SPIFFE?',
    duration: '~6 minutes',
    description: 'The identity crisis and SPIFFE concepts. Perfect for a quick introduction.',
    goal: 'Now I can explain SPIFFE to someone',
  },
  silver: {
    icon: '🥈',
    title: 'Silver',
    subtitle: 'How SPIFFE Works',
    duration: '~17 minutes',
    description: 'SPIRE architecture, attestation flows, and using identity. Understand the system.',
    goal: 'Now I understand how the system works',
  },
  gold: {
    icon: '🥇',
    title: 'Gold',
    subtitle: 'SPIFFE Deep Dive',
    duration: '~25 minutes',
    description: 'Complete course with identity lifecycle, advanced concepts, and federation.',
    goal: 'Now I can implement and debug',
  },
};

const spiffeModule: ModuleConfig = {
  id: 'spiffe',
  basePath: '/spiffe',
  i18nPrefix: 'spiffe',
  sections: spiffeSections,
  tracks: buildTracks({
    sections: spiffeSections,
    trackContentEnd: spiffeTrackContentEnd,
    getStartedFrame: spiffeGetStartedFrame,
    trackMeta: spiffeTrackMeta,
  }),
  trackOrder: defaultTrackOrder,
  recommendedTrack: 'silver',
  trackContentEnd: spiffeTrackContentEnd,
  getStartedFrame: spiffeGetStartedFrame,
  frameComponents: spiffeFrames,
};

// ---------------------------------------------------------------------------
// AI Agent Identity module
// ---------------------------------------------------------------------------

/**
 * Track content end points (1-indexed global frame numbers), 60 frames total.
 * Bronze: end of Section 3 ("On Whose Behalf?")     -> frame 20
 * Silver: end of Section 6 ("Agent-To-Agent")        -> frame 42
 * Gold:   all 60 frames (including "Get Started")
 */
const agentsTrackContentEnd: Record<TrackId, number> = {
  bronze: 20,
  silver: 42,
  gold: 60,
};

/** The "Get Started" CTA frame (9-4), appended to Bronze/Silver. */
const agentsGetStartedFrame: TrackFrame = {
  sectionIndex: 8, // Section 9 (0-indexed)
  frameIndex: 3, // Frame 9-4 (0-indexed within section)
  frameId: '9-4',
};

/** English defaults; overridden at render via the `agents-tracks` namespace. */
const agentsTrackMeta: Record<TrackId, TrackMeta> = {
  bronze: {
    icon: '🥉',
    title: 'Bronze',
    subtitle: 'Why Agents Need Identity',
    duration: '~5 minutes',
    description: 'The agent identity crisis, why an agent needs its own identity, and what it means to act on someone\'s behalf.',
    goal: 'Now I can explain why agents should not share your master key',
  },
  silver: {
    icon: '🥈',
    title: 'Silver',
    subtitle: 'How Delegation Works',
    duration: '~12 minutes',
    description: 'Permission slips, narrowing scope at every hop, and agent-to-agent delegation chains with a full audit trail.',
    goal: 'Now I understand how scoped delegation works',
  },
  gold: {
    icon: '🥇',
    title: 'Gold',
    subtitle: 'Agent Identity Deep Dive',
    duration: '~18 minutes',
    description: 'The complete course: reaching for tools with MCP, the confused-deputy problem, revocation, and defense in depth.',
    goal: 'Now I can reason about agent authorization end to end',
  },
};

const agentsModule: ModuleConfig = {
  id: 'agents',
  basePath: '/agents',
  i18nPrefix: 'agents',
  sections: agentsSections,
  tracks: buildTracks({
    sections: agentsSections,
    trackContentEnd: agentsTrackContentEnd,
    getStartedFrame: agentsGetStartedFrame,
    trackMeta: agentsTrackMeta,
  }),
  trackOrder: defaultTrackOrder,
  recommendedTrack: 'silver',
  trackContentEnd: agentsTrackContentEnd,
  getStartedFrame: agentsGetStartedFrame,
  frameComponents: agentsFrames,
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const modules: Partial<Record<ModuleId, ModuleConfig>> = {
  spiffe: spiffeModule,
  agents: agentsModule,
};

/** Resolve a module config by id. Returns undefined for unknown ids. */
export const getModule = (id: string | undefined): ModuleConfig | undefined => {
  if (!id) return undefined;
  return modules[id as ModuleId];
};

/** All registered modules, in insertion order. */
export const registeredModules = (): ModuleConfig[] =>
  Object.values(modules).filter((m): m is ModuleConfig => Boolean(m));
