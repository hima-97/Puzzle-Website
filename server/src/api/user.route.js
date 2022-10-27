var userRoute = (router, expressApp, userController) => {
  router.get('/getUsers', userController.getUsers);
  router.post('/createUser', userController.createUser);
  return router;
}

export { userRoute };