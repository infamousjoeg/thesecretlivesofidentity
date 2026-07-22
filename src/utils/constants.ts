// Color palette - matching Tailwind config
export const colors = {
  // Entity colors
  server: '#3B82F6',
  agent: '#10B981',
  workloadUnattested: '#6B7280',
  workloadAttested: '#F59E0B',
  svid: '#F59E0B',
  trustBundle: '#8B5CF6',
  attacker: '#EF4444',

  // --- Agent Identity module (AI Agent delegation) ---
  // Cool indigo→cyan→teal family reads as the agent ecosystem and stays
  // clear of server blue / SPIRE-agent green / svid gold / trustBundle purple.
  principal: '#6366F1', // Indigo — the human/service that OWNS the authority (the "boss" who signs slips)
  agentAI: '#06B6D4', // Cyan — the AI agent that ACTS on the principal's behalf (clearly software; not the green SPIRE agent)
  subAgent: '#22D3EE', // Light cyan — a delegated secondary agent; a smaller sibling of the agent
  permissionSlip: '#F59E0B', // Gold — the signed/scoped/short-lived authorization slip (same credential family as svid)
  slipSeal: '#9F1239', // Burgundy wax — the signature/seal stamped on a slip; deliberately NOT attacker red
  verifier: '#3B82F6', // Authority blue — the checkpoint/guard that inspects a slip (shares the server blue family)
  toolResource: '#14B8A6', // Teal — the protected tool / MCP server an agent wants to reach

  // Background
  background: '#0F172A',
  surface: '#1E293B',

  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#7C8AA0',

  // Accents
  success: '#22C55E',
  warning: '#EAB308',
  error: '#EF4444',
};

// Default entity sizes
export const entitySizes = {
  workload: 60,
  server: 100,
  agent: 80,
  badge: 120,
  trustBundle: 60,
  attacker: 60,
  // Agent Identity module
  principal: 70,
  agentAI: 70,
  subAgent: 56,
  permissionSlip: 120,
  verifier: 90,
  toolResource: 90,
};

// Stage dimensions
export const stageDimensions = {
  width: 800,
  height: 500,
  padding: 40,
};

// SVID lifecycle (in seconds for simulation)
export const svidLifecycle = {
  defaultTTL: 3600, // 1 hour
  rotationThreshold: 0.25, // Rotate at 25% remaining
  overlapPeriod: 300, // 5 minutes overlap
};

// Animation timing in milliseconds
export const animationTiming = {
  frameTransition: 400,
  phaseDelay: 1000,
  typingSpeed: 30,
  pulseInterval: 1500,
};

// Keyboard shortcuts
export const keyboardShortcuts = {
  nextFrame: ['ArrowRight', ' '],
  prevFrame: ['ArrowLeft'],
  firstFrame: ['Home'],
  lastFrame: ['End'],
  escape: ['Escape'],
  sections: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
};

// Sample SPIFFE IDs for examples
export const sampleSpiffeIds = {
  paymentApi: 'spiffe://acme.com/payment/api',
  orderService: 'spiffe://acme.com/order/service',
  userApi: 'spiffe://acme.com/users/api',
  staging: 'spiffe://acme.com/staging/payment',
  production: 'spiffe://acme.com/production/web',
};

// Sample selectors for registration entries
export const sampleSelectors = {
  k8sProduction: { type: 'k8s:ns', value: 'production' },
  k8sStaging: { type: 'k8s:ns', value: 'staging' },
  paymentSA: { type: 'k8s:sa', value: 'payment-api' },
  orderSA: { type: 'k8s:sa', value: 'order-service' },
  unixUser: { type: 'unix:uid', value: '1000' },
  dockerLabel: { type: 'docker:label', value: 'app=web' },
};

// Platform attestation types
export const attestationTypes = {
  aws: {
    name: 'AWS',
    documentType: 'Instance Identity Document',
    description: 'Cryptographically signed EC2 metadata',
  },
  k8s: {
    name: 'Kubernetes',
    documentType: 'Service Account Token / PSAT',
    description: 'Projected tokens with bound audience',
  },
  gcp: {
    name: 'GCP',
    documentType: 'Instance Metadata',
    description: 'GCP instance identity token',
  },
  azure: {
    name: 'Azure',
    documentType: 'Managed Identity',
    description: 'Azure AD workload identity',
  },
  tpm: {
    name: 'TPM',
    documentType: 'Hardware Attestation',
    description: 'Trusted Platform Module proof',
  },
};

// Routes
// `modules` is keyed by module id so future modules (e.g. `agents`) slot in
// without changing call sites. `spiffe` is kept as a convenience alias so any
// existing references continue to resolve.
export const routes = {
  landing: '/',
  devEntities: '/dev/entities',
  modules: {
    spiffe: '/spiffe',
    agents: '/agents',
  } as Record<string, string>,
  spiffe: '/spiffe',
};

// External links
export const externalLinks = {
  spiffe: 'https://spiffe.io',
  spire: 'https://github.com/spiffe/spire',
  slack: 'https://slack.spiffe.io',
  github: 'https://github.com/infamousjoeg/thesecretlivesofidentity',
  inspiration: 'https://thesecretlivesofdata.com/raft',
};
