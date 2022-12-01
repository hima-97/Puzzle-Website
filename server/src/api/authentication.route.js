var { requireAuth } = require("./middleware");

var authenticationRoute = (router, expressApp, authenticationController) => {  
  router.post("/register", authenticationController.register);
  router.post("/login", authenticationController.login);
  router.post("/check-auth", requireAuth, authenticationController.checkAuth);
  router.post("/logout", authenticationController.logout);
  return router;
};

export { authenticationRoute };
