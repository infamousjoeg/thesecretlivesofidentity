# Code Review — The Secret Lives of Identity (2026-07-22)

Full-codebase pass across 7 lenses: correctness, architecture, accessibility, performance, i18n, technical accuracy, newcomer clarity. Scope: 266 files, 155 frame components (95 SPIFFE + 60 agents). Findings ranked by leverage; check items off as issues/PRs land.

## Start here (ranked by leverage)

- [ ] **1. Ship the Agents module** — add a landing-page card linking `/agents`; copy + all 3 translations already exist (`landing.json`: `agentsTitle`/`agentsDescription`/`exploreAgents`/`liveBadge`, referenced by nothing). Doubles the site's content. §Agents
- [ ] **2. Fix the "Loading…" hang** — out-of-range frame URLs stick forever. Clamp `currentPosition`. §Bugs
- [ ] **3. Make "progress saved" true** — written to localStorage, never read; every track restarts at frame 1. Resume, or drop the claim. §Bugs
- [ ] **4. Define "workload" on first use** — the subject of every sentence, never defined. §Clarity
- [ ] **5. Code-split the bundle** — route + module + frame lazy-loading; lazy-load one language not three. §Perf
- [ ] **6. Un-blackbox the SVG for screen readers** + honor reduced-motion in entities. §A11y
- [ ] **7. Fix 4 SPIFFE accuracy slips** — X.509 "permanent", deprecated k8s_sat, Workload API, OIDC role. §Accuracy
- [ ] **8. Fix translated-locale highlighting** — stop `.split()`-ing translated strings on English phrases. §i18n
- [ ] **9. Delete the dead legacy subsystem** (~700–1000 LOC) + shrink the store. §Arch
- [ ] **10. Restore the quality gate** — `npm run lint` is broken (no ESLint flat config); tests ≈ 1 assertion. §Arch/§Testing

## Bugs

- [ ] **[High] Deep-link out-of-range → permanent "Loading…"** — `useTrackNavigation.ts:72`, `TrackFrame.tsx:70`. `parseInt-1` unclamped; `/spiffe/gold/0` → -1, `/9999` → undefined → stuck spinner. Fix: `Math.max(0, Math.min(parsed-1, total-1))` or redirect to nearest valid.
- [ ] **[High] "Progress saved automatically" is false** — `useTrackNavigation.ts:39`, `TrackSelector.tsx:23`. `saveProgress` writes, nothing reads `getSavedProgress`/`hasSavedProgress`; TrackSelector navigates to track root → always frame 1. Fix: build href with saved position, or remove code + copy.
- [ ] **[Med-High] Legacy `/spiffe/:section/:frame` drops position** — `ModuleVisualization.tsx:38`. Numeric routes redirect to gold frame 1; `legacyToGoldPosition` (`tracks.ts:171`) written but never called. Fix: wire it.
- [ ] **[High] Reduced-motion ignored in viz layer** — `src/components/entities/*`, `globals.css:88`. 0/17 entities use the hook; 22 run `repeat:Infinity` Framer loops (JS-driven — CSS media query doesn't stop them). Fix: each entity calls `useReducedMotion()` and freezes loops internally.
- [ ] **[Med] Phase timer resets on re-render** — `useAnimationPhase.ts`. Inline array-literal dep (~40 call sites) tears down pending `setTimeout` on re-render; `skipToEnd` fires `onComplete` without the `completedRef` guard. Fix: depend on `durations.join(',')`; guard `skipToEnd`.

## Agents module (the free win)

- [ ] **[BLOCKER] Surface Agents on the landing page** — `Landing.tsx` has no `/agents` card; module is 60 frames, content-complete, technically flawless, translated 100% into en/es-419/pt-BR, and already routable by URL. Copy exists unused in `landing.json`. `registeredModules()` is the intended data-driven hook. Mirror the SPIFFE `<section>`.
- [ ] **[Verify] Smoke-test** the `DelegationBuilder` (5-7) & `ConfusedDeputy` (8-4) simulators and the frame 9-4 external links before shipping.

## Accessibility & mobile

- [ ] **[Critical] SVG is opaque to screen readers** — `Stage.tsx:22`. `role="img" aria-label="Visualization stage"` collapses subtree; per-entity labels never exposed; all 149 frames announce the same string. Fix: per-frame `aria-label`/`<title>+<desc>` from i18n content; don't force `role="img"`.
- [ ] **[Critical] No touch nav; SVG text illegible on phones** — 800×500 viewBox at 11-16px → ~4-6px on mobile, no reflow; zero touch/swipe handlers. Fix: raise/min font sizes; add swipe (Framer `drag`/`onPanEnd`).
- [ ] **[High] a11y affordances stranded in dead code** — live progress bar lacks `role="progressbar"`/value semantics (the good one is in dead `ProgressBar.tsx`); `<h1>` outside the `aria-live` region; no focus move on frame change; completion modal isn't a real dialog (`TrackCompletion.tsx`). Fix: port ARIA to live shell; move+focus `<h1>`; proper dialog.
- [ ] **[High] Contrast failures** — "Complete" CTA white-on-gold ≈2.15:1; sim buttons ≈2.3:1; `textMuted` ≈3.72:1; primary blue ≈3.73:1. Fix: dark text on gold/green; lighten `textMuted` to ≥4.5:1.
- [ ] **[Low] `<html lang>` static across switch; language listbox keyboard semantics; <44px tap target; nested card buttons.**

## Performance, build & SEO

- [ ] **[Critical] Monolithic eager bundle** — `modules.ts:25` statically imports both frame barrels; landing page parses all 155 frames + both modules + Framer. Fix: (a) route `React.lazy`+Suspense, (b) per-module dynamic import, (c) per-frame `lazy()` in section maps.
- [ ] **[Critical] All 3 locales eager (~350 KB)** — `i18n.ts` static-imports 30 JSON files. Fix: lazy per-language + `loadNamespaces` on demand.
- [ ] **[High] No SEO infra** — no sitemap/robots/per-route title/OG image/canonical/JSON-LD; every route shares "…- SPIFFE". Fix: `react-helmet-async`, sitemap, robots, OG image, `Course`/`LearningResource` schema; consider prerender.
- [ ] **[Med] Build/headers/fonts** — no `manualChunks` (`vite.config.ts`); no CSP + no HTML cache header (`netlify.toml`); render-blocking Google Fonts (self-host with `@fontsource/*`, which also makes the dead `*.woff2` immutable rule real).

## Technical accuracy (SPIFFE)

- [ ] **[Med] X.509-SVID called "permanent badge"** — frame 2-12. They're short-lived/auto-rotated (contradicts 2-11, 5-11, §7). Fix: "both short-lived; certificate for mTLS vs token you carry through a proxy."
- [ ] **[Med] Deprecated `k8s_sat` shown co-equal to PSAT** — frame 8-7. Fix: PSAT is current; SAT is legacy/deprecated.
- [ ] **[Low] Workload API "a local Unix socket"** — frame 5-5. It's a gRPC API, typically over a UDS.
- [ ] **[Low] OIDC federation inverts SPIRE's role** — frame 8-11. SPIRE *runs* an OIDC Discovery Provider (acts as issuer) so cloud IAM can validate JWT-SVIDs.

## Clarity for newcomers

- [ ] **[Critical] "Workload" never defined** — `content.json` 1-9 etc; §1 swaps "services"→"workloads" silently. Fix: one grounding sentence at first use; keep the noun consistent.
- [ ] **[High] Bronze ends on caveats, then overclaims** — 2-13 "Metaphor Limits" → CTA "You now understand SPIFFE!"; never shows how an SVID is got/used; `fromZeroToExpert` may show 95 to a 24-frame learner. Fix: synthesis recap before CTA; track-scope the count; soften "expert."
- [ ] **[Med] Undefined jargon** — URI (2-3, before the email analogy), X.509/JWT (2-12), node (3-5, load-bearing §3-5). Fix: five-word plain-language aside on first use.
- [ ] **[Med] Competing "City Hall" metaphor (4-4) + inconsistent renewal cadence** (weekly/hourly/minutes across 2-11/2-13/7-4). Fix: recast platform as a "landlord" in the existing world; one cadence everywhere.

## i18n & code health

- [ ] **[High] Highlight-by-`.split('English phrase')` breaks in translation** — Frames 3_1, 3_3, 3_5, 2_6, 2_7. Emphasis silently vanishes in es-419/pt-BR. Fix: `{{marker}}` key or `<Trans>` with a `<strong>` component.
- [ ] **[High] Dead legacy nav subsystem + unused store slice ship** — `Frame.tsx`/`Navigation.tsx`/`ProgressBar`/`Header`/`Footer`/`useFrameNavigation`/`useKeyboardNav`/`AnimatedText`/`TransitionWrapper` (~700-1000 LOC); store's interactive-state slice + legacy nav actions have zero live callers. Fix: delete; prune barrels; shrink store. `tsc -b` makes it safe.
- [ ] **[Med] 155 near-boilerplate frames** — 149 share the same shell + a 61× `prefersReducedMotion ? :` ternary; each `sectionN/index.ts` triple-lists frames. Fix: `<FrameStage>` wrapper + `import.meta.glob` registries.
- [ ] **[Med] `npm run lint` broken** — eslint@9 installed, no flat `eslint.config.js`; react-hooks rules never run. Add config + `typecheck` script.
- [ ] **[Med] Stringly-typed frame registry** — `Record<string, FC>`; typo/rename → "Coming soon" in prod. Fix: derive `FrameId` union from content; type the map; smoke-test id resolution.
- [ ] **[Low] Dead exports** (`getFrameByGlobalIndex`, `getSectionById`, `legacyToGoldPosition`, several types). Add `knip`/`ts-prune`.
- [ ] **[Low] DevEntities (767 LOC) barrel-exported into prod** — lazy/dev-gate it.

## Testing & housekeeping

- [ ] **[Med] Suite ≈ 1 assertion** — one active Playwright spec + 5 skipped, Chromium only; `navigateToFrame` helper uses the redirecting legacy URL. Add: deep-link bounds, track boundaries/completion, progress resume, keyboard nav, legacy redirect, reduced-motion, unknown-route, agents smoke, "every content id resolves."
- [ ] **[Low] Repo `CLAUDE.md` stale URLs** — says `secretlivesofidentity.com/spiffe` + `github.com/secretlivesofidentity/spiffe`; real: `thesecretlivesofidentity.com`, `github.com/infamousjoeg`.

## Keep (strengths — protect these in refactors)

- Section 1's problem-first on-ramp (pager → leaked key → cascade → "shared secrets as identity").
- Strict TypeScript: zero `any`/`as any`/`@ts-ignore` across 266 files.
- Near-perfect i18n parity across 3 locales; agents translated before shipping.
- Concrete correct examples + honest acknowledgment of metaphor limits; the "is the private key just another secret?" objection (5-10/5-11).
