// A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.),
// a URL path/pattern, and a function that is called to handle that pattern

import { requireAuth } from "./middleware";

var gameRoute = (router, expressApp, gameController) => {
  router.post("/start", requireAuth, gameController.startGame);
  router.post("/end", requireAuth, gameController.endGame);
  return router;
};

//export the above described gameRoute which gives the url additions to type and calls the associated functions
export { gameRoute };
