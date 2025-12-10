import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, RotateCcw, Home, X } from 'lucide-react';
import { useTrackNavigation, useReducedMotion } from '@/hooks';
import { getNextTrack, tracks, type TrackId } from '@/content/tracks';

interface TrackCompletionProps {
  onClose: () => void;
}

// Completion messages by track
const completionMessages: Record<TrackId, { title: string; message: string }> = {
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
  const { currentTrack, goToPosition, continueToNextTrack, goToTrackSelector } =
    useTrackNavigation();
  const prefersReducedMotion = useReducedMotion();

  if (!currentTrack) return null;

  const nextTrackId = getNextTrack(currentTrack);
  const nextTrack = nextTrackId ? tracks[nextTrackId] : null;
  const completion = completionMessages[currentTrack];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-lg bg-surface rounded-2xl p-8 shadow-2xl"
        initial={prefersReducedMotion ? undefined : { scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-textMuted hover:text-textPrimary transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

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
              You've completed the entire SPIFFE visualization!
            </p>
            <div className="flex justify-center gap-4 text-sm text-textMuted">
              <a
                href="https://spiffe.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-textPrimary transition-colors"
              >
                spiffe.io
              </a>
              <span>•</span>
              <a
                href="https://github.com/spiffe/spire"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-textPrimary transition-colors"
              >
                SPIRE on GitHub
              </a>
              <span>•</span>
              <a
                href="https://slack.spiffe.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-textPrimary transition-colors"
              >
                Join Slack
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
