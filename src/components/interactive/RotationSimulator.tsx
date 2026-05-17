import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Badge, SpireAgent } from '@/components/entities';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

interface SVIDState {
  id: number;
  age: number;
  maxAge: number;
  status: 'active' | 'expiring' | 'expired';
}

/**
 * RotationSimulator - Interactive SVID rotation demonstration
 * Shows time-lapse of SVID lifecycle with speed controls
 */
export const RotationSimulator: React.FC = () => {
  const { t } = useTranslation('frames');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentSVID, setCurrentSVID] = useState<SVIDState>({
    id: 1,
    age: 0,
    maxAge: 60, // 60 "seconds" = 1 hour in real terms
    status: 'active',
  });
  const [rotationCount, setRotationCount] = useState(0);
  const [history, setHistory] = useState<{ time: number; event: string }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const ROTATION_THRESHOLD = 0.75; // Rotate at 75% of lifetime

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSVID(prev => {
          const newAge = prev.age + 1;
          const lifePercent = newAge / prev.maxAge;

          if (lifePercent >= ROTATION_THRESHOLD && prev.status === 'active') {
            setHistory(h => [...h, {
              time: newAge,
              event: t('rotationSimulator.eventRotationStarted', { id: prev.id, defaultValue: `SVID #${prev.id} rotation started` }),
            }]);
            return { ...prev, age: newAge, status: 'expiring' };
          }

          if (newAge >= prev.maxAge) {
            const newId = prev.id + 1;
            setRotationCount(c => c + 1);
            setHistory(h => [...h, {
              time: 0,
              event: t('rotationSimulator.eventIssued', { id: newId, defaultValue: `SVID #${newId} issued (fresh!)` }),
            }]);
            return { id: newId, age: 0, maxAge: 60, status: 'active' };
          }

          return { ...prev, age: newAge };
        });
      }, 1000 / speed);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isPlaying, speed, t]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentSVID({ id: 1, age: 0, maxAge: 60, status: 'active' });
    setRotationCount(0);
    setHistory([{ time: 0, event: t('rotationSimulator.eventInitial', { defaultValue: 'SVID #1 issued (initial)' }) }]);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const lifePercent = (currentSVID.age / currentSVID.maxAge) * 100;
  const timeRemaining = currentSVID.maxAge - currentSVID.age;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setHistory([{ time: 0, event: t('rotationSimulator.eventInitial', { defaultValue: 'SVID #1 issued (initial)' }) }]);
  }, [t]);

  return (
    <div className="w-full">
      {/* Speed controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="text-sm text-textMuted">
          {t('rotationSimulator.speedLabel', { defaultValue: 'Speed:' })}
        </span>
        {[1, 5, 10].map(s => (
          <button
            key={s}
            onClick={() => handleSpeedChange(s)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              speed === s
                ? 'bg-success text-white'
                : 'bg-surface border border-textMuted/30 text-textSecondary hover:border-textMuted/50'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* Visualization */}
      <Stage>
        <svg viewBox="0 0 800 350" className="w-full h-full">
          {/* SPIFFE ID (constant) */}
          <g transform="translate(100, 50)">
            <rect
              x={0}
              y={0}
              width={200}
              height={60}
              rx={8}
              fill={`${colors.success}15`}
              stroke={colors.success}
              strokeWidth={2}
            />
            <text
              x={100}
              y={25}
              textAnchor="middle"
              fill={colors.success}
              fontSize={12}
              fontWeight="bold"
            >
              {t('rotationSimulator.spiffeIdNeverChanges', { defaultValue: 'SPIFFE ID (Never changes)' })}
            </text>
            <text
              x={100}
              y={45}
              textAnchor="middle"
              fill={colors.textPrimary}
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
            >
              spiffe://acme/payment
            </text>
          </g>

          {/* Arrow */}
          <line
            x1={200}
            y1={120}
            x2={200}
            y2={160}
            stroke={colors.textMuted}
            strokeWidth={2}
            markerEnd="url(#rot-arrow)"
          />
          <defs>
            <marker
              id="rot-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L0,10 L10,5 z" fill={colors.textMuted} />
            </marker>
          </defs>

          {/* Current SVID */}
          <g transform="translate(100, 170)">
            <motion.rect
              x={0}
              y={0}
              width={200}
              height={100}
              rx={8}
              fill={
                currentSVID.status === 'active'
                  ? `${colors.svid}15`
                  : `${colors.attacker}15`
              }
              stroke={
                currentSVID.status === 'active'
                  ? colors.svid
                  : colors.attacker
              }
              strokeWidth={2}
              animate={
                currentSVID.status === 'expiring' && !prefersReducedMotion
                  ? { opacity: [1, 0.5, 1] }
                  : { opacity: 1 }
              }
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <text
              x={100}
              y={25}
              textAnchor="middle"
              fill={colors.textPrimary}
              fontSize={12}
              fontWeight="bold"
            >
              SVID #{currentSVID.id}
            </text>

            {/* Progress bar */}
            <rect
              x={20}
              y={45}
              width={160}
              height={8}
              rx={4}
              fill={colors.surface}
            />
            <motion.rect
              x={20}
              y={45}
              width={160 * (lifePercent / 100)}
              height={8}
              rx={4}
              fill={
                lifePercent < 50
                  ? colors.success
                  : lifePercent < 75
                  ? colors.svid
                  : colors.attacker
              }
            />

            <text
              x={100}
              y={75}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={11}
            >
              {currentSVID.status === 'expiring'
                ? t('rotationSimulator.rotating', { defaultValue: 'Rotating...' })
                : t('rotationSimulator.percentUsed', { percent: Math.round(lifePercent), defaultValue: `${Math.round(lifePercent)}% used` })}
            </text>
            <text
              x={100}
              y={92}
              textAnchor="middle"
              fill={colors.textMuted}
              fontSize={10}
            >
              {t('rotationSimulator.expiresIn', { time: formatTime(timeRemaining), defaultValue: `Expires in: ${formatTime(timeRemaining)}` })}
            </text>
          </g>

          {/* SPIRE Agent */}
          <SpireAgent
            label={t('rotationSimulator.agentLabel', { defaultValue: 'Agent' })}
            position={{ x: 400, y: 220 }}
            size={60}
            active={true}
            animate={!prefersReducedMotion && isPlaying}
          />

          {/* New SVID being prepared */}
          {currentSVID.status === 'expiring' && (
            <motion.g
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge
                spiffeId="new"
                position={{ x: 550, y: 220 }}
                state="valid"
                size={50}
                animate={!prefersReducedMotion}
              />
              <text
                x={550}
                y={280}
                textAnchor="middle"
                fill={colors.success}
                fontSize={11}
                fontWeight="bold"
              >
                {t('rotationSimulator.freshSVIDReady', { defaultValue: 'Fresh SVID ready!' })}
              </text>
            </motion.g>
          )}

          {/* Stats */}
          <g transform="translate(500, 50)">
            <text
              x={0}
              y={0}
              fill={colors.textPrimary}
              fontSize={14}
              fontWeight="bold"
            >
              {t('rotationSimulator.rotationStats', { defaultValue: 'Rotation Stats' })}
            </text>
            <text x={0} y={25} fill={colors.textSecondary} fontSize={12}>
              {t('rotationSimulator.rotationsCount', { count: rotationCount, defaultValue: `Rotations: ${rotationCount}` })}
            </text>
            <text x={0} y={45} fill={colors.textSecondary} fontSize={12}>
              {t('rotationSimulator.currentSVID', { id: currentSVID.id, defaultValue: `Current SVID: #${currentSVID.id}` })}
            </text>
            <text x={0} y={65} fill={colors.success} fontSize={12}>
              {t('rotationSimulator.spiffeIdUnchanged', { defaultValue: 'SPIFFE ID: unchanged ✓' })}
            </text>
          </g>

          {/* Event log */}
          <g transform="translate(500, 130)">
            <text
              x={0}
              y={0}
              fill={colors.textPrimary}
              fontSize={12}
              fontWeight="bold"
            >
              {t('rotationSimulator.eventLog', { defaultValue: 'Event Log' })}
            </text>
            {history.slice(-4).map((h, i) => (
              <text
                key={i}
                x={0}
                y={20 + i * 16}
                fill={colors.textMuted}
                fontSize={10}
              >
                • {h.event}
              </text>
            ))}
          </g>
        </svg>
      </Stage>

      {/* Key insight */}
      <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded-lg">
        <p className="text-sm text-success font-medium text-center">
          {t('rotationSimulator.keyInsight', { defaultValue: '💡 The SPIFFE ID never changes—only the SVID rotates automatically!' })}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePlayPause}
          className="px-6 py-2 bg-success text-white rounded-lg font-medium hover:bg-success/90"
        >
          {isPlaying
            ? t('rotationSimulator.pause', { defaultValue: '⏸ Pause' })
            : t('rotationSimulator.play', { defaultValue: '▶ Play' })}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-surface border border-textMuted/30 text-textSecondary rounded-lg font-medium hover:border-textMuted/50"
        >
          {t('rotationSimulator.reset', { defaultValue: '↺ Reset' })}
        </button>
      </div>
    </div>
  );
};
