import React from 'react';

function TestRadio({ test, setTest, updateGeneratedText, generateDiagnosisText, selectedIssues }) {
  const handleTestChange = (value) => {
    setTest(value);
    updateGeneratedText('*Diagnosis', `${generateDiagnosisText(selectedIssues)}, ${value}`);
  };

  const testOptions = [
    { value: 'Limited functionality test due to enrollment', label: 'Limited Test' },
    { value: 'Passed all other functionality tests', label: 'Passed All Tests' },
    { value: 'Unable to test functionality', label: 'Unable to Test' }
  ];

  return (
    <div className="form-group">
      <div className="btn-group">
        {testOptions.map(({ value, label }) => (
          <button
            key={value}
            className={`btn ${test === value ? 'btn-success' : 'btn-secondary'}` }
            onClick={() => handleTestChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TestRadio;