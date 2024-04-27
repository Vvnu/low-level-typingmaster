import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling

function TypingSpeedChecker() {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    generateRandomText();
  }, []);

  useEffect(() => {
    if (userInput.trim() === text.trim()) {
      calculateWPM();
    }
  }, [userInput, text]);

  const generateRandomText = () => {
    // Generate a text passage with at least 120 words
    const minWords = 120;
    const words = [];
    while (words.length < minWords) {
      words.push(getRandomWord());
    }
    const randomText = words.join(' ');
    setText(randomText);
    setUserInput('');
    setHighlightedWordIndex(0);
    setStartTime(null);
  };

  const getRandomWord = () => {
    // Sample list of words for demonstration
    const sampleWords = [
      "the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog",
      "She", "sells", "seashells", "by", "the", "seashore",
      "How", "much", "wood", "would", "a", "woodchuck", "chuck", "if", "a", "woodchuck", "could", "chuck", "wood"
    ];
    const randomIndex = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomIndex];
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (!startTime) {
      setStartTime(Date.now());
    }
    setUserInput(value);
    const inputWords = value.split(/\s+/);
    const textWords = text.split(/\s+/);
    let highlightedWordIndex = 0;
    for (let i = 0; i < inputWords.length; i++) {
      if (inputWords[i] !== textWords[i]) {
        break;
      }
      highlightedWordIndex++;
    }
    setHighlightedWordIndex(highlightedWordIndex);
  };
  
  
  
  
  const highlightMatchingWords = (value) => {
    const inputWords = value.split(/\s+/);
    const textWords = text.split(/\s+/);
    let highlightedIndex = 0;
    let highlightedWordIndex = -1;
    for (let i = 0; i < inputWords.length; i++) {
      if (inputWords[i] === textWords[highlightedIndex]) {
        highlightedWordIndex = highlightedIndex;
        highlightedIndex++;
      } else {
        break;
      }
    }
    setHighlightedWordIndex(highlightedWordIndex);
  };
  
  
  const calculateWPM = () => {
    const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
    const words = text.trim().split(/\s+/).length;
    const wpm = Math.round((words / elapsedTime) * 60);
    alert(`Your typing speed: ${wpm} WPM`);
  };

  const handlePaste = (event) => {
    event.preventDefault(); // Prevent default paste behavior
  };

  return (
    <div className="typing-speed-container">
      <p className="typing-speed-text">{text.split(' ').map((word, index) => (
        <span key={index} className={index === highlightedWordIndex ? 'highlighted' : ''}>{word} </span>
      ))}</p>
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        onPaste={handlePaste}
        placeholder="Start typing here..."
        rows={4}
        cols={50}
        className="typing-speed-textarea"
      />
      <button onClick={generateRandomText} className="finish-button">Generate New Text</button>
    </div>
  );
}

export default TypingSpeedChecker;
