import { useMemo } from 'react';
import { useVisualizationStore, useProgress } from '@/store/visualizationStore';

/**
 * Hook providing navigation state and helpers for frames
 */
export const useFrameNavigation = () => {
  const {
    activeSections,
    currentSection,
    currentFrame,
    nextFrame,
    prevFrame,
    goToFrame,
    goToSection,
    getCurrentSection,
    getCurrentFrame,
    getTotalSections,
    getTotalFrames,
  } = useVisualizationStore();

  const progress = useProgress();

  const navigationState = useMemo(() => {
    const totalSections = activeSections.length;
    const section = activeSections[currentSection];
    const totalFramesInSection = section ? section.frames.length : 0;

    const isFirstFrame = currentSection === 0 && currentFrame === 0;
    const isLastFrame =
      currentSection === totalSections - 1 &&
      currentFrame === totalFramesInSection - 1;

    const isFirstFrameOfSection = currentFrame === 0;
    const isLastFrameOfSection = currentFrame === totalFramesInSection - 1;

    return {
      currentSection,
      currentFrame,
      totalSections,
      totalFramesInSection,
      isFirstFrame,
      isLastFrame,
      isFirstFrameOfSection,
      isLastFrameOfSection,
      progress,
    };
  }, [activeSections, currentSection, currentFrame, progress]);

  const currentSectionData = getCurrentSection();
  const currentFrameData = getCurrentFrame();

  return {
    ...navigationState,
    section: currentSectionData,
    frame: currentFrameData,
    nextFrame,
    prevFrame,
    goToFrame,
    goToSection,
    getTotalSections,
    getTotalFrames,
  };
};

/**
 * Hook to get section list for navigation menu (from the active module).
 */
export const useSectionList = () => {
  const activeSections = useVisualizationStore((s) => s.activeSections);
  return useMemo(() => {
    return activeSections.map((section, index) => ({
      id: section.id,
      title: section.title,
      index,
      frameCount: section.frames.length,
    }));
  }, [activeSections]);
};
