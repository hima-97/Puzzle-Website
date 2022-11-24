import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Piece from "./Piece";

const Puzzle = (props) => {
  const { game } = props;
  // State for rerendering the component and its children by setting random positions
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    game.registerSetStateFunction(setPositions);
  }, [positions, game]);

  // Init the child pieces of the puzzle by positions
  const renderPieces = () => {
    const squares = positions.map((_, idx) => {
      return <Piece key={idx} game={game} index={idx} />;
    });

    return squares;
  };

  return <div className="w-100 h-100">{renderPieces()}</div>;
};

// Stricted props data from parent
Puzzle.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Puzzle;
