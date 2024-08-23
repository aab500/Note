import React, { useState, useEffect } from 'react';
import './index.css';
import DarkModeToggle from './components/DarkModeToggle';
import ProblemInput from './components/ProblemInput';
import ScrapText from './components/ScrapText';
import GeneratedText from './components/GeneratedText';
import IssueButtons from './components/IssueButtons';
import EnrollmentRadio from './components/EnrollmentRadio';
import TestRadio from './components/TestRadio';
import AccessoryButtons from './components/AccessoryButtons';
import IssueModal from './components/IssueModal';
import { issues } from './data/issues';


function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);
  
  const [problemInput, setProblemInput] = useState('');
  const [generatedText, setGeneratedText] = useState(`*Problem:
*Diagnosis: 
*Recommendation/Solution: 
*BIOS LOCK/Enrollment: 
*Accessories: `);
  const [selectedIssues, setSelectedIssues] = useState({});
  const [currentIssue, setCurrentIssue] = useState(null);
  const [enrollment, setEnrollment] = useState('');
  const [test, setTest] = useState('');
  const [accessories, setAccessories] = useState([]);

  const updateGeneratedText = (lineLabel, text) => {
    setGeneratedText(prev => {
      const lines = prev.split('\n');
      const index = lines.findIndex(line => line.startsWith(lineLabel));
      if (index !== -1) {
        lines[index] = `${lineLabel}: ${text}`;
      }
      return lines.join('\n');
    });
  };

  const handleScrapComplete = (scrapedText) => {
    updateGeneratedText('*Problem', scrapedText);
  };

  
  const generateDiagnosisText = (issues) => {
    return Object.keys(issues).map(issue => {
      return `${issue} (${issues[issue].details.join(', ')})`;
    }).join(', ');
  };

  const generateRecommendationsText = (issues) => {
    const recommendations = new Set();
    Object.values(issues).forEach(issue => {
      issue.recommendations.forEach(recommendation => recommendations.add(recommendation));
    });
    return Array.from(recommendations).join(', ');
  };

  const handleSaveIssueDetails = (selectedDetails, selectedRecommendations) => {
    const updatedSelectedIssues = {
      ...selectedIssues,
      [currentIssue]: {
        details: selectedDetails,
        recommendations: selectedRecommendations
      }
    };

    setSelectedIssues(updatedSelectedIssues);

    const newDiagnosis = generateDiagnosisText(updatedSelectedIssues);
    const newRecommendations = generateRecommendationsText(updatedSelectedIssues);

    updateGeneratedText('*Diagnosis', newDiagnosis);
    updateGeneratedText('*Recommendation/Solution', newRecommendations);

    setCurrentIssue(null);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <ProblemInput 
            problemInput={problemInput} 
            setProblemInput={setProblemInput} 
            updateGeneratedText={updateGeneratedText} 
          />
          <ScrapText 
            inputText={problemInput} 
            onScrapComplete={handleScrapComplete} 
          />
          <GeneratedText 
            generatedText={generatedText} 
            setGeneratedText={setGeneratedText} 
          />
          <IssueButtons issues={issues} setCurrentIssue={setCurrentIssue} />
          <EnrollmentRadio 
            enrollment={enrollment} 
            setEnrollment={setEnrollment} 
            updateGeneratedText={updateGeneratedText} 
          />
          <TestRadio 
            test={test} 
            setTest={setTest} 
            updateGeneratedText={updateGeneratedText} 
            generateDiagnosisText={generateDiagnosisText} 
            selectedIssues={selectedIssues} 
          />
          <AccessoryButtons 
            accessories={accessories} 
            setAccessories={setAccessories} 
            updateGeneratedText={updateGeneratedText} 
          />
        </div>
      </div>
      {currentIssue && (
        <IssueModal 
          currentIssue={currentIssue} 
          setCurrentIssue={setCurrentIssue} 
          issues={issues} 
          handleSaveIssueDetails={handleSaveIssueDetails} 
        />
      )}
    </div>
  );
}

export default App;
