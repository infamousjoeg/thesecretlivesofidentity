import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { supportedLanguages, type LanguageCode } from '@/i18n';

export const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation('ui');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = supportedLanguages.find(
    (l) => l.code === i18n.language || i18n.language.startsWith(l.code.split('-')[0])
  ) ?? supportedLanguages[0];

  const changeLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm text-textSecondary hover:text-textPrimary transition-colors px-2 py-1 rounded-md hover:bg-surface"
        aria-label={t('chooseLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang.flag} {currentLang.label}</span>
        <span className="sm:hidden">{currentLang.flag}</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={t('chooseLanguage')}
          className="absolute right-0 top-full mt-1 w-40 rounded-lg bg-surface border border-textMuted/20 shadow-lg overflow-hidden z-50"
        >
          {supportedLanguages.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === currentLang.code}>
              <button
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                  lang.code === currentLang.code
                    ? 'bg-server/20 text-server font-medium'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-surface/80'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
