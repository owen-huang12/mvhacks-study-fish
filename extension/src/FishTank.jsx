import { useState, useEffect } from "react";
import blueFishGif from "./pixel gif/blueFish.gif";
import nemoGif from "./pixel gif/nemo.gif";
import tunaGif from "./pixel gif/tuna.gif";
import blueGoldFishGif from "./pixel gif/blueGoldFish.gif";
import greenYellowGif from "./pixel gif/greenYellowFish.gif";
import goldenFishGif from "./pixel gif/goldenFish.gif";
import jellyFishGif from "./pixel gif/jellyFish.gif";
import seaHorseGif from "./pixel gif/seaHorse.gif";
import dolphinGif from "./pixel gif/dolphin.gif";
import greyWhaleGif from "./pixel gif/greyWhale.gif";
import sharkGif from "./pixel gif/shark.gif";
import turtleGif from "./pixel gif/turtle.gif";

// facesRight: true means the GIF naturally faces right (needs flipping for left travel)
const GIF_MAP = {
  blueFish:        { gif: blueFishGif,     size: 65 },
  nemoFish:        { gif: nemoGif,         size: 65, facesRight: true },
  nemoFish2:       { gif: nemoGif,         size: 65, facesRight: true },
  tuna:            { gif: tunaGif,         size: 70, facesRight: true },
  blueGoldFish:    { gif: blueGoldFishGif, size: 65 },
  greenYellowFish: { gif: greenYellowGif,  size: 65, facesRight: true },
  goldenFish:      { gif: goldenFishGif,   size: 50 },
  jellyFish:       { gif: jellyFishGif,    size: 33, facesRight: true },
  seaHorse:        { gif: seaHorseGif,     size: 55 },
  lightBlueDolphin:{ gif: dolphinGif,      size: 90, facesRight: true },
  darkBlueDolphin: { gif: dolphinGif,      size: 90, facesRight: true },
  greyWhale:       { gif: greyWhaleGif,    size: 110 },
  shark:           { gif: sharkGif,        size: 50 },
  turtle:          { gif: turtleGif,       size: 75, facesRight: true },
};

// How many fish swim at once
const FISH_COUNT = 5;

function pickSlots(unlockedFish) {
  const valid = unlockedFish.filter((id) => GIF_MAP[id]);
  if (!valid.length) return [];
  return Array.from({ length: FISH_COUNT }, (_, i) => {
    const id = valid[Math.floor(Math.random() * valid.length)];
    const entry = GIF_MAP[id];
    const goRight = Math.random() > 0.5;
    // flip if: going right and faces left, OR going left and faces right
    const needsFlip = goRight !== !!entry.facesRight;
    return {
      key: `${i}-${Date.now()}-${Math.random()}`,
      gif: entry.gif,
      size: entry.size,
      goRight,
      needsFlip,
      // ── Y SPAWN RANGE ──────────────────────────────────────────────
      // Both values are % from the top of the study-page image (0 = top, 100 = bottom).
      // First number  = top of the water zone (raise to spawn higher).
      // Second number = bottom of the water zone (lower to spawn deeper).
      top: 65 + Math.random() * 15,
      duration: 9 + Math.random() * 9,
      delay: -(Math.random() * 16),
    };
  });
}

export default function FishTank({ unlockedFish = ["blueFish"] }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const valid = unlockedFish.filter((id) => GIF_MAP[id]);
    if (valid.length > 0) setSlots(pickSlots(valid));
  }, [unlockedFish.join(",")]);

  return (
    <div className="fish-tank">
      {slots.map((f) => (
        <img
          key={f.key}
          src={f.gif}
          className="swimming-fish"
          style={{
            top: `${f.top}%`,
            width: `${f.size}px`,
            animationName: f.goRight ? "swimRight" : "swimLeft",
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            transform: f.needsFlip ? "scaleX(-1)" : "none",
          }}
          alt={f.key}
        />
      ))}
    </div>
  );
}
