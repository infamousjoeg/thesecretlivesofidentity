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
      },
      'pt-BR': {
        ui: ptBRUi,
        landing: ptBRLanding,
        'spiffe-content': ptBRSpiffeContent,
        'spiffe-frames': ptBRSpiffeFrames,
        'spiffe-tracks': ptBRSpiffeTracks,
      },
      'es-419': {
        ui: es419Ui,
        landing: es419Landing,
        'spiffe-content': es419SpiffeContent,
        'spiffe-frames': es419SpiffeFrames,
        'spiffe-tracks': es419SpiffeTracks,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'ui',
    ns: ['ui', 'landing', 'spiffe-content', 'spiffe-frames', 'spiffe-tracks'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'spiffe-language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
