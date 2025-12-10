/**
 * Track Configuration for SPIFFE Visualization
 *
 * Defines Bronze/Silver/Gold progressive learning tracks.
 * Each track is a contiguous subset of frames - Bronze and Silver are
 * checkpoints in the Gold journey, not curated selections.
 *
 * All tracks end with the "Get Started" CTA frame so users always
 * receive the call-to-action regardless of which track they complete.
 *
 * Frame Distribution:
 * - Section 1 (The Identity Crisis): frames 1-10
 * - Section 2 (What is SPIFFE?): frames 11-23
 * - Section 3 (Meet SPIRE): frames 24-35
 * - Section 4 (Node Attestation): frames 36-46
 * - Section 5 (Workload Attestation): frames 47-58
 * - Section 6 (Using Your Identity): frames 59-69
 * - Section 7 (Identity Lifecycle): frames 70-79
 * - Section 8 (Advanced Concepts): frames 80-91
 * - Section 9 (Conclusion): frames 92-95
 */

import { sections } from './spiffe';
import type { Section } from '@/types';

export type TrackId = 'bronze' | 'silver' | 'gold';

export interface TrackFrame {
  sectionIndex: number;  // 0-based section index
  frameIndex: number;    // 0-based frame index within section
  frameId: string;       // Original frame ID (e.g., '1-4')
}

export interface Track {
  id: TrackId;
  icon: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  goal: string;
  frames: TrackFrame[];
  // The global frame number where the main content ends (1-indexed)
  // (before the "Get Started" CTA is appended for Bronze/Silver)
  contentEndFrame: number;
}

/**
 * Track content end points (1-indexed global frame numbers)
 * These are where the main content ends, before the "Get Started" CTA.
 *
 * Bronze: Ends at frame 23 (end of Section 2 "What is SPIFFE?")
 * Silver: Ends at frame 69 (end of Section 6 "Using Your Identity")
 * Gold: Ends at frame 95 (all frames, including "Get Started")
 */
const TRACK_CONTENT_END = {
  bronze: 23,  // Through Section 2
  silver: 69,  // Through Section 6
  gold: 95,    // All frames
} as const;

/**
 * The "Get Started" CTA frame (9-4) - appended to all tracks
 */
const GET_STARTED_FRAME: TrackFrame = {
  sectionIndex: 8,  // Section 9 (0-indexed)
  frameIndex: 3,    // Frame 9-4 (0-indexed within section)
  frameId: '9-4',
};

/**
 * Generate frames for a track up to the specified end frame
 */
function generateTrackFrames(contentEndFrame: number, appendGetStarted: boolean = false): TrackFrame[] {
  const frames: TrackFrame[] = [];
  let globalFrameIndex = 0;

  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    const section = sections[sectionIndex];
    for (let frameIndex = 0; frameIndex < section.frames.length; frameIndex++) {
      globalFrameIndex++;
      if (globalFrameIndex > contentEndFrame) {
        // Append "Get Started" CTA if requested and not already included
        if (appendGetStarted) {
          frames.push(GET_STARTED_FRAME);
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
 * Track definitions
 * Bronze and Silver append the "Get Started" CTA at the end.
 * Gold already includes it as part of its complete content.
 */
export const tracks: Record<TrackId, Track> = {
  bronze: {
    id: 'bronze',
    icon: '🥉',
    title: 'Bronze',
    subtitle: 'What is SPIFFE?',
    duration: '~6 minutes',
    description: 'The identity crisis and SPIFFE concepts. Perfect for a quick introduction.',
    goal: 'Now I can explain SPIFFE to someone',
    frames: generateTrackFrames(TRACK_CONTENT_END.bronze, true), // Append "Get Started"
    contentEndFrame: TRACK_CONTENT_END.bronze,
  },
  silver: {
    id: 'silver',
    icon: '🥈',
    title: 'Silver',
    subtitle: 'How SPIFFE Works',
    duration: '~17 minutes',
    description: 'SPIRE architecture, attestation flows, and using identity. Understand the system.',
    goal: 'Now I understand how the system works',
    frames: generateTrackFrames(TRACK_CONTENT_END.silver, true), // Append "Get Started"
    contentEndFrame: TRACK_CONTENT_END.silver,
  },
  gold: {
    id: 'gold',
    icon: '🥇',
    title: 'Gold',
    subtitle: 'SPIFFE Deep Dive',
    duration: '~25 minutes',
    description: 'Complete course with identity lifecycle, advanced concepts, and federation.',
    goal: 'Now I can implement and debug',
    frames: generateTrackFrames(TRACK_CONTENT_END.gold, false), // Already includes "Get Started"
    contentEndFrame: TRACK_CONTENT_END.gold,
  },
};

/**
 * Get track by ID
 */
export function getTrack(trackId: TrackId): Track {
  return tracks[trackId];
}

/**
 * Get frame data for a specific track position
 */
export function getTrackFrameData(trackId: TrackId, position: number): {
  section: Section;
  frame: Section['frames'][number];
  trackFrame: TrackFrame;
} | undefined {
  const track = tracks[trackId];
  const trackFrame = track.frames[position];

  if (!trackFrame) return undefined;

  const section = sections[trackFrame.sectionIndex];
  const frame = section?.frames[trackFrame.frameIndex];

  if (!section || !frame) return undefined;

  return { section, frame, trackFrame };
}

/**
 * Get the next track after completing one
 */
export function getNextTrack(trackId: TrackId): TrackId | null {
  if (trackId === 'bronze') return 'silver';
  if (trackId === 'silver') return 'gold';
  return null;
}

/**
 * Get the position in the target track where new content begins
 * (first frame not in the source track)
 *
 * With contiguous tracks, this is the source track's contentEndFrame.
 * Bronze content ends at 23, so Silver's new content starts at position 23 (0-indexed).
 * (We use contentEndFrame, not frames.length, because tracks now include
 * the "Get Started" CTA at the end which shouldn't affect continuation.)
 */
export function getContinuationPosition(sourceTrackId: TrackId, _targetTrackId: TrackId): number {
  const sourceTrack = tracks[sourceTrackId];
  // New content in target track starts right after source track's main content ends
  return sourceTrack.contentEndFrame;
}

/**
 * Convert legacy section/frame to gold track position
 */
export function legacyToGoldPosition(sectionIndex: number, frameIndex: number): number {
  let position = 0;
  for (let i = 0; i < sectionIndex; i++) {
    position += sections[i].frames.length;
  }
  return position + frameIndex;
}

/**
 * Get all track IDs in order
 */
export const trackOrder: TrackId[] = ['bronze', 'silver', 'gold'];
