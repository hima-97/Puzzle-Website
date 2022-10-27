var userRoute = (router, expressApp, userController) => {
  router.get('/getUsers', userController.getUsers);
  router.post('/createUser', userController.createUser);
  return router;
}

//export the above described userRoute which gives the url additions to type and calls the associated functions
export { userRoute };