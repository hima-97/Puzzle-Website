const audio = new Audio(
  "https://cdn.freesound.org/previews/626/626136_13854369-lq.mp3"
);

export default function Piece(props) {
  const { game, index } = props;

  // Calculate the edge length of piece, its position and its position relative to the overall image
  const side = game.size / game.level;
  const [x, y] = game.defaultPieceCoors[game.positions.indexOf(index)];
  const [xBGImage, yBGImage] = game.defaultPieceCoors[index];

  const OnSlidePosition = (index) => {
    audio.play();
    game.onSlidePosition(index);
  };

  return (
    <div
      className={game.isDone ? "" : index === 0 ? "" : "piece"}
      onClick={
        game.isDone || index === 0 ? () => {} : () => OnSlidePosition(index)
      }
      style={{
        width: `${side}px`,
        height: `${side}px`,
        transform: `translate(${x}px,${y}px)`,
        transition: "all 0.3s ease-in",
        boxShadow: "rgb(0 0 0 / 20%) 0 1px 2px 0",
        position: "absolute",
        fontSize: "4rem",
        fontWeight: "bold",
        margin: "0 -1px -1px",
        border: "1px solid black",
      }}
    >
      {index !== 0 || game.isWin ? (
        <div
          className="w-100 h-100"
          style={{
            backgroundImage: `url(${game.image})`,
            backgroundSize: `${game.size}px ${game.size}px`,
            backgroundPosition: `-${xBGImage}px -${yBGImage}px`,
            cursor: `${game.isDone ? "default" : "pointer"}`,
          }}
        />
      ) : (
        <div className="d-flex justify-content-center align-items-center w-100 h-100"></div>
      )}
    </div>
  );
}
