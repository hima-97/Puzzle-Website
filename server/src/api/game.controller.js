import PuzzleModel from "../models/Puzzles";
const jwt = require("jsonwebtoken");

const UserModel = require("../models/Users");
const PuzzleHistoryModel = require("../models/PuzzleHistory");

// The "gameController" class defines the methods a user can perform:
export default class gameController {
  //class that will have the different methods that are in regards to users in the db
  constructor() {}

  // This will create puzzle
  async startGame(req, res, next) {
    var decoded = jwt.verify(
      req.header("authorization"),
      process.env.SESSION_SECRET
    );
    // If start existing game
    if (req.body.puzzleId) {
      PuzzleModel.findOne({ _id: req.body.puzzleId }, async (err, puzzle) => {
        if (err) res.status(400).send();
        if (!puzzle) res.status(400).send();

        res.send(req.body.puzzleId);
      });
    } else {
      // If start uploaded game
      const puzzle = new PuzzleModel(req.body);
      puzzle.duration = req.body.time;
      puzzle.createdAt = new Date();
      puzzle.updatedAt = new Date();

      // Find user and save puzzle to user
      UserModel.findOne({ email: decoded.email }, async (err, user) => {
        if (err) res.status(400).send({ message: "Invalid User!" });
        if (!user) res.status(400).send({ message: "Invalid User!" });

        user.userPuzzles.push(puzzle._id);

        // Save new puzzle and send id back
        await puzzle.save().catch((err) => {
          console.log(err);
          res.status(400).send({ message: "Error data saved" });
        }).then(async ()=>{
          await user.save();
  
          res.send(puzzle._id);
        });
      });
    }
  }

  // This will store puzzle result
  async endGame(req, res, next) {
    var decoded = jwt.verify(
      req.header("authorization"),
      process.env.SESSION_SECRET
    );
    const history = new PuzzleHistoryModel(req.body);
    history.userEmail = decoded.email;
    history.puzzleId = req.body.puzzleId;
    history.createdAt = new Date();
    history.updatedAt = new Date();

    await history.save().catch((err) => {
      res.status(400).send({ message: "Error data saved" });
    });

    res.send();
  }
}
