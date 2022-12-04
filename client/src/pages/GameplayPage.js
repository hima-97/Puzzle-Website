import { useLocation } from "react-router-dom";
import PuzzleGame from "../components/Gameplay";

export default function GameplayPage() {
  const { state } = useLocation(); // Game config from or page navigate to

  return <PuzzleGame selectedGameConfig={state} />;
}
