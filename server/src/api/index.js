import authenticationController from "./authentication.controller";
import userController from "./user.controller";
import puzzleController from "./puzzle.controller";
import gameController from "./game.controller";

export * from "./authentication.route";
export * from "./user.route";
export * from "./puzzle.route";
export * from "./game.route";

export {
  authenticationController,
  userController,
  puzzleController,
  gameController,
};
