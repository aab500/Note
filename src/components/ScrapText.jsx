// ScrapText.jsx

import React from 'react';

const specificWords = ['adp', 'adapter', 'backlit', 'bad', 'battery', 'bezel', 'black', 'boots', 'brightness', 'broken', 'cap', 'case', 'charge', 'charging',
  'clark', 'cmb', 'connect', 'cooling', 'control', 'cooling', 'cpu', 'cracked', 'crashes', 'crystal', 'damage',
  'device', 'display', 'does', 'determined', 'didnt', 'display', 'down', 'failure', 'flashing', 'frame', 'freezing', 'from',
  'gpu', 'graphics', 'hdd', 'headphone', 'help', 'hinge', 'hinges', 'indicator', 'intermittently', 'issue', 'jack', 'keeps',
  'keyboard', 'keys', 'lcd', 'left', 'light', 'liquid', 'loses', 'manual', 'may', 'memory', 'missing', 'mlb', 'mobile',
  'monitor', 'motherboard', 'mouse', 'multiple', 'mic', 'microphone', 'network', 'new', 'not', 'only', 'os', 'overheating', 'panel',
  'part', 'port', 'power', 'powerwash', 'processing', 'ram', 'random', 'register', 'right', 'screen', 'separation',
  'shutting', 'shield', 'shift', 'shuts', 'software', 'sticking', 'stylus', 'supply', 'system', 'stop', 'stopped', 'tool', 'trackpad', 'tried',
  'on', 'crashes', 'video', 'warranty', 'was', 'when', 'wi-fi', 'wire', 'won\'t', 'work', 'working', 'head', 'headphone', 'jack', 'tip', 'glass'];

const excludeWords = ['cross-ship', '@', '!', 'replacement', 'disposed'];

function ScrapText({ inputText, onScrapComplete }) {
  const scrapText = (text) => {
    const lines = text.split("\n");
    let scrapedText = '';
    let found = false;

    for (const line of lines) {
      const cleanedLine = line.toLowerCase();
      if (specificWords.some(word => cleanedLine.includes(word)) && 
          !excludeWords.some(word => cleanedLine.includes(word)) && 
          /^[a-zA-Z\s]+$/.test(line)) {
        scrapedText += ' ' + line;
        found = true;
      }
    }

    if (!found && lines.length > 0) {
      scrapedText = lines[0].trim();
    }

    onScrapComplete(scrapedText.trim());
  };

  React.useEffect(() => {
    scrapText(inputText);
  }, [inputText]);

  return null; // This component doesn't render anything
}

export default ScrapText;