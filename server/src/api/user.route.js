// A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.),
// a URL path/pattern, and a function that is called to handle that pattern


var userRoute = (router, expressApp, userController) => {
  router.get('/getUsers', userController.getUsers);
  router.post('/createUser', userController.createUser);
  return router;
}

//export the above described userRoute which gives the url additions to type and calls the associated functions
export { userRoute };