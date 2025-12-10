import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import { useSectionList, useFrameNavigation, useReducedMotion } from '@/hooks';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionList = useSectionList();
  const { currentSection, goToSection } = useFrameNavigation();
  const prefersReducedMotion = useReducedMotion();

  const handleSectionClick = (index: number) => {
    goToSection(index);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-40 p-2 bg-surface rounded-lg border border-textMuted/20 lg:hidden"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-textSecondary" />
        ) : (
          <Menu className="w-5 h-5 text-textSecondary" />
        )}
      </button>

      {/* Desktop sidebar */}
      <nav
        className="hidden lg:block fixed left-0 top-20 bottom-0 w-64 bg-surface/50 backdrop-blur-sm border-r border-textMuted/20 overflow-y-auto"
        aria-label="Section navigation"
      >
        <div className="p-4">
          <h2 className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-4">
            Sections
          </h2>
          <ul className="space-y-1">
            {sectionList.map((section, index) => (
              <li key={section.id}>
                <button
                  onClick={() => handleSectionClick(index)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                    currentSection === index
                      ? 'bg-server/20 text-server'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-surface'
                  }`}
                  aria-current={currentSection === index ? 'true' : undefined}
                >
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="flex-1 truncate">{section.title}</span>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      currentSection === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.nav
              className="fixed left-0 top-16 bottom-0 z-50 w-72 bg-surface border-r border-textMuted/20 overflow-y-auto lg:hidden"
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              aria-label="Section navigation"
            >
              <div className="p-4 pt-8">
                <h2 className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-4">
                  Sections
                </h2>
                <ul className="space-y-1">
                  {sectionList.map((section, index) => (
                    <li key={section.id}>
                      <button
                        onClick={() => handleSectionClick(index)}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                          currentSection === index
                            ? 'bg-server/20 text-server'
                            : 'text-textSecondary hover:text-textPrimary hover:bg-surface'
                        }`}
                      >
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-sm font-medium bg-textMuted/10 rounded">
                          {index + 1}
                        </span>
                        <span className="flex-1">{section.title}</span>
                        <span className="text-xs text-textMuted">
                          {section.frameCount} frames
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
