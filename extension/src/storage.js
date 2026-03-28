// storage.js — thin wrapper around chrome.storage.local
// All data lives in a single "gameState" key.

const DEFAULT_STATE = {
  totalMinutes: 0,
  unlockedFish: ["blueFish"],   // fish ids
  unlockedAchievements: [],     // achievement ids
};

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
