export default class GameConfig {
  constructor(difficulty, gameType, time, image, name) {
    this.difficulty = difficulty;
    this.gameType = gameType;
    this.time = time;
    this.image = image;
    this.name = name;
    // this.puzzleId = null;
  }

  isInvalidData() {
    return (
      !this.difficulty ||
      !this.gameType ||
      !this.time ||
      !this.image ||
      !this.name
    );
  }

  getFromJson(data) {
    this.difficulty = data.difficulty;
    this.gameType = data.gameType;
    this.time = data.duration;
    this.image = data.image;
    this.name = data.name;
    this.puzzleId = data._id;
  }

  clone() {
    return new GameConfig(
      this.difficulty,
      this.gameType,
      this.time,
      this.image,
      this.name,
      this.puzzleId
    );
  }
}
