import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing, ModuleVisualization, TrackSelector, DevEntities } from '@/pages';
import { LanguageSelector } from '@/components/layout/LanguageSelector';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="fixed top-4 right-4 z-[100]">
        <LanguageSelector />
      </div>
      <Routes>
        {/* Landing page (series overview) */}
        <Route path="/" element={<Landing />} />

        {/* Development-only entity showcase (declared before the dynamic
            module routes so it is not captured as a module). */}
        {import.meta.env.DEV && (
          <Route path="/dev/entities" element={<DevEntities />} />
        )}

        {/* Module track selector, e.g. /spiffe. Validity is checked in the
            page itself (unknown module -> redirect to landing). */}
        <Route path="/:module" element={<TrackSelector />} />

        {/* Module track routes: /:module/:track/:frameIndex?
            ModuleVisualization validates the module + track and handles the
            legacy /spiffe/:section/:frame numeric form (-> gold). */}
        <Route path="/:module/:track" element={<ModuleVisualization />} />
        <Route path="/:module/:track/:frameIndex" element={<ModuleVisualization />} />

        {/* Redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
