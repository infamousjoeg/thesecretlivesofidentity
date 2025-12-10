import type { Section } from '@/types';

// Placeholder sections - will be populated in Phases 3-6
export const section1: Section = {
  id: 'identity-crisis',
  title: 'The Identity Crisis',
  frames: [
    { id: '1-1', title: 'Every System Needs Identity', content: 'Your services need to prove who they are. To databases. To APIs. To each other.' },
    { id: '1-2', title: 'The Old Way: Secrets', content: 'Traditionally, we use secrets—API keys, passwords, certificates—to prove identity.' },
    { id: '1-3', title: 'Secrets Have Problems', content: 'Secrets must be distributed. Stored. Rotated. And they can be stolen.' },
    { id: '1-4', title: 'The 2 AM Scenario', content: "It's 2 AM. Your pager goes off. An API key was committed to GitHub 6 hours ago." },
    { id: '1-5', title: 'The Cascade', content: "That key? It's used by your payment service. Which connects to 47 other services." },
    { id: '1-6', title: 'Rotation Hell', content: 'To fix this, you need to: generate new key, update 47 services, coordinate restart, pray nothing breaks.' },
    { id: '1-7', title: 'It Gets Worse', content: 'Even without breaches, secrets create operational burden. Each secret is a liability.' },
    { id: '1-8', title: 'The Real Problem', content: "The problem isn't the secrets themselves. It's that we're using shared secrets as identity." },
    { id: '1-9', title: 'What If...', content: 'What if workloads could prove who they are without sharing secrets at all?' },
    { id: '1-10', title: 'Enter SPIFFE', content: 'This is exactly what SPIFFE provides: cryptographic identity without shared secrets.' },
  ],
};

export const section2: Section = {
  id: 'what-is-spiffe',
  title: 'What is SPIFFE?',
  frames: [
    { id: '2-1', title: 'SPIFFE: A Specification', content: 'SPIFFE stands for Secure Production Identity Framework for Everyone. It\'s a set of open standards.' },
    { id: '2-2', title: 'Three Core Ideas', content: 'SPIFFE defines three things: a way to name workloads, a way to prove that name, and a way to verify proofs.' },
    { id: '2-3', title: 'The SPIFFE ID', content: 'Every workload gets a SPIFFE ID—a unique name in URI format: spiffe://trust-domain/path' },
    { id: '2-4', title: 'SPIFFE ID Anatomy', content: 'spiffe:// is the scheme. trust-domain identifies your organization. /path identifies the specific workload.' },
    { id: '2-5', title: 'Real Examples', content: 'spiffe://acme.com/payments/processor or spiffe://prod.mycompany.io/api/users' },
    { id: '2-6', title: 'Trust Domains: The Boundary', content: 'A trust domain is a security boundary—a zone of trust managed by a single authority.' },
    { id: '2-7', title: 'Trust Domains: Your Company', content: 'Think of it like a company. Everyone inside shares the same badge system, issued by the same authority.' },
    { id: '2-8', title: 'Trust Domains: Why It Matters', content: "Workloads in the same trust domain automatically trust each other's identities. Different domains require explicit federation." },
    { id: '2-9', title: 'The Badge Metaphor', content: "Let's use a familiar analogy: corporate badges. Your SPIFFE ID is like your employee ID number—it never changes." },
    { id: '2-10', title: 'Badge = SVID', content: 'But you also need a physical badge to get through doors. In SPIFFE, this is called an SVID—a document proving your identity.' },
    { id: '2-11', title: 'SVIDs Are Short-Lived', content: 'Unlike passwords that might last months, SVIDs expire quickly—often in hours or minutes. Then you get a new one.' },
    { id: '2-12', title: 'X.509 vs JWT', content: 'SVIDs come in two formats: X.509 certificates (like a permanent badge) and JWTs (like a visitor pass).' },
    { id: '2-13', title: 'Metaphor Limits', content: 'Like all analogies, this one has limits. Real SPIFFE operates at millisecond timescales with cryptographic proofs. But the concepts map well.' },
  ],
};

export const section3: Section = {
  id: 'meet-spire',
  title: 'Meet SPIRE',
  frames: [
    { id: '3-1', title: 'SPIFFE Needs an Implementation', content: 'SPIFFE is a specification—a set of rules. SPIRE is the reference implementation that makes it real.' },
    { id: '3-2', title: 'SPIRE: Two Components', content: 'SPIRE has two main parts: the Server and the Agent. Let\'s meet them.' },
    { id: '3-3', title: 'The SPIRE Server', content: 'The Server is headquarters—the central authority that knows which workloads exist and signs their identities.' },
    { id: '3-4', title: 'Server Responsibilities', content: 'The Server maintains the registry of workloads, issues SVIDs, and manages the trust bundle.' },
    { id: '3-5', title: 'The SPIRE Agent', content: 'The Agent runs on each node—your local security desk. It talks to the Server and issues badges to local workloads.' },
    { id: '3-6', title: 'Agent Responsibilities', content: 'The Agent attests workloads, caches SVIDs locally, and exposes the Workload API.' },
    { id: '3-7', title: 'The Architecture', content: 'Together: Server manages identity centrally, Agents distribute identity locally.' },
    { id: '3-8', title: 'But Wait: Who Gets Identity?', content: 'How does the Server know which workloads should get which identities? Through Registration Entries.' },
    { id: '3-9', title: 'Registration Entries Explained', content: 'A registration entry is like an HR record: it maps workload properties (selectors) to a SPIFFE ID.' },
    { id: '3-10', title: 'Selectors: The Criteria', content: "Selectors describe workload properties: which node it's on, which container, which service account, which process." },
    { id: '3-11', title: 'Entry Example', content: "If process is 'payments-api' AND node is 'prod-cluster', then SPIFFE ID = spiffe://acme.com/payments/api" },
    { id: '3-12', title: 'The Full Picture', content: 'Admin creates entries → Server stores them → Agent checks workloads against entries → Matching workloads get SVIDs' },
  ],
};

export const section4: Section = {
  id: 'node-attestation',
  title: 'Node Attestation',
  frames: [
    { id: '4-1', title: 'The Bootstrap Problem', content: 'Before the Agent can issue badges, the Server needs to trust the Agent itself. How?' },
    { id: '4-2', title: 'Traditional vs SPIFFE', content: 'Traditional: Agent presents credentials. SPIFFE: The platform vouches for the Agent.' },
    { id: '4-3', title: 'Node Attestation', content: 'This process is called Node Attestation—proving that an Agent is running on a legitimate, authorized node.' },
    { id: '4-4', title: 'The Badge Metaphor', content: "It's like proving a building is a legitimate company building before installing the badge printer." },
    { id: '4-5', title: 'Platform as Witness', content: "The Agent doesn't claim its own identity—the underlying platform (AWS, K8s, GCP) vouches for it." },
    { id: '4-6', title: 'How It Works', content: '1. Agent starts on a node. 2. Agent asks platform for proof of identity. 3. Agent sends proof to Server. 4. Server validates with platform. 5. Server issues Agent SVID.' },
    { id: '4-7', title: 'Attestation Types', content: 'Different platforms provide different proofs: AWS instance identity documents, K8s service account tokens, GCP instance metadata...' },
    { id: '4-8', title: 'Platform Deep Dive Teaser', content: "We'll explore specific attestation methods in Advanced Concepts. For now, understand the pattern: platform vouches, server verifies." },
    { id: '4-9', title: 'After Attestation', content: 'Once attested, the Agent has its own SVID and can now issue badges to workloads on its node.' },
    { id: '4-10', title: "Why Attackers Can't Spoof", content: "An attacker can't fake node attestation without compromising the platform itself—a much harder target." },
    { id: '4-11', title: 'Interactive: Attestation Simulator', content: 'Try it yourself: See what happens in successful attestation, failed attestation, and attack scenarios.' },
  ],
};

export const section5: Section = {
  id: 'workload-attestation',
  title: 'Workload Attestation',
  frames: [
    { id: '5-1', title: 'Node Trusted. Now What?', content: 'The Agent is attested. Now workloads on that node need their own identities.' },
    { id: '5-2', title: 'Workload Attestation', content: 'Workload attestation: the Agent examines a workload and decides if it matches a registration entry.' },
    { id: '5-3', title: 'The Badge Metaphor', content: "Like HR verifying your employment before printing your badge—checking you're in the system." },
    { id: '5-4', title: 'Developer Experience', content: "For the developer, it's beautifully simple: call the Workload API, get your identity." },
    { id: '5-5', title: 'The Workload API', content: 'The Workload API is a local Unix socket. Workloads just connect to it—no credentials needed for the request itself.' },
    { id: '5-6', title: 'How the Agent Decides', content: 'When a workload connects, the Agent examines: What process? What user? What container? What K8s metadata?' },
    { id: '5-7', title: 'Matching Against Entries', content: 'The Agent compares collected selectors against registration entries. Match found? Issue SVID.' },
    { id: '5-8', title: 'The Magic Moment', content: 'The workload now has a cryptographically signed identity—without ever providing a secret to get it.' },
    { id: '5-9', title: "What's in the SVID?", content: "The SVID contains: the SPIFFE ID, a public key, validity period, and is signed by the trust domain's authority." },
    { id: '5-10', title: 'But Wait—Is There a Secret?', content: "You might ask: doesn't the SVID have a private key? Yes—but it's fundamentally different from shared secrets." },
    { id: '5-11', title: "Why It's Different", content: "The private key: 1) Is never shared, 2) Is short-lived, 3) Is auto-rotated, 4) Never leaves the workload. No human ever sees it." },
    { id: '5-12', title: 'Interactive: Selector Matcher', content: 'Quiz: Given workload properties, which registration entry matches?' },
  ],
};

export const section6: Section = {
  id: 'using-identity',
  title: 'Using Your Identity',
  frames: [
    { id: '6-1', title: 'You Have Identity. Now What?', content: 'The workload has its SVID. How does it actually use this to communicate securely?' },
    { id: '6-2', title: 'mTLS: Mutual Authentication', content: 'SPIFFE identities enable mTLS—mutual TLS. Both sides prove who they are.' },
    { id: '6-3', title: 'The Badge Metaphor', content: 'Like two employees meeting: both show their badges before discussing anything sensitive.' },
    { id: '6-4', title: 'The Handshake', content: '1. Workload A presents SVID. 2. Workload B validates against trust bundle. 3. Workload B presents SVID. 4. Workload A validates. 5. Encrypted channel established.' },
    { id: '6-5', title: 'Trust Bundle: The Verifier', content: "How does a workload know to trust another's SVID? The trust bundle—public keys of trusted authorities." },
    { id: '6-6', title: 'The Badge Metaphor', content: 'The trust bundle is like the list of companies whose badges your card readers accept.' },
    { id: '6-7', title: 'Authentication ≠ Authorization', content: 'Important: SPIFFE provides AUTHENTICATION (proving who you are), not AUTHORIZATION (what you can do).' },
    { id: '6-8', title: 'The Badge Metaphor', content: "Your badge proves you're an employee. It doesn't determine which rooms you can enter—that's a separate policy." },
    { id: '6-9', title: 'Authorization Layers', content: 'Authorization is handled separately: by your application, by service mesh policies, by OPA, etc.' },
    { id: '6-10', title: 'Interactive: E2E Simulator', content: 'Step through complete workload-to-workload authentication, including trust bundle mismatch failure.' },
    { id: '6-11', title: 'Zero Trust Foundation', content: 'SPIFFE provides the identity foundation for zero trust: verify explicitly, never assume trust.' },
  ],
};

export const section7: Section = {
  id: 'identity-lifecycle',
  title: 'Identity Lifecycle',
  frames: [
    { id: '7-1', title: "SVIDs Don't Last Forever", content: 'Remember: SVIDs are short-lived. Minutes to hours, not months or years.' },
    { id: '7-2', title: 'Why So Short?', content: 'Short lifetimes limit blast radius. A compromised SVID is only useful briefly.' },
    { id: '7-3', title: 'Rotation Is Automatic', content: 'The Agent handles rotation automatically. Before expiration, it fetches a fresh SVID.' },
    { id: '7-4', title: 'The Badge Metaphor', content: 'Like your badge auto-renewing every hour. You never think about it—security desk handles it.' },
    { id: '7-5', title: 'The Overlap Period', content: 'New SVIDs are issued before old ones expire, creating an overlap. No interruption.' },
    { id: '7-6', title: 'SPIFFE ID Stays Stable', content: 'Critical: Your SPIFFE ID never changes. Only the SVID (the proof document) rotates.' },
    { id: '7-7', title: 'Why Stability Matters', content: "Authorization policies reference SPIFFE IDs, not SVIDs. Rotation doesn't break policies." },
    { id: '7-8', title: 'Contrast with Secrets', content: 'Compare to API keys: rotation means updating every consumer, coordinating deployments, risking outages.' },
    { id: '7-9', title: 'Interactive: Rotation Simulator', content: 'Time-lapse showing SVID lifecycle, overlap periods, SPIFFE ID stability.' },
    { id: '7-10', title: 'Lifecycle Complete', content: 'Issue → Use → Rotate → Repeat. All automatic, all cryptographic, no human intervention.' },
  ],
};

export const section8: Section = {
  id: 'advanced',
  title: 'Advanced Concepts',
  frames: [
    { id: '8-1', title: 'Beyond Single Domains', content: "So far we've focused on one trust domain. But enterprises have many domains—and partners." },
    { id: '8-2', title: 'Federation', content: 'Federation: establishing trust between separate trust domains.' },
    { id: '8-3', title: 'The Badge Metaphor', content: "Like a partnership agreement: 'We'll accept badges from Partner Corp at our facilities.'" },
    { id: '8-4', title: 'How Federation Works', content: "Domains exchange trust bundles. Each domain learns to verify the other's SVIDs." },
    { id: '8-5', title: 'Federation Topologies', content: 'Point-to-point, hub-and-spoke, or mesh—depending on your trust relationships.' },
    { id: '8-6', title: 'Platform Attestation: AWS', content: 'AWS: Instance Identity Document—cryptographically signed metadata about the EC2 instance.' },
    { id: '8-7', title: 'Platform Attestation: Kubernetes', content: 'Kubernetes: Service Account tokens or Projected Service Account Tokens (PSAT).' },
    { id: '8-8', title: 'Platform Attestation: GCP/Azure', content: 'GCP: Instance metadata. Azure: Managed Identity. Each platform has native attestation.' },
    { id: '8-9', title: 'Platform Attestation: TPM', content: "Hardware root of trust: TPM attestation proves the physical machine's identity." },
    { id: '8-10', title: 'Nested SPIRE', content: 'Large deployments can nest SPIRE servers—regional servers under a global root.' },
    { id: '8-11', title: 'OIDC Federation', content: 'SPIRE can federate with OIDC providers, bridging workload identity to cloud IAM.' },
    { id: '8-12', title: 'High Availability', content: 'Production SPIRE: clustered servers with shared datastore for resilience.' },
  ],
};

export const section9: Section = {
  id: 'conclusion',
  title: 'Conclusion',
  frames: [
    { id: '9-1', title: "What We've Learned", content: 'SPIFFE: universal workload identity. SPIRE: the implementation. SVIDs: the proof. Trust Domains: the boundaries.' },
    { id: '9-2', title: 'The Badge Summary', content: 'Your employee ID (SPIFFE ID) never changes. Your badge (SVID) expires and auto-renews. The security desk (Agent) handles it all.' },
    { id: '9-3', title: 'No More 2 AM Pages', content: 'With SPIFFE: no secrets to leak, no keys to rotate manually, no coordination nightmares.' },
    { id: '9-4', title: 'Get Started', content: 'SPIFFE: spiffe.io | SPIRE: github.com/spiffe/spire | Slack: slack.spiffe.io' },
  ],
};

// Export all sections as array
export const sections: Section[] = [
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
  section8,
  section9,
];

// Helper to get total frame count
export const getTotalFrameCount = (): number => {
  return sections.reduce((sum, section) => sum + section.frames.length, 0);
};

// Helper to get section by ID
export const getSectionById = (id: string): Section | undefined => {
  return sections.find((section) => section.id === id);
};

// Helper to get frame by global index
export const getFrameByGlobalIndex = (
  globalIndex: number
): { section: Section; frame: Section['frames'][number]; sectionIndex: number; frameIndex: number } | undefined => {
  let count = 0;
  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    const section = sections[sectionIndex];
    for (let frameIndex = 0; frameIndex < section.frames.length; frameIndex++) {
      if (count === globalIndex) {
        return {
          section,
          frame: section.frames[frameIndex],
          sectionIndex,
          frameIndex,
        };
      }
      count++;
    }
  }
  return undefined;
};
