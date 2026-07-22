import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, X, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTrackNavigation, useTrackKeyboardNav, useReducedMotion } from '@/hooks';
import type { TrackId } from '@/content/tracks';
import { TrackCompletion } from '@/components/TrackCompletion';

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
    moduleConfig,
    currentTrack,
    currentPosition,
    track,
    tracks,
    totalFrames,
    frameData,
    isFirstFrame,
    isLastFrame,
    progress,
    nextFrame,
    prevFrame,
    goToPosition,
  } = useTrackNavigation();

  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const prefix = moduleConfig?.i18nPrefix ?? 'spiffe';
  const contentNs = `${prefix}-content`;
  const tracksNs = `${prefix}-tracks`;
  const { t } = useTranslation(['ui', contentNs, tracksNs]);
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
        // Dismissing the completion modal returns the learner home.
        navigate('/');
      } else if (showSidebar) {
        setShowSidebar(false);
      }
    },
  });

  if (!moduleConfig || !currentTrack || !track || !tracks || !frameData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-textMuted">
        {t('ui:loading')}
      </div>
    );
  }

  const { section, frame } = frameData;
  const frameTitle = t(`${contentNs}:frames.${frame.id}.title`, { defaultValue: frame.title });
  const frameContent = t(`${contentNs}:frames.${frame.id}.content`, { defaultValue: frame.content });
  const sectionTitle = t(`${contentNs}:sections.${section.id}`, { defaultValue: section.title });
  const trackTitle = t(`${tracksNs}:${currentTrack}.title`, { defaultValue: track.title });
  const trackSubtitle = t(`${tracksNs}:${currentTrack}.subtitle`, { defaultValue: track.subtitle });

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-surface rounded-lg text-textSecondary hover:text-textPrimary transition-colors"
        aria-label={showSidebar ? t('ui:closeMenu') : t('ui:openMenu')}
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
            to={moduleConfig.basePath}
            className="flex items-center gap-2 text-textSecondary hover:text-textPrimary transition-colors mb-3"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">{t('ui:trackSelector')}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-2xl">{track.icon}</span>
            <div>
              <h2 className="font-display font-semibold text-textPrimary">{trackTitle}</h2>
              <p className="text-xs text-textMuted">{trackSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Frame List */}
        <nav className="p-2">
          <ul className="space-y-1">
            {track.frames.map((_, index) => {
              const frameInfo = track.frames[index];
              const isActive = index === currentPosition;

              return (
                <li key={`${frameInfo.frameId}-${index}`}>
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
                      const data = track.frames[index];
                      const sec = moduleConfig.sections[data.sectionIndex];
                      const frm = sec?.frames[data.frameIndex];
                      if (!frm) return `Frame ${index + 1}`;
                      return t(`${contentNs}:frames.${frm.id}.title`, { defaultValue: frm.title });
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
        aria-label={`${trackTitle} track, Frame ${currentPosition + 1}: ${frameTitle}`}
        className="relative flex flex-col h-dvh-fallback overflow-hidden pt-16 pb-20 lg:pl-64 bg-background"
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

        <div className="flex flex-1 min-h-0 flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Track and Frame indicator */}
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
            <span className={`px-2 py-0.5 rounded border ${trackColors[currentTrack]}`}>
              {track.icon} {trackTitle}
            </span>
            <span className="text-textMuted">•</span>
            <span className="text-textMuted">
              {t('ui:frameProgress', { current: progress.current, total: progress.total })}
            </span>
            <span className="text-textMuted">•</span>
            <span className="px-2 py-0.5 bg-surface rounded text-textSecondary text-xs">
              {sectionTitle}
            </span>
          </div>

          {/* Frame Title — stays visible; the visualization below flexes/scrolls */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-textPrimary mb-2 sm:mb-3">
            {frameTitle}
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
              className="flex flex-1 min-h-0 flex-col"
            >
              {/* Content text */}
              <p className="text-base sm:text-lg lg:text-xl text-textSecondary mb-4 max-w-3xl flex-shrink-0">
                {frameContent}
              </p>

              {/* Visualization area — takes remaining height and scrolls
                  internally (e.g. tall interactive simulators) so the frame
                  title above always stays in view. */}
              <div className="relative flex-1 min-h-0 overflow-y-auto">{children}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <nav
          className="fixed bottom-0 left-0 right-0 lg:left-64 bg-background/90 backdrop-blur-md border-t border-textMuted/20 py-4 z-10"
          aria-label={t('ui:frameNavAriaLabel')}
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
              aria-label={t('ui:previous')}
              aria-keyshortcuts="ArrowLeft"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">{t('ui:previous')}</span>
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-textMuted hidden sm:inline">
                {t('ui:keyboardHint', {
                  left: '←',
                  right: '→',
                  defaultValue: 'Press ← → to navigate',
                })}
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
                  ? 'bg-svid text-background hover:bg-opacity-90'
                  : 'bg-server text-white hover:bg-opacity-90'
              }`}
              aria-label={isLastFrame ? t('ui:complete') : t('ui:next')}
              aria-keyshortcuts="ArrowRight Space"
            >
              <span className="hidden sm:inline">
                {isLastFrame ? t('ui:complete') : t('ui:next')}
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
