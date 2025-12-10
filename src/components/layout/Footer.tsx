import React from 'react';
import { externalLinks } from '@/utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface/50 border-t border-textMuted/20 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-textMuted">
            Inspired by{' '}
            <a
              href={externalLinks.inspiration}
              target="_blank"
              rel="noopener noreferrer"
              className="text-textSecondary hover:text-textPrimary underline underline-offset-2"
            >
              The Secret Lives of Data
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm text-textMuted">
            <a
              href={externalLinks.slack}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-textPrimary transition-colors"
            >
              SPIFFE Slack
            </a>
            <span className="text-textMuted/50">•</span>
            <a
              href={externalLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-textPrimary transition-colors"
            >
              GitHub
            </a>
            <span className="text-textMuted/50">•</span>
            <span>Apache 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
