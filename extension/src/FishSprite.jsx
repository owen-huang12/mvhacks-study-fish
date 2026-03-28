// Fish sprite images should be placed in src/assets/fish/
// and named to match the sprite key, e.g. common.png, rare.png, etc.
// Import them here as you add them.
const spriteImages = {
  // common: commonImg,
};

function FishSprite({ sprite = "common" }) {
  const src = spriteImages[sprite];

  return (
    <div className="fish-sprite">
      {src ? (
        <img src={src} alt={sprite} />
      ) : (
        <div className="fish-placeholder">{sprite}</div>
      )}
    </div>
  );
}

export default FishSprite;
