import { useMemo } from 'react';
import { useVisualizationStore, useProgress } from '@/store/visualizationStore';
import { sections } from '@/content/spiffe';

/**
 * Hook providing navigation state and helpers for frames
 */
export const useFrameNavigation = () => {
  const {
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
    const totalSections = sections.length;
    const section = sections[currentSection];
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
  }, [currentSection, currentFrame, progress]);

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
 * Hook to get section list for navigation menu
 */
export const useSectionList = () => {
  return useMemo(() => {
    return sections.map((section, index) => ({
      id: section.id,
      title: section.title,
      index,
      frameCount: section.frames.length,
    }));
  }, []);
};
