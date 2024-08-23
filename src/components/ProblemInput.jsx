// ProblemInput.jsx

import React from 'react';

function ProblemInput({ problemInput, setProblemInput }) {
  const handleProblemInputChange = (e) => {
    setProblemInput(e.target.value);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setProblemInput(prevInput => prevInput + text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleEmpty = () => {
    setProblemInput('');
  };

  return (
    <div className="form-group">
      <label htmlFor="problemInput">Add to Problem:</label>
      <textarea
        className="form-control large-textarea"
        id="problemInput"
        rows="3"
        placeholder="Enter problem"
        value={problemInput}
        onChange={handleProblemInputChange}
      />
      <div className="mt-2">
        <button id="pasteButton" className="btn btn-secondary mr-2" onClick={handlePaste}>Paste</button>
        <button id="emptyButton" className="btn btn-warning" onClick={handleEmpty}>Empty</button>
      </div>
    </div>
  );
}

export default ProblemInput;