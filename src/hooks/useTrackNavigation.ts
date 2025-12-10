/**
 * useTrackNavigation - Track-aware navigation hook
 *
 * Manages navigation within a specific learning track (Bronze/Silver/Gold).
 * Syncs track position with URL and provides navigation actions.
 */

import { useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useVisualizationStore } from '@/store/visualizationStore';
import { tracks, getTrackFrameData, getNextTrack, getContinuationPosition, type TrackId } from '@/content/tracks';

// Storage key for persisting progress
const STORAGE_KEY = 'spiffe-track-progress';

interface TrackProgress {
  [trackId: string]: number; // trackId -> last frame position
}

function loadProgress(): TrackProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(trackId: TrackId, position: number): void {
  try {
    const progress = loadProgress();
    progress[trackId] = position;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}

export function useTrackNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ frameIndex?: string }>();

  const { goToFrame, animationPhase, setAnimationPhase, resetAnimationPhase } =
    useVisualizationStore();

  // Determine current track from URL path
  const currentTrack = useMemo((): TrackId | null => {
    const path = location.pathname;
    if (path.includes('/spiffe/bronze')) return 'bronze';
    if (path.includes('/spiffe/silver')) return 'silver';
    if (path.includes('/spiffe/gold')) return 'gold';
    return null;
  }, [location.pathname]);

  // Current position within track (0-indexed)
  const currentPosition = useMemo(() => {
    const frameIndex = params.frameIndex;
    if (frameIndex) {
      const parsed = parseInt(frameIndex, 10);
      // URL uses 1-indexed, internal uses 0-indexed
      return isNaN(parsed) ? 0 : parsed - 1;
    }
    return 0;
  }, [params.frameIndex]);

  // Get track info
  const track = currentTrack ? tracks[currentTrack] : null;
  const totalFrames = track?.frames.length ?? 0;

  // Get current frame data
  const frameData = useMemo(() => {
    if (!currentTrack) return null;
    return getTrackFrameData(currentTrack, currentPosition);
  }, [currentTrack, currentPosition]);

  // Boundary checks
  const isFirstFrame = currentPosition === 0;
  const isLastFrame = currentPosition >= totalFrames - 1;

  // Sync internal store with track position
  useEffect(() => {
    if (frameData) {
      goToFrame(frameData.trackFrame.sectionIndex, frameData.trackFrame.frameIndex);
    }
  }, [frameData, goToFrame]);

  // Save progress when position changes
  useEffect(() => {
    if (currentTrack && currentPosition >= 0) {
      saveProgress(currentTrack, currentPosition);
    }
  }, [currentTrack, currentPosition]);

  // Navigate to specific position within track
  const goToPosition = useCallback(
    (position: number) => {
      if (!currentTrack) return;
      const clampedPosition = Math.max(0, Math.min(position, totalFrames - 1));
      // URL uses 1-indexed
      navigate(`/spiffe/${currentTrack}/${clampedPosition + 1}`);
      resetAnimationPhase();
    },
    [currentTrack, totalFrames, navigate, resetAnimationPhase]
  );

  // Next frame
  const nextFrame = useCallback(() => {
    if (!isLastFrame) {
      goToPosition(currentPosition + 1);
    }
  }, [isLastFrame, currentPosition, goToPosition]);

  // Previous frame
  const prevFrame = useCallback(() => {
    if (!isFirstFrame) {
      goToPosition(currentPosition - 1);
    }
  }, [isFirstFrame, currentPosition, goToPosition]);

  // Switch to a different track
  const switchTrack = useCallback(
    (trackId: TrackId, startPosition: number = 0) => {
      const targetTrack = tracks[trackId];
      const clampedPosition = Math.max(0, Math.min(startPosition, targetTrack.frames.length - 1));
      navigate(`/spiffe/${trackId}/${clampedPosition + 1}`);
      resetAnimationPhase();
    },
    [navigate, resetAnimationPhase]
  );

  // Go to track selector
  const goToTrackSelector = useCallback(() => {
    navigate('/spiffe');
  }, [navigate]);

  // Continue to next track (for completion screen)
  // Skips to the first NEW frame not in the current track
  const continueToNextTrack = useCallback(() => {
    if (!currentTrack) return;
    const nextTrackId = getNextTrack(currentTrack);
    if (nextTrackId) {
      // Find where new content begins in the next track
      const continuationPos = getContinuationPosition(currentTrack, nextTrackId);
      switchTrack(nextTrackId, continuationPos);
    }
  }, [currentTrack, switchTrack]);

  // Get saved progress for a track
  const getSavedProgress = useCallback((trackId: TrackId): number => {
    const progress = loadProgress();
    return progress[trackId] ?? 0;
  }, []);

  // Check if track has saved progress
  const hasSavedProgress = useCallback((trackId: TrackId): boolean => {
    const progress = loadProgress();
    return (progress[trackId] ?? 0) > 0;
  }, []);

  // Progress info
  const progress = useMemo(
    () => ({
      current: currentPosition + 1, // 1-indexed for display
      total: totalFrames,
      percentage: totalFrames > 0 ? ((currentPosition + 1) / totalFrames) * 100 : 0,
    }),
    [currentPosition, totalFrames]
  );

  return {
    // Current state
    currentTrack,
    currentPosition,
    track,
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
