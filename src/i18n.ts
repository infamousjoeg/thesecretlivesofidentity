import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Shared namespaces (module-independent)
import enUi from '@/locales/en/ui.json';
import enLanding from '@/locales/en/landing.json';
import ptBRUi from '@/locales/pt-BR/ui.json';
import ptBRLanding from '@/locales/pt-BR/landing.json';
import es419Ui from '@/locales/es-419/ui.json';
import es419Landing from '@/locales/es-419/landing.json';

// SPIFFE module namespaces
import enSpiffeContent from '@/locales/en/spiffe/content.json';
import enSpiffeFrames from '@/locales/en/spiffe/frames.json';
import enSpiffeTracks from '@/locales/en/spiffe/tracks.json';
import ptBRSpiffeContent from '@/locales/pt-BR/spiffe/content.json';
import ptBRSpiffeFrames from '@/locales/pt-BR/spiffe/frames.json';
import ptBRSpiffeTracks from '@/locales/pt-BR/spiffe/tracks.json';
import es419SpiffeContent from '@/locales/es-419/spiffe/content.json';
import es419SpiffeFrames from '@/locales/es-419/spiffe/frames.json';
import es419SpiffeTracks from '@/locales/es-419/spiffe/tracks.json';

// AI Agent Identity module namespaces
import enAgentsContent from '@/locales/en/agents/content.json';
import enAgentsFrames from '@/locales/en/agents/frames.json';
import enAgentsTracks from '@/locales/en/agents/tracks.json';
import ptBRAgentsContent from '@/locales/pt-BR/agents/content.json';
import ptBRAgentsFrames from '@/locales/pt-BR/agents/frames.json';
import ptBRAgentsTracks from '@/locales/pt-BR/agents/tracks.json';
import es419AgentsContent from '@/locales/es-419/agents/content.json';
import es419AgentsFrames from '@/locales/es-419/agents/frames.json';
import es419AgentsTracks from '@/locales/es-419/agents/tracks.json';

export const supportedLanguages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'es-419', label: 'Español', flag: '🇲🇽' },
] as const;

export type LanguageCode = (typeof supportedLanguages)[number]['code'];

/**
 * Namespace layout
 * - `ui`, `landing` are SHARED across every module.
 * - Each module owns three namespaces resolved from its `i18nPrefix`:
 *   `<prefix>-content`, `<prefix>-frames`, `<prefix>-tracks`.
 *   This keeps per-module keys (`1-1`, `frame1_1`, `bronze`) from colliding
 *   when a second module is registered.
 */
export const sharedNamespaces = ['ui', 'landing'] as const;
export const moduleNamespaceSuffixes = ['content', 'frames', 'tracks'] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        ui: enUi,
        landing: enLanding,
        'spiffe-content': enSpiffeContent,
        'spiffe-frames': enSpiffeFrames,
        'spiffe-tracks': enSpiffeTracks,
        'agents-content': enAgentsContent,
        'agents-frames': enAgentsFrames,
        'agents-tracks': enAgentsTracks,
      },
      'pt-BR': {
        ui: ptBRUi,
        landing: ptBRLanding,
        'spiffe-content': ptBRSpiffeContent,
        'spiffe-frames': ptBRSpiffeFrames,
        'spiffe-tracks': ptBRSpiffeTracks,
        'agents-content': ptBRAgentsContent,
        'agents-frames': ptBRAgentsFrames,
        'agents-tracks': ptBRAgentsTracks,
      },
      'es-419': {
        ui: es419Ui,
        landing: es419Landing,
        'spiffe-content': es419SpiffeContent,
        'spiffe-frames': es419SpiffeFrames,
        'spiffe-tracks': es419SpiffeTracks,
        'agents-content': es419AgentsContent,
        'agents-frames': es419AgentsFrames,
        'agents-tracks': es419AgentsTracks,
      },
    },
    fallbackLng: 'en',
    // Region-qualified codes: let a bare 'es'/'pt' (or es-ES/pt-PT) resolve to
    // our es-419/pt-BR bundles instead of silently falling back to English.
    supportedLngs: ['en', 'pt-BR', 'es-419'],
    nonExplicitSupportedLngs: true,
    load: 'all',
    defaultNS: 'ui',
    ns: [
      'ui',
      'landing',
      'spiffe-content',
      'spiffe-frames',
      'spiffe-tracks',
      'agents-content',
      'agents-frames',
      'agents-tracks',
    ],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'spiffe-language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Keep <html lang> in sync with the active language so screen readers use the
// correct pronunciation after a language switch (it starts hardcoded to "en").
const applyHtmlLang = (lng: string): void => {
  if (typeof document !== 'undefined' && lng) {
    document.documentElement.lang = lng;
  }
};
applyHtmlLang(i18n.resolvedLanguage || i18n.language || 'en');
i18n.on('languageChanged', applyHtmlLang);

export default i18n;
