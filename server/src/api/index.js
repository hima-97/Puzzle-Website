import authenticationController from './authentication.controller';
import userController from './user.controller';
import puzzleController from './puzzle.controller';

export * from './authentication.route';
export * from './user.route';
export * from './puzzle.route';

export {
  authenticationController,
  userController,
  puzzleController
};