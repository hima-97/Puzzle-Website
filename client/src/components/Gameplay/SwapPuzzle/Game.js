import { shuffle } from "../Utility";

export default class Game {
  constructor({ image, level, isDone, onDone }, ...states) {
    // Initialize game config for the puzzle: level, image, onDone behaviour
    console.log({ image, level, isDone, onDone }, states);
    this.level = level;
    this.image = image;
    this.isDone = isDone;
    // this.size = 0;
    this.onDone = onDone;
    this.setPositionsState = states[0];
  }

  shufflePosition() {
    // Setup game state and rerender state function
    const cells = this.level * this.level;
    this.positions = [...Array(cells).keys()];
    this.positions = shuffle(this.positions); // shuffle positions of the pieces
    this.setPositionsState(this.positions);
  }

  onSwap(sourcePosition, dropPosition) {
    const oldPositions = this.positions.slice();
    const newPositions = [];
    let done = true;
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
        done = false;
      }

      pos = pos + 1;
    }

    // Update the state to rerender the game
    this.positions = newPositions;
    this.setPositionsState(this.positions);

    if (done) {
      this.onDone(true);
    }
  }
}
