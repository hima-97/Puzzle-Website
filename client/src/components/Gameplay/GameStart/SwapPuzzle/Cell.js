import { useDrop } from "react-dnd";
import Piece from "./Piece";
import { PuzzleItemTypes } from "./Constants";

const audio = new Audio(
  "https://cdn.freesound.org/previews/352/352176_5121236-lq.mp3"
);

const Cell = (props) => {
  const { game, position } = props;
  // Caculate each side, and position in the overall image of the cell, which is dropable component. The cell is a square
  const side = game.size / game.level;
  const x = (position % game.level) * side;
  const y = Math.floor(position / game.level) * side;

  const PlaySound = () => {
    audio.play();
  };

  // Setting dropable component
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: PuzzleItemTypes.SQUARE,
      canDrop: () => !game.isDone,
      drop: (item) => {
        // Play drop sound
        PlaySound();
        game.onSwap(item.position, props.position);
      },
      collect: (monitor) => ({
        isOver: game.isDone ? false : !!monitor.isOver(),
      }),
    }),
    [x, y]
  );

  return (
    <div className={game.isDone ? "" : "piece"} ref={drop}>
      <Piece
        game={game}
        position={position}
        side={side}
        x={x}
        y={y}
        isOver={isOver}
      />
    </div>
  );
};

export default Cell;
