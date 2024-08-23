// GeneratedText.jsx

import React from 'react';

function GeneratedText({ generatedText, setGeneratedText }) {
  const handleTextChange = (e) => {
    setGeneratedText(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="form-group">
      <label htmlFor="generatedText">Generated Text:</label>
      <textarea
        className="form-control large-textarea"
        id="generatedText"
        rows="6"
        value={generatedText}
        onChange={handleTextChange}
      />
      <div className="mt-2">
        <button id="copyText" className="btn btn-primary mr-2" onClick={handleCopy}>Copy</button>
        <button id="refreshPage" className="btn btn-secondary mr-2" onClick={handleRefresh}>Refresh</button>
      </div>
    </div>
  );
}

export default GeneratedText;