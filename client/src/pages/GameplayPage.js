import { useLocation } from "react-router-dom";
import PuzzleGame from "../components/Gameplay";

export default function GameplayPage({ isLoggedIn }) {
  const { state } = useLocation(); // Game config from or page navigate to

  return <PuzzleGame selectedGameConfig={state} isLoggedIn={isLoggedIn} />;
}
