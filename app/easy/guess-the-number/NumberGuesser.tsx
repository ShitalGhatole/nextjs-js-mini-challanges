'use client'
import { useRef, useState, useEffect } from 'react';
import styles from './page.module.scss';

const NumberGuesser = () => {
  const [randomNumber, setRandomNumber] = useState<number>(
    () => Math.floor(Math.random() * 100) + 1
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [guesses, setGuesses] = useState<number[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [allowedGuesses, setAllowedGuesses] = useState<number>(10);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('Start guessing!');
  const [feedbackType, setFeedbackType] = useState<'default' | 'win' | 'gameover'>('default');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleGuess = () => {
    const guess = Number(currentGuess);
    if (Number.isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Please enter a number between 1 and 100.');
      setFeedbackType('default');
      return;
    }
    setGuesses((prev) => [...prev, guess]);
    const nextAllowed = allowedGuesses - 1;
    setAllowedGuesses(nextAllowed);

    if (nextAllowed === 0 && guess !== randomNumber) {
      setButtonState(true);
      setFeedback(`Game over — it was ${randomNumber}.`);
      setFeedbackType('gameover');
      return;
    }

    if (guess === randomNumber) {
      setFeedback('Correct! You guessed it!');
      setFeedbackType('win');
      setButtonState(true);
    } else if (nextAllowed === 0) {
      setFeedback(`Game over — it was ${randomNumber}.`);
      setFeedbackType('gameover');
      setButtonState(true);
    } else if (guess < randomNumber) {
      setFeedback('Too low. Aim higher.');
      setFeedbackType('default');
    } else {
      setFeedback('Too high. Come down.');
      setFeedbackType('default');
    }
    setCurrentGuess('');
    inputRef.current?.focus();
  }

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuesses([]);
    setAllowedGuesses(10);
    setButtonState(false);
    setFeedback('Start guessing!');
    setFeedbackType('default');
    setCurrentGuess('');
    inputRef.current?.focus();
  }

  const feedbackClass = [
    styles.feedback,
    feedbackType === 'win' ? styles.win : '',
    feedbackType === 'gameover' ? styles.gameover : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Number Guesser <img src="/react-logo.svg" alt="JS Icon" height={24} width={24} title="Made in React" /></h1>
          <p>Pick a number between 1 and 100!</p>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="guess">Enter your guess:</label>
          <input
            ref={inputRef}
            id="guess"
            name="guess" 
            type="number" 
            min="1" 
            max="100" 
            placeholder='-'
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !buttonState && handleGuess()}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleGuess} disabled={buttonState}>
              Submit Guess
          </button>

          <button className={styles.resetBtn} onClick={resetGame}>
            Reset Game
          </button>
        </div>

        <p className={feedbackClass}>{feedback}</p>

        {guesses.length > 0 && (
          <div className={styles.history}>
            <p>Previous guesses</p>
            <div className={styles.chips}>
              {guesses.map((guess, i) => (
                <span key={i} className={styles.chip}>{guess}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NumberGuesser

