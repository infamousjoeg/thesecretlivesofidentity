import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing, SpiffeVisualization, TrackSelector, DevEntities } from '@/pages';
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

        {/* SPIFFE Track Selector */}
        <Route path="/spiffe" element={<TrackSelector />} />

        {/* SPIFFE Track Routes */}
        <Route path="/spiffe/bronze" element={<SpiffeVisualization />} />
        <Route path="/spiffe/bronze/:frameIndex" element={<SpiffeVisualization />} />
        <Route path="/spiffe/silver" element={<SpiffeVisualization />} />
        <Route path="/spiffe/silver/:frameIndex" element={<SpiffeVisualization />} />
        <Route path="/spiffe/gold" element={<SpiffeVisualization />} />
        <Route path="/spiffe/gold/:frameIndex" element={<SpiffeVisualization />} />

        {/* Legacy route: redirect /spiffe/:section/:frame to gold track */}
        <Route path="/spiffe/:section/:frame" element={<Navigate to="/spiffe/gold" replace />} />

        {/* Development-only entity showcase */}
        {import.meta.env.DEV && (
          <Route path="/dev/entities" element={<DevEntities />} />
        )}

        {/* Redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
