# Design Guidelines

Visual design system and brand guidelines for The Secret Lives of Identity.

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Server** | `#3B82F6` | SPIRE Server, primary blue |
| **Agent** | `#10B981` | SPIRE Agent, green |
| **Workload (Unattested)** | `#6B7280` | Gray, unverified workloads |
| **Workload (Attested)** | `#F59E0B` | Amber/gold, verified workloads |
| **SVID/Badge** | `#F59E0B` | Gold, identity badges |
| **Trust Bundle** | `#8B5CF6` | Purple, trust relationships |
| **Attacker** | `#EF4444` | Red, malicious actors |
| **Background** | `#0F172A` | Dark slate, primary background |
| **Surface** | `#1E293B` | Lighter slate, cards and surfaces |
| **Text Primary** | `#F8FAFC` | Near-white, headings |
| **Text Secondary** | `#94A3B8` | Muted, body text |

## Typography

### Font Stack

- **Display**: Space Grotesk (headings, titles)
- **Body**: IBM Plex Sans (paragraphs, UI)
- **Mono**: JetBrains Mono (code, technical text)

### Hierarchy

```
H1: 2.5rem, font-bold, Space Grotesk
H2: 2rem, font-semibold, Space Grotesk
H3: 1.5rem, font-semibold, Space Grotesk
Body: 1rem, font-normal, IBM Plex Sans
Small: 0.875rem, font-normal, IBM Plex Sans
Code: 0.875rem, JetBrains Mono
```

## The Badge Metaphor

The entire visualization uses a corporate badge system as its central metaphor:

| SPIFFE Concept | Badge Equivalent |
|----------------|------------------|
| SPIFFE ID | Employee ID number (permanent, never changes) |
| SVID (X.509) | Physical badge (expires, gets renewed) |
| SVID (JWT) | Visitor pass |
| Trust Domain | Your company |
| Trust Bundle | List of partner companies whose badges you accept |
| SPIRE Server | Corporate security headquarters |
| SPIRE Agent | Local security desk with badge printer |
| Workload | Employee |
| Registration Entry | HR employee database |
| Node Attestation | Verifying a building is legitimate before installing badge printer |
| Workload Attestation | HR checking employment before printing badge |
| Selectors | HR criteria for matching employees |
| SVID Rotation | Badge auto-renewal |
| mTLS | Two employees showing badges to each other |
| Federation | Partnership agreement between companies |

### Visual Requirements

- **Badges** should look like physical corporate ID badges, NOT certificates or documents
- **Server** should look like a headquarters building, NOT a generic server icon
- **Agent** should look like a security desk with badge printer
- **Trust domains** should have clear boundaries with company-like branding

## Entity Design Philosophy

Entities use a **chip-based design** for workloads:

- Rounded rectangles with subtle gradients
- Clear status indicators (attested vs unattested)
- Consistent sizing and spacing
- Hover states with subtle scale/glow

### Workload States

1. **Unattested**: Gray chip, question mark icon
2. **Requesting**: Gray chip with pulse animation
3. **Attested**: Gold accent, badge visible
4. **Communicating**: Connection lines between workloads

### Badge/SVID Design

- Rounded rectangle with gold gradient (valid) or gray (expired)
- Abstract photo circle representing workload
- SPIFFE ID text prominently displayed
- Expiration countdown timer
- Holographic "VALID" seal when active
- Visual deterioration as expiration approaches

## Animation Principles

### Timing Constants

```javascript
fast: 0.2s    // Quick transitions, micro-interactions
normal: 0.4s  // Standard animations
slow: 0.8s    // Emphasis, important moments
dramatic: 1.2s // Key reveals, climactic moments
```

### Guidelines

1. **Only animate `transform` and `opacity`** — never width, height, top, left
2. **Respect reduced motion preferences** — always check `prefers-reduced-motion`
3. **Stagger children** for lists and groups (0.1s between items)
4. **Use spring physics** for interactive elements
5. **Keep animations purposeful** — every animation should communicate something

### Frame Transitions

- Frames fade in with upward motion
- Content appears sequentially within frames
- Use `AnimatePresence` for exit animations

## Accessibility

### Requirements

- WCAG AA contrast ratios (4.5:1 minimum)
- Visible focus indicators
- Keyboard navigation support
- Screen reader friendly
- Don't convey information by color alone

### Focus States

```css
focus:outline-2 focus:outline-offset-2 focus:outline-blue-500
```

## Do's and Don'ts

### Do

- Maintain the badge metaphor consistently
- Use the established color palette
- Test with reduced motion enabled
- Keep animations subtle and purposeful
- Write for zero-knowledge audiences

### Don't

- Use generic AI aesthetics (purple gradients, generic tech imagery)
- Break the badge metaphor mid-explanation
- Animate layout properties (width, height, etc.)
- Skip accessibility requirements
- Assume any prior SPIFFE knowledge
