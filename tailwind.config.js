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

        // Background
        background: '#0F172A',
        surface: '#1E293B',

        // Text
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        textMuted: '#64748B',

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
