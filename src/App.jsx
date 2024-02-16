import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [lives, setLives] = useState(5);
  const [content, setContent] = useState('Commencez à jouer');
  const [backgroundClass, setBackgroundClass] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    setRandomNumber(Math.floor(Math.random() * 20) + 1);
    setUserInput('');
    setLives(5);
    setContent('Commencez à jouer');
    setBackgroundClass('');
    setGameOver(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver || userInput === false) return;

    const guessedNumber = parseInt(userInput);
    setUserInput('');
    if (randomNumber === guessedNumber) {
      setContent('Vous avez gagné');
      setBackgroundClass('bg-green-400');
      setGameOver(true);
    } else if (randomNumber < guessedNumber || randomNumber > guessedNumber) {
      if (lives > 0) {
        setContent(
          randomNumber < guessedNumber ? 'Plus petit !' : 'Plus grand !'
        );
        setLives((prevLives) => prevLives - 1);
      }
    }
  };

  useEffect(() => {
    if (lives === 0) {
      setContent('Vous avez perdu !!!');
      setBackgroundClass('bg-red-400');
      setGameOver(true);
    }
  }, [lives]);

  return (
    <>
      <button
        onClick={restartGame}
        className='block ml-10 mt-5 bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Rejouer
      </button>
      <div
        className={`max-w-7xl rounded mx-auto py-10 mt-5 ${backgroundClass}`}
      >
        <h1 className='text-6xl uppercase text-center font-bold'>
          🎲 Guess the number 🎲
        </h1>
        <p className='text-center text-4xl text-slate-700 mt-8'>
          Nombre de vies {lives}
        </p>
        <p className='bg-slate-100 text-slate-800 rounded mt-8 w-fit mx-auto px-16 py-12 text-5xl text-center font-bold'>
          {gameOver ? randomNumber : '?'}
        </p>
        <p className='text-center text-3xl mt-4'>{content}</p>
        <form
          onSubmit={handleSubmit}
          className='mx-auto mt-10 flex justify-center gap-x-3'
        >
          <input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='text-slate-800 text-4xl font-bold rounded'
            type='number'
            disabled={gameOver}
          />
          <button
            type='submit'
            className='bg-green-700 text-slate-200 px-5 py-4 rounded'
            disabled={gameOver}
          >
            Valider
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
