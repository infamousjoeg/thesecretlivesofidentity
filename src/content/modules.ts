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
// Registry
// ---------------------------------------------------------------------------

export const modules: Partial<Record<ModuleId, ModuleConfig>> = {
  spiffe: spiffeModule,
};

/** Resolve a module config by id. Returns undefined for unknown ids. */
export const getModule = (id: string | undefined): ModuleConfig | undefined => {
  if (!id) return undefined;
  return modules[id as ModuleId];
};

/** All registered modules, in insertion order. */
export const registeredModules = (): ModuleConfig[] =>
  Object.values(modules).filter((m): m is ModuleConfig => Boolean(m));
