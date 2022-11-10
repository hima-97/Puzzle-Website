var puzzleRoute = (router, expressApp, puzzleController) => {
    router.get('/getAllPuzzles', puzzleController.getAllPuzzles);
    router.get('/findPuzzle', puzzleController.findPuzzle);
    router.post('/createPuzzle', puzzleController.createPuzzle);
    return router;
  }
  
  //export the above described userRoute which gives the url additions to type and calls the associated functions
  export { puzzleRoute };