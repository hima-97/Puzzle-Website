var userRoute = (router, expressApp, userController) => {
  router.get('/getAllUsers', userController.getAllUsers);
  router.get('/findUser', userController.findUsers);
  router.post('/createUser', userController.createUser);
  return router;
}

//export the above described userRoute which gives the url additions to type and calls the associated functions
export { userRoute };