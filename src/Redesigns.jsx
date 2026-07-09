import React, { useEffect, useMemo, useRef, useState } from 'react';
import './redesigns.css';
import { issues } from './data/issues';
import { issueConfig } from './data/issueConfig';

const DEFAULT_NOTE = `*Problem:
*Diagnosis: 
*Recommendation/Solution: 
*BIOS LOCK/Enrollment: 
*Accessories: `;

const specificWords = ['adp', 'adapter', 'backlit', 'bad', 'battery', 'bezel', 'black', 'boots', 'brightness', 'broken', 'cap', 'case', 'charge', 'charging',
  'clark', 'cmb', 'connect', 'cooling', 'control', 'cpu', 'cracked', 'crashes', 'crystal', 'damage',
  'device', 'display', 'does', 'determined', 'didnt', 'down', 'failure', 'flashing', 'frame', 'freezing', 'from',
  'gpu', 'graphics', 'hdd', 'headphone', 'help', 'hinge', 'hinges', 'indicator', 'intermittently', 'issue', 'jack', 'keeps',
  'keyboard', 'keys', 'lcd', 'left', 'light', 'liquid', 'loses', 'manual', 'may', 'memory', 'missing', 'mlb', 'mobile',
  'monitor', 'motherboard', 'mouse', 'multiple', 'mic', 'microphone', 'network', 'new', 'not', 'only', 'os', 'overheating', 'panel',
  'part', 'port', 'power', 'powerwash', 'processing', 'ram', 'random', 'register', 'right', 'screen', 'separation',
  'shutting', 'shield', 'shift', 'shuts', 'software', 'sticking', 'stylus', 'supply', 'system', 'stop', 'stopped', 'tool', 'trackpad', 'tried',
  'on', 'crashes', 'video', 'warranty', 'was', 'when', 'wi-fi', 'wire', "won't", 'work', 'working', 'head', 'tip', 'glass'];

const excludeWords = ['cross-ship', '@', '!', 'replacement', 'disposed'];

const productRoute = {
  signature: 'Task dashboard',
  themeClass: 'theme-product',
  primary: 'Copy Final Note',
};

const issueGroups = issueConfig
  .map(row => row.filter(item => item.name))
  .filter(row => row.length);

function extractProblem(text) {
  const lines = text.split('\n');
  let scrapedText = '';
  let found = false;

  for (const line of lines) {
    const cleanedLine = line.toLowerCase();
    if (
      specificWords.some(word => cleanedLine.includes(word)) &&
      !excludeWords.some(word => cleanedLine.includes(word)) &&
      /^[a-zA-Z\s'-]+$/.test(line.trim())
    ) {
      scrapedText += ` ${line.trim()}`;
      found = true;
    }
  }

  if (!found && lines.length > 0) {
    scrapedText = lines[0].trim();
  }

  return scrapedText.trim();
}

function updateNoteLine(note, lineLabel, text) {
  const lines = note.split('\n');
  const index = lines.findIndex(line => line.startsWith(lineLabel));
  if (index !== -1) {
    lines[index] = `${lineLabel}: ${text}`;
  }
  return lines.join('\n');
}

function getDiagnosisText(selectedIssues) {
  return Object.keys(selectedIssues)
    .map(issue => `${issue} (${selectedIssues[issue].details.join(', ')})`)
    .join(', ');
}

function getRecommendationText(selectedIssues) {
  const recommendations = new Set();
  Object.values(selectedIssues).forEach(issue => {
    issue.recommendations.forEach(recommendation => {
      if (recommendation) recommendations.add(recommendation);
    });
  });
  return Array.from(recommendations).join(', ');
}

function formatIssueName(name) {
  return name.replace(/_/g, ' ');
}

function useRepairNoteState() {
  const [problemInput, setProblemInput] = useState('');
  const [generatedText, setGeneratedText] = useState(DEFAULT_NOTE);
  const [selectedIssues, setSelectedIssues] = useState({});
  const [currentIssue, setCurrentIssue] = useState(null);
  const [enrollment, setEnrollment] = useState('');
  const [accessories, setAccessories] = useState([]);
  const [status, setStatus] = useState({ tone: 'empty', text: 'Ready for ticket text.' });
  const [ticketError, setTicketError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const problem = extractProblem(problemInput);
    setGeneratedText(prev => updateNoteLine(prev, '*Problem', problem));
    if (problemInput && !problem) {
      setTicketError('No repair-language line found. Keep the original ticket or edit the generated problem manually.');
    } else {
      setTicketError('');
    }
  }, [problemInput]);

  const saveIssueDetails = (issue, selectedDetails, selectedRecommendations) => {
    const updatedSelectedIssues = {
      ...selectedIssues,
      [issue]: {
        details: selectedDetails.filter(Boolean),
        recommendations: selectedRecommendations.filter(Boolean),
      },
    };

    setSelectedIssues(updatedSelectedIssues);
    setGeneratedText(prev => {
      const withDiagnosis = updateNoteLine(prev, '*Diagnosis', getDiagnosisText(updatedSelectedIssues));
      return updateNoteLine(withDiagnosis, '*Recommendation/Solution', getRecommendationText(updatedSelectedIssues));
    });
    setCurrentIssue(null);
    setStatus({ tone: 'success', text: `${formatIssueName(issue)} details added.` });
  };

  const setEnrollmentValue = value => {
    setEnrollment(value);
    setGeneratedText(prev => updateNoteLine(prev, '*BIOS LOCK/Enrollment', value));
    setStatus({ tone: 'success', text: `Enrollment set to ${value}.` });
  };

  const toggleAccessory = accessory => {
    setAccessories(prev => {
      let next;
      if (accessory === 'None') {
        next = ['None'];
      } else if (prev.includes('None')) {
        next = [accessory];
      } else if (accessory === 'Complete Case') {
        next = prev.includes(accessory)
          ? prev.filter(item => item !== accessory)
          : [...prev.filter(item => item !== 'Bottom Case' && item !== 'Back Case'), accessory];
      } else if (accessory === 'Bottom Case' || accessory === 'Back Case') {
        next = prev.includes(accessory)
          ? prev.filter(item => item !== accessory)
          : [...prev.filter(item => item !== 'Complete Case'), accessory];
      } else {
        next = prev.includes(accessory)
          ? prev.filter(item => item !== accessory)
          : [...prev, accessory];
      }

      if (next.length === 0) next = ['None'];
      setGeneratedText(current => updateNoteLine(current, '*Accessories', next.join(', ')));
      setStatus({ tone: 'success', text: `Accessories set to ${next.join(', ')}.` });
      return next;
    });
  };

  const pasteTicket = async () => {
    setLoading(true);
    try {
      const text = await navigator.clipboard.readText();
      setProblemInput(prev => `${prev}${text}`);
      setStatus({ tone: 'success', text: 'Ticket pasted from clipboard.' });
    } catch {
      setStatus({ tone: 'error', text: 'Clipboard access was blocked. Paste into the ticket field manually.' });
    } finally {
      setLoading(false);
    }
  };

  const copyNote = async () => {
    if (!generatedText.trim()) {
      setStatus({ tone: 'error', text: 'There is no note to copy yet.' });
      return;
    }
    setLoading(true);
    try {
      await navigator.clipboard.writeText(generatedText);
      setStatus({ tone: 'success', text: 'Generated note copied.' });
    } catch {
      setStatus({ tone: 'error', text: 'Clipboard access was blocked. Select the note text and copy manually.' });
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setProblemInput('');
    setGeneratedText(DEFAULT_NOTE);
    setSelectedIssues({});
    setCurrentIssue(null);
    setEnrollment('');
    setAccessories([]);
    setStatus({ tone: 'empty', text: 'Workspace reset.' });
    setTicketError('');
  };

  return {
    problemInput,
    setProblemInput,
    generatedText,
    setGeneratedText,
    selectedIssues,
    currentIssue,
    setCurrentIssue,
    enrollment,
    accessories,
    status,
    ticketError,
    loading,
    saveIssueDetails,
    setEnrollmentValue,
    toggleAccessory,
    pasteTicket,
    copyNote,
    resetAll,
  };
}

function StatusMessage({ status, loading }) {
  return (
    <div className={`status-message is-${status.tone}`} role="status" aria-live="polite">
      <span className="status-dot" aria-hidden="true" />
      <span>{loading ? 'Working...' : status.text}</span>
    </div>
  );
}

function TextareaField({ id, label, value, onChange, error, rows = 7, placeholder, hint }) {
  return (
    <div className="field-stack">
      <div className="field-heading">
        <label htmlFor={id}>{label}</label>
        {hint && <span>{hint}</span>}
      </div>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete="off"
        spellCheck="true"
      />
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

function Toolbar({ state, route }) {
  return (
    <div className="toolbar" aria-label="Workspace actions">
      <button type="button" className="primary-action" onClick={state.copyNote} disabled={state.loading}>
        {state.loading ? 'Copying...' : route.primary}
      </button>
      <button type="button" onClick={state.pasteTicket} disabled={state.loading}>
        Paste Ticket
      </button>
      <button type="button" onClick={state.resetAll}>
        Reset
      </button>
    </div>
  );
}

function IssuePicker({ selectedIssues, setCurrentIssue }) {
  return (
    <section className="panel issue-panel" aria-label="Issue Library">
      <div className="section-heading">
        <p>Issue Library</p>
      </div>
      <div className="issue-groups">
        {issueGroups.map((group, index) => (
          <div className="issue-group" key={index} role="group" aria-label={`Issue group ${index + 1}`}>
            {group.map(({ name }) => (
              <button
                type="button"
                key={name}
                className={selectedIssues[name] ? 'issue-chip is-selected' : 'issue-chip'}
                onClick={() => setCurrentIssue(name)}
                aria-pressed={Boolean(selectedIssues[name])}
              >
                {formatIssueName(name)}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function SegmentedControl({ label, value, options, onChange }) {
  return (
    <fieldset className="segmented">
      <legend>{label}</legend>
      <div>
        {options.map(option => (
          <label key={option} className={value === option ? 'is-selected' : ''}>
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function AccessoryControl({ accessories, onToggle }) {
  const hasCompleteCase = accessories.includes('Complete Case');
  const hasSplitCase = accessories.includes('Bottom Case') || accessories.includes('Back Case');

  return (
    <fieldset className="accessory-grid">
      <legend>Accessories</legend>
      {['None', 'ADP', 'Complete Case', 'Bottom Case', 'Back Case', 'Stylus', 'USB Dongle'].map(accessory => {
        const disabled =
          (accessory === 'Complete Case' && hasSplitCase) ||
          ((accessory === 'Bottom Case' || accessory === 'Back Case') && hasCompleteCase);

        return (
        <label
          key={accessory}
          className={[
            accessories.includes(accessory) ? 'is-selected' : '',
            disabled ? 'is-disabled' : '',
          ].filter(Boolean).join(' ')}
        >
          <input
            type="checkbox"
            name="accessories"
            value={accessory}
            checked={accessories.includes(accessory)}
            disabled={disabled}
            onChange={() => onToggle(accessory)}
          />
          <span>{accessory}</span>
        </label>
        );
      })}
    </fieldset>
  );
}

function SummaryTable({ selectedIssues }) {
  const rows = Object.entries(selectedIssues);
  return (
    <section className="panel summary-panel" aria-label="Selected Work">
      <div className="section-heading">
        <p>Selected Work</p>
      </div>
      {rows.length === 0 ? (
        <div className="empty-state">
          <strong>No issue details selected.</strong>
          <span>Choose a repair area to build the diagnosis and recommendations.</span>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <caption>Selected repair issue details and recommendations</caption>
            <thead>
              <tr>
                <th scope="col">Issue and details</th>
                <th scope="col">Recommendations</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([issue, values]) => (
                <tr key={issue}>
                  <td>
                    <div className="summary-issue-cell">
                      <strong>{formatIssueName(issue)}</strong>
                      <span>{values.details.join(', ') || 'No details selected'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="summary-recommendation-cell">
                      <span className="summary-spacer" aria-hidden="true">{formatIssueName(issue)}</span>
                      <span>{values.recommendations.join(', ') || 'No recommendations selected'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function IssueModal({ issue, savedIssue, onClose, onSave }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const detailOptions = useMemo(() => issues[issue].details.filter(Boolean), [issue]);
  const recommendationOptions = useMemo(() => issues[issue].recommendations.filter(Boolean), [issue]);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setSelectedDetails(savedIssue?.details ?? []);
    setSelectedRecommendations(savedIssue?.recommendations ?? []);
    setError('');
    const previous = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add('modal-open');

    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll('button, input, [href], textarea, select, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
      previous?.focus?.();
    };
  }, [issue, onClose, savedIssue]);

  const toggle = (value, setter) => {
    setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    setError('');
  };

  const save = () => {
    if (selectedDetails.length === 0 && selectedRecommendations.length === 0) {
      setError('Select at least 1 detail or recommendation before saving.');
      return;
    }
    onSave(issue, selectedDetails, selectedRecommendations);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="issue-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="issue-modal-title"
        aria-describedby={error ? 'issue-modal-error' : undefined}
        ref={dialogRef}
      >
        <header>
          <div>
            <p>Repair Selection</p>
            <h2 id="issue-modal-title">{formatIssueName(issue)}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} ref={closeRef} aria-label="Close issue dialog">
            x
          </button>
        </header>
        {error && <p className="modal-error" id="issue-modal-error" role="alert">{error}</p>}
        <div className="modal-columns">
          <CheckboxColumn
            title="Details"
            name="details"
            options={detailOptions}
            selected={selectedDetails}
            onToggle={value => toggle(value, setSelectedDetails)}
          />
          <CheckboxColumn
            title="Recommendations"
            name="recommendations"
            options={recommendationOptions}
            selected={selectedRecommendations}
            onToggle={value => toggle(value, setSelectedRecommendations)}
          />
        </div>
        <footer>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" className="primary-action" onClick={save}>Save Issue</button>
        </footer>
      </section>
    </div>
  );
}

function CheckboxColumn({ title, name, options, selected, onToggle }) {
  return (
    <fieldset className="checkbox-column">
      <legend>{title}</legend>
      {options.length === 0 ? (
        <p className="empty-inline">No options available.</p>
      ) : options.map((option, index) => {
        const id = `${name}-${index}-${option.replace(/[^a-z0-9]+/gi, '-')}`;
        return (
          <label key={option} htmlFor={id} className={selected.includes(option) ? 'is-selected' : ''}>
            <input
              id={id}
              type="checkbox"
              name={name}
              value={option}
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

function ProductLayout({ state, route }) {
  const stepStates = [
    Boolean(state.problemInput.trim()),
    Object.keys(state.selectedIssues).length > 0,
    Boolean(state.enrollment),
    state.accessories.length > 0,
  ];

  return (
    <main id="main-content" className="dashboard-shell">
      <a href="#main-content" className="skip-link">Skip to workspace</a>
      <div className="page-rail">
        <TaskFlow stepStates={stepStates} darkMode={route.darkMode} setDarkMode={route.setDarkMode} />
      </div>
      <div className="top-grid">
        <section className="panel form-panel note-output" aria-label="Generated Note">
          <div className="section-heading">
            <p>Editable Output</p>
          </div>
          <TextareaField
            id="note-product"
            label="Generated Note"
            value={state.generatedText}
            onChange={state.setGeneratedText}
            rows={9}
            placeholder="Generated repair note..."
          />
          <div className="panel-actions note-actions" aria-label="Generated note actions">
            <button type="button" className="primary-action" onClick={state.copyNote} disabled={state.loading}>
              {state.loading ? 'Copying...' : route.primary}
            </button>
            <button type="button" onClick={state.resetAll}>
              Reset
            </button>
          </div>
        </section>
        <section className="panel form-panel ticket-panel" aria-label="Customer Ticket">
          <div className="section-heading">
            <p>Input</p>
          </div>
          <TextareaField
            id="ticket-product"
            label="Customer Ticket"
            value={state.problemInput}
            onChange={state.setProblemInput}
            error={state.ticketError}
            rows={9}
            placeholder="Paste customer ticket text..."
            hint="Used to populate the Problem line"
          />
          <div className="panel-actions ticket-actions" aria-label="Ticket actions">
            <button type="button" onClick={state.pasteTicket} disabled={state.loading}>
              Paste Ticket
            </button>
          </div>
        </section>
      </div>
      <div className="dashboard-divider" aria-hidden="true" />
      <div className="lower-grid">
        <div className="left-stack">
          <IssuePicker selectedIssues={state.selectedIssues} setCurrentIssue={state.setCurrentIssue} />
          <section className="panel controls-panel" aria-label="Enrollment and accessories">
            <div className="section-heading">
              <p>Required Fields</p>
            </div>
            <SegmentedControl label="Enrollment" value={state.enrollment} options={['Enrolled', 'Not Enrolled', 'Unknown']} onChange={state.setEnrollmentValue} />
            <AccessoryControl accessories={state.accessories} onToggle={state.toggleAccessory} />
          </section>
        </div>
        <aside className="right-stack" aria-label="Selected work">
          <SummaryTable selectedIssues={state.selectedIssues} />
        </aside>
      </div>
    </main>
  );
}

function TaskFlow({ stepStates, darkMode, setDarkMode }) {
  const steps = ['Paste ticket', 'Select issues', 'Confirm enrollment', 'Select Accessories'];

  return (
    <section className="task-flow" aria-labelledby="task-title">
      <div className="task-flow-top">
        <div className="task-flow-content">
          <div className="task-flow-copy">
            <p>Task Flow</p>
            <h2 id="task-title">4 steps to a complete note</h2>
          </div>
          <div className="task-flow-track">
            <ol className="task-stepper" aria-label="Task flow steps">
              {steps.map((item, index) => {
                const state = stepStates[index] ? 'is-done' : '';
                return (
                  <li key={item} className={state}>
                    <span className="step-node" aria-hidden="true">
                      {stepStates[index] ? String.fromCharCode(10003) : index + 1}
                    </span>
                    <strong>{item}</strong>
                  </li>
                );
              })}
            </ol>
            <div className="task-connector" aria-hidden="true">
              {steps.slice(0, -1).map((_, index) => (
                <span key={index} className={stepStates[index] ? 'is-done' : ''} />
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`theme-toggle ${darkMode ? 'is-dark' : 'is-light'}`}
          onClick={() => setDarkMode(prev => !prev)}
          aria-pressed={darkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="theme-icon" aria-hidden="true">{darkMode ? '\u2600' : '\u263E'}</span>
        </button>
      </div>
    </section>
  );
}

function RedesignApp() {
  const route = productRoute;
  const state = useRepairNoteState();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.sampleTheme = 'product';
    return () => {
      delete document.documentElement.dataset.sampleTheme;
    };
  }, []);

  return (
    <div className={`sample-app ${route.themeClass} ${darkMode ? 'is-dark' : ''}`}>
      <ProductLayout state={state} route={{ ...route, darkMode, setDarkMode }} />
      {state.currentIssue && (
        <IssueModal
          issue={state.currentIssue}
          savedIssue={state.selectedIssues[state.currentIssue]}
          onClose={() => state.setCurrentIssue(null)}
          onSave={state.saveIssueDetails}
        />
      )}
    </div>
  );
}

export default RedesignApp;
