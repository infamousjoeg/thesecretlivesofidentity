import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Principal, PermissionSlip, Verifier, ToolResource } from '@/components/entities/agents';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

interface ScopeDef {
  id: string;
  label: string;
}

/**
 * DelegationBuilder — interactive that makes scope-narrowing down a delegation
 * chain tangible. A Principal grants a slip to an Agent, who sub-delegates to a
 * Sub-Agent. At each hop the learner can only REMOVE scopes — never add — so
 * "you cannot grant what you don't have" is enforced by the controls themselves
 * (scopes the Agent already dropped are locked/greyed at the Sub-Agent hop).
 *
 * The Sub-Agent then presents the final slip at a ToolResource via a Verifier.
 * Clicking an action attempts it at the tool: ACCEPT (in scope) or REJECT
 * (narrowed away), driven by the remaining scope + the slip's audience.
 */
export const DelegationBuilder: React.FC = () => {
  const { t } = useTranslation('agents-frames');
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const SCOPES: ScopeDef[] = [
    { id: 'read', label: t('delegationBuilder.scopeRead', { defaultValue: 'Read calendar' }) },
    { id: 'invite', label: t('delegationBuilder.scopeInvite', { defaultValue: 'Send invite' }) },
    { id: 'notes', label: t('delegationBuilder.scopeNotes', { defaultValue: 'Add notes' }) },
    { id: 'delete', label: t('delegationBuilder.scopeDelete', { defaultValue: 'Delete event' }) },
  ];
  const ALL = SCOPES.map((s) => s.id);
  const AUDIENCE = 'calendar-api';

  const [agentScopes, setAgentScopes] = useState<string[]>(ALL);
  const [subScopes, setSubScopes] = useState<string[]>(ALL);
  const [attempted, setAttempted] = useState<string | null>(null);

  const labelsFor = (ids: string[]) => SCOPES.filter((s) => ids.includes(s.id)).map((s) => s.label);
  const labelOf = (id: string) => SCOPES.find((s) => s.id === id)?.label ?? id;

  // Hop 1 (Principal -> Agent): principal holds everything, so any subset is a
  // valid narrowing — toggling on/off is allowed here.
  const toggleAgent = (id: string) => {
    setAttempted(null);
    setAgentScopes((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((s) => s !== id) : [...prev, id];
      // The Sub-Agent can never hold a scope the Agent just dropped.
      if (has) setSubScopes((sub) => sub.filter((s) => s !== id));
      return next;
    });
  };

  // Hop 2 (Agent -> Sub-Agent): can only toggle scopes the Agent actually holds.
  const toggleSub = (id: string) => {
    if (!agentScopes.includes(id)) return; // cannot grant what the Agent lacks
    setAttempted(null);
    setSubScopes((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const reset = () => {
    setAgentScopes(ALL);
    setSubScopes(ALL);
    setAttempted(null);
  };

  const allowed = attempted ? subScopes.includes(attempted) : null;
  const verifierState = attempted == null ? 'idle' : allowed ? 'accept' : 'reject';
  const toolUnlocked = attempted != null && allowed === true;

  const agentNarrowed = agentScopes.length < ALL.length;

  return (
    // On a laptop (lg+) fill the height the track frame gives us and lay out as
    // a column: the diagram flexes (and scales down) to fit while the controls
    // keep their compact natural height, so the whole simulator fits WITHOUT
    // internal scroll. On narrow screens the controls stack tall, so we drop the
    // height clamp and let the page scroll naturally (the diagram stays full-size
    // instead of collapsing).
    <div className="w-full lg:h-full flex flex-col min-h-0">
      {/* Chain visualization — flexes to fill the space left by the controls */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
      <Stage width={800} height={330}>
        <svg viewBox="0 0 800 320" className="w-full h-full">
          <defs>
            <marker id="db-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill={colors.textMuted} />
            </marker>
          </defs>

          {/* connectors */}
          <line x1={98} y1={150} x2={172} y2={150} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#db-arrow)" opacity={0.6} />
          <line x1={298} y1={150} x2={352} y2={150} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#db-arrow)" opacity={0.6} />
          <line
            x1={470}
            y1={150}
            x2={548}
            y2={150}
            stroke={attempted == null ? colors.textMuted : allowed ? colors.success : colors.attacker}
            strokeWidth={2}
            strokeDasharray="6 6"
            markerEnd="url(#db-arrow)"
            opacity={0.7}
          />
          <line x1={628} y1={150} x2={678} y2={150} stroke={colors.textMuted} strokeWidth={2} markerEnd="url(#db-arrow)" opacity={0.6} />

          {/* Principal */}
          <Principal position={{ x: 60, y: 145 }} size={70} active label={t('delegationBuilder.principalLabel', { defaultValue: 'You (Principal)' })} animate={animate} />

          {/* Agent slip */}
          <PermissionSlip
            position={{ x: 235, y: 150 }}
            size={110}
            state="valid"
            narrowed={agentNarrowed}
            onBehalfOf={t('delegationBuilder.onBehalfOf', { defaultValue: 'Alex (you)' })}
            actor={t('delegationBuilder.actorAgent', { defaultValue: 'Agent' })}
            scopes={labelsFor(agentScopes)}
            revokedScopes={labelsFor(ALL.filter((id) => !agentScopes.includes(id)))}
            audience={AUDIENCE}
            showCountdown={false}
            animate={animate}
          />

          {/* Sub-Agent slip */}
          <PermissionSlip
            position={{ x: 410, y: 150 }}
            size={104}
            state="valid"
            narrowed
            onBehalfOf={t('delegationBuilder.onBehalfOf', { defaultValue: 'Alex (you)' })}
            actor={t('delegationBuilder.actorSub', { defaultValue: 'Sub-Agent' })}
            scopes={labelsFor(subScopes)}
            revokedScopes={labelsFor(agentScopes.filter((id) => !subScopes.includes(id)))}
            audience={AUDIENCE}
            showCountdown={false}
            animate={animate}
          />

          {/* Verifier */}
          <Verifier position={{ x: 588, y: 148 }} size={78} state={verifierState} label={t('delegationBuilder.verifierLabel', { defaultValue: 'Verifier' })} animate={animate} />

          {/* Tool */}
          <ToolResource position={{ x: 725, y: 148 }} size={74} kind="MCP" label={t('delegationBuilder.toolLabel', { defaultValue: 'Calendar API' })} locked={!toolUnlocked} animate={animate} />
        </svg>
      </Stage>
      </div>

      {/* Hop controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 flex-shrink-0">
        {/* Hop 1 */}
        <fieldset className="rounded-lg border border-textMuted/30 p-2.5" style={{ backgroundColor: colors.surface }}>
          <legend className="px-2 text-xs font-semibold" style={{ color: colors.textSecondary }}>
            {t('delegationBuilder.hop1Legend', { defaultValue: 'Hop 1 · You → Agent (remove scopes)' })}
          </legend>
          <div className="flex flex-col gap-1">
            {SCOPES.map((s) => {
              const kept = agentScopes.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleAgent(s.id)}
                  aria-pressed={kept}
                  aria-label={t('delegationBuilder.toggleAgentAria', { scope: s.label, defaultValue: `Agent scope ${s.label}, ${kept ? 'granted' : 'removed'}` })}
                  className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    kept ? 'text-textPrimary' : 'text-textMuted line-through'
                  }`}
                  style={{ backgroundColor: kept ? `${colors.permissionSlip}22` : 'transparent', border: `1px solid ${kept ? colors.permissionSlip : colors.textMuted}55` }}
                >
                  <span>{s.label}</span>
                  <span aria-hidden>{kept ? '✓' : '✕'}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Hop 2 */}
        <fieldset className="rounded-lg border border-textMuted/30 p-2.5" style={{ backgroundColor: colors.surface }}>
          <legend className="px-2 text-xs font-semibold" style={{ color: colors.textSecondary }}>
            {t('delegationBuilder.hop2Legend', { defaultValue: 'Hop 2 · Agent → Sub-Agent (remove scopes)' })}
          </legend>
          <div className="flex flex-col gap-1">
            {SCOPES.map((s) => {
              const agentHas = agentScopes.includes(s.id);
              const kept = subScopes.includes(s.id);
              if (!agentHas) {
                return (
                  <div
                    key={s.id}
                    aria-label={t('delegationBuilder.lockedAria', { scope: s.label, defaultValue: `${s.label} unavailable: the Agent does not hold it` })}
                    className="flex items-center justify-between rounded-md px-3 py-1.5 text-sm cursor-not-allowed opacity-60"
                    style={{ border: `1px dashed ${colors.textMuted}55`, color: colors.textMuted }}
                    title={t('delegationBuilder.lockedTitle', { defaultValue: "Agent doesn't have this: cannot grant" })}
                  >
                    <span className="line-through">{s.label}</span>
                    <span aria-hidden>🔒</span>
                  </div>
                );
              }
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleSub(s.id)}
                  aria-pressed={kept}
                  aria-label={t('delegationBuilder.toggleSubAria', { scope: s.label, defaultValue: `Sub-Agent scope ${s.label}, ${kept ? 'granted' : 'removed'}` })}
                  className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    kept ? 'text-textPrimary' : 'text-textMuted line-through'
                  }`}
                  style={{ backgroundColor: kept ? `${colors.subAgent}22` : 'transparent', border: `1px solid ${kept ? colors.subAgent : colors.textMuted}55` }}
                >
                  <span>{s.label}</span>
                  <span aria-hidden>{kept ? '✓' : '✕'}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Attempt actions at the tool */}
      <div className="mt-3 flex-shrink-0">
        <p className="text-xs font-semibold mb-2" style={{ color: colors.textSecondary }}>
          {t('delegationBuilder.attemptPrompt', { defaultValue: 'Sub-Agent presents the slip. Attempt an action at the tool:' })}
        </p>
        <div className="flex flex-wrap gap-2">
          {SCOPES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setAttempted(s.id)}
              aria-pressed={attempted === s.id}
              className="px-3 py-2 rounded-lg text-sm font-medium border transition-colors"
              style={{
                backgroundColor: attempted === s.id ? `${colors.verifier}33` : colors.surface,
                borderColor: attempted === s.id ? colors.verifier : `${colors.textMuted}55`,
                color: colors.textPrimary,
              }}
            >
              {t('delegationBuilder.tryAction', { action: s.label, defaultValue: `Try: ${s.label}` })}
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="px-3 py-2 rounded-lg text-sm font-medium border ml-auto"
            style={{ backgroundColor: colors.surface, borderColor: `${colors.textMuted}55`, color: colors.textSecondary }}
          >
            {t('delegationBuilder.reset', { defaultValue: 'Reset' })}
          </button>
        </div>
      </div>

      {/* Feedback */}
      <motion.div
        key={attempted ?? 'none'}
        initial={animate ? { opacity: 0, y: 6 } : { opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 rounded-lg p-2.5 text-sm flex-shrink-0"
        style={{
          backgroundColor: attempted == null ? colors.surface : allowed ? `${colors.success}1A` : `${colors.attacker}1A`,
          border: `1px solid ${attempted == null ? `${colors.textMuted}40` : allowed ? colors.success : colors.attacker}`,
          color: colors.textPrimary,
        }}
        aria-live="polite"
      >
        {attempted == null
          ? t('delegationBuilder.feedbackIdle', { defaultValue: 'Narrow the slip down the chain, then attempt an action. Authority can only shrink, never grow.' })
          : allowed
          ? t('delegationBuilder.feedbackAccept', { action: labelOf(attempted), defaultValue: `✓ "${labelOf(attempted)}" accepted: it is still in the final slip's scope, and the slip is stamped for ${AUDIENCE}.` })
          : t('delegationBuilder.feedbackReject', { action: labelOf(attempted), defaultValue: `✗ "${labelOf(attempted)}" rejected: it was narrowed out of the slip. The Sub-Agent literally cannot do what it was never granted.` })}
      </motion.div>
    </div>
  );
};
