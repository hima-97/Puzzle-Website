import React from "react";
import { useDrag } from "react-dnd";
import { PuzzleItemTypes } from "./Constants";

const Piece = (props) => {
  const { game, side, x, y, isOver, position } = props;

  // Setting draggable component
  const [, drag] = useDrag(() => ({
    type: PuzzleItemTypes.SQUARE,
    item: { position },
    canDrag: () => !game.isDone,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: `${side}px`,
        height: `${side}px`,
        margin: "0 -1px -1px",
        border: "1px solid black",
        backgroundImage: `url(${game.image})`,
        backgroundSize: `${game.size}px ${game.size}px`,
        backgroundPosition: `-${x}px -${y}px`,
        opacity: `${isOver ? "0.5" : "1"}`,
        cursor: `${game.isDone ? "default" : "move"}`,
      }}
    />
  );
};

export default Piece;
