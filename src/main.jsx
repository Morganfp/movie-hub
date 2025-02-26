// App.jsx
// Wraps the enstire app in strict mode
// Wraps the enstire app in the AuthProvider context to provide auth functions and user state

// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Compoennts
import App from './App.jsx';
// Contexts
import { AuthProvider } from './contexts/AuthContext.jsx';
// Styles
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
