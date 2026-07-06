import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { PermissionSlip, Verifier, ToolResource } from '@/components/entities/agents';
import { Attacker } from '@/components/entities';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

type Breadth = 'broad' | 'narrow';
type SlipStatus = 'valid' | 'expired' | 'revoked';

/**
 * ConfusedDeputy — interactive that teaches the confused-deputy failure and how
 * scope / audience binding (and short lifetimes / revocation) prevent it.
 *
 * The learner sets the Agent's slip to OVER-BROAD or NARROW (and optionally
 * expired / revoked), then fires a malicious "delete all records" instruction
 * whispered by an Attacker. The Verifier ACCEPTS (damage) only when a still-valid
 * slip actually granted the destructive scope; otherwise it REJECTS and the
 * tool stays safe — the agent isn't evil, its slip just refuses to over-reach.
 */
export const ConfusedDeputy: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const [breadth, setBreadth] = useState<Breadth>('narrow');
  const [status, setStatus] = useState<SlipStatus>('valid');
  const [fired, setFired] = useState(false);

  // The malicious instruction asks the agent to DELETE. A broad, still-valid
  // slip grants it (confused deputy); anything else is refused.
  const allowed = fired && breadth === 'broad' && status === 'valid';
  const blocked = fired && !allowed;

  const slipState = status === 'expired' ? 'expired' : 'valid';
  const broadScopes = [
    t('confusedDeputy.scopeRead', { defaultValue: 'Read records' }),
    t('confusedDeputy.scopeWrite', { defaultValue: 'Write records' }),
    t('confusedDeputy.scopeDelete', { defaultValue: 'Delete records' }),
  ];
  const narrowScopes = [t('confusedDeputy.scopeRead', { defaultValue: 'Read records' })];
  const narrowRevoked = [
    t('confusedDeputy.scopeWrite', { defaultValue: 'Write records' }),
    t('confusedDeputy.scopeDelete', { defaultValue: 'Delete records' }),
  ];

  const verifierState = !fired ? 'idle' : allowed ? 'accept' : 'reject';

  const setBreadthSafe = (b: Breadth) => {
    setBreadth(b);
    setFired(false);
  };
  const setStatusSafe = (s: SlipStatus) => {
    setStatus(s);
    setFired(false);
  };
  const reset = () => {
    setBreadth('narrow');
    setStatus('valid');
    setFired(false);
  };

  const feedback = () => {
    if (!fired) {
      return t('confusedDeputy.feedbackIdle', {
        defaultValue: 'Set the slip, then fire the malicious "delete all records" instruction and watch the verifier.',
      });
    }
    if (status === 'expired') {
      return t('confusedDeputy.feedbackExpired', {
        defaultValue: '✓ Blocked. The slip has expired, so the verifier rejects it whatever the instruction. Short lifetimes cap the damage.',
      });
    }
    if (status === 'revoked') {
      return t('confusedDeputy.feedbackRevoked', {
        defaultValue: '✓ Blocked. The slip was revoked, so the verifier rejects it immediately: access was cut before expiry.',
      });
    }
    if (breadth === 'broad') {
      return t('confusedDeputy.feedbackDamage', {
        defaultValue: '✗ Confused deputy! The over-broad slip granted "Delete records", so the verifier accepted the malicious instruction and the data was destroyed. The agent was tricked: its slip betrayed it.',
      });
    }
    return t('confusedDeputy.feedbackBlocked', {
      defaultValue: '✓ Blocked. The narrow slip never granted "Delete records", so even though the agent was tricked, the verifier refused. Tight scope is the defense.',
    });
  };

  const segBtn = (active: boolean, danger?: boolean) => ({
    backgroundColor: active ? (danger ? `${colors.attacker}33` : `${colors.verifier}33`) : colors.surface,
    borderColor: active ? (danger ? colors.attacker : colors.verifier) : `${colors.textMuted}55`,
    color: colors.textPrimary,
  });

  return (
    // On a laptop (lg+) fill the height the track frame gives us: the scene
    // flexes (and scales down) to fit while the controls keep their compact
    // natural height, so the whole simulator fits WITHOUT internal scroll. On
    // narrow screens the controls stack tall, so we drop the height clamp and
    // let the page scroll naturally (the scene stays full-size, not collapsed).
    <div className="w-full lg:h-full flex flex-col min-h-0">
      {/* Scene — flexes to fill the space left by the controls */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
      <Stage width={800} height={330}>
        <svg viewBox="0 0 800 320" className="w-full h-full">
          <defs>
            <marker id="cd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill={colors.textMuted} />
            </marker>
          </defs>

          {/* Attacker whispering a malicious instruction */}
          <Attacker position={{ x: 95, y: 150 }} size={64} label={t('confusedDeputy.attackerLabel', { defaultValue: 'Malicious input' })} blocked={blocked} animate={animate} />

          {/* whisper bubble */}
          <AnimatePresence>
            {fired && (
              <motion.g
                key="whisper"
                initial={animate ? { opacity: 0, y: -6 } : { opacity: 1 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <rect x={40} y={56} width={150} height={34} rx={8} fill={colors.surface} stroke={colors.attacker} strokeWidth={1.5} />
                <text x={115} y={77} textAnchor="middle" fill={colors.attacker} fontSize={11} fontWeight="bold" fontFamily="IBM Plex Sans, sans-serif">
                  {t('confusedDeputy.whisper', { defaultValue: '“Also delete all records!”' })}
                </text>
                <path d={`M 95 90 l 8 10 l 8 -10 z`} fill={colors.surface} stroke={colors.attacker} strokeWidth={1.5} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* connectors */}
          <line x1={150} y1={150} x2={206} y2={150} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#cd-arrow)" opacity={0.6} />
          <line
            x1={368}
            y1={150}
            x2={462}
            y2={150}
            stroke={!fired ? colors.textMuted : allowed ? colors.success : colors.attacker}
            strokeWidth={2}
            strokeDasharray="6 6"
            markerEnd="url(#cd-arrow)"
            opacity={0.7}
          />
          <line x1={566} y1={150} x2={636} y2={150} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#cd-arrow)" opacity={0.6} />

          {/* The agent's slip */}
          <PermissionSlip
            position={{ x: 290, y: 152 }}
            size={132}
            state={slipState}
            narrowed={breadth === 'narrow'}
            onBehalfOf={t('confusedDeputy.onBehalfOf', { defaultValue: 'Alex (you)' })}
            actor={t('confusedDeputy.actor', { defaultValue: 'Agent' })}
            scopes={breadth === 'broad' ? broadScopes : narrowScopes}
            revokedScopes={breadth === 'broad' ? [] : narrowRevoked}
            audience="db-api"
            showCountdown={false}
            animate={animate}
          />

          {/* REVOKED stamp overlay */}
          {status === 'revoked' && (
            <g transform="translate(290, 152) rotate(-14)">
              <rect x={-44} y={-14} width={88} height={28} rx={3} fill="none" stroke={colors.attacker} strokeWidth={3} opacity={0.9} />
              <text x={0} y={6} textAnchor="middle" fill={colors.attacker} fontSize={15} fontWeight="bold" fontFamily="Space Grotesk, sans-serif" opacity={0.9}>
                {t('confusedDeputy.revokedStamp', { defaultValue: 'REVOKED' })}
              </text>
            </g>
          )}

          {/* Verifier */}
          <Verifier position={{ x: 514, y: 148 }} size={84} state={verifierState} label={t('confusedDeputy.verifierLabel', { defaultValue: 'Verifier' })} animate={animate} />

          {/* Tool */}
          <ToolResource
            position={{ x: 700, y: 148 }}
            size={80}
            kind="DB"
            label={allowed ? t('confusedDeputy.toolDamaged', { defaultValue: 'Records (DAMAGED)' }) : t('confusedDeputy.toolSafe', { defaultValue: 'Records (safe)' })}
            locked={!allowed}
            animate={animate}
          />
        </svg>
      </Stage>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 flex-shrink-0">
        {/* Breadth */}
        <fieldset className="rounded-lg border border-textMuted/30 p-2.5" style={{ backgroundColor: colors.surface }}>
          <legend className="px-2 text-xs font-semibold" style={{ color: colors.textSecondary }}>
            {t('confusedDeputy.breadthLegend', { defaultValue: 'Slip scope' })}
          </legend>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setBreadthSafe('broad')}
              aria-pressed={breadth === 'broad'}
              className="flex-1 px-3 py-2 rounded-md text-sm font-medium border transition-colors"
              style={segBtn(breadth === 'broad', true)}
            >
              {t('confusedDeputy.broadBtn', { defaultValue: '⚠ Over-broad' })}
            </button>
            <button
              type="button"
              onClick={() => setBreadthSafe('narrow')}
              aria-pressed={breadth === 'narrow'}
              className="flex-1 px-3 py-2 rounded-md text-sm font-medium border transition-colors"
              style={segBtn(breadth === 'narrow')}
            >
              {t('confusedDeputy.narrowBtn', { defaultValue: '✓ Narrow' })}
            </button>
          </div>
        </fieldset>

        {/* Status */}
        <fieldset className="rounded-lg border border-textMuted/30 p-2.5" style={{ backgroundColor: colors.surface }}>
          <legend className="px-2 text-xs font-semibold" style={{ color: colors.textSecondary }}>
            {t('confusedDeputy.statusLegend', { defaultValue: 'Slip status' })}
          </legend>
          <div className="flex gap-2">
            {(['valid', 'expired', 'revoked'] as SlipStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusSafe(s)}
                aria-pressed={status === s}
                className="flex-1 px-3 py-2 rounded-md text-sm font-medium border transition-colors"
                style={segBtn(status === s, s !== 'valid')}
              >
                {s === 'valid'
                  ? t('confusedDeputy.statusValid', { defaultValue: 'Valid' })
                  : s === 'expired'
                  ? t('confusedDeputy.statusExpired', { defaultValue: 'Expired' })
                  : t('confusedDeputy.statusRevoked', { defaultValue: 'Revoked' })}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Fire / reset */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center flex-shrink-0">
        <button
          type="button"
          onClick={() => setFired(true)}
          disabled={fired}
          className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: colors.attacker }}
        >
          {t('confusedDeputy.fireBtn', { defaultValue: '⚡ Fire malicious request' })}
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg text-sm font-medium border"
          style={{ backgroundColor: colors.surface, borderColor: `${colors.textMuted}55`, color: colors.textSecondary }}
        >
          {t('confusedDeputy.reset', { defaultValue: 'Reset' })}
        </button>
      </div>

      {/* Feedback */}
      <motion.div
        key={`${fired}-${breadth}-${status}`}
        initial={animate ? { opacity: 0, y: 6 } : { opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 rounded-lg p-2.5 text-sm flex-shrink-0"
        style={{
          backgroundColor: !fired ? colors.surface : allowed ? `${colors.attacker}1A` : `${colors.success}1A`,
          border: `1px solid ${!fired ? `${colors.textMuted}40` : allowed ? colors.attacker : colors.success}`,
          color: colors.textPrimary,
        }}
        aria-live="polite"
      >
        {feedback()}
      </motion.div>
    </div>
  );
};
