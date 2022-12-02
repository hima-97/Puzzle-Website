// A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.),
// a URL path/pattern, and a function that is called to handle that pattern


var userRoute = (router, expressApp, userController) => {
  //router.get('/getAllUsers', userController.getUsers); //add it to the admin route
  router.get('/findUser', userController.findUsers); //delete this
  router.post('/createUser', userController.createUser); //delete this too
  return router;
}

//export the above described userRoute which gives the url additions to type and calls the associated functions
export { userRoute };