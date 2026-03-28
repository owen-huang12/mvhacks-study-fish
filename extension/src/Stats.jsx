const TOTAL_FISH = 18;

export default function Stats({ totalMinutes, unlockedFish }) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const fishCount = unlockedFish.length;

  return (
    <div className="stats-list">
      <div className="stat-card">
        <div className="stat-label">total time studied</div>
        <div className="stat-value">
          {hours}
          <span className="stat-unit">h</span>
          {" "}
          {minutes}
          <span className="stat-unit">m</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">fish collected</div>
        <div className="stat-value">
          {fishCount}
          <span className="stat-unit"> / {TOTAL_FISH}</span>
        </div>
        <div className="stat-bar-track">
          <div
            className="stat-bar-fill"
            style={{ width: `${(fishCount / TOTAL_FISH) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
