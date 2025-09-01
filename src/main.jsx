import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Import i18n configuration
import './i18n/i18n';
// Import language selector styles
import './assets/css/language-selector.css';
// Import global text selection control
import './assets/css/global-text-selection.css';
// Import Language Provider
import { LanguageProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);