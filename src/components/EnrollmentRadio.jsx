import React from 'react';

function EnrollmentRadio({ enrollment, setEnrollment, updateGeneratedText }) {
  const handleEnrollmentChange = (value) => {
    setEnrollment(value);
    updateGeneratedText('*BIOS LOCK/Enrollment', value);
  };

  return (
    <div className="form-group">
      <div className="btn-group">
        {['Enrolled', 'Not Enrolled', 'Unknown'].map(value => (
          <button
            key={value}
            className={`btn ${enrollment === value ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => handleEnrollmentChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EnrollmentRadio;