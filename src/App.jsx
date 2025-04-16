import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const wordList = [
  { word: "rain", hint: "Falls from clouds" },
  { word: "cloud", hint: "White and fluffy or dark and stormy" },
  { word: "dew", hint: "Moisture on grass in the morning" },
  { word: "fungi", hint: "Mushrooms belong here" },
  { word: "lichen", hint: "Symbiosis of fungus and algae" },
  { word: "breeze", hint: "Gentle wind" },
  { word: "sunlight", hint: "Needed for photosynthesis" },
  { word: "clover", hint: "Lucky plant with 4 leaves" },
  { word: "nut", hint: "Hard-shelled fruit" },
  { word: "burrow", hint: "Underground animal home" },
  { word: "creek", hint: "Small stream" },
  { word: "meadow", hint: "Open grassy field" },
  { word: "glade", hint: "Open space in a forest" },
  { word: "trail", hint: "Path in the woods" },
  { word: "camp", hint: "Place to stay in the woods" },
  { word: "hollow", hint: "Hole inside a tree" },
  { word: "sapling", hint: "Young tree" },
  { word: "ash", hint: "Tree and also burnt wood" },
  { word: "elm", hint: "Type of deciduous tree" },
  { word: "fir", hint: "Popular Christmas tree" },
  { word: "grove", hint: "Small group of trees" },
  { word: "leaf", hint: "Photosynthesis powerhouse" },
  { word: "owl", hint: "Night bird in forests" },
  { word: "fox", hint: "Clever forest animal" },
  { word: "badger", hint: "Digs burrows and lives underground" },
  { word: "ant", hint: "Tiny insect that forms colonies" },
  { word: "beetle", hint: "Insect with hard shell" },
  { word: "hornet", hint: "Stinging insect in forests" },
  { word: "beehive", hint: "Home for bees" },
  { word: "pollinate", hint: "What bees do to flowers" }
];

const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");

const Game = () => {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * wordList.length));
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const inputRef = useRef(null);
  const currentWord = wordList[index];

  useEffect(() => {
    setGuess('');
    setFeedback('');
    setShowAnswer(false);
    setIsChecking(false);
    if (inputRef.current) inputRef.current.focus();
  }, [index]);

  const checkAnswer = () => {
    if (isChecking || showAnswer) return;
    setIsChecking(true);

    const trimmedGuess = guess.trim().toLowerCase();
    if (trimmedGuess === currentWord.word) {
      setFeedback("Nice one!");
      correctSound.play();
      setScore((prev) => prev + 1);
      setTimeout(() => {
        nextWord();
      }, 1200);
    } else {
      setFeedback("Nope, try again!");
      wrongSound.play();
      setIsChecking(false);
    }
  };

  const nextWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setIndex(randomIndex);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setFeedback(`Answer: ${currentWord.word}`);
    setIsChecking(true);

    setTimeout(() => {
      nextWord();
    }, 2000);
  };

  const getMaskedWord = () => {
    if (showAnswer) return currentWord.word.split('').join(' ');
    return currentWord.word
      .split('')
      .map((letter, i) => guess[i]?.toLowerCase() === letter ? letter : '_')
      .join(' ');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') checkAnswer();
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1 className="game-title">Word Connect</h1>
        <p className="score-text">Score: {score}</p>
        <p className="hint-text">Hint: {currentWord.hint}</p>

        <div className="masked-word">{getMaskedWord()}</div>

        <input
          ref={inputRef}
          type="text"
          className="guess-input"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Your guess..."
          disabled={isChecking || showAnswer}
        />

        <div className="btn-row">
          <button onClick={checkAnswer} disabled={isChecking || showAnswer}>Check</button>
          <button onClick={handleShowAnswer}>Show Answer</button>
        </div>

        {feedback && <div className="feedback">{feedback}</div>}
      </div>
    </div>
  );
};

export default Game;
