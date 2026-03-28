import { useState } from "react";
import blueFish from "./pixel fish/blueFish.png";
import blueGoldFish from "./pixel fish/blueGoldFish.png";
import darkBlueDolphin from "./pixel fish/darkBlueDolphin.png";
import goldenFish from "./pixel fish/goldenFish.png";
import greenYellowFish from "./pixel fish/greenYellowFish.png";
import greyWhale from "./pixel fish/greyWhale.png";
import jellyFish from "./pixel fish/jellyFish.png";
import lightBlueDolphin from "./pixel fish/lightBlueDolphin.png";
import nemoFish from "./pixel fish/nemoFish.png";
import nemoFish2 from "./pixel fish/nemoFish2.png";
import seaHorse from "./pixel fish/seaHorse.png";
import shark from "./pixel fish/shark.png";
import tuna from "./pixel fish/tuna.png";
import turtle from "./pixel fish/turtle.png";

const FISH_COLLECTION = [
  {
    id: "blueFish", name: "Blue Fish", img: blueFish, requiresMin: 0,
    scientific: "Chromis viridis",
    blurb: "The Blue Fish is a peaceful reef dweller found across the Indo-Pacific. It forms large schools near coral branches for protection.",
    facts: ["Can change shade depending on mood.", "One of the most common reef fish.", "Feeds mostly on plankton."],
  },
  {
    id: "nemoFish", name: "Nemo", img: nemoFish, requiresMin: 10,
    scientific: "Amphiprion ocellaris",
    blurb: "The clownfish lives in a symbiotic relationship with sea anemones. The anemone protects the fish; the fish chases away predators.",
    facts: ["All clownfish are born male.", "They are immune to anemone stings.", "They never stray far from their anemone."],
  },
  {
    id: "nemoFish2", name: "Nemo's Friend", img: nemoFish2, requiresMin: 20,
    scientific: "Amphiprion percula",
    blurb: "A close cousin of the common clownfish, the percula is slightly smaller and has bolder black outlines on its white stripes.",
    facts: ["Pairs mate for life.", "The female is always dominant.", "They communicate through popping sounds."],
  },
  {
    id: "tuna", name: "Tuna", img: tuna, requiresMin: 30,
    scientific: "Thunnus thynnus",
    blurb: "The Atlantic Bluefin Tuna is one of the fastest fish in the ocean. It can regulate its body temperature, unlike most fish.",
    facts: ["Can swim up to 70 km/h.", "They are warm-blooded fish.", "A single fish can weigh over 680 kg."],
  },
  {
    id: "blueGoldFish", name: "Blue Goldfish", img: blueGoldFish, requiresMin: 60,
    scientific: "Carassius auratus var.",
    blurb: "A rare colour variant of the domesticated goldfish. Prized by collectors for its unusual blue-tinted scales.",
    facts: ["Goldfish can live over 20 years.", "They have a memory span of months, not seconds.", "Originally bred in ancient China."],
  },
  {
    id: "greenYellowFish", name: "Tropical Fish", img: greenYellowFish, requiresMin: 90,
    scientific: "Halichoeres chrysus",
    blurb: "The Yellow Coris Wrasse is a bright, active fish found in tropical reefs. It buries itself in sand at night to sleep.",
    facts: ["Juveniles look completely different from adults.", "They sleep buried in the sand.", "Can change sex from female to male."],
  },
  {
    id: "goldenFish", name: "Golden Fish", img: goldenFish, requiresMin: 120,
    scientific: "Carassius auratus auratus",
    blurb: "The classic golden carp, symbol of luck and perseverance in many cultures. Kept in ponds for over a thousand years.",
    facts: ["Can recognise their owners.", "Their scales reflect light uniquely.", "Ancient Chinese royalty kept them in jade bowls."],
  },
  {
    id: "jellyFish", name: "Jellyfish", img: jellyFish, requiresMin: 240,
    scientific: "Aurelia aurita",
    blurb: "The Moon Jellyfish is found in every ocean. It has no brain, no heart, and no bones — yet has survived for 500 million years.",
    facts: ["95% of their body is water.", "Some species are considered biologically immortal.", "They navigate using light-sensing cells."],
  },
  {
    id: "seaHorse", name: "Sea Horse", img: seaHorse, requiresMin: 300,
    scientific: "Hippocampus hippocampus",
    blurb: "The Short-snouted Seahorse is one of the few animals where the male carries and gives birth to offspring.",
    facts: ["Males give birth to up to 2,000 young.", "They mate for life and greet each other daily.", "They have no stomach — they must eat constantly."],
  },
  {
    id: "lightBlueDolphin", name: "Dolphin", img: lightBlueDolphin, requiresMin: 420,
    scientific: "Delphinus delphis",
    blurb: "The Common Dolphin is one of the most widespread dolphin species. It is highly social and often rides the bow waves of ships.",
    facts: ["They sleep with one eye open.", "Dolphins call each other by unique whistle names.", "They are one of the few animals that play for fun."],
  },
  {
    id: "darkBlueDolphin", name: "Dark Dolphin", img: darkBlueDolphin, requiresMin: 480,
    scientific: "Lagenorhynchus obscurus",
    blurb: "The Dusky Dolphin is known for its acrobatic leaps and cooperative hunting. It is found in cold coastal waters of the Southern Hemisphere.",
    facts: ["They herd fish into tight balls before feeding.", "Groups can number in the thousands.", "Known for some of the most impressive aerial displays of any dolphin."],
  },
  {
    id: "greyWhale", name: "Grey Whale", img: greyWhale, requiresMin: 540,
    scientific: "Eschrichtius robustus",
    blurb: "The Grey Whale makes one of the longest migrations of any mammal — up to 20,000 km round-trip each year.",
    facts: ["They are covered in barnacles and whale lice.", "They feed by filtering sediment from the seafloor.", "Once hunted to near extinction, they have largely recovered."],
  },
  {
    id: "shark", name: "Shark", img: shark, requiresMin: 720,
    scientific: "Carcharodon carcharias",
    blurb: "The Great White Shark is the ocean's apex predator. Despite its fearsome reputation, it rarely targets humans intentionally.",
    facts: ["They can detect one drop of blood in 100 litres of water.", "Their teeth are replaced throughout their lifetime.", "They have been on Earth for over 400 million years."],
  },
  {
    id: "turtle", name: "Sea Turtle", img: turtle, requiresMin: 1200,
    scientific: "Chelonia mydas",
    blurb: "The Green Sea Turtle has roamed the oceans for over 100 million years. Females return to the exact beach where they were born to lay eggs.",
    facts: ["They can hold their breath for up to 7 hours.", "Temperature determines the sex of hatchlings.", "They can live for over 80 years."],
  },
];

function FishModal({ fish, unlocked, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {unlocked ? (
          <>
            <div className="modal-scientific">{fish.scientific}</div>
            <div className="modal-img-wrapper">
              <img src={fish.img} alt={fish.name} className="modal-img" />
            </div>
            <div className="modal-name">{fish.name}</div>
            <p className="modal-blurb">{fish.blurb}</p>
            <ul className="modal-facts">
              {fish.facts.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </>
        ) : (
          <>
            <div className="modal-img-wrapper locked">
              <img src={fish.img} alt="???" className="modal-img locked-img" />
              <span className="modal-locked-question">?</span>
            </div>
            <div className="modal-name">???</div>
            <p className="modal-unlock-hint">
              Study for {fish.requiresMin} minutes to unlock this fish.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function CollectionCard({ fish, unlocked, onClick }) {
  return (
    <div className="collection-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="collection-card-img-wrapper">
        <img
          src={fish.img}
          alt={fish.name}
          className={`collection-card-img ${unlocked ? "" : "locked-img"}`}
        />
        {!unlocked && <span className="locked-question">?</span>}
      </div>
      <div className="collection-card-name">{fish.name}</div>
      <div className="collection-card-status">
        {unlocked ? "unlocked" : `${fish.requiresMin}m`}
      </div>
    </div>
  );
}

function Collection({ totalMinutes = 0 }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="collection-wrapper">
      <div className="collection-grid">
        {FISH_COLLECTION.map((fish) => (
          <CollectionCard
            key={fish.id}
            fish={fish}
            unlocked={totalMinutes >= fish.requiresMin}
            onClick={() => setSelected(fish)}
          />
        ))}
      </div>

      {selected && (
        <FishModal
          fish={selected}
          unlocked={totalMinutes >= selected.requiresMin}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default Collection;
