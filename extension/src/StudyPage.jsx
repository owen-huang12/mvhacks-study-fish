import { useState, useEffect, useRef } from "react";
import homePageImg from "./assets/home-page.png";
import FishTank from "./FishTank";
import { loadState, saveState, deriveUnlockedFish } from "./storage";

const PRESETS = [25, 45, 60];

function loadTimer(cb) {
  chrome.storage.local.get("timerState", (r) => cb(r.timerState || null));
}

function saveTimer(state) {
  chrome.storage.local.set({ timerState: state });
}

export default function StudyPage({ gameState = { unlockedFish: ["blueFish"] } }) {
  const [selected, setSelected] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const endTimeRef = useRef(null);

  // Restore timer state from storage on mount
  useEffect(() => {
    loadTimer((state) => {
      if (!state) return;
      const min = state.selectedMinutes ?? 25;
      setSelected(min);

      if (state.isRunning && state.endTime) {
        const remaining = Math.max(0, state.endTime - Date.now());
        if (remaining > 0) {
          endTimeRef.current = state.endTime;
          setTimeLeft(Math.ceil(remaining / 1000));
          setIsRunning(true);
        } else {
          // Finished while closed
          setTimeLeft(0);
          saveTimer({ selectedMinutes: min, isRunning: false, endTime: null, pausedRemaining: 0 });
        }
      } else {
        const rem = state.pausedRemaining ?? min * 60 * 1000;
        setTimeLeft(Math.ceil(rem / 1000));
      }
    });
  }, []);

  // Tick while running
  useEffect(() => {
    if (!isRunning) return;
    const tick = () => {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      const secs = Math.ceil(remaining / 1000);
      setTimeLeft(secs);
      if (secs <= 0) {
        setIsRunning(false);
        saveTimer({ selectedMinutes: selected, isRunning: false, endTime: null, pausedRemaining: 0 });
        loadState((current) => {
          const totalMinutes = (current.totalMinutes ?? 0) + selected;
          saveState({ ...current, totalMinutes, unlockedFish: deriveUnlockedFish(totalMinutes) });
        });
      }
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [isRunning, selected]);

  function applyCustom() {
    const min = parseInt(customInput, 10);
    if (!min || min < 1) return;
    setCustomInput("");
    selectPreset(min);
  }

  function selectPreset(min) {
    setSelected(min);
    setTimeLeft(min * 60);
    setIsRunning(false);
    endTimeRef.current = null;
    saveTimer({ selectedMinutes: min, isRunning: false, endTime: null, pausedRemaining: min * 60 * 1000 });
  }

  function toggle() {
    if (timeLeft === 0) return;
    if (isRunning) {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      endTimeRef.current = null;
      setIsRunning(false);
      setTimeLeft(Math.ceil(remaining / 1000));
      saveTimer({ selectedMinutes: selected, isRunning: false, endTime: null, pausedRemaining: remaining });
    } else {
      const newEnd = Date.now() + timeLeft * 1000;
      endTimeRef.current = newEnd;
      setIsRunning(true);
      saveTimer({ selectedMinutes: selected, isRunning: true, endTime: newEnd, pausedRemaining: null });
    }
  }

  function reset() {
    setIsRunning(false);
    endTimeRef.current = null;
    setTimeLeft(selected * 60);
    saveTimer({ selectedMinutes: selected, isRunning: false, endTime: null, pausedRemaining: selected * 60 * 1000 });
  }

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const isFinished = timeLeft === 0;
  const atStart = timeLeft === selected * 60;
  const progress = ((selected * 60 - timeLeft) / (selected * 60)) * 100;

  return (
    <div className="study-page">
      <img src={homePageImg} className="study-hero" alt="study scene" />
      <FishTank unlockedFish={gameState.unlockedFish} />

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
          <input
            className="timer-custom-input"
            type="number"
            min="1"
            placeholder="min"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyCustom()}
            disabled={isRunning}
          />
        </div>
        <div className="timer-progress-track">
          <div className="timer-progress-fill" style={{ width: `${progress}%` }} />
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
