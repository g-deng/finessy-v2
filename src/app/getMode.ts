
export type GameMode = "infinite" | "sprint" | "perfection" | "learn" | undefined;

let mode: GameMode = undefined;

/**
 * Get current game mode.
 * This is a simple way to access the game mode from anywhere in the app
 */
export function getMode(): GameMode {
  return mode;
}

export function setMode(newMode: GameMode) {
  mode = newMode;
}
