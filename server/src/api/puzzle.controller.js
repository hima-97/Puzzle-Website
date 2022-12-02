const passport = require("passport");
const PuzzleModel = require("../models/Puzzles");

export default class puzzleController {
    constructor () {}

    async getAllPuzzles (req, res, next) {
        PuzzleModel.find({}, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
            //returns a json file of the error if it exists, or all the users if there is not an error.
        });
    }

    async getPuzzle(req, res, next) {

    //getPuzzle returns the puzzle with objectid given if valid

    const uQuery = "";//objectid

    PuzzleModel.find(uQuery, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }

  async createPuzzle(req, res, next) {
    const puzzle = req.body;
    const newPuzzle = new PuzzleModel(puzzle);
    await newPuzzle.save();
    //returns json of the user
    res.json(puzzle);

    //this will be used for hashing the user's inputted password

    //the line below grabs the hashed version of the input text "test"
    //var hash = md5("test");

    //I (Isaiah) will update this code when the frontend exists and grabs the fields from the user.
    //as of now it will be grabbed in a single json file
  }
}