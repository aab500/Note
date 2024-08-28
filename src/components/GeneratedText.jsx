// GeneratedText.jsx

import React from 'react';

function GeneratedText({ generatedText, setGeneratedText }) {
  const handleTextChange = (e) => {
    setGeneratedText(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
      .then(() => {
        // Text successfully copied
        console.log('Text copied to clipboard');
        // Refresh the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 100); // 100ms delay before refresh
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="form-group">
      <label htmlFor="generatedText">Generated Note:</label>
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
