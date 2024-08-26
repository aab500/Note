// src/components/IssueButtons.jsx

import React from 'react';
import { issueConfig } from '../data/issueConfig';

function IssueButtons({ setCurrentIssue }) {
  return (
    <div className="form-group">
      {issueConfig.map((row, rowIndex) => (
        <div key={rowIndex} className="d-flex flex-wrap mb-2">
          {row.map(({ name, color }) => (
            <button
              key={name}
              className={`btn btn-${color} m-1`}
              onClick={() => setCurrentIssue(name)}
            >
              {name.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default IssueButtons;
