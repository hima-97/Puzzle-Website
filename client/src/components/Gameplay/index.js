import { useState } from "react";
import { GameDifficulty, GameState, GameType } from "./Constants";
import Setup from "./GameSetup";
import GameConfig from "./GameSetup/GameConfig";
import PuzzleGame from "./GameStart";
import "./gameStyle.css";

export default function Gameplay({ selectedGameConfig }) {
  const [gameState, setGameState] = useState(GameState.SETUP);
  const [gameConfig, setGameConfig] = useState(selectedGameConfig);

  return (
    <div>
      {(gameState === GameState.SETUP && (
        <Setup
          setGameState={setGameState}
          setGameConfig={setGameConfig}
          selectedGameConfig={
            selectedGameConfig
              ? selectedGameConfig
              : new GameConfig(
                  GameDifficulty.defaultValue,
                  GameType.SWAP_PUZZLE,
                  GameType.defaultValue,
                  null,
                  "puzzle-name"
                )
          }
        />
      )) || <PuzzleGame gameState={gameState} setGameState={setGameState} gameConfig={gameConfig} />}
    </div>
  );
}
