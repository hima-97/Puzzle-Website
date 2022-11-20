import { useState } from "react";
import { GameState } from "./Constants";
import Setup from "./GameSetup";
import GameConfig from "./GameSetup/GameConfig";
import PuzzleGame from "./GameStart";
import "./gameStyle.css";

export default function Gameplay() {
  const [gameState, setGameState] = useState(GameState.SETUP);
  const [gameConfig, setGameConfig] = useState(new GameConfig());

  return (
    <div>
      {(gameState === GameState.SETUP && (
        <Setup setGameState={setGameState} setGameConfig={setGameConfig} />
      )) || <PuzzleGame setGameState={setGameState} gameConfig={gameConfig} />}
    </div>
  );
}
