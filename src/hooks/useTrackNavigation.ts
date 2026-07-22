/**
 * useTrackNavigation - Module + track-aware navigation hook
 *
 * Manages navigation within a specific module's learning track
 * (Bronze/Silver/Gold). Reads the active module and track from the URL,
 * syncs track position with the store, and provides navigation actions.
 * All URLs are derived from the module's `basePath`, and progress is
 * persisted under a per-module storage key so it never bleeds across modules.
 */

import { useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVisualizationStore } from '@/store/visualizationStore';
import {
  getTrackFrameData,
  getNextTrack,
  getContinuationPosition,
  type TrackId,
} from '@/content/tracks';
import { getModule } from '@/content/modules';

interface TrackProgress {
  [trackId: string]: number; // trackId -> last frame position
}

function storageKey(moduleId: string): string {
  return `${moduleId}-track-progress`;
}

function loadProgress(moduleId: string): TrackProgress {
  try {
    const stored = localStorage.getItem(storageKey(moduleId));
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(moduleId: string, trackId: TrackId, position: number): void {
  try {
    const progress = loadProgress(moduleId);
    progress[trackId] = position;
    localStorage.setItem(storageKey(moduleId), JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Read a track's last saved frame position (0-indexed) for a module.
 * Used by the track selector to resume where the learner left off, so the
 * "Progress is saved automatically" promise is actually honored.
 */
export function getTrackProgress(moduleId: string, trackId: TrackId): number {
  return loadProgress(moduleId)[trackId] ?? 0;
}

export function useTrackNavigation() {
  const navigate = useNavigate();
  const params = useParams<{ module?: string; track?: string; frameIndex?: string }>();

  const { goToFrame, animationPhase, setAnimationPhase, resetAnimationPhase } =
    useVisualizationStore();

  // Resolve the active module from the URL.
  const moduleId = params.module;
  const moduleConfig = useMemo(() => getModule(moduleId), [moduleId]);
  const basePath = moduleConfig?.basePath ?? '';

  // Determine current track from the :track param (validated against the module).
  const currentTrack = useMemo((): TrackId | null => {
    if (!moduleConfig) return null;
    const candidate = params.track as TrackId | undefined;
    if (candidate && moduleConfig.trackOrder.includes(candidate)) {
      return candidate;
    }
    return null;
  }, [moduleConfig, params.track]);

  // Get track info.
  const tracks = moduleConfig?.tracks ?? null;
  const track = currentTrack && tracks ? tracks[currentTrack] : null;
  const totalFrames = track?.frames.length ?? 0;

  // Current position within track (0-indexed), always clamped to a valid frame
  // so out-of-range / non-numeric deep links (e.g. /spiffe/gold/0, /gold/9999)
  // resolve to the nearest real frame instead of hanging on "Loading...".
  const currentPosition = useMemo(() => {
    const frameIndex = params.frameIndex;
    let pos = 0;
    if (frameIndex) {
      const parsed = parseInt(frameIndex, 10);
      // URL uses 1-indexed, internal uses 0-indexed
      pos = isNaN(parsed) ? 0 : parsed - 1;
    }
    if (totalFrames <= 0) return 0;
    return Math.max(0, Math.min(pos, totalFrames - 1));
  }, [params.frameIndex, totalFrames]);

  // Get current frame data.
  const frameData = useMemo(() => {
    if (!moduleConfig || !currentTrack) return null;
    return getTrackFrameData(
      moduleConfig.sections,
      moduleConfig.tracks,
      currentTrack,
      currentPosition
    );
  }, [moduleConfig, currentTrack, currentPosition]);

  // Boundary checks.
  const isFirstFrame = currentPosition === 0;
  const isLastFrame = currentPosition >= totalFrames - 1;

  // Sync internal store with track position.
  useEffect(() => {
    if (frameData) {
      goToFrame(frameData.trackFrame.sectionIndex, frameData.trackFrame.frameIndex);
    }
  }, [frameData, goToFrame]);

  // Save progress when position changes.
  useEffect(() => {
    if (moduleId && currentTrack && currentPosition >= 0) {
      saveProgress(moduleId, currentTrack, currentPosition);
    }
  }, [moduleId, currentTrack, currentPosition]);

  // Navigate to specific position within track.
  const goToPosition = useCallback(
    (position: number) => {
      if (!currentTrack || !basePath) return;
      const clampedPosition = Math.max(0, Math.min(position, totalFrames - 1));
      // URL uses 1-indexed
      navigate(`${basePath}/${currentTrack}/${clampedPosition + 1}`);
      resetAnimationPhase();
    },
    [currentTrack, basePath, totalFrames, navigate, resetAnimationPhase]
  );

  // Next frame.
  const nextFrame = useCallback(() => {
    if (!isLastFrame) {
      goToPosition(currentPosition + 1);
    }
  }, [isLastFrame, currentPosition, goToPosition]);

  // Previous frame.
  const prevFrame = useCallback(() => {
    if (!isFirstFrame) {
      goToPosition(currentPosition - 1);
    }
  }, [isFirstFrame, currentPosition, goToPosition]);

  // Switch to a different track.
  const switchTrack = useCallback(
    (trackId: TrackId, startPosition: number = 0) => {
      if (!tracks || !basePath) return;
      const targetTrack = tracks[trackId];
      const clampedPosition = Math.max(0, Math.min(startPosition, targetTrack.frames.length - 1));
      navigate(`${basePath}/${trackId}/${clampedPosition + 1}`);
      resetAnimationPhase();
    },
    [tracks, basePath, navigate, resetAnimationPhase]
  );

  // Go to track selector.
  const goToTrackSelector = useCallback(() => {
    if (basePath) navigate(basePath);
  }, [basePath, navigate]);

  // Continue to next track (for completion screen).
  // Skips to the first NEW frame not in the current track.
  const continueToNextTrack = useCallback(() => {
    if (!currentTrack || !tracks) return;
    const nextTrackId = getNextTrack(currentTrack);
    if (nextTrackId) {
      const continuationPos = getContinuationPosition(tracks, currentTrack);
      switchTrack(nextTrackId, continuationPos);
    }
  }, [currentTrack, tracks, switchTrack]);

  // Get saved progress for a track.
  const getSavedProgress = useCallback(
    (trackId: TrackId): number => {
      if (!moduleId) return 0;
      const progress = loadProgress(moduleId);
      return progress[trackId] ?? 0;
    },
    [moduleId]
  );

  // Check if track has saved progress.
  const hasSavedProgress = useCallback(
    (trackId: TrackId): boolean => {
      if (!moduleId) return false;
      const progress = loadProgress(moduleId);
      return (progress[trackId] ?? 0) > 0;
    },
    [moduleId]
  );

  // Progress info.
  const progress = useMemo(
    () => ({
      current: currentPosition + 1, // 1-indexed for display
      total: totalFrames,
      percentage: totalFrames > 0 ? ((currentPosition + 1) / totalFrames) * 100 : 0,
    }),
    [currentPosition, totalFrames]
  );

  return {
    // Module
    moduleId,
    moduleConfig,
    basePath,

    // Current state
    currentTrack,
    currentPosition,
    track,
    tracks,
    totalFrames,
    frameData,

    // Boundaries
    isFirstFrame,
    isLastFrame,

    // Progress
    progress,

    // Navigation actions
    nextFrame,
    prevFrame,
    goToPosition,
    switchTrack,
    goToTrackSelector,
    continueToNextTrack,

    // Saved progress
    getSavedProgress,
    hasSavedProgress,

    // Animation phase (from store)
    animationPhase,
    setAnimationPhase,
    resetAnimationPhase,
  };
}
