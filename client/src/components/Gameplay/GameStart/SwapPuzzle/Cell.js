import { useDrop } from "react-dnd";
import Piece from "./Piece";
import { PuzzleItemTypes } from "./Constants";

const Cell = (props) => {
  const { game, position } = props;
  // Caculate each side, and position in the overall image of the cell, which is dropable component. The cell is a square
  const side = game.size / game.level;
  const x = (position % game.level) * side;
  const y = Math.floor(position / game.level) * side;

  // Setting dropable component
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: PuzzleItemTypes.SQUARE,
      canDrop: () => !game.isDone,
      drop: (item) => {
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
