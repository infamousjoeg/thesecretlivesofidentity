import type { ReactNode, ComponentType } from 'react';

// Position type for SVG entities
export interface Position {
  x: number;
  y: number;
}

// Base entity props
export interface EntityProps {
  id?: string;
  label?: string;
  position: Position;
  size?: number;
}

// Frame data structure
export interface Frame {
  id: string;
  title: string;
  content: string;
  notes?: string;
  component?: ComponentType;
}

// Section data structure
export interface Section {
  id: string;
  title: string;
  frames: Frame[];
}

// Interactive component state
export interface InteractiveState {
  attestationScenario: 'success' | 'failure' | 'attack';
  attestationStep: number;
  selectorMatchAnswer: number | null;
  selectorMatchWorkload: number;
  selectorMatchScore: number;
  rotationSpeed: number;
  rotationPlaying: boolean;
  rotationCount: number;
  e2eStep: number;
  e2eShowFailure: boolean;
  e2eAutoPlay: boolean;
}

// Navigation state
export interface NavigationState {
  currentSection: number;
  currentFrame: number;
}

// Badge states
export type BadgeState = 'valid' | 'expiring' | 'expired';

// Connection states
export type ConnectionStatus = 'attempting' | 'established' | 'rejected';

// SVID variant
export type SVIDVariant = 'x509' | 'jwt';

// Selector type for registration entries
export interface Selector {
  type: string;
  value: string;
}

// Registration entry
export interface RegistrationEntry {
  id: string;
  selectors: Selector[];
  spiffeId: string;
}

// Workload properties for selector matching
export interface WorkloadProperties {
  namespace?: string;
  serviceAccount?: string;
  uid?: number;
  dockerLabel?: string;
  containerImage?: string;
}

// Animation timing constants
export interface TimingConstants {
  fast: number;
  normal: number;
  slow: number;
  dramatic: number;
}

// Animation variants for Framer Motion
export interface AnimationVariants {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

// Layout wrapper props
export interface LayoutProps {
  children: ReactNode;
}

// Stage component props
export interface StageProps {
  children: ReactNode;
  width?: number;
  height?: number;
  className?: string;
}
