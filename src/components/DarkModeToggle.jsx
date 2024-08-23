import React from 'react';

function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button id="darkModeToggle" className="btn btn-secondary float-right" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;