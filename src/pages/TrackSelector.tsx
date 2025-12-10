import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, FileText, Target, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks';
import { tracks, trackOrder, type TrackId } from '@/content/tracks';

interface TrackCardProps {
  trackId: TrackId;
  index: number;
  isRecommended?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({ trackId, index, isRecommended }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const track = tracks[trackId];

  // Color schemes for each track
  const colorSchemes = {
    bronze: {
      gradient: 'from-amber-700/20 to-amber-900/10',
      border: 'border-amber-600/30 hover:border-amber-500/50',
      icon: 'text-amber-500',
      button: 'bg-amber-600 hover:bg-amber-500',
      glow: 'group-hover:shadow-amber-500/20',
    },
    silver: {
      gradient: 'from-slate-400/20 to-slate-600/10',
      border: 'border-slate-400/30 hover:border-slate-300/50',
      icon: 'text-slate-300',
      button: 'bg-slate-500 hover:bg-slate-400',
      glow: 'group-hover:shadow-slate-400/20',
    },
    gold: {
      gradient: 'from-yellow-500/20 to-yellow-700/10',
      border: 'border-yellow-500/30 hover:border-yellow-400/50',
      icon: 'text-yellow-400',
      button: 'bg-yellow-600 hover:bg-yellow-500',
      glow: 'group-hover:shadow-yellow-500/20',
    },
  };

  const scheme = colorSchemes[trackId];

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`
        group relative flex flex-col
        rounded-2xl border ${scheme.border}
        bg-gradient-to-br ${scheme.gradient}
        p-6 sm:p-8
        transition-all duration-300
        hover:scale-[1.02]
        ${scheme.glow} hover:shadow-xl
        cursor-pointer
      `}
      onClick={() => navigate(`/spiffe/${trackId}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/spiffe/${trackId}`);
        }
      }}
      aria-label={`${track.title} track: ${track.subtitle}. ${track.duration}, ${track.frames.length} frames`}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 text-xs font-medium bg-server text-white rounded-full whitespace-nowrap">
            Recommended
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={`text-5xl sm:text-6xl mb-4 ${scheme.icon}`}>
        {track.icon}
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-2xl sm:text-3xl font-display font-bold text-textPrimary mb-1">
        {track.title}
      </h3>
      <p className={`text-lg font-medium ${scheme.icon} mb-4`}>
        {track.subtitle}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-textSecondary mb-4">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{track.duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          <span>{track.frames.length} frames</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-textSecondary mb-4 flex-1">
        {track.description}
      </p>

      {/* Goal */}
      <div className="flex items-start gap-2 text-sm text-textMuted mb-6 bg-surface/50 rounded-lg p-3">
        <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span className="italic">&ldquo;{track.goal}&rdquo;</span>
      </div>

      {/* CTA Button */}
      <button
        className={`
          w-full py-3 px-4 rounded-lg
          ${scheme.button}
          text-white font-medium
          flex items-center justify-center gap-2
          transition-colors
          group-hover:gap-3
        `}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/spiffe/${trackId}`);
        }}
      >
        <span>Start {track.title}</span>
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

export const TrackSelector: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-textMuted/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-textSecondary hover:text-textPrimary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-textPrimary mb-4">
            Learn{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-server via-agent to-svid">
              SPIFFE
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-textSecondary max-w-2xl mx-auto">
            Choose your learning path based on how much time you have.
            Each track builds on the previous one.
          </p>
        </motion.div>

        {/* Track Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {trackOrder.map((trackId, index) => (
            <TrackCard
              key={trackId}
              trackId={trackId}
              index={index}
              isRecommended={trackId === 'silver'}
            />
          ))}
        </div>

        {/* Bottom hint */}
        <motion.p
          className="text-center text-textMuted text-sm mt-12"
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          You can switch tracks anytime. Progress is saved automatically.
        </motion.p>
      </main>
    </div>
  );
};
