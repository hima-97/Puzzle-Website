import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";

const Puzzle = (props) => {
  const { game } = props;
  // State for rerendering the component and its children by setting random positions
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    game.registerSetStateFunction(setPositions);
  }, [positions, game]);

  // Init the cell children of the puzzle by positions
  const renderCells = () => {
    const squares = positions.map((val) => {
      return <Cell key={val} game={game} position={val} />;
    });

    return squares;
  };

  return (
    <div
      className="w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        flexWrap: "wrap",
      }}
    >
      {renderCells()}
    </div>
  );
};

// Stricted props data from parent
Puzzle.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Puzzle;
