import type React from 'react';

/**
 * AI Agent Identity module frame map (frameId -> component).
 *
 * Intentionally EMPTY during Phase B scaffolding: real frame components arrive
 * in Phase C. With no entries, `getFrameComponent('agents', id)` returns null
 * and the shared `PlaceholderFrame` renders, while the real frame title/body
 * text still come from the content data + `agents-content` i18n namespace.
 */
export const agentsFrames: Record<string, React.FC> = {};
