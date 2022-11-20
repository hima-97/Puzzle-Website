import SwapPuzzle from "./SwapPuzzle";
import Puzzle15 from "./Puzzle15";
import Setting from "./Setting";
import IconButton from "@mui/material/IconButton";
import HelpCenter from "@mui/icons-material/HelpCenter";
import Timer from "./Timer";
import { useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { GameType } from "../Constants";

function RightSide(props) {
  // This right side component is responsible for the hint and timer during playing
  const { image, time, isDone, onDone } = props;
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
      <Timer time={time} onEndCountDown={onEndCountDown} forceStop={isDone} />
      <IconButton onClick={onHintClick} size="small">
        <HelpCenter sx={{ width: 32, height: 32 }} />
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
  const { setGameState } = props;
  const [isDone, setIsDone] = useState(false);
  const isWinRef = useRef(false);

  const onDone = (isWin) => {
    if (isWin) console.log("Conguratulation");
    else console.log("Try again");
    isWinRef.current = isWin;
    setIsDone(true);
  };

  return (
    <div className="vw-100 vh-100 fixed-top bg-white d-flex justify-content-between">
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
        <Setting setGameState={setGameState} />
      </div>

      <RightSide
        image={image}
        time={time}
        isDone={isDone}
        onDone={onDone.bind(this)}
      />
    </div>
  );
}
