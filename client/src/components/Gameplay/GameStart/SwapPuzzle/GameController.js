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

  registerSetStateFunction(...states) {
    this.setPositionsState = states[0];
    this.setPositionsState(this.positions);
  }

  onSwap(sourcePosition, dropPosition) {
    const oldPositions = this.positions.slice();
    const newPositions = [];
    let isWin = true;
    let pos = 0;

    // Loop through the old positions to swap the drag position and drop position
    for (let idx in oldPositions) {
      let value = oldPositions[idx];
      let newValue = value;

      if (value === sourcePosition) {
        newValue = dropPosition;
      } else if (value === dropPosition) {
        newValue = sourcePosition;
      }

      newPositions.push(newValue);

      // check the positions of the puzzle is sorted or not, if not -> not done
      if (newValue !== pos) {
        isWin = false;
      }

      pos = pos + 1;
    }

    // Update the state to rerender the game
    this.positions = newPositions;
    this.setPositionsState(this.positions);

    if (isWin) {
      this.onDone(true);
    }
  }
}
