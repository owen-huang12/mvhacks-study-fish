const ACHIEVEMENTS = [
  { id: "first-session",  name: "First Dive",       hint: "Start focusing.",            requiresMin: 1   },
  { id: "thirty-min",     name: "Getting Deep",      hint: "Study for 30 minutes.",      requiresMin: 30  },
  { id: "ten-hours",      name: "Ocean Dweller",     hint: "Reach 10 hours of focus.",   requiresMin: 600 },
  { id: "full-day",       name: "Mariana Trencher",  hint: "Reach 24 hours of focus.",   requiresMin: 1440 },
  { id: "streak-3",       name: "Three Day Streak",  hint: "Study 3 days in a row.",     requiresMin: 0, special: true },
];

function AchievementCard({ achievement, unlocked }) {
  return (
    <div className={`achievement-card ${unlocked ? "unlocked" : "locked"}`}>
      <div className="achievement-title">
        {unlocked ? achievement.name : "???"}
      </div>
      <div className="achievement-hint">
        {unlocked ? `Unlocked!` : `Hint: ${achievement.hint}`}
      </div>
    </div>
  );
}

function Achievements({ totalMinutes = 0 }) {
  return (
    <div className="achievements-wrapper">
      <div className="achievements-list">
        {ACHIEVEMENTS.map((a) => (
          <AchievementCard
            key={a.id}
            achievement={a}
            unlocked={!a.special && totalMinutes >= a.requiresMin}
          />
        ))}
      </div>
    </div>
  );
}

export default Achievements;
