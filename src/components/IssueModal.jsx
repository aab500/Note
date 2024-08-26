// IssueModal.jsx

import React, { useState } from 'react';

function IssueModal({ currentIssue, setCurrentIssue, issues, handleSaveIssueDetails }) {
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);

  const handleDetailChange = (detail) => {
    setSelectedDetails(prev => 
      prev.includes(detail) ? prev.filter(d => d !== detail) : [...prev, detail]
    );
  };

  const handleRecommendationChange = (recommendation) => {
    setSelectedRecommendations(prev => 
      prev.includes(recommendation) ? prev.filter(r => r !== recommendation) : [...prev, recommendation]
    );
  };

  const handleSave = () => {
    handleSaveIssueDetails(selectedDetails, selectedRecommendations);
  };

  return (
    <div className="modal" style={{display: 'block'}}>
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select Details and Recommendations for {currentIssue}</h5>
            <button type="button" className="close" onClick={() => setCurrentIssue(null)}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <h6>Details:</h6>
                <div id="issueDetails">
                  {issues[currentIssue].details.map(detail => (
                    <div key={detail} className="form-check">
                      <input 
                        className="form-check-input issue-detail" 
                        type="checkbox" 
                        value={detail} 
                        id={detail}
                        checked={selectedDetails.includes(detail)}
                        onChange={() => handleDetailChange(detail)}
                      />
                      <label className="form-check-label" htmlFor={detail}>{detail}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <h6>Recommendations:</h6>
                <div id="issueRecommendations">
                  {issues[currentIssue].recommendations.map(recommendation => (
                    <div key={recommendation} className="form-check">
                      <input 
                        className="form-check-input issue-recommendation" 
                        type="checkbox" 
                        value={recommendation} 
                        id={recommendation}
                        checked={selectedRecommendations.includes(recommendation)}
                        onChange={() => handleRecommendationChange(recommendation)}
                      />
                      <label className="form-check-label" htmlFor={recommendation}>{recommendation}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setCurrentIssue(null)}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueModal;
