import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUi from '@/locales/en/ui.json';
import enLanding from '@/locales/en/landing.json';
import enTracks from '@/locales/en/tracks.json';
import enContent from '@/locales/en/content.json';
import enFrames from '@/locales/en/frames.json';

import ptBRUi from '@/locales/pt-BR/ui.json';
import ptBRLanding from '@/locales/pt-BR/landing.json';
import ptBRTracks from '@/locales/pt-BR/tracks.json';
import ptBRContent from '@/locales/pt-BR/content.json';
import ptBRFrames from '@/locales/pt-BR/frames.json';

import es419Ui from '@/locales/es-419/ui.json';
import es419Landing from '@/locales/es-419/landing.json';
import es419Tracks from '@/locales/es-419/tracks.json';
import es419Content from '@/locales/es-419/content.json';
import es419Frames from '@/locales/es-419/frames.json';

export const supportedLanguages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'es-419', label: 'Español', flag: '🇲🇽' },
] as const;

export type LanguageCode = (typeof supportedLanguages)[number]['code'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        ui: enUi,
        landing: enLanding,
        tracks: enTracks,
        content: enContent,
        frames: enFrames,
      },
      'pt-BR': {
        ui: ptBRUi,
        landing: ptBRLanding,
        tracks: ptBRTracks,
        content: ptBRContent,
        frames: ptBRFrames,
      },
      'es-419': {
        ui: es419Ui,
        landing: es419Landing,
        tracks: es419Tracks,
        content: es419Content,
        frames: es419Frames,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'ui',
    ns: ['ui', 'landing', 'tracks', 'content', 'frames'],
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
