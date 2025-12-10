import { create } from 'zustand';
import type { InteractiveState } from '@/types';
import { sections } from '@/content/spiffe';

interface VisualizationState {
  // Navigation
  currentSection: number;
  currentFrame: number;

  // Getters
  getTotalSections: () => number;
  getTotalFrames: () => number;
  getCurrentSection: () => typeof sections[number] | undefined;
  getCurrentFrame: () => typeof sections[number]['frames'][number] | undefined;

  // Navigation actions
  nextFrame: () => void;
  prevFrame: () => void;
  goToFrame: (section: number, frame: number) => void;
  goToSection: (section: number) => void;

  // Interactive component state
  interactiveState: InteractiveState;
  setInteractiveState: <K extends keyof InteractiveState>(
    key: K,
    value: InteractiveState[K]
  ) => void;
  resetInteractiveState: () => void;

  // Animation phase tracking
  animationPhase: number;
  setAnimationPhase: (phase: number) => void;
  resetAnimationPhase: () => void;
}

const initialInteractiveState: InteractiveState = {
  attestationScenario: 'success',
  attestationStep: 0,
  selectorMatchAnswer: null,
  selectorMatchWorkload: 0,
  selectorMatchScore: 0,
  rotationSpeed: 1,
  rotationPlaying: false,
  rotationCount: 0,
  e2eStep: 0,
  e2eShowFailure: false,
  e2eAutoPlay: false,
};

export const useVisualizationStore = create<VisualizationState>((set, get) => ({
  // Initial navigation state
  currentSection: 0,
  currentFrame: 0,

  // Getters
  getTotalSections: () => sections.length,

  getTotalFrames: () => {
    const section = sections[get().currentSection];
    return section ? section.frames.length : 0;
  },

  getCurrentSection: () => sections[get().currentSection],

  getCurrentFrame: () => {
    const section = sections[get().currentSection];
    return section ? section.frames[get().currentFrame] : undefined;
  },

  // Navigation actions
  nextFrame: () => {
    const { currentSection, currentFrame } = get();
    const section = sections[currentSection];

    if (!section) return;

    if (currentFrame < section.frames.length - 1) {
      // Next frame in current section
      set({ currentFrame: currentFrame + 1, animationPhase: 0 });
    } else if (currentSection < sections.length - 1) {
      // First frame of next section
      set({ currentSection: currentSection + 1, currentFrame: 0, animationPhase: 0 });
    }
    // If at last frame of last section, do nothing
  },

  prevFrame: () => {
    const { currentSection, currentFrame } = get();

    if (currentFrame > 0) {
      // Previous frame in current section
      set({ currentFrame: currentFrame - 1, animationPhase: 0 });
    } else if (currentSection > 0) {
      // Last frame of previous section
      const prevSection = sections[currentSection - 1];
      set({
        currentSection: currentSection - 1,
        currentFrame: prevSection.frames.length - 1,
        animationPhase: 0,
      });
    }
    // If at first frame of first section, do nothing
  },

  goToFrame: (section: number, frame: number) => {
    if (section >= 0 && section < sections.length) {
      const targetSection = sections[section];
      if (frame >= 0 && frame < targetSection.frames.length) {
        set({ currentSection: section, currentFrame: frame, animationPhase: 0 });
      }
    }
  },

  goToSection: (section: number) => {
    if (section >= 0 && section < sections.length) {
      set({ currentSection: section, currentFrame: 0, animationPhase: 0 });
    }
  },

  // Interactive state
  interactiveState: initialInteractiveState,

  setInteractiveState: (key, value) => {
    set((state) => ({
      interactiveState: {
        ...state.interactiveState,
        [key]: value,
      },
    }));
  },

  resetInteractiveState: () => {
    set({ interactiveState: initialInteractiveState });
  },

  // Animation phase
  animationPhase: 0,

  setAnimationPhase: (phase: number) => {
    set({ animationPhase: phase });
  },

  resetAnimationPhase: () => {
    set({ animationPhase: 0 });
  },
}));

// Helper hook to get overall progress
export const useProgress = () => {
  const { currentSection, currentFrame } = useVisualizationStore();

  let totalFramesBefore = 0;
  for (let i = 0; i < currentSection; i++) {
    totalFramesBefore += sections[i].frames.length;
  }

  const currentTotalFrame = totalFramesBefore + currentFrame + 1;
  const totalFrames = sections.reduce((sum, s) => sum + s.frames.length, 0);

  return {
    current: currentTotalFrame,
    total: totalFrames,
    percentage: (currentTotalFrame / totalFrames) * 100,
  };
};
