import { create } from 'zustand';
import type { InteractiveState, Section } from '@/types';

/** SPIFFE simulator defaults. Seeds the per-module interactive slice. */
const initialSpiffeInteractiveState: InteractiveState = {
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

/**
 * Per-module interactive simulator state. Each module namespaces its own slice
 * by module id so a future module's simulators never collide with SPIFFE's.
 */
type ModuleInteractiveState = Record<string, unknown>;

interface VisualizationState {
  // Active module sections (set when a module mounts via setActiveModule)
  activeSections: Section[];
  setActiveModule: (sections: Section[]) => void;

  // Navigation
  currentSection: number;
  currentFrame: number;

  // Getters
  getTotalSections: () => number;
  getTotalFrames: () => number;
  getCurrentSection: () => Section | undefined;
  getCurrentFrame: () => Section['frames'][number] | undefined;

  // Navigation actions
  nextFrame: () => void;
  prevFrame: () => void;
  goToFrame: (section: number, frame: number) => void;
  goToSection: (section: number) => void;

  // Interactive component state (per-module keyed)
  interactiveState: Record<string, ModuleInteractiveState>;
  getInteractiveState: (moduleId: string) => ModuleInteractiveState;
  setInteractiveState: (moduleId: string, key: string, value: unknown) => void;
  resetInteractiveState: (moduleId?: string) => void;

  // Animation phase tracking
  animationPhase: number;
  setAnimationPhase: (phase: number) => void;
  resetAnimationPhase: () => void;
}

const initialInteractiveState: Record<string, ModuleInteractiveState> = {
  spiffe: { ...initialSpiffeInteractiveState },
};

export const useVisualizationStore = create<VisualizationState>((set, get) => ({
  // Active module
  activeSections: [],
  setActiveModule: (sections) => {
    // Only reset position if the module's section set actually changed identity.
    if (get().activeSections !== sections) {
      set({ activeSections: sections });
    }
  },

  // Initial navigation state
  currentSection: 0,
  currentFrame: 0,

  // Getters
  getTotalSections: () => get().activeSections.length,

  getTotalFrames: () => {
    const section = get().activeSections[get().currentSection];
    return section ? section.frames.length : 0;
  },

  getCurrentSection: () => get().activeSections[get().currentSection],

  getCurrentFrame: () => {
    const section = get().activeSections[get().currentSection];
    return section ? section.frames[get().currentFrame] : undefined;
  },

  // Navigation actions
  nextFrame: () => {
    const { currentSection, currentFrame, activeSections } = get();
    const section = activeSections[currentSection];

    if (!section) return;

    if (currentFrame < section.frames.length - 1) {
      set({ currentFrame: currentFrame + 1, animationPhase: 0 });
    } else if (currentSection < activeSections.length - 1) {
      set({ currentSection: currentSection + 1, currentFrame: 0, animationPhase: 0 });
    }
  },

  prevFrame: () => {
    const { currentSection, currentFrame, activeSections } = get();

    if (currentFrame > 0) {
      set({ currentFrame: currentFrame - 1, animationPhase: 0 });
    } else if (currentSection > 0) {
      const prevSection = activeSections[currentSection - 1];
      set({
        currentSection: currentSection - 1,
        currentFrame: prevSection.frames.length - 1,
        animationPhase: 0,
      });
    }
  },

  goToFrame: (section: number, frame: number) => {
    const { activeSections } = get();
    if (section >= 0 && section < activeSections.length) {
      const targetSection = activeSections[section];
      if (frame >= 0 && frame < targetSection.frames.length) {
        set({ currentSection: section, currentFrame: frame, animationPhase: 0 });
      }
    }
  },

  goToSection: (section: number) => {
    const { activeSections } = get();
    if (section >= 0 && section < activeSections.length) {
      set({ currentSection: section, currentFrame: 0, animationPhase: 0 });
    }
  },

  // Interactive state (per-module keyed)
  interactiveState: initialInteractiveState,

  getInteractiveState: (moduleId) => get().interactiveState[moduleId] ?? {},

  setInteractiveState: (moduleId, key, value) => {
    set((state) => ({
      interactiveState: {
        ...state.interactiveState,
        [moduleId]: {
          ...(state.interactiveState[moduleId] ?? {}),
          [key]: value,
        },
      },
    }));
  },

  resetInteractiveState: (moduleId) => {
    if (!moduleId) {
      set({ interactiveState: { ...initialInteractiveState } });
      return;
    }
    set((state) => ({
      interactiveState: {
        ...state.interactiveState,
        [moduleId]: { ...(initialInteractiveState[moduleId] ?? {}) },
      },
    }));
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

// Helper hook to get overall progress (reads the active module's sections)
export const useProgress = () => {
  const currentSection = useVisualizationStore((s) => s.currentSection);
  const currentFrame = useVisualizationStore((s) => s.currentFrame);
  const activeSections = useVisualizationStore((s) => s.activeSections);

  let totalFramesBefore = 0;
  for (let i = 0; i < currentSection && i < activeSections.length; i++) {
    totalFramesBefore += activeSections[i].frames.length;
  }

  const totalFrames = activeSections.reduce((sum, s) => sum + s.frames.length, 0);
  const currentTotalFrame = totalFramesBefore + currentFrame + 1;

  return {
    current: totalFrames > 0 ? currentTotalFrame : 0,
    total: totalFrames,
    percentage: totalFrames > 0 ? (currentTotalFrame / totalFrames) * 100 : 0,
  };
};
