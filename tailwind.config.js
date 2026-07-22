/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Entity colors
        server: '#3B82F6',
        agent: '#10B981',
        workloadUnattested: '#6B7280',
        workloadAttested: '#F59E0B',
        svid: '#F59E0B',
        trustBundle: '#8B5CF6',
        attacker: '#EF4444',

        // Agent Identity module (AI Agent delegation)
        principal: '#6366F1', // Indigo — owner of the authority (signs slips)
        agentAI: '#06B6D4', // Cyan — the AI agent acting on the principal's behalf
        subAgent: '#22D3EE', // Light cyan — a delegated secondary agent
        permissionSlip: '#F59E0B', // Gold — the signed/scoped/short-lived authorization slip
        slipSeal: '#9F1239', // Burgundy wax — the slip's signature/seal (not attacker red)
        verifier: '#3B82F6', // Authority blue — checkpoint/guard inspecting a slip
        toolResource: '#14B8A6', // Teal — protected tool / MCP server

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
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
