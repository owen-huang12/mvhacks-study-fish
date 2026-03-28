import { useState, useEffect } from "react";
import "./App.css";
import FishSprite from "./FishSprite";
import Collection from "./Collection";
import Achievements from "./Achievements";
import { loadState, saveState } from "./storage";
import BlockedSites from "./BlockedSites";
import Stats from "./Stats";

const PAGES = ["blocked sites", "study", "stats"];

function App() {
  const [page, setPage] = useState("study");
  const [gameState, setGameState] = useState(null);

  // Load persisted state on mount
  useEffect(() => {
    loadState((state) => setGameState(state));
  }, []);

  // Persist whenever gameState changes
  useEffect(() => {
    if (gameState) saveState(gameState);
  }, [gameState]);

  if (!gameState) return null;

  return (
    <div className="app">
      <div className="page-content">
        {page === "study" && (
          <StudyPage
            gameState={gameState}
            setGameState={setGameState}
          />
        )}
        {page === "blocked sites" && <BlockedSitesPage />}
        {page === "stats" && <StatsPage gameState={gameState} />}
      </div>

      <nav className="bottom-nav">
        {PAGES.map((p) => (
          <button
            key={p}
            className={`nav-btn ${page === p ? "active" : ""}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </nav>
    </div>
  );
}

function StudyPage({ gameState }) {
  return (
    <div className="page">
      <h1>study fish</h1>
      <FishSprite sprite={gameState.unlockedFish[0]} />
      <div className="timer-wrapper"></div>
    </div>
  );
}

function BlockedSitesPage() {
  return <BlockedSites />;
}

const STATS_TABS = ["collection", "achievements", "stats"];

function StatsPage({ gameState }) {
  const [tab, setTab] = useState("collection");

  return (
    <div className="page">
      <h1>stats</h1>
      <nav className="inner-tabs">
        {STATS_TABS.map((t) => (
          <button
            key={t}
            className={`inner-tab-btn ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>

      {tab === "collection" && (
        <Collection totalMinutes={gameState.totalMinutes} />
      )}
      {tab === "achievements" && (
        <Achievements
          totalMinutes={gameState.totalMinutes}
          unlockedAchievements={gameState.unlockedAchievements}
        />
      )}
      {tab === "stats" && (
          <Stats
            totalMinutes={gameState.totalMinutes}
            unlockedFish={gameState.unlockedFish}
          />
        )}
    </div>
  );
}

export default App;
