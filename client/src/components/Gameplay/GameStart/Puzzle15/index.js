import { useMemo, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Puzzle from "./Puzzle";
import GameController from "./GameController";

const Game = (props) => {
  const { isDone, isWin, onDone, image, level } = props;
  // Game will be stored until the component is unloaded, only stateful values such image, level to not change game state
  const game = useMemo(
    () => new GameController({ image, level }),
    [image, level]
  );

  const [height, setHeight] = useState(0);
  // Reference to the element of render document
  const ref = useRef(null);

  // Change puzzle size realtime when the page resizedt
  useEffect(() => {
    const handleElementResized = () => {
      if (ref.current.clientHeight !== height) {
        setHeight(ref.current.clientHeight);
        game.size = ref.current.clientHeight;

        // Update default piece image size
        game.setDefaultPiecePhysicalPosition();
      }
    };
    const resizeObserver = new ResizeObserver(handleElementResized);
    resizeObserver.observe(ref.current);

    // if useEffect returns a function, it is called right before the
    // component unmounts, so it is the right place to stop observing he div
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [game, height]);

  useEffect(() => {
    game.isDone = isDone;
    game.onDone = onDone;
    game.isWin = isWin;
  }, [isDone, isWin, onDone, game]);

  return (
    <div
      style={{
        width: `${game.size}px`,
        marginTop: "5%",
        height: "90%",
      }}
      ref={ref}
    >
      {game.positions?.length && game.defaultPieceCoors?.length ? (
        <Puzzle game={game} />
      ) : (
        <div />
      )}
    </div>
  );
};

// Stricted props data from parent
Game.propTypes = {
  image: PropTypes.string.isRequired,
  level: PropTypes.number,
  onDone: PropTypes.func,
  isDone: PropTypes.bool,
  isWin: PropTypes.bool,
};

Game.defaultProps = {
  level: 3,
  onDone: (isWin) => {
    console.log("Is Win: " + isWin);
  },
  isDone: false,
  isWin: false,
};

export default Game;
