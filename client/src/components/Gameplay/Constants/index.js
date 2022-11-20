export const GameState = {
  SETUP: "setup",
  PLAYING: "playing",
};

// Gameplay config
export const GameType = {
  SWAP_PUZZLE: "Swap Puzzle",
  PUZZLE_15: "15 Puzzle",
};

export const GameDifficulty = {
  min: 2,
  max: 12,
  values: [3, 5, 7, 9, 11],
  defaultValue: 5,
};

export const GameTime = {
  min: 3,
  max: 180,
  values: [30, 60, 90, 120, 150, 180],
  defaultValue: 60,
};
