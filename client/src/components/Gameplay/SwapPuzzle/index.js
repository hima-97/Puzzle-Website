import { useMemo, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Game from "./Game";

const Puzzle = (props) => {
  // State for rerendering the component and its children by setting random positions
  const [positions, setPositions] = useState([]);
  // Game will be stored until the component is unloaded
  const game = useMemo(() => new Game(props, setPositions), [props]);
  useEffect(() => {
    if (!props.isDone) {
      game.shufflePosition();
      return;
    }
  }, [props, game]);

  const [height, setHeight] = useState(0);
  // Reference to the element of render document
  const ref = useRef(null);

  // Change puzzle size realtime when the page resized
  useEffect(() => {
    const handleElementResized = () => {
      if (ref.current.clientHeight !== height) {
        setHeight(ref.current.clientHeight);
        game.size = ref.current.clientHeight;
      }
    };
    const resizeObserver = new ResizeObserver(handleElementResized);
    resizeObserver.observe(ref.current);

    // if useEffect returns a function, it is called right before the
    // component unmounts, so it is the right place to stop observing the div
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [game, height]);

  // Init the cell children of the puzzle by positions
  const renderCells = () => {
    const squares = positions.map((i) => {
      return <Cell key={i} game={game} position={i} />;
    });

    return squares;
  };

  // DnD for setting drag and drop library
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: `${game.size}px`,
          marginTop: "5%",
          height: "90%",
        }}
        ref={ref}
      >
        {renderCells()}
      </div>
    </DndProvider>
  );
};

// Stricted props data from parent
Puzzle.propTypes = {
  image: PropTypes.string.isRequired,
  level: PropTypes.number,
  onDone: PropTypes.func,
};

Puzzle.defaultProps = {
  level: 3,
  onDone: () => {},
};

export default Puzzle;
