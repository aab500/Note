import React from 'react';
import RedesignApp from './Redesigns';

function App() {
  if (/^\/[12]\/?$/.test(window.location.pathname)) {
    window.history.replaceState(null, '', '/');
  }

  return <RedesignApp />;
}

export default App;
