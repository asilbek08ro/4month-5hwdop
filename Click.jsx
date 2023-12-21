import React, { useState, useEffect } from 'react';
// import './styles.css';

const ClickerApp = () => {
  const [count, setCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [inputTime, setInputTime] = useState('');

  useEffect(() => {
    let timer;

    if (secondsLeft > 0 || milliseconds > 0) {
      timer = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((prev) => prev - 100);
        } else if (secondsLeft > 0) {
          setSecondsLeft((prev) => prev - 1);
          setMilliseconds(900);
        }
      }, 100);
    }

    return () => {
      clearInterval(timer);
    };
  }, [secondsLeft, milliseconds]);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    setTotalClicks((prev) => prev + 1);
  };

  const handleStart = () => {
    if (!isNaN(inputTime) && inputTime > 0) {
      setSecondsLeft(parseInt(inputTime, 10));
      setMilliseconds(0);
    }
  };

  const handleReset = () => {
    setCount(0);
    setSecondsLeft(0);
    setMilliseconds(0);
    setInputTime('');
  };

  const averageClicks =
    totalClicks / (parseInt(inputTime, 10) - secondsLeft + milliseconds / 1000);

  return (
    <div className="container">
      <h1>Clicker App</h1>
      <div>
        <label>
          Set Time (seconds):{' '}
          <input
            type="number"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
          />
        </label>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleClick} disabled={secondsLeft <= 0 && milliseconds <= 0}>
          Click me!
        </button>
        <p>Click count: {count}</p>
        <p>
          Time left: {secondsLeft} seconds {milliseconds / 1000} milliseconds
        </p>
        {secondsLeft <= 0 && milliseconds <= 0 && (
          <div className="result">
            <p>Average Clicks Per Second: {averageClicks.toFixed(2)}</p>
            <button className="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClickerApp;
