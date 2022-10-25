var authenticationRoute = (router, expressApp, authenticationController) => {
  router.post('/register', authenticationController.register);
  router.post('/login', authenticationController.login);
  router.post('/logout', authenticationController.logout);
  return router;
}

export { authenticationRoute };