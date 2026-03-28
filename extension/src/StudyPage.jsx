import { useState, useEffect } from "react";
import homePageImg from "./assets/home-page.png";

const PRESETS = [25, 45, 60];

export default function StudyPage({ gameState }) {
  const [selected, setSelected] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      setIsRunning(false);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  function selectPreset(min) {
    setSelected(min);
    setTimeLeft(min * 60);
    setIsRunning(false);
  }

  function toggle() {
    if (timeLeft === 0) return;
    setIsRunning((r) => !r);
  }

  function reset() {
    setIsRunning(false);
    setTimeLeft(selected * 60);
  }

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const isFinished = timeLeft === 0;
  const atStart = timeLeft === selected * 60;

  return (
    <div className="study-page">
      <img src={homePageImg} className="study-hero" alt="study scene" />

      <div className="timer-float">
        <div className="timer-presets">
          {PRESETS.map((min) => (
            <button
              key={min}
              className={`timer-preset-btn ${selected === min ? "active" : ""}`}
              onClick={() => selectPreset(min)}
              disabled={isRunning}
            >
              {min}m
            </button>
          ))}
        </div>

        <div className="timer-row">
          <div className={`timer-display ${isFinished ? "finished" : ""}`}>
            {mm}:{ss}
          </div>
          <div className="timer-controls">
            <button
              className="timer-action-btn"
              onClick={toggle}
              disabled={isFinished}
            >
              {isRunning ? "pause" : atStart ? "start" : "resume"}
            </button>
            <button className="timer-reset-btn" onClick={reset}>
              reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
