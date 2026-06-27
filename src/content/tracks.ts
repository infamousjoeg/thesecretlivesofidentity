/**
 * Track Configuration (module-agnostic)
 *
 * Defines Bronze/Silver/Gold progressive learning tracks for ANY module.
 * Each track is a contiguous subset of a module's frames - Bronze and Silver
 * are checkpoints in the Gold journey, not curated selections.
 *
 * All tracks end with the module's "Get Started" CTA frame so users always
 * receive the call-to-action regardless of which track they complete.
 *
 * This file used to be hardcoded to the SPIFFE `sections` import. It is now a
 * factory: `buildTracks(params)` parameterizes the sections, the content-end
 * checkpoints, the "Get Started" frame, and the per-track display copy. Each
 * module builds its own tracks via this factory (see `src/content/modules.ts`).
 */

import type { Section } from '@/types';

export type TrackId = 'bronze' | 'silver' | 'gold';

export interface TrackFrame {
  sectionIndex: number; // 0-based section index
  frameIndex: number; // 0-based frame index within section
  frameId: string; // Original frame ID (e.g., '1-4')
}

/**
 * Per-track display copy. These are English defaults; the live UI overrides
 * each value via the module's `<prefix>-tracks` i18n namespace with a
 * `defaultValue` fallback to these strings.
 */
export interface TrackMeta {
  icon: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  goal: string;
}

export interface Track extends TrackMeta {
  id: TrackId;
  frames: TrackFrame[];
  // The global frame number where the main content ends (1-indexed)
  // (before the "Get Started" CTA is appended for Bronze/Silver)
  contentEndFrame: number;
}

export interface BuildTracksParams {
  sections: Section[];
  /** 1-indexed global frame number where each track's main content ends. */
  trackContentEnd: Record<TrackId, number>;
  /** CTA frame appended to Bronze/Silver (already included at the end of Gold). */
  getStartedFrame: TrackFrame;
  /** Per-track display copy (English defaults). */
  trackMeta: Record<TrackId, TrackMeta>;
}

export const trackOrder: TrackId[] = ['bronze', 'silver', 'gold'];

/**
 * Generate frames for a track up to the specified end frame.
 */
function generateTrackFrames(
  sections: Section[],
  getStartedFrame: TrackFrame,
  contentEndFrame: number,
  appendGetStarted: boolean = false
): TrackFrame[] {
  const frames: TrackFrame[] = [];
  let globalFrameIndex = 0;

  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    const section = sections[sectionIndex];
    for (let frameIndex = 0; frameIndex < section.frames.length; frameIndex++) {
      globalFrameIndex++;
      if (globalFrameIndex > contentEndFrame) {
        // Append "Get Started" CTA if requested and not already included
        if (appendGetStarted) {
          frames.push(getStartedFrame);
        }
        return frames;
      }
      frames.push({
        sectionIndex,
        frameIndex,
        frameId: section.frames[frameIndex].id,
      });
    }
  }

  return frames;
}

/**
 * Build the Bronze/Silver/Gold tracks for a module.
 * Bronze and Silver append the "Get Started" CTA at the end.
 * Gold already includes it as part of its complete content.
 */
export function buildTracks(params: BuildTracksParams): Record<TrackId, Track> {
  const { sections, trackContentEnd, getStartedFrame, trackMeta } = params;

  const make = (id: TrackId, appendGetStarted: boolean): Track => ({
    id,
    ...trackMeta[id],
    frames: generateTrackFrames(sections, getStartedFrame, trackContentEnd[id], appendGetStarted),
    contentEndFrame: trackContentEnd[id],
  });

  return {
    bronze: make('bronze', true),
    silver: make('silver', true),
    gold: make('gold', false), // Gold already includes "Get Started"
  };
}

/**
 * Get frame data for a specific track position.
 */
export function getTrackFrameData(
  sections: Section[],
  tracks: Record<TrackId, Track>,
  trackId: TrackId,
  position: number
):
  | {
      section: Section;
      frame: Section['frames'][number];
      trackFrame: TrackFrame;
    }
  | undefined {
  const track = tracks[trackId];
  const trackFrame = track?.frames[position];

  if (!trackFrame) return undefined;

  const section = sections[trackFrame.sectionIndex];
  const frame = section?.frames[trackFrame.frameIndex];

  if (!section || !frame) return undefined;

  return { section, frame, trackFrame };
}

/**
 * Get the next track after completing one.
 */
export function getNextTrack(trackId: TrackId): TrackId | null {
  if (trackId === 'bronze') return 'silver';
  if (trackId === 'silver') return 'gold';
  return null;
}

/**
 * Get the position in the target track where new content begins
 * (first frame not in the source track).
 *
 * With contiguous tracks, this is the source track's contentEndFrame.
 */
export function getContinuationPosition(
  tracks: Record<TrackId, Track>,
  sourceTrackId: TrackId
): number {
  const sourceTrack = tracks[sourceTrackId];
  return sourceTrack.contentEndFrame;
}

/**
 * Convert legacy section/frame to gold track position.
 */
export function legacyToGoldPosition(
  sections: Section[],
  sectionIndex: number,
  frameIndex: number
): number {
  let position = 0;
  for (let i = 0; i < sectionIndex; i++) {
    position += sections[i].frames.length;
  }
  return position + frameIndex;
}
