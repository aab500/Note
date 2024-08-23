// src/components/IssueButtons.jsx

import React from 'react';
import { issueConfig } from '../data/issueConfig';

function IssueButtons({ setCurrentIssue }) {
  return (
    <div className="form-group">
      {issueConfig.map(({ name, color }) => (
        <button
          key={name}
          className={`btn btn-${color} m-1`}
          onClick={() => setCurrentIssue(name)}
        >
          {name.replace(/_/g, ' ')}
        </button>
      ))}
    </div>
  );
}

export default IssueButtons;