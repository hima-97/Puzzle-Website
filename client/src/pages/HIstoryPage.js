import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { HistoryService } from "../Services";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import StrictNavOnAuth from "../components/StrictNavOnAuth";
import { useNavigate } from "react-router-dom";
import GameConfig from "../components/Gameplay/GameSetup/GameConfig";

function PuzzleItem({ item }) {
  const navigate = useNavigate();

  const handleSelectPuzzle = () => {
    const gameConfig = new GameConfig();
    gameConfig.getFromJson(item.puzzleData);
    navigate("/gameplay", {
      state: gameConfig,
    });
  };

  return (
    <div className="card mb-3 border-0 mw-100 col-md-8">
      <div className="card-body d-flex h-100">
        {/* Puzzle image */}
        <div>
          <img
            style={{ maxHeight: "10rem", aspectRatio: "1 / 1" }}
            src={item.puzzleData.image}
            className="img-fluid rounded-3"
            alt="Shopping item"
          />
        </div>
        {/* Puzzle content */}
        <div className="mx-3 col-8">
          <h5 className="text-truncate" style={{ height: "1.25rem" }}>
            {item.puzzleData.name}
          </h5>
          <div className="d-flex row">
            {/* Puzzle data */}
            <div className="col-6">
              <span>Game Type: {item.puzzleData.gameType}</span>
              <br />
              <span>Difficulty: {item.puzzleData.difficulty}</span>
              <br />
              <span>Time: {item.puzzleData.duration}</span>
              <br />
            </div>
            {/* Record data */}
            <div className="col-6">
              <span>Result: {item.result ? "Win" : "Lose"}</span>
              <br />
              {item.result && item.completedTime ? (
                <>
                  <span className="text-truncate" style={{ height: "1rem" }}>
                    Completed Time: {item.completedTime}
                  </span>
                  <br />
                </>
              ) : (
                <></>
              )}
              <span>Played At: {new Date(item.updatedAt).toGMTString()}</span>
              <br />
            </div>
          </div>
          {/* Start button */}
          <button
            type="button"
            className="btn btn-info text-white p-1"
            onClick={handleSelectPuzzle}
          >
            Replay Game
          </button>
        </div>
      </div>
    </div>
  );
}

function Items({ currentItems }) {
  return (
    <div className="d-flex row justify-content-center mw-100">
      {currentItems &&
        currentItems.map((item) =>
          item ? <PuzzleItem item={item} key={item._id} /> : <></>
        )}
    </div>
  );
}

export default function HistoryPage({ isLoggedIn, isAuth }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const [dateTo, setDateTo] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the first time
  useEffect(() => {
    if (isAuth)
      handleSubmit(
        new Date(new Date().setDate(new Date().getDate() - 1)),
        new Date()
      );
  }, [isAuth]);

  // Handle searching by apply search keywork with pagination
  const handleSubmit = (dateFrom, dateTo) => {
    setIsLoading(true);
    HistoryService.search(dateFrom, dateTo)
      .then((res) => {
        setCurrentItems(res.data);
        setDateFrom(dateFrom);
        setDateTo(dateTo);
      })
      .finally(() => setIsLoading(false));
  };

  const handleChangeDateFrom = (newValue) => {
    handleSubmit(newValue, dateTo);
  };

  const handleChangeDateTo = (newValue) => {
    handleSubmit(dateFrom, newValue);
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h3 className="mb-3">Your Recent History</h3>

      <div className="d-flex gap-4">
        {/* Create context for datetime mui */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="From"
            inputFormat="MM/DD/YYYY"
            value={dateFrom}
            onChange={handleChangeDateFrom}
            renderInput={(params) => <TextField {...params} />}
          />

          <DateTimePicker
            label="To"
            inputFormat="MM/DD/YYYY"
            value={dateTo}
            onChange={handleChangeDateTo}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <Items currentItems={currentItems} />

      <Loading isLoading={isLoading} />
      <StrictNavOnAuth
        isLoggedIn={isLoggedIn}
        isAuth={isAuth}
        page="NotLogin"
      />
    </div>
  );
}
