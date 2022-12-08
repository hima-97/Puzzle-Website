var puzzleRoute = (router, expressApp, puzzleController) => {
    router.get('/getAllPuzzles', puzzleController.getAllPuzzles);
    router.get('/getPuzzle', puzzleController.getPuzzle);
    router.post('/createPuzzle', puzzleController.createPuzzle);
    router.get('/getRecommended', puzzleController.getRecommendedPuzzles);
    return router;
  }
  
  //export the above described userRoute which gives the url additions to type and calls the associated functions
  export { puzzleRoute };