// A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.),
// a URL path/pattern, and a function that is called to handle that pattern


var userRoute = (router, expressApp, userController) => {
  router.get('/getUserList', userController.getEntireList);
  router.post('/addPuzzleToUserList', userController.addPuzzleToUserList);
  router.post('/deletePuzzleFromUserList', userController.deletePuzzleFromUserList);
  router.post('/clearListFromUser', userController.clearListFromUser);
//getRec
  router.get('/getLastPlayed', userController.getLastPlayedPuzzleFromUser);
  router.post('/setLastPlayed', userController.setLastPlayedPuzzleFromUser);
  return router;
}

//export the above described userRoute which gives the url additions to type and calls the associated functions
export { userRoute };