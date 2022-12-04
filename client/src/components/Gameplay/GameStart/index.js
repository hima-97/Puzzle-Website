import SwapPuzzle from "./SwapPuzzle";
import Puzzle15 from "./Puzzle15";
import Setting from "./Setting";
import IconButton from "@mui/material/IconButton";
import HelpCenter from "@mui/icons-material/HelpCenter";
import Timer from "./Timer";
import { useEffect, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { GameState, GameType } from "../Constants";
import { GameService } from "../../../Services";
import Loading from "../../Loading";
import ResultPopup from "./Result/ResultPopup";

function RightSide(props) {
  // This right side component is responsible for the hint and timer during playing
  const { image, time, forceStop, onDone, onStopTime } = props;
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onCloseDialogClick = () => {
    setIsOpenDialog(false);
  };

  const onHintClick = () => {
    setIsOpenDialog(true);
  };

  const onEndCountDown = () => {
    onDone(false);
  };

  return (
    <div className="right mt-3 me-3 d-flex align-items-end flex-column">
      <Timer
        time={time}
        onEndCountDown={onEndCountDown}
        forceStop={forceStop}
        onStopTime={onStopTime}
      />
      <IconButton onClick={onHintClick} size="small">
        <HelpCenter sx={{ width: 32, height: 32 }} style={{ color: "azure" }} />
      </IconButton>

      {/* Hint image */}
      <Backdrop open={isOpenDialog}>
        <div className="w-100 h-100" onClick={onCloseDialogClick} />
        <div
          className="h-75 position-absolute"
          style={{ aspectRatio: "1 / 1" }}
        >
          <img src={image} alt="hint" className="w-100 h-100" />
        </div>
      </Backdrop>
    </div>
  );
}

export default function PuzzleGame(props) {
  // The component for all game container, this hold states that affecting the all components
  const { difficulty, gameType, time, image } = { ...props.gameConfig };
  const { gameState, setGameState } = props;

  // This state use for clear timer interval
  const [isExit, setIsExit] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const isWinRef = useRef(false);
  const [isShowResultPopup, setIsShowResultPopup] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Stop timer when the game is end
  const onDone = (isWin, isSave = true) => {
    setIsDone(true);
    // Case force exit game
    if (isExit) return;
    isWinRef.current = isWin;

    // If end countdown, save lose result
    if (!isWin && isSave) {
      GameService.endGame(props.gameConfig, isWinRef.current, time)
        .then(() => {
          // Open lose popup
          setIsShowResultPopup(true);
        })
        .finally(() => setIsLoading(false));
    }
  };

  // Wait for onDone and receiving time from Timer, this case is win
  const onStopTime = (time) => {
    // Case force exit game
    if (isExit) return;
    if (isWinRef.current) console.log("Conguratulation");
    else console.log("Try again");

    // Save history
    setIsLoading(true);
    GameService.endGame(props.gameConfig, isWinRef.current, time)
      .then(() => {
        // Open win popup
        setIsShowResultPopup(true);
      })
      .finally(() => setIsLoading(false));
  };

  // Wait for next render to stop timer
  useEffect(() => {
    if (isExit) setGameState(GameState.SETUP);
  }, [isExit, setGameState]);

  const onExitClick = () => {
    setIsDone(true);
    setIsExit(true);
  };

  return (
    <div
      className="vw-100 vh-100 fixed-top bg-white d-flex justify-content-between"
      style={{
        background:
          "url(https://dynamicresults.com/wp-content/uploads/2014/02/bg-puzzle.jpg) no-repeat center",
        backgroundSize: "cover",
      }}
    >
      {/* Game space */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%)",
          height: "100%",
        }}
      >
        {(gameType === GameType.SWAP_PUZZLE && (
          <SwapPuzzle
            image={image}
            level={difficulty}
            isDone={isDone}
            isWin={isWinRef.current}
            onDone={onDone.bind(this)}
          />
        )) || (
          <Puzzle15
            image={image}
            level={difficulty}
            isDone={isDone}
            isWin={isWinRef.current}
            onDone={onDone.bind(this)}
          />
        )}
      </div>

      <div className="left mt-3 ms-3">
        <Setting onExitClick={onExitClick} />
      </div>

      <RightSide
        image={image}
        time={time}
        forceStop={isDone || gameState !== GameState.PLAYING}
        onDone={onDone.bind(this)}
        onStopTime={onStopTime}
      />

      {isShowResultPopup ? (
        <ResultPopup
          result={isWinRef.current}
          setIsShowResultPopup={setIsShowResultPopup}
          image={image}
        />
      ) : (
        <></>
      )}
      <Loading isLoading={isLoading} />
    </div>
  );
}
