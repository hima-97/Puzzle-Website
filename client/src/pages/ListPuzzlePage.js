import { useEffect, useState } from "react";
import Pagination, { paginationInfo } from "../components/Utility/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import { PuzzleService } from "../Services";

// Example items, to simulate fetching from another resources.
const items = [...Array(100).keys()];

function PuzzleItem({ data }) {
  const handleSelectPuzzle = () => {};

  return (
    <div className="card mb-3 border-0 mw-100 col-md-6">
      <div className="card-body d-flex h-100">
        {/* Puzzle image */}
        <div className="col-4">
          <img
            style={{ maxHeight: "10rem", aspectRatio: "1 / 1" }}
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
            className="img-fluid rounded-3"
            alt="Shopping item"
          />
        </div>
        {/* Puzzle content */}
        <div className="mx-3 col-8">
          <h5 className="text-truncate" style={{ height: "1.25rem" }}>
            Puzzle Name Puzzle Name Puzzle NamePuzzle Name Puzzle NamevPuzzle
            Name
          </h5>
          <span>Game Type:</span>
          <br />
          <span className="text-truncate" style={{ height: "1rem" }}>
            Category:
          </span>
          <br />
          <span>Difficulty:</span>
          <br />
          <span>Time:</span>
          <br />
          {/* Start button */}
          <button
            type="button"
            className="btn btn-info text-white p-1"
            onClick={handleSelectPuzzle}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

function Items({ currentItems }) {
  return (
    <div className="d-flex row align-items-center mw-100">
      {currentItems &&
        currentItems.map((item) => <PuzzleItem item={item} key={item} />)}
    </div>
  );
}

export default function ListPuzzlePage() {
  // Get search query from outside
  const search = useLocation().search;
  const q = new URLSearchParams(search).get("q");

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [paginationData, setPaginationData] = useState(paginationInfo);
  const [isLoading, setIsLoading] = useState(false);

  const [keyword, setKeyword] = useState(q);

  // Fetch data after component render
  useEffect(() => {
    paginationData.totalItems = items.length;
    setCurrentItems(
      items.slice(
        paginationData.pageIndex * paginationData.itemsPerPage,
        (paginationData.pageIndex + 1) * paginationData.itemsPerPage
      )
    );
  }, [paginationData]);

  // Handle searching by apply search keywork with pagination
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    PuzzleService.search(keyword, paginationData)
      .then(() => {})
      .finally(() => setIsLoading(false));
  };

  const onChangeSearchInput = (evt) => {
    setKeyword(evt.target.value);
  };

  // Handle searching by apply search keywork with pagination
  const onChangePaginationData = (newPage) => {
    // Temp for copy data from the state, because state is immutable
    const temp = { ...paginationData };
    temp.pageIndex = Math.max(Math.min(newPage, Number.MAX_SAFE_INTEGER), 0);
    // if not change page return
    if (temp.pageIndex === paginationData.pageIndex) return;

    setIsLoading(true);
    PuzzleService.search(keyword, temp)
      .then((res) => {
        temp.totalItems = res.totalItems;
        setCurrentItems(res.data);
        setPaginationData(temp);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h3 className="mb-3">Puzzle List</h3>

      {/* Search box */}
      <form
        className="d-flex align-items-center position-relative mx-md-5"
        onSubmit={handleSubmit}
        style={{ minWidth: "50%" }}
      >
        <div className="form-outline w-100">
          <input
            id="search-focus"
            type="search"
            name="search"
            className="form-control"
            value={keyword}
            onChange={onChangeSearchInput}
          />
        </div>
        <button
          type="submit"
          className="position-absolute btn px-2"
          style={{ left: "100%", borderRadius: "50%" }}
        >
          <SearchIcon />
        </button>
      </form>

      {/* List Content */}
      <Pagination
        paginationData={paginationData}
        onChangePaginationData={onChangePaginationData}
      />

      <Items currentItems={currentItems} />

      <Pagination
        paginationData={paginationData}
        setPaginationData={setPaginationData}
      />

      <Loading isLoading={isLoading} />
    </div>
  );
}
