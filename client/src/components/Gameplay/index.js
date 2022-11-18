import SwapPuzzle from "./SwapPuzzle";
import { Image } from "./Image";
import Setting from "./Setting";
import IconButton from "@mui/material/IconButton";
import HelpCenter from "@mui/icons-material/HelpCenter";
import Timer from "./Timer";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";

function RightSide(props) {
  const { isDone, onDone } = props;
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onCloseDialogClick = () => {
    setIsOpenDialog(false);
  };

  const onHintClick = () => {
    console.log("onHintClick");
    setIsOpenDialog(true);
  };

  const onEndCountDown = () => {
    console.log("onEndCountDown");
    onDone(false);
  };

  return (
    <div className="right mt-3 me-3 d-flex align-items-end flex-column">
      <Timer time={10} onEndCountDown={onEndCountDown} forceStop={isDone} />
      <IconButton onClick={onHintClick} size="small">
        <HelpCenter sx={{ width: 32, height: 32 }} />
      </IconButton>

      <Backdrop open={isOpenDialog}>
        <div className="w-100 h-100" onClick={onCloseDialogClick} />
        <div
          className="h-75 position-absolute"
          style={{ aspectRatio: "1 / 1" }}
        >
          <img src={Image} alt="hint" className="w-100 h-100" />
        </div>
      </Backdrop>
    </div>
  );
}

export default function PuzzleGame() {
  const [isDone, setIsDone] = useState(false);

  const onDone = (isWin) => {
    if (isWin) console.log("Conguratulation");
    else console.log("Try again");
    setIsDone(true);
  };

  return (
    <div className="vw-100 vh-100 fixed-top bg-white d-flex justify-content-between">
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%)",
          height: "100%",
        }}
      >
        <SwapPuzzle
          image={Image}
          level={3}
          isDone={isDone}
          onDone={onDone.bind(this)}
        />
      </div>

      <div className="left mt-3 ms-3">
        <Setting />
      </div>

      <RightSide isDone={isDone} onDone={onDone.bind(this)} />
    </div>
  );
}
