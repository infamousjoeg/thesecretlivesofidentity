# CLAUDE.md - The Secret Lives of Identity: SPIFFE Visualization

## Project Overview

This is an interactive educational visualization explaining SPIFFE/SPIRE workload identity concepts, modeled after [thesecretlivesofdata.com/raft](https://thesecretlivesofdata.com/raft). The target audience has **zero prior knowledge** of SPIFFE, workload identity, or cryptographic concepts.

**Live URL**: secretlivesofidentity.com/spiffe  
**Repository**: github.com/secretlivesofidentity/spiffe  
**License**: Apache 2.0  

### Core Metaphor

The entire visualization uses a **corporate badge system metaphor**:
- SPIFFE ID = Employee ID number (permanent, never changes)
- SVID = Physical badge (expires, gets reissued)
- SPIRE Server = Corporate security headquarters
- SPIRE Agent = Local security desk with badge printer
- Trust Domain = Your company
- Trust Bundle = List of partner companies whose badges you accept
- Registration Entry = HR employee database
- Workload Attestation = HR verifying employment before printing badge

**Always maintain this metaphor** in explanatory text, but acknowledge its limits (real SPIFFE operates at millisecond timescales with cryptographic proofs).

---

## Tech Stack

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
| Playwright | 1.x | Visual testing via MCP |

---

## Project Structure

```
src/
├── components/
│   ├── layout/           # Navigation, Header, Footer, ProgressBar
│   ├── visualization/    # Frame, Stage, AnimatedText, TransitionWrapper
│   ├── entities/         # SVG components: Workload, Server, Agent, Badge, etc.
│   ├── interactive/      # Simulators: Attestation, SelectorMatcher, Rotation, E2E
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
├── pages/                # Landing, SpiffeVisualization
├── App.tsx
└── main.tsx
```

---

## Code Conventions

### TypeScript

- **Strict mode enabled** - no `any` types unless absolutely necessary
- Use interfaces for object shapes, types for unions/primitives
- Export types from `src/types/index.ts`
- Prefer explicit return types on functions

```typescript
// ✅ Good
interface WorkloadProps {
  id: string;
  label: string;
  attested: boolean;
  position: { x: number; y: number };
}

export const Workload: React.FC<WorkloadProps> = ({ id, label, attested, position }) => {
  // ...
};

// ❌ Avoid
export const Workload = (props: any) => { ... };
```

### React Components

- **Functional components only** - no class components
- Use named exports, not default exports
- Co-locate styles with components using Tailwind
- Keep components focused - split if >150 lines

```typescript
// ✅ Good - named export, typed props
export const Badge: React.FC<BadgeProps> = ({ spiffeId, expiresIn, isValid }) => {
  return (
    <motion.div className="rounded-lg bg-amber-500/20 p-4">
      {/* ... */}
    </motion.div>
  );
};

// ❌ Avoid - default export
export default function Badge(props) { ... }
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `SpireServer.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useFrameNavigation.ts`)
- Utils: `camelCase.ts` (e.g., `animations.ts`)
- Content: `kebab-case.ts` (e.g., `section1-identity-crisis.ts`)

### Imports

Order imports consistently:
1. React and React-related
2. Third-party libraries
3. Local components
4. Local hooks/utils
5. Types
6. Styles

```typescript
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { Stage } from '@/components/visualization/Stage';
import { Workload } from '@/components/entities/Workload';

import { useFrameNavigation } from '@/hooks/useFrameNavigation';
import { fadeInUp } from '@/utils/animations';

import type { Frame, Section } from '@/types';
```

---

## Animation Conventions

### Timing Constants

Always use predefined timing constants from `src/utils/animations.ts`:

```typescript
export const timing = {
  fast: 0.2,      // Quick transitions, micro-interactions
  normal: 0.4,    // Standard animations
  slow: 0.8,      // Emphasis, important moments
  dramatic: 1.2,  // Key reveals, climactic moments
};
```

### Framer Motion Patterns

Use consistent animation variants:

```typescript
// Fade in with upward motion (most common)
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: timing.normal, ease: 'easeOut' },
};

// For sequenced children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

### Reduced Motion Support

**Always** check for reduced motion preference:

```typescript
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const AnimatedComponent: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const animation = prefersReducedMotion 
    ? { opacity: 1 } 
    : fadeInUp;
    
  return <motion.div {...animation}>Content</motion.div>;
};
```

### Performance Rules

- **Only animate `transform` and `opacity`** - never animate `width`, `height`, `top`, `left`
- Use `will-change` sparingly and remove after animation
- Avoid animating during scroll
- Keep SVG animations simple - prefer CSS transforms over path morphing

---

## Entity Components

All visual entities in `src/components/entities/` follow this pattern:

```typescript
interface EntityProps {
  id?: string;
  label?: string;
  position: { x: number; y: number };
  size?: number;
  // Entity-specific props
}

export const Entity: React.FC<EntityProps> = ({
  position,
  size = 60, // sensible default
  ...props
}) => {
  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      {/* SVG content */}
    </g>
  );
};
```

### Entity Color Mapping

| Entity | Color Variable | Hex |
|--------|---------------|-----|
| SPIRE Server | `server` | #3B82F6 |
| SPIRE Agent | `agent` | #10B981 |
| Workload (unattested) | `workloadUnattested` | #6B7280 |
| Workload (attested) | `workloadAttested` | #F59E0B |
| SVID/Badge | `svid` | #F59E0B |
| Trust Bundle | `trustBundle` | #8B5CF6 |
| Attacker | `attacker` | #EF4444 |

### Badge Component (Critical)

The Badge/SVID is the central visual element. It must include:
- Rounded rectangle shape with gradient
- Abstract photo circle (represents workload)
- SPIFFE ID text (prominent)
- Expiration countdown (animated)
- Valid/invalid indicator
- Holographic "VALID" seal effect when active

---

## Content Structure

### Section Definition

```typescript
// src/content/spiffe/section1-identity-crisis.ts
import type { Section } from '@/types';

export const section1: Section = {
  id: 'identity-crisis',
  title: 'The Identity Crisis',
  frames: [
    {
      id: '1-1',
      title: 'Every System Needs Identity',
      content: 'Your services need to prove who they are. To databases. To APIs. To each other.',
      notes: 'Visual: Multiple gray workloads with question marks',
    },
    // ... more frames
  ],
};
```

### Frame Component Pattern

```typescript
// src/components/frames/section1/Frame1_4.tsx
import { motion } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { useAnimationPhase } from '@/hooks/useAnimationPhase';

export const Frame1_4: React.FC = () => {
  const phase = useAnimationPhase([1000, 500, 800]); // phase durations in ms
  
  return (
    <Stage>
      {phase >= 0 && (
        <motion.div {...fadeInUp}>
          {/* Phase 0 content */}
        </motion.div>
      )}
      {phase >= 1 && (
        <motion.div {...fadeInUp}>
          {/* Phase 1 content */}
        </motion.div>
      )}
    </Stage>
  );
};
```

---

## State Management

### Zustand Store Structure

```typescript
// src/store/visualizationStore.ts
interface VisualizationState {
  // Navigation
  currentSection: number;
  currentFrame: number;
  
  // Actions
  nextFrame: () => void;
  prevFrame: () => void;
  goToFrame: (section: number, frame: number) => void;
  
  // Interactive component state
  interactiveState: {
    attestationScenario: 'success' | 'failure' | 'attack';
    selectorMatchAnswer: number | null;
    rotationSpeed: number;
    e2eStep: number;
    e2eShowFailure: boolean;
  };
  setInteractiveState: <K extends keyof InteractiveState>(
    key: K, 
    value: InteractiveState[K]
  ) => void;
  
  // Animation phase tracking
  animationPhase: number;
  setAnimationPhase: (phase: number) => void;
}
```

### Usage Pattern

```typescript
import { useVisualizationStore } from '@/store/visualizationStore';

export const NavigationButtons: React.FC = () => {
  const { nextFrame, prevFrame, currentFrame } = useVisualizationStore();
  
  return (
    <div>
      <button onClick={prevFrame}>Previous</button>
      <span>Frame {currentFrame}</span>
      <button onClick={nextFrame}>Next</button>
    </div>
  );
};
```

---

## Interactive Components

### Four Interactive Elements

1. **AttestationSimulator** (Section 4, Frame 11)
   - Three scenarios: success, failure, attack
   - Shows node attestation flow
   - Emphasizes platform vouches TO server

2. **SelectorMatcher** (Section 5, Frame 12)
   - Quiz matching workload properties to registration entries
   - Multiple choice with immediate feedback
   - Educational reinforcement

3. **RotationSimulator** (Section 7, Frame 9)
   - Time-lapse SVID lifecycle
   - Speed controls (1x, 5x, 10x)
   - Emphasizes SPIFFE ID stability during rotation

4. **E2ESimulator** (Section 6, Frame 10)
   - Complete mTLS handshake visualization
   - Step-by-step or auto-play
   - Includes failure branch (trust bundle mismatch)

### Interactive Component Pattern

```typescript
export const InteractiveComponent: React.FC = () => {
  const { interactiveState, setInteractiveState } = useVisualizationStore();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleScenarioChange = (scenario: string) => {
    setInteractiveState('scenarioKey', scenario);
  };
  
  return (
    <div className="rounded-xl bg-surface p-6">
      <div className="mb-4 flex gap-2">
        {/* Scenario/control buttons */}
      </div>
      <div className="relative h-64">
        {/* Visualization area */}
      </div>
      <div className="mt-4 text-sm text-textSecondary">
        {/* Explanation text */}
      </div>
    </div>
  );
};
```

---

## Visual Testing with Playwright MCP

### Overview

This project uses Playwright MCP server to enable visual verification during development. Claude Code can screenshot components, verify against criteria, and iterate until visuals match the specification.

### Dev Server Requirement

Visual testing requires the dev server running:
```bash
npm run dev -- --port 5173
```

All visual verification assumes `http://localhost:5173` is available.

### Entity Showcase

A development-only page at `/dev/entities` displays all entity components for visual verification:
- Each entity shown in isolation
- Multiple states per entity (active, inactive, etc.)
- Enables rapid visual iteration

### Visual Verification Workflow

```
Create component → Screenshot → Verify criteria → Iterate if needed → Complete
```

### Visual Criteria by Entity

**Badge (Most Critical)**:
- Rounded rectangle, gold (#F59E0B) when valid
- Photo area (abstract circle), SPIFFE ID text, countdown timer
- "VALID" seal, subtle gradient/shimmer
- Must look like corporate ID badge, NOT a certificate

**SPIRE Server**:
- Building/HQ appearance, blue (#3B82F6)
- Authoritative presence, larger than Agent
- Shield/lock icon, glows when active

**SPIRE Agent**:
- Security desk/kiosk appearance, green (#10B981)
- Badge printer element visible
- Positioned on node/platform

**Workload**:
- Circle or person icon
- Gray (#6B7280) unattested, gold accent (#F59E0B) attested
- Badge visible when attested

**Trust Domain**:
- Rounded boundary with soft glow edge
- Semi-transparent fill, label at top

**Attacker**:
- Hooded figure or skull, red (#EF4444)
- Clear "blocked" state with X overlay

### Metaphor Adherence Checklist

During visual verification, confirm:
- ✅ Badges look like physical corporate ID badges
- ✅ Server looks like headquarters/central building
- ✅ Agent looks like security desk with badge printer
- ✅ Trust domain looks like company boundary
- ✅ Badge exchange (mTLS) looks like two people showing badges
- ❌ Badges should NOT look like certificates or documents
- ❌ Server should NOT look like a generic computer/server icon

### Baseline Screenshots

```
tests/screenshots/baseline/    # Approved baselines (committed)
tests/screenshots/current/     # Current screenshots (gitignored)
```

Run regression checks before deployment to catch unintended visual changes.

---

## Accessibility Requirements

### Keyboard Navigation

- `→` or `Space`: Next frame
- `←`: Previous frame
- `Home`: First frame
- `End`: Last frame
- `1-9`: Jump to section
- `Escape`: Close interactive/modal
- `Tab`: Navigate interactive elements

### ARIA Requirements

```tsx
// Frame container
<main 
  role="main" 
  aria-label={`Section ${sectionNum}, Frame ${frameNum}: ${frameTitle}`}
>

// Animated content
<motion.div
  aria-live="polite"
  aria-atomic="true"
>

// Interactive controls
<button
  aria-label="Next frame"
  aria-keyshortcuts="ArrowRight Space"
>
```

### Focus Management

- Visible focus rings: `focus:outline-2 focus:outline-offset-2 focus:outline-blue-500`
- Logical tab order
- Focus trap in modals
- Return focus after interactive completion

### Color Contrast

- All text must meet WCAG AA (4.5:1 ratio)
- Don't convey information by color alone
- Test with color blindness simulators

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Performance | > 90 |
| Bundle Size (gzipped) | < 150KB |
| Animation FPS | 60fps consistent |

### Optimization Strategies

- **Code splitting**: Lazy load sections with `React.lazy()`
- **Tree shaking**: Import only needed Framer Motion features
- **SVG optimization**: Run through SVGO, inline critical SVGs
- **Font loading**: Preload primary fonts, use `font-display: swap`
- **Animation**: Only `transform` and `opacity`, avoid layout triggers

---

## Common Tasks

### Adding a New Frame

1. Add frame data to section content file:
```typescript
// src/content/spiffe/section1-identity-crisis.ts
frames: [
  // existing frames...
  {
    id: '1-11',
    title: 'New Frame Title',
    content: 'Frame content text',
  },
],
```

2. Create frame component:
```typescript
// src/components/frames/section1/Frame1_11.tsx
export const Frame1_11: React.FC = () => {
  return (
    <Stage>
      {/* Frame visualization */}
    </Stage>
  );
};
```

3. Register in frame renderer (if not auto-discovered)

### Adding a New Entity

1. Create component in `src/components/entities/`:
```typescript
// src/components/entities/NewEntity.tsx
export const NewEntity: React.FC<NewEntityProps> = ({ position, size = 60 }) => {
  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      {/* SVG content */}
    </g>
  );
};
```

2. Export from `src/components/entities/index.ts`

3. Add color to Tailwind config if needed

### Modifying Animation Timing

Edit `src/utils/animations.ts` - changes propagate everywhere that imports the constants.

---

## Things to Avoid

### Content

- ❌ Assuming any prior SPIFFE/SPIRE knowledge
- ❌ Using jargon without explanation
- ❌ Breaking the badge metaphor mid-explanation
- ❌ Confusing authentication with authorization
- ❌ Implying SVIDs have no private keys (they do, but they're different)
- ❌ Showing workload presenting credentials (platform vouches for it)

### Code

- ❌ Default exports
- ❌ `any` types
- ❌ Inline styles (use Tailwind)
- ❌ Animating layout properties (width, height, top, left)
- ❌ Ignoring reduced motion preference
- ❌ Class components
- ❌ Direct DOM manipulation

### Design

- ❌ Generic AI aesthetics (purple gradients, Inter font)
- ❌ Inconsistent entity colors
- ❌ Text below 4.5:1 contrast ratio
- ❌ Relying on color alone for meaning
- ❌ Fixed pixel font sizes

---

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Zustand over Redux | Simpler API, less boilerplate for this scale |
| Framer Motion over CSS | Complex sequenced animations, gesture support |
| SVG over Canvas | Accessibility, easier styling, crisp at all sizes |
| Tailwind over CSS Modules | Rapid iteration, consistent design system |
| Vite over CRA | Faster builds, better ESM support |

---

## Testing Checklist

Before considering a section complete:

- [ ] All frames render without errors
- [ ] Keyboard navigation works throughout
- [ ] Animations respect reduced motion
- [ ] Interactive components have clear feedback
- [ ] Text meets contrast requirements
- [ ] No console errors or warnings
- [ ] Loads in < 3s on throttled connection
- [ ] Badge metaphor is consistent
- [ ] Technical accuracy verified

---

## Deployment

### GitHub Pages

```bash
npm run build
# Deploys to GitHub Pages via .github/workflows/deploy.yml
```

### Environment Variables

```bash
VITE_BASE_URL=/spiffe/  # For GitHub Pages subdirectory
```

### Custom Domain

Configure `secretlivesofidentity.com` CNAME to point to GitHub Pages, with `/spiffe` as the base path.

---

## Sub-Agent Tasks

This project defines reusable Task tool definitions in `CLAUDE_CODE_TASKS.md` for:

- `create-entity-component` — Build individual SVG entity components
- `create-frame-component` — Build individual frame visualizations  
- `create-interactive-component` — Build simulator components
- `build-section` — Build all frames for a section
- `generate-section-content` — Generate section data files
- `review-accessibility` — WCAG AA compliance audit
- `review-technical-accuracy` — SPIFFE/SPIRE accuracy check
- `optimize-performance` — Performance audit and fixes

**Parallel-friendly tasks**: Entity components, frames within a section, interactive components

**Serial tasks**: Content generation → frame building → review pipeline

See `CLAUDE_CODE_TASKS.md` for full task definitions and orchestration patterns.

---

## Resources

- [SPIFFE Specification](https://spiffe.io/docs/latest/spiffe-about/overview/)
- [SPIRE Documentation](https://spiffe.io/docs/latest/spire-about/)
- [thesecretlivesofdata.com/raft](https://thesecretlivesofdata.com/raft) (inspiration)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## Contact

This is a community contribution to the SPIFFE ecosystem. For questions:
- SPIFFE Slack: slack.spiffe.io
- GitHub Issues: github.com/secretlivesofidentity/spiffe/issues