import React from "react";

const Piece = (props) => {
  const { image, size, side, x, y } = props;

  return (
    <div
      style={{
        width: `${side}px`,
        height: `${side}px`,
        margin: "0 -1px -1px",
        border: "1px solid black",
        backgroundImage: `url(${image})`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: `-${x}px -${y}px`,
      }}
    />
  );
};

export default Piece;
