import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {ThemeCustomization} from './themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <ThemeCustomization>
          <App />
        </ThemeCustomization>
  </React.StrictMode>
);
