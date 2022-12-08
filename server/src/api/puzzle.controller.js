const passport = require("passport");
const PuzzleModel = require("../models/Puzzles");

export default class puzzleController {
  constructor () {}

  //returns all puzzles within the db
  async getAllPuzzles (req, res, next) {
      PuzzleModel.find({}, (err, result) => {
          if (err) {
              res.json(err);
          } else {
              res.json(result);
          }
      });
  }

  //searches the db for the puzzle given the 'uQuery' which is a placeholder for the id
  async getPuzzle(req, res, next) {
    //grab the _id given
    const uQuery = req.body.puzzle;

    //check for validity
    if (uQuery == null) {
      res.json("invalid request");
    } else {
      //query is valid so we perform the search by ID and return the error if not found or the puzzle if found
      PuzzleModel.findById({ _id: uQuery }, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  }

  //creates a puzzle and saves it in the database
  async createPuzzle(req, res, next) {
    //grabs info from client
    const puzzle = req.body;

    //if there is no genre tag given, then it will default it to the string labeled 'NULL'
    if (puzzle.genre == null) {
      puzzle.genre = "NULL";
    }

    //creates a new puzzle with json file
    const newPuzzle = new PuzzleModel(puzzle);

    //saves the data in the database
    await newPuzzle.save();

    //returns json of the puzzle
    res.json(puzzle);
  }
}