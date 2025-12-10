import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useReducedMotion } from '@/hooks';
import { externalLinks } from '@/utils/constants';

export const Header: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-textMuted/20"
      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="font-display text-lg font-bold text-textPrimary">
                The Secret Lives of Identity
              </span>
              <span className="px-2 py-0.5 text-xs font-medium bg-svid/20 text-svid rounded-full">
                SPIFFE
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4">
            <a
              href={externalLinks.spiffe}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-textSecondary hover:text-textPrimary transition-colors"
            >
              <span>SPIFFE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={externalLinks.spire}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-textSecondary hover:text-textPrimary transition-colors"
            >
              <span>SPIRE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={externalLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-textSecondary hover:text-textPrimary transition-colors"
              aria-label="View source on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};
