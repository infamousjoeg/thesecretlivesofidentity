import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight, RotateCcw, Home, X, Linkedin, Twitter, Copy, Check, Share2 } from 'lucide-react';
import { useTrackNavigation, useReducedMotion } from '@/hooks';
import { getNextTrack, type TrackId } from '@/content/tracks';
import type { ModuleId } from '@/content/modules';

interface TrackCompletionProps {
  onClose: () => void;
}

interface ResourceLink {
  label: string;
  href: string;
}

interface ModuleCompletionMeta {
  /** Human-readable module name, used in share copy. */
  moduleTitle: string;
  /** Final celebratory line shown when the Gold track is completed. */
  finalMessage: string;
  /** External resources surfaced on the Gold completion screen. */
  resources: ResourceLink[];
}

// Per-module resources for the Gold "you finished everything" screen.
// Keyed by moduleId so finishing the agents track never shows SPIFFE links.
const moduleCompletionMeta: Record<ModuleId, ModuleCompletionMeta> = {
  spiffe: {
    moduleTitle: 'SPIFFE/SPIRE',
    finalMessage: "You've completed the entire SPIFFE visualization!",
    resources: [
      { label: 'spiffe.io', href: 'https://spiffe.io' },
      { label: 'SPIRE on GitHub', href: 'https://github.com/spiffe/spire' },
      { label: 'Join Slack', href: 'https://slack.spiffe.io' },
    ],
  },
  agents: {
    moduleTitle: 'AI Agent Identity',
    finalMessage: "You've completed the entire AI Agent Identity visualization!",
    resources: [
      { label: 'WIMSE Working Group', href: 'https://datatracker.ietf.org/wg/wimse/about/' },
      {
        label: 'MCP Authorization',
        href: 'https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization',
      },
      { label: 'A2A Protocol', href: 'https://a2a-protocol.org/' },
      { label: 'SPIFFE', href: 'https://spiffe.io' },
    ],
  },
};

// English fallback completion copy by track (SPIFFE defaults).
// The live copy is resolved per-module from the `<prefix>-tracks` namespace
// via `completion.<track>.title` / `.message`, with these as defaultValue.
const fallbackCompletion: Record<TrackId, { title: string; message: string }> = {
  bronze: {
    title: 'Bronze Complete!',
    message: 'You now understand what SPIFFE is and why it matters. You can explain the core concepts to anyone.',
  },
  silver: {
    title: 'Silver Complete!',
    message: 'You now understand how SPIFFE and SPIRE work together. You know the architecture and the attestation flow.',
  },
  gold: {
    title: 'Gold Complete!',
    message: 'You\'ve mastered SPIFFE! You understand the complete system, including advanced concepts and can debug implementations.',
  },
};

export const TrackCompletion: React.FC<TrackCompletionProps> = ({ onClose }) => {
  const { moduleConfig, currentTrack, tracks, goToPosition, continueToNextTrack, goToTrackSelector } =
    useTrackNavigation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const prefix = moduleConfig?.i18nPrefix ?? 'spiffe';
  const tracksNs = `${prefix}-tracks`;
  const completionMeta = moduleCompletionMeta[moduleConfig?.id ?? 'spiffe'];
  const { t } = useTranslation([tracksNs, 'ui']);
  const [copied, setCopied] = useState(false);

  // Dismissing the modal (X, backdrop, Escape) returns the learner home.
  const dismissToHome = () => navigate('/');

  if (!currentTrack || !tracks) return null;

  const nextTrackId = getNextTrack(currentTrack);
  const nextTrack = nextTrackId ? tracks[nextTrackId] : null;
  const completion = {
    title: t(`${tracksNs}:completion.${currentTrack}.title`, {
      defaultValue: fallbackCompletion[currentTrack].title,
    }),
    message: t(`${tracksNs}:completion.${currentTrack}.message`, {
      defaultValue: fallbackCompletion[currentTrack].message,
    }),
  };

  // Share metadata — URL is the active module's public entry, derived from basePath.
  const trackTitle = t(`${tracksNs}:${currentTrack}.title`, {
    defaultValue: tracks[currentTrack].title,
  });
  const shareUrl = `${window.location.origin}${moduleConfig?.basePath ?? ''}`;
  const shareText = t('ui:shareText', {
    track: trackTitle,
    module: completionMeta.moduleTitle,
    defaultValue:
      'I just completed the {{track}} track of {{module}} on The Secret Lives of Identity',
  });
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; ignore.
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={dismissToHome}
    >
      <motion.div
        className="relative w-full max-w-lg bg-surface rounded-2xl shadow-2xl flex flex-col max-h-dvh-modal"
        initial={prefersReducedMotion ? undefined : { scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — sits above the scroll area so it is always reachable,
            even when the modal content scrolls on short viewports. */}
        <button
          onClick={dismissToHome}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/80 text-textMuted hover:text-textPrimary transition-colors"
          aria-label={t('ui:close', { defaultValue: 'Close' })}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content — capped to the viewport via max-h-dvh-modal on the
            parent so every control (buttons, share row, "Up next") stays reachable. */}
        <div className="overflow-y-auto p-6 sm:p-8">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-svid to-amber-600 flex items-center justify-center"
            initial={prefersReducedMotion ? undefined : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
        </div>

        {/* Completion Message */}
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-textPrimary text-center mb-4">
          {completion.title}
        </h2>
        <p className="text-textSecondary text-center mb-8">
          {completion.message}
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Continue to Next Track (if available) */}
          {nextTrack && (
            <button
              onClick={continueToNextTrack}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-server text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors group"
            >
              <span>Continue to {nextTrack.title}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Restart Track */}
          <button
            onClick={() => {
              goToPosition(0);
              onClose();
            }}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-surface border border-textMuted/30 text-textPrimary rounded-lg font-medium hover:bg-background transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Restart {tracks[currentTrack].title}</span>
          </button>

          {/* Back to Track Selector */}
          <button
            onClick={goToTrackSelector}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 text-textSecondary hover:text-textPrimary transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Track Selector</span>
          </button>
        </div>

        {/* Social Sharing */}
        <div className="mt-8 pt-6 border-t border-textMuted/20">
          <p className="flex items-center justify-center gap-2 text-sm text-textMuted mb-4">
            <Share2 className="w-4 h-4" />
            <span>{t('ui:sharePrompt', { defaultValue: 'Share your achievement' })}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-textMuted/30 text-textSecondary hover:text-textPrimary hover:border-server/50 transition-colors"
              aria-label={t('ui:shareLinkedIn', { defaultValue: 'Share on LinkedIn' })}
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-textMuted/30 text-textSecondary hover:text-textPrimary hover:border-server/50 transition-colors"
              aria-label={t('ui:shareTwitter', { defaultValue: 'Share on Twitter' })}
            >
              <Twitter className="w-4 h-4" />
              <span className="text-sm">Twitter</span>
            </a>
            <a
              href={blueskyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-textMuted/30 text-textSecondary hover:text-textPrimary hover:border-server/50 transition-colors"
              aria-label={t('ui:shareBluesky', { defaultValue: 'Share on Bluesky' })}
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Bluesky</span>
            </a>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-textMuted/30 text-textSecondary hover:text-textPrimary hover:border-server/50 transition-colors"
              aria-label={t('ui:copyLink', { defaultValue: 'Copy link' })}
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm">
                {copied
                  ? t('ui:copied', { defaultValue: 'Copied!' })
                  : t('ui:copyLink', { defaultValue: 'Copy link' })}
              </span>
            </button>
          </div>
        </div>

        {/* Next Track Preview (if available) */}
        {nextTrack && (
          <motion.div
            className="mt-8 pt-6 border-t border-textMuted/20"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-textMuted text-center mb-3">Up next:</p>
            <div className="flex items-center justify-center gap-3 text-textSecondary">
              <span className="text-2xl">{nextTrack.icon}</span>
              <div>
                <p className="font-medium text-textPrimary">{nextTrack.title}: {nextTrack.subtitle}</p>
                <p className="text-sm text-textMuted">{nextTrack.duration} • {nextTrack.frames.length} frames</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gold Complete - Final Message */}
        {currentTrack === 'gold' && (
          <motion.div
            className="mt-8 pt-6 border-t border-textMuted/20 text-center"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-textSecondary mb-4">
              {completionMeta.finalMessage}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-textMuted">
              {completionMeta.resources.map((resource, index) => (
                <React.Fragment key={resource.href}>
                  {index > 0 && <span>•</span>}
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-textPrimary transition-colors"
                  >
                    {resource.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
        </div>
      </motion.div>
    </motion.div>
  );
};
