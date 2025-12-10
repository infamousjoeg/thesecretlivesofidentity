# Architecture

Technical overview for contributors.

## Project Structure

```
src/
├── components/
│   ├── layout/           # Navigation, Header, Footer, ProgressBar
│   ├── visualization/    # Frame, Stage, AnimatedText, TransitionWrapper
│   ├── entities/         # SVG components: Workload, Server, Agent, Badge, etc.
│   ├── interactive/      # Simulators (Attestation, Selector, Rotation, E2E)
│   └── frames/           # Section-specific frame components
│       ├── section1/
│       ├── section2/
│       └── ...
├── content/
│   └── spiffe/           # Section metadata and frame data
├── hooks/                # useFrameNavigation, useKeyboardNav, useAnimationPhase
├── store/                # Zustand store
├── styles/               # Global CSS, Tailwind config
├── types/                # TypeScript interfaces
├── utils/                # Animation presets, constants
├── pages/                # Landing, SpiffeVisualization, TrackSelector
├── App.tsx
└── main.tsx
```

## Key Concepts

### Sections and Frames

The visualization is organized into **9 sections**, each containing multiple **frames**:

1. **The Identity Crisis** (10 frames) - Problem setup
2. **What is SPIFFE?** (13 frames) - Core concepts
3. **Meet SPIRE** (12 frames) - Architecture
4. **Node Attestation** (11 frames) - How nodes get trusted
5. **Workload Attestation** (12 frames) - How workloads get identity
6. **Using Your Identity** (11 frames) - mTLS and trust bundles
7. **Identity Lifecycle** (10 frames) - Rotation and renewal
8. **Advanced Concepts** (12 frames) - Federation, platform specifics
9. **Conclusion** (4 frames) - Summary and resources

Total: **95 frames**

### Track System

Users can choose learning paths with different depths:

| Track | Frames | Content |
|-------|--------|---------|
| **Bronze** | 1-23 + CTA | Sections 1-2 + "Get Started" |
| **Silver** | 1-69 + CTA | Sections 1-6 + "Get Started" |
| **Gold** | 1-95 | All sections |

Tracks are defined in `src/content/tracks.ts`. Each track is a contiguous subset of the Gold track — Bronze and Silver are "checkpoints" that include the "Get Started" call-to-action at the end.

### Frame Components

Each frame has a corresponding React component in `src/components/frames/section{N}/`:

```tsx
// Example: src/components/frames/section1/Frame1_4.tsx
export const Frame1_4: React.FC = () => {
  const phase = useAnimationPhase([1000, 500, 800]);

  return (
    <Stage>
      {phase >= 0 && <motion.div {...fadeInUp}>Phase 0 content</motion.div>}
      {phase >= 1 && <motion.div {...fadeInUp}>Phase 1 content</motion.div>}
    </Stage>
  );
};
```

### Animation Phases

Many frames use `useAnimationPhase` to sequence content:

```tsx
const phase = useAnimationPhase([1000, 500, 800]);
// phase starts at 0
// after 1000ms → phase = 1
// after 1500ms → phase = 2
// after 2300ms → phase = 3
```

## State Management

We use **Zustand** for global state (`src/store/visualizationStore.ts`):

```typescript
interface VisualizationState {
  // Navigation
  currentTrack: TrackId | null;
  currentPosition: number;

  // Actions
  setTrack: (track: TrackId) => void;
  goToPosition: (position: number) => void;
  nextFrame: () => void;
  prevFrame: () => void;

  // Interactive component state
  interactiveState: {...};
}
```

## Routing

Using React Router v6:

- `/` - Landing page
- `/spiffe` - Track selector
- `/spiffe/:track` - Track visualization (redirects to frame 1)
- `/spiffe/:track/:position` - Specific frame in track

## Key Components

### `TrackFrame.tsx`

The main visualization wrapper that:
- Looks up the current frame based on track and position
- Renders the appropriate frame component
- Handles navigation controls

### `Stage.tsx`

SVG container for entity visualizations:
- Provides consistent viewBox and sizing
- Handles responsive scaling
- Container for Workload, Server, Agent, Badge entities

### Entity Components

Located in `src/components/entities/`:

- `Workload.tsx` - Service/application chip
- `SpireServer.tsx` - SPIRE Server icon
- `SpireAgent.tsx` - SPIRE Agent icon
- `Badge.tsx` - SVID/identity badge
- `TrustDomain.tsx` - Trust boundary visualization

## Adding New Content

### Adding a Frame

1. Add frame metadata to `src/content/spiffe/index.ts`:
```typescript
{ id: '1-11', title: 'New Frame', content: 'Description text' }
```

2. Create component at `src/components/frames/section1/Frame1_11.tsx`

3. The frame will automatically be included in the Gold track

### Modifying Track Mappings

Edit `src/content/tracks.ts`:

```typescript
const TRACK_CONTENT_END = {
  bronze: 23,  // Through Section 2
  silver: 69,  // Through Section 6
  gold: 95,    // All frames
};
```

## Tech Stack Details

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| Framer Motion | 11.x | Animations |
| Zustand | 5.x | State management |
| React Router | 6.x | Routing |
| Lucide React | 0.x | Icons |

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Performance | > 90 |
| Animation FPS | 60fps |

## Code Conventions

- **Functional components only** — no class components
- **Named exports** — no default exports
- **Strict TypeScript** — no `any` types
- **Tailwind for styling** — no inline styles
- **Framer Motion for animations** — CSS for simple transitions only
