import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TrackFrame } from '@/components/visualization';
import { useTrackNavigation } from '@/hooks';
import { getFrameComponent, PlaceholderFrame } from '@/components/frames';
import { getModule } from '@/content/modules';
import { useVisualizationStore } from '@/store/visualizationStore';
import type { TrackId } from '@/content/tracks';

/**
 * ModuleVisualization renders any module's track experience.
 *
 * Routing contract: `/:module/:track/:frameIndex?`
 * - Unknown `:module` redirects to the landing page.
 * - A `:track` that is not one of the module's tracks (e.g. the legacy
 *   `/spiffe/:section/:frame` numeric form) redirects to the Gold track,
 *   preserving the previous legacy-redirect behavior.
 */
export const ModuleVisualization: React.FC = () => {
  const params = useParams<{ module?: string; track?: string }>();
  const moduleConfig = getModule(params.module);
  const setActiveModule = useVisualizationStore((s) => s.setActiveModule);

  // Register the active module's sections with the store.
  useEffect(() => {
    if (moduleConfig) {
      setActiveModule(moduleConfig.sections);
    }
  }, [moduleConfig, setActiveModule]);

  const { frameData } = useTrackNavigation();

  // Unknown module -> landing.
  if (!moduleConfig) {
    return <Navigate to="/" replace />;
  }

  // Invalid / legacy track -> gold (matches the old /spiffe/:section/:frame redirect).
  const trackParam = params.track as TrackId | undefined;
  const isValidTrack = Boolean(trackParam && moduleConfig.trackOrder.includes(trackParam));
  if (!isValidTrack) {
    return <Navigate to={`${moduleConfig.basePath}/gold`} replace />;
  }

  const frameId = frameData?.frame.id;
  const FrameComponent = getFrameComponent(moduleConfig.id, frameId);

  return (
    <div className="min-h-screen bg-background">
      {/* TrackFrame (shell: progress bar + sidebar + nav) stays mounted across
          frames so the progress bar animates smoothly from its previous width.
          Frame CONTENT transitions are handled by TrackFrame's own internal
          AnimatePresence, keyed by track + position. */}
      <TrackFrame>
        {FrameComponent ? (
          <FrameComponent />
        ) : (
          <PlaceholderFrame frameId={frameId || 'unknown'} />
        )}
      </TrackFrame>
    </div>
  );
};
