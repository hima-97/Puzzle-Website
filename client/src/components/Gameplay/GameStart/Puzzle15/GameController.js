import { shuffle } from "../../Constants/Utility";

export default class GameController {
  constructor({ image, level }) {
    // Initialize game config for the puzzle: level, image, onDone behaviour
    console.log("Game", { image, level });
    this.level = level;
    this.image = image;
    // this.size = 0;
    // this.isDone = null;
    // this.isWin = null;
    // this.onDone = null;

    this.shufflePosition();
  }

  shufflePosition() {
    // Setup game state and rerender state function
    const cells = this.level * this.level;
    this.positions = [...Array(cells).keys()];
    this.positions = shuffle(this.positions); // shuffle positions of the pieces
  }

  setDefaultPiecePhysicalPosition() {
    // Piece physical coordinates on the board
    const cells = this.level * this.level;
    this.defaultPieceCoors = [...Array(cells).keys()].map((_, idx) => {
      const side = this.size / this.level;
      const row = Math.floor(idx / this.level);
      const col = idx % this.level;
      return [side * col, side * row];
    });
  }

  registerSetStateFunction(...states) {
    this.setPositionsState = states[0];
    this.setPositionsState(this.positions);
  }

  onSlidePosition(index) {
    let emptyIndex = this.positions.indexOf(0);
    let targetIndex = this.positions.indexOf(index);
    const dif = Math.abs(targetIndex - emptyIndex);

    // Swap in case the slide piece adjacent to empty piece
    if (dif === 1 || dif === this.level) {
      // Create temp for update the array object so that set state know different of array object
      const tempPositions = [...this.positions];
      tempPositions[emptyIndex] = index;
      tempPositions[targetIndex] = 0;
      this.positions = tempPositions;

      this.setPositionsState(this.positions);

      // Check win
      let isWin = this.positions.every((value, index, _) => {
        return index === 0 || index === value;
      });

      if (isWin) {
        window.alert("U Win!!!");
      }
    }
  }
}
