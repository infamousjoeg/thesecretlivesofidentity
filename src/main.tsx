import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import { App } from './App';
import './styles/globals.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* reducedMotion="user" makes every Framer animation honor the OS
        prefers-reduced-motion setting: transform/scale/position loops are
        disabled for those users (the vestibular-safety concern), while
        opacity stays — the accessibility-recommended behavior. This gates the
        entities' infinite animations without touching each component. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
);
