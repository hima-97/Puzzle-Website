import { useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { GameType, GameDifficulty, GameTime } from "../Constants";
import Piece from "./Piece";
import { shuffle, clamp } from "../Constants/Utility";

function PreviewPuzzle(props) {
  const { image, level } = props;
  const containerRef = useRef();
  const [cellsData, setCellsData] = useState([]);

  // Generate puzzle preview by shuffle image position
  const generatePieces = useCallback(() => {
    if (!level) {
      setCellsData([]);
      return;
    }
    const side = containerRef.current.clientHeight / level;
    const positions = shuffle([...Array(level * level).keys()]);
    setCellsData(
      positions.map((idx) => {
        return {
          side: containerRef.current.clientHeight / level,
          x: (idx % level) * side,
          y: Math.floor(idx / level) * side,
        };
      })
    );
  }, [level]);

  return (
    <div
      className="d-flex flex-column align-items-center mt-5"
      style={{ gap: "20px" }}
    >
      <Button variant="outlined" disabled={!level} onClick={generatePieces}>
        Generate
      </Button>
      <div
        ref={containerRef}
        className={`w-50 justify-content-center align-items-center ${
          cellsData?.length ? "bg-warning" : ""
        }`}
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "w-50",
          aspectRatio: "1 / 1",
        }}
      >
        {cellsData?.length ? (
          cellsData.map((cell, index) => (
            <Piece
              key={index}
              image={image}
              size={containerRef?.current?.clientHeight}
              side={cell.side}
              x={cell.x}
              y={cell.y}
            />
          ))
        ) : (
          <div className="w-100 text-center align-self-center">
            Puzzle Space
          </div>
        )}
      </div>
    </div>
  );
}

function Configuration(props) {
  const { tempConfig, setTempConfig } = props;

  const onChangeSelectType = (evt) => {
    // Rerender with new game type
    const temp = tempConfig.clone();
    temp.gameType = evt.target.value;
    setTempConfig(temp);
  };

  const onChangeDifficulty = (_, value) => {
    // Rerender with new difficulty
    const clampVal = clamp(value, GameDifficulty.min, GameDifficulty.max);
    const temp = tempConfig.clone();
    temp.difficulty = clampVal;
    setTempConfig(temp);
  };

  const onChangeTime = (_, value) => {
    // Rerender with new time
    const clampVal = clamp(value, GameTime.min, GameTime.max);
    const temp = tempConfig.clone();
    temp.time = clampVal;
    setTempConfig(temp);
  };

  const onChangeName = (evt) => {
    // Rerender with new name
    const temp = tempConfig.clone();
    temp.name = evt.target.value;
    setTempConfig(temp);
  };

  return (
    <>
      {/* Name box */}
      <div className="form-outline w-100">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          className="w-100 mb-3"
          value={tempConfig.name}
          onChange={onChangeName}
          inputProps={{ minLength: 4, maxLength: 12 }}
        />
      </div>

      <div className="d-flex justify-content-between" style={{ gap: "20px" }}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="demo-simple-select"
            value={tempConfig.gameType}
            label="Type"
            onChange={onChangeSelectType}
          >
            {Object.values(GameType).map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          options={GameDifficulty.values}
          getOptionLabel={(option) => option.toString()}
          sx={{ width: 300 }}
          freeSolo
          value={tempConfig.difficulty}
          onChange={onChangeDifficulty}
          onInputChange={onChangeDifficulty}
          renderInput={(params) => <TextField {...params} label="Difficulty" />}
        />
        <Autocomplete
          options={GameTime.values}
          getOptionLabel={(option) => option.toString()}
          sx={{ width: 300 }}
          freeSolo
          value={tempConfig.time}
          onChange={onChangeTime}
          onInputChange={onChangeTime}
          renderInput={(params) => <TextField {...params} label="Limit Time" />}
        />
      </div>
    </>
  );
}

export default function GameConfiguration(props) {
  const { tempConfig, setTempConfig } = props;

  return (
    <div>
      <Configuration tempConfig={tempConfig} setTempConfig={setTempConfig} />
      <PreviewPuzzle image={tempConfig.image} level={tempConfig.difficulty} />
    </div>
  );
}
