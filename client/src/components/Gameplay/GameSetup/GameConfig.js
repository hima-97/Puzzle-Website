export default class GameConfig {
  constructor(difficulty, gameType, time, image) {
    this.difficulty = difficulty;
    this.gameType = gameType;
    this.time = time;
    this.image = image;
  }

  isInvalidData() {
    return !this.difficulty || !this.gameType || !this.time || !this.image;
  }
}
