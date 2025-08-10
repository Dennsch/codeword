import React, { useState, useEffect, useRef } from 'react';
import { getRandomWord, encodeWord } from '../utils/wordCatalog';
import './WordPuzzleGame.css';

interface GameState {
  currentWord: string;
  encodedWord: string;
  userGuess: string[];
  gameStatus: 'playing' | 'won' | 'lost';
  message: string;
}

const WordPuzzleGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentWord: '',
    encodedWord: '',
    userGuess: [],
    gameStatus: 'playing',
    message: ''
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize a new game
  const initializeGame = () => {
    const word = getRandomWord();
    const encoded = encodeWord(word);
    
    setGameState({
      currentWord: word,
      encodedWord: encoded,
      userGuess: new Array(word.length).fill(''),
      gameStatus: 'playing',
      message: ''
    });

    // Reset input refs
    inputRefs.current = new Array(word.length).fill(null);
  };

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Handle input change for a specific position
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single characters
    
    const newGuess = [...gameState.userGuess];
    newGuess[index] = value.toLowerCase();
    
    setGameState(prev => ({
      ...prev,
      userGuess: newGuess
    }));

    // Auto-focus next input on mobile
    if (value && index < gameState.userGuess.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle key press for better mobile experience
  const handleKeyPress = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !gameState.userGuess[index] && index > 0) {
      // Move to previous input if current is empty and backspace is pressed
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    } else if (event.key === 'Enter') {
      // Submit on Enter key
      if (isGuessComplete) {
        evaluateGuess();
      }
    }
  };

  // Evaluate the user's guess
  const evaluateGuess = () => {
    const guessedWord = gameState.userGuess.join('');
    const isCorrect = guessedWord === gameState.currentWord;
    
    setGameState(prev => ({
      ...prev,
      gameStatus: isCorrect ? 'won' : 'lost',
      message: isCorrect 
        ? '🎉 Congratulations! You solved the puzzle!' 
        : `❌ Sorry! The correct word was "${gameState.currentWord.toUpperCase()}"`
    }));

    // Provide haptic feedback on mobile (if available)
    if ('vibrate' in navigator) {
      navigator.vibrate(isCorrect ? [100, 50, 100] : [200]);
    }
  };

  // Check if all input fields are filled
  const isGuessComplete = gameState.userGuess.every(letter => letter !== '');

  return (
    <div className="word-puzzle-game">
      <div className="game-header">
        <h1>🔤 Codeword Puzzle</h1>
        <p className="instructions">
          Decode the word! Each letter is shifted by 1 position in the alphabet.
        </p>
      </div>

      <div className="game-content">
        {/* Encoded word display */}
        <div className="encoded-word-section">
          <h2>Encoded Word:</h2>
          <div className="encoded-word">
            {gameState.encodedWord.split('').map((letter, index) => (
              <span key={index} className="encoded-letter">
                {letter.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Input fields for guessing */}
        <div className="guess-section">
          <h2>Your Guess:</h2>
          <div className="guess-inputs">
            {gameState.userGuess.map((letter, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={letter}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyPress(index, e)}
                className="letter-input"
                maxLength={1}
                disabled={gameState.gameStatus !== 'playing'}
                placeholder="?"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                inputMode="text"
              />
            ))}
          </div>
        </div>

        {/* Evaluate button */}
        <div className="action-section">
          <button
            onClick={evaluateGuess}
            disabled={!isGuessComplete || gameState.gameStatus !== 'playing'}
            className="evaluate-button"
          >
            Check Answer
          </button>
        </div>

        {/* Game result message */}
        {gameState.message && (
          <div className={`message ${gameState.gameStatus}`}>
            {gameState.message}
          </div>
        )}

        {/* New game button */}
        {gameState.gameStatus !== 'playing' && (
          <div className="new-game-section">
            <button onClick={initializeGame} className="new-game-button">
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Game info */}
      <div className="game-info">
        <p><strong>How to play:</strong></p>
        <ul>
          <li>Look at the encoded word above</li>
          <li>Each letter has been shifted forward by 1 in the alphabet</li>
          <li>For example: A becomes B, B becomes C, Z becomes A</li>
          <li>Figure out the original word and type it in the boxes below</li>
          <li>Click "Check Answer" to see if you're correct!</li>
        </ul>
      </div>
    </div>
  );
};

export default WordPuzzleGame;