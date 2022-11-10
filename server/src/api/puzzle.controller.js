const passport = require("passport");
const PuzzleModel = require("../models/Puzzles");

const authenticationService = require("../service/authenticationService");

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

    async findPuzzle(req, res, next) {

    //puzzleQuery will be what the user has input to be searched
    //selection will be which field to be searched. eg: name or difficulty
    //uQuery will be the query combining the above information into a query to be input into the "find" function seen later

    let puzzleQuery = "Cat";
    let selection = "name"; //will need to be based off of user choice of search.
    let uQuery;

    //basic query example for looking for puzzles with the name "Cat"
    //let uQuery = {"name": "Cat"};

    //will switch the field to be searched within the database based on selection
    switch (selection) {
      case "name":
        uQuery = {"name" : puzzleQuery};
        break;
      case "img":
        uQuery = {"img" : puzzleQuery};
        break;
      case "duration":
        uQuery = {"duration" : puzzleQuery};
        break;
      case "genre":
        uQuery = {"genre" : puzzleQuery};
        break;
      default:
        uQuery = "Error Invalid selection";
    }

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