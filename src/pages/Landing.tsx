import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Handshake } from 'lucide-react';
import { useReducedMotion } from '@/hooks';
import { externalLinks } from '@/utils/constants';

// Custom logo components for topics without Lucide icons
const OpenIDLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-label="OpenID Connect logo">
    <circle cx="50" cy="30" r="20" fill="#F78C40" />
    <path d="M50 55 C20 55 15 85 15 85 L85 85 C85 85 80 55 50 55Z" fill="#F78C40" />
    <rect x="70" y="20" width="8" height="50" fill="#B3B3B3" />
    <rect x="70" y="75" width="8" height="8" rx="1" fill="#B3B3B3" />
  </svg>
);

const OPALogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="16.37 -1.63 395.51 435.76" className={className} aria-label="Open Policy Agent logo">
    <path fill="#7d9199" d="M71 214.5c7.5-26.7 20.9-50.1 38.4-68.8-5.9-4.4-29.3-22.6-30.4-36.9C77.3 85.4 100.7 6.7 100.7 6.7S30 92.8 25.1 127.6c-3.9 27.3 40.8 81.5 45.5 87v-.1h.4zm287.7-1.4v.2c0 .1.1.2.1.3 7.8-9.4 48.3-59.9 44.6-86-4.9-34.8-75.6-120.9-75.6-120.9s23.4 78.7 21.7 102.1c-1 13.7-22.3 30.8-29.4 36.2 17.5 18.4 31 41.6 38.6 68.1z"/>
    <path fill="#566366" d="M358.7 213.2v-.2c-7.6-26.4-21.1-49.6-38.6-68.1-27.5-29-64.9-46.4-105.2-46.4v93h.1c9.9.1 17.9 8.2 17.9 18.1 0 1.2-.1 2.3-.3 3.4-1.6 8.3-8.8 14.6-17.6 14.7h-.3v34.5l-.2 163.4h3.5s38-55 58.5-70.7c24-18.4 82.2-41.2 82.2-41.2v-99.4l.3-.1c-.1-.2-.1-.5-.2-.7 0-.1 0-.2-.1-.3z"/>
    <path fill="#7d9199" d="M214.7 262.3v-34.5c-8.3-.1-15.2-5.7-17.3-13.3-.4-1.5-.7-3.1-.7-4.8 0-10 8.1-18.1 18.1-18.1h.1V98.9c-40.5 0-78 17.5-105.5 46.8-17.5 18.6-30.9 42.1-38.4 68.8h-.3v100.7s58.2 22.8 82.2 41.2c19.9 15.3 58.3 69.4 58.3 69.4h3.6v-.1h-.2l.1-163.4z"/>
    <path fill="#fff" d="M196.7 209.7c0 1.7.2 3.3.7 4.8 2.1 7.6 9 13.2 17.3 13.3h.3c8.7-.1 16-6.4 17.6-14.7.2-1.1.3-2.2.3-3.4 0-9.9-8-18-17.9-18.1h-.2c-10 0-18.1 8.1-18.1 18.1z"/>
  </svg>
);

const WIMSELogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-label="WIMSE logo">
    {/* Stylized W with identity nodes */}
    <circle cx="20" cy="30" r="8" fill="#3B82F6" />
    <circle cx="50" cy="30" r="8" fill="#10B981" />
    <circle cx="80" cy="30" r="8" fill="#3B82F6" />
    <path d="M20 42 L35 75 L50 55 L65 75 L80 42" stroke="#64748B" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="38" x2="50" y2="38" stroke="#64748B" strokeWidth="2" strokeDasharray="4 2" />
    <line x1="50" y1="38" x2="80" y2="38" stroke="#64748B" strokeWidth="2" strokeDasharray="4 2" />
  </svg>
);

interface TopicItem {
  id: string;
  title: string;
  description: string;
  icon?: React.FC<{ className?: string }>;
  customIcon?: React.FC<{ className?: string }>;
  status: string;
}

const upcomingTopics: TopicItem[] = [
  {
    id: 'mtls',
    title: 'Mutual TLS',
    description: 'How two parties prove identity to each other',
    icon: Handshake,
    status: 'Coming Soon'
  },
  {
    id: 'oauth',
    title: 'OAuth 2.0 / OIDC',
    description: 'Token-based identity for humans and services',
    customIcon: OpenIDLogo,
    status: 'Coming Soon'
  },
  {
    id: 'opa',
    title: 'OPA',
    description: 'Policy-based authorization decisions',
    customIcon: OPALogo,
    status: 'Coming Soon'
  },
  {
    id: 'wimse',
    title: 'WIMSE',
    description: 'Cross-boundary workload identity federation',
    customIcon: WIMSELogo,
    status: 'Coming Soon'
  },
];

export const Landing: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-server/5 via-transparent to-transparent" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-textPrimary mb-6"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            The Secret Lives of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-server via-agent to-svid">
              Identity
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-textSecondary mb-8 max-w-2xl mx-auto"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Interactive visualizations that demystify identity and security concepts
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Link
              to="/spiffe"
              className="inline-flex items-center gap-2 px-6 py-3 bg-server text-white text-lg font-medium rounded-lg hover:bg-opacity-90 transition-all group"
            >
              <span>Start with SPIFFE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured: SPIFFE */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface to-background border border-textMuted/20 p-8 sm:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-svid/20 text-svid rounded-full mb-4">
                Featured
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-textPrimary mb-4">
                SPIFFE/SPIRE
              </h2>
              <p className="text-lg text-textSecondary max-w-xl mb-6">
                Learn how workloads prove their identity without secrets. From zero to understanding SPIFFE in 95 frames.
              </p>
              <Link
                to="/spiffe"
                className="inline-flex items-center gap-2 text-server hover:text-server/80 font-medium transition-colors"
              >
                <span>Begin the journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* SPIFFE Logo */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
              <svg width="200" height="200" viewBox="0.11 1.86 358.28 358.28" role="img" aria-label="SPIFFE logo">
                <defs>
                  <style>{`.spiffe-lime{fill:#bcd918}.spiffe-cyan{fill:#04bdd9}`}</style>
                </defs>
                <path d="M12.1 8.9h28.3c2.7 0 5 2.2 5 5v28.3c0 2.7-2.2 5-5 5H12.1c-2.7 0-5-2.2-5-5V13.9c.1-2.7 2.3-5 5-5z" className="spiffe-lime"/>
                <path d="M88.7 8.9h258c2.7 0 5 2.2 5 5v28.3c0 2.7-2.2 5-5 5h-258c-2.7 0-5-2.2-5-5V13.9c0-2.7 2.2-5 5-5z" className="spiffe-cyan"/>
                <path d="M346.7 85.5h-28.3c-2.7 0-5 2.2-5 5v28.3c0 2.8 2.2 5 5 5h28.3c2.7 0 5-2.2 5-5V90.5c0-2.8-2.3-5-5-5z" className="spiffe-lime"/>
                <path d="M193.6 85.5H12.1c-2.7 0-5 2.3-5 5v28.3c0 2.7 2.2 5 5 5h181.5c2.7 0 5-2.2 5-5V90.5c0-2.8-2.2-5-5-5z" className="spiffe-cyan"/>
                <path d="M270.2 85.5h-28.3c-2.7 0-5 2.2-5 5v28.3c0 2.8 2.2 5 5 5h28.3c2.7 0 5-2.2 5-5V90.5c-.1-2.8-2.3-5-5-5z" className="spiffe-lime"/>
                <path d="M270.2 162H88.7c-2.7 0-5 2.2-5 5v28.3c0 2.7 2.2 5 5 5h181.5c2.7 0 5-2.2 5-5V167c-.1-2.8-2.3-5-5-5z" className="spiffe-cyan"/>
                <path d="M346.7 162h-28.3c-2.7 0-5 2.2-5 5v28.3c0 2.8 2.2 5 5 5h28.3c2.7 0 5-2.2 5-5V167c0-2.8-2.3-5-5-5zm-306.3 0H12.1c-2.7 0-5 2.2-5 5v28.3c0 2.8 2.2 5 5 5h28.3c2.7 0 5-2.2 5-5V167c0-2.8-2.2-5-5-5zm-28.3 76.5h28.3c2.7 0 5 2.2 5 5v28.3c0 2.7-2.2 5-5 5H12.1c-2.7 0-5-2.2-5-5v-28.3c.1-2.7 2.3-5 5-5z" className="spiffe-lime"/>
                <path d="M165.2 238.5h181.5c2.7 0 5 2.2 5 5v28.3c0 2.7-2.2 5-5 5H165.2c-2.7 0-5-2.2-5-5v-28.3c0-2.7 2.2-5 5-5z" className="spiffe-cyan"/>
                <path d="M88.7 238.5H117c2.7 0 5 2.2 5 5v28.3c0 2.7-2.2 5-5 5H88.7c-2.7 0-5-2.2-5-5v-28.3c0-2.7 2.2-5 5-5zm258 76.7h-28.3c-2.7 0-5 2.2-5 5v28.3c0 2.8 2.2 5 5 5h28.3c2.7 0 5-2.2 5-5v-28.3c0-2.8-2.3-5-5-5z" className="spiffe-lime"/>
                <path d="M270.2 315.2h-258c-2.7 0-5 2.2-5 5v28.3c0 2.7 2.2 5 5 5h258c2.7 0 5-2.2 5-5v-28.3c-.1-2.8-2.3-5-5-5z" className="spiffe-cyan"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Topics */}
      <section className="py-20 px-4 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-textPrimary mb-8 text-center">
            Coming Soon
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingTopics.map((topic) => {
              const IconComponent = topic.icon;
              const CustomIconComponent = topic.customIcon;
              return (
                <div
                  key={topic.id}
                  className="p-6 bg-surface rounded-xl border border-textMuted/20 opacity-70 hover:opacity-90 transition-opacity"
                >
                  {IconComponent ? (
                    <IconComponent className="w-8 h-8 text-textMuted mb-4" />
                  ) : CustomIconComponent ? (
                    <CustomIconComponent className="w-8 h-8 mb-4" />
                  ) : null}
                  <h3 className="font-display font-semibold text-textPrimary mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-textSecondary mb-2">
                    {topic.description}
                  </p>
                  <span className="text-xs text-textMuted">{topic.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-textPrimary mb-4">
            About This Project
          </h2>
          <p className="text-lg text-textSecondary mb-6">
            A community contribution to the SPIFFE ecosystem, inspired by{' '}
            <a
              href={externalLinks.inspiration}
              target="_blank"
              rel="noopener noreferrer"
              className="text-server hover:underline"
            >
              The Secret Lives of Data
            </a>
            . Our goal is to make complex identity concepts accessible to everyone, regardless of prior knowledge.
          </p>
          <div className="flex items-center justify-center gap-6 text-textSecondary">
            <a
              href={externalLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-textPrimary transition-colors"
            >
              GitHub
            </a>
            <span className="text-textMuted">•</span>
            <a
              href={externalLinks.slack}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-textPrimary transition-colors"
            >
              SPIFFE Slack
            </a>
            <span className="text-textMuted">•</span>
            <span className="text-textMuted">Apache 2.0</span>
          </div>
        </div>
      </section>
    </div>
  );
};
