import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, X, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrackNavigation, useTrackKeyboardNav, useReducedMotion } from '@/hooks';
import { tracks, type TrackId } from '@/content/tracks';
import { TrackCompletion } from '@/components/TrackCompletion';
import { sections } from '@/content/spiffe';

interface TrackFrameProps {
  children: React.ReactNode;
}

// Color schemes for track badges
const trackColors: Record<TrackId, string> = {
  bronze: 'bg-amber-600/20 text-amber-400 border-amber-600/30',
  silver: 'bg-slate-400/20 text-slate-300 border-slate-400/30',
  gold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export const TrackFrame: React.FC<TrackFrameProps> = ({ children }) => {
  const {
    currentTrack,
    currentPosition,
    track,
    totalFrames,
    frameData,
    isFirstFrame,
    isLastFrame,
    progress,
    nextFrame,
    prevFrame,
    goToPosition,
  } = useTrackNavigation();

  const prefersReducedMotion = useReducedMotion();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  // Enable keyboard navigation
  useTrackKeyboardNav({
    enabled: true,
    onNext: () => {
      if (isLastFrame) {
        setShowCompletion(true);
      } else {
        nextFrame();
      }
    },
    onPrev: prevFrame,
    onFirst: () => goToPosition(0),
    onLast: () => goToPosition(totalFrames - 1),
    onEscape: () => {
      if (showCompletion) {
        setShowCompletion(false);
      } else if (showSidebar) {
        setShowSidebar(false);
      }
    },
  });

  if (!currentTrack || !track || !frameData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-textMuted">
        Loading...
      </div>
    );
  }

  const { section, frame } = frameData;

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-surface rounded-lg text-textSecondary hover:text-textPrimary transition-colors"
        aria-label={showSidebar ? 'Close menu' : 'Open menu'}
      >
        {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-surface border-r border-textMuted/20
          transform transition-transform duration-300 overflow-y-auto
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-textMuted/20">
          <Link
            to="/spiffe"
            className="flex items-center gap-2 text-textSecondary hover:text-textPrimary transition-colors mb-3"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Track Selector</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-2xl">{track.icon}</span>
            <div>
              <h2 className="font-display font-semibold text-textPrimary">{track.title}</h2>
              <p className="text-xs text-textMuted">{track.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Frame List */}
        <nav className="p-2">
          <ul className="space-y-1">
            {track.frames.map((_, index) => {
              const frameInfo = tracks[currentTrack].frames[index];
              const isActive = index === currentPosition;

              return (
                <li key={frameInfo.frameId}>
                  <button
                    onClick={() => {
                      goToPosition(index);
                      setShowSidebar(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                      ${isActive
                        ? 'bg-server/20 text-server font-medium'
                        : 'text-textSecondary hover:text-textPrimary hover:bg-surface'
                      }
                    `}
                  >
                    <span className="text-xs text-textMuted mr-2">{index + 1}.</span>
                    {/* Get frame title from content */}
                    {(() => {
                      const data = tracks[currentTrack].frames[index];
                      const sec = sections[data.sectionIndex];
                      const frm = sec?.frames[data.frameIndex];
                      return frm?.title || `Frame ${index + 1}`;
                    })()}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Sidebar Overlay (mobile) */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setShowSidebar(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main
        role="main"
        aria-label={`${track.title} track, Frame ${currentPosition + 1}: ${frame.title}`}
        className="relative min-h-screen pt-20 pb-24 lg:pl-64 bg-background"
      >
        {/* Top Progress Bar */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 h-1 bg-textMuted/10 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-server via-agent to-svid"
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Track and Frame indicator */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <span className={`px-2 py-0.5 rounded border ${trackColors[currentTrack]}`}>
              {track.icon} {track.title}
            </span>
            <span className="text-textMuted">•</span>
            <span className="text-textMuted">
              Frame {progress.current} of {progress.total}
            </span>
            <span className="text-textMuted">•</span>
            <span className="px-2 py-0.5 bg-surface rounded text-textSecondary text-xs">
              {section.title}
            </span>
          </div>

          {/* Frame Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-textPrimary mb-6">
            {frame.title}
          </h1>

          {/* Frame Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentTrack}-${currentPosition}`}
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: 50 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Content text */}
              <p className="text-lg sm:text-xl text-textSecondary mb-8 max-w-3xl">
                {frame.content}
              </p>

              {/* Visualization area */}
              <div className="relative">{children}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <nav
          className="fixed bottom-0 left-0 right-0 lg:left-64 bg-background/90 backdrop-blur-md border-t border-textMuted/20 py-4 z-10"
          aria-label="Frame navigation"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <button
              onClick={prevFrame}
              disabled={isFirstFrame}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isFirstFrame
                  ? 'text-textMuted cursor-not-allowed'
                  : 'text-textSecondary hover:text-textPrimary hover:bg-surface'
              }`}
              aria-label="Previous frame"
              aria-keyshortcuts="ArrowLeft"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-textMuted hidden sm:inline">
                Press{' '}
                <kbd className="px-1.5 py-0.5 bg-surface rounded text-textSecondary">
                  ←
                </kbd>{' '}
                <kbd className="px-1.5 py-0.5 bg-surface rounded text-textSecondary">
                  →
                </kbd>{' '}
                to navigate
              </span>
            </div>

            <button
              onClick={() => {
                if (isLastFrame) {
                  setShowCompletion(true);
                } else {
                  nextFrame();
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isLastFrame
                  ? 'bg-svid text-white hover:bg-opacity-90'
                  : 'bg-server text-white hover:bg-opacity-90'
              }`}
              aria-label={isLastFrame ? 'Complete track' : 'Next frame'}
              aria-keyshortcuts="ArrowRight Space"
            >
              <span className="hidden sm:inline">
                {isLastFrame ? 'Complete' : 'Next'}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </main>

      {/* Completion Modal */}
      {showCompletion && (
        <TrackCompletion onClose={() => setShowCompletion(false)} />
      )}
    </>
  );
};
