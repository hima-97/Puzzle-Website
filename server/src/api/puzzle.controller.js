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

  async getRecommendedPuzzles(req, res, next) {
    var decoded = jwt.verify(
      req.header("authorization"),
      process.env.SESSION_SECRET
    );
    // Find history record
    PuzzleHistoryModel.find({
      userEmail: decoded.email,
    })
      .lean()
      .limit(15)
      .exec(async (err) => {
        // Get puzzle data for first 5 puzzles
        try {
          let items = [];
          items[0] = await PuzzleModel.findOne({ _id: "636c4203dd7aa8600334d21d" }).exec();
          items[1] = await PuzzleModel.findOne({ _id: "639226f7b317fadb5b200a3c" }).exec();
          items[2] = await PuzzleModel.findOne({ _id: "63922ab0b317fadb5b200a43" }).exec();
          items[3] = await PuzzleModel.findOne({ _id: "63922acdb317fadb5b200a44" }).exec();
          items[4] = await PuzzleModel.findOne({ _id: "63922b07b317fadb5b200a45" }).exec();
          res.json(items);
        } catch (err) {
          res.json(err);
        }
      });
  }
}