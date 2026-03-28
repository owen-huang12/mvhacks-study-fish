// storage.js — thin wrapper around chrome.storage.local
// All data lives in a single "gameState" key.

const DEFAULT_STATE = {
  totalMinutes: 0,
  unlockedFish: ["blueFish"], // fish ids
  unlockedAchievements: [], // achievement ids
};

// Ordered list of fish ids and the minutes required to unlock them.
// Kept here so unlock logic is centralised and not duplicated across components.
const FISH_THRESHOLDS = [
  { id: "blueFish",         requiresMin: 0    },
  { id: "nemoFish",         requiresMin: 10   },
  { id: "nemoFish2",        requiresMin: 20   },
  { id: "tuna",             requiresMin: 30   },
  { id: "blueGoldFish",     requiresMin: 60   },
  { id: "greenYellowFish",  requiresMin: 90   },
  { id: "goldenFish",       requiresMin: 120  },
  { id: "jellyFish",        requiresMin: 240  },
  { id: "seaHorse",         requiresMin: 300  },
  { id: "lightBlueDolphin", requiresMin: 420  },
  { id: "darkBlueDolphin",  requiresMin: 480  },
  { id: "greyWhale",        requiresMin: 540  },
  { id: "shark",            requiresMin: 720  },
  { id: "turtle",           requiresMin: 1200 },
];

// Returns the array of fish ids that should be unlocked for a given minute count.
export function deriveUnlockedFish(totalMinutes) {
  return FISH_THRESHOLDS
    .filter((f) => totalMinutes >= f.requiresMin)
    .map((f) => f.id);
}

export function loadState(cb) {
  chrome.storage.local.get("gameState", (result) => {
    const state = result.gameState
      ? { ...DEFAULT_STATE, ...result.gameState }
      : { ...DEFAULT_STATE };
    cb(state);
  });
}

export function saveState(state) {
  chrome.storage.local.set({ gameState: state });
}

export function updateState(partial, cb) {
  loadState((current) => {
    const next = { ...current, ...partial };
    saveState(next);
    if (cb) cb(next);
  });
}
