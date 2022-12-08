const passport = require("passport");
const UserModel = require("../models/Users");
const PuzzleModel = require("../models/Puzzles");

// The "userController" class defines the methods a user can perform: 
export default class userController {
  //class that will have the different methods that are in regards to users in the db
  constructor() {}

  //given the entire username and desired list, we grab the entirety of that list from the db for the specified username
  async getEntireList(req, res, next) {
    //grab username and list desired
    const uName = req.body.username;
    const uList = req.body.list;

    //if no username nor list given then cant do anything
    if (uName == null || uList == null) {
      res.json("invalid request");
    } else {
      //now we check validity of username
      UserModel.find({ username: uName }, (err, result) => {
        if (err) {
          res.json(err)
        } else if (result[0] == null) {
          //no such user in db
          res.json("invalid username");
        } else {
          //List must be Played or Favourite. It automatically lowercases the input
          //if the list is valid then we return the desired list
          if (uList.toLowerCase() == "played") {
            res.json(result[0].playedPuzzles);
          } else if (uList.toLowerCase() == "favourite") {
            res.json(result[0].favouritePuzzles);
          } else {
            //and if the list is invalid then we display so
            res.json("invalid list");
          }
        }        
      });
    }
  }

  async addPuzzleToUserList(req, res, next) {
    //grab username, list, and puzzle desired
    const uName = req.body.username;
    const uList = req.body.list;
    const uPuzzle = req.body.puzzle;

    //if no username nor list given then cant do anything
    if (uName == null || uList == null || uPuzzle == null) {
      res.json("invalid request");
    } else {
      //now we check validity of the given Puzzle
      //

      //check the list for validity
      switch(uList.toLowerCase()) {
        case "played":
          //uPuzzle is valid so we append the Puzzle to playedPuzzles
          UserModel.findOneAndUpdate( {username : uName} , {$push : {playedPuzzles : [uPuzzle]}}, {new : true} , (err, result) => {
            if (err) {
              res.json(err);
            } else {
              if (result == null) {
                res.json("invalid username")
              } else {
                res.json(result);
              }
            }
          });
          break;

        case "favourite":
          //uPuzzle is valid so we append the Puzzle to favouritePuzzles
          UserModel.findOneAndUpdate( {username : uName} , {$push : {favouritePuzzles : [uPuzzle]}}, {new : true} , (err, result) => {
            if (err) {
              res.json(err);
            } else {
              if (result == null) {
                res.json("invalid username")
              } else {
                res.json(result);
              }
            }
          });
          break;

        default:
          res.json("invalid list");
      }
    }
  }

  async deletePuzzleFromUserList(req, res, next) {
    //grab username, list, and puzzle desired
    const uName = req.body.username;
    const uList = req.body.list;
    const uPuzzle = req.body.puzzle;

    //if no username nor list given then cant do anything
    if (uName == null || uList == null || uPuzzle == null) {
      res.json("invalid request");
    } else {
      //now we check validity of the given Puzzle
      //

      //check the list for validity
      switch(uList.toLowerCase()) {
        case "played":
          //uPuzzle is valid so we append the Puzzle to playedPuzzles
          UserModel.findOneAndUpdate( {username : uName} , {$pull : {playedPuzzles : uPuzzle}}, {new : true} , (err, result) => {
            if (err) {
              res.json(err);
            } else {
              if (result == null) {
                res.json("invalid username")
              } else {
                res.json(result);
              }
            }
          });
          break;

        case "favourite":
          //uPuzzle is valid so we append the Puzzle to favouritePuzzles
          UserModel.findOneAndUpdate( {username : uName} , {$pull : {favouritePuzzles : uPuzzle}}, {new : true} , (err, result) => {
            if (err) {
              res.json(err);
            } else {
              if (result == null) {
                res.json("invalid username")
              } else {
                res.json(result);
              }
            }
          });
          break;

        default:
          res.json("invalid list");
      }
    }
  }

  async clearListFromUser(req, res, next) {
    //grab username and list desired
    const uName = req.body.username;
    const uList = req.body.list;

    //if no username nor list given then cant do anything
    if (uName == null || uList == null) {
      res.json("invalid request");
    } else {
      //check the list for validity
      switch(uList.toLowerCase()) {
        case "played":
          //make playedPuzzles the empty array
          UserModel.findOneAndUpdate( {username : uName} , {playedPuzzles : []}, {new : true} , (err, result) => {
            if (err) {
              res.json(err);
            } else {
              if (result == null) {
                res.json("invalid username")
              } else {
                res.json(result);
              }
            }
          });
          break;

        case "favourite":
          //make favouritePuzzles the empty array
          UserModel.findOneAndUpdate( {username : uName} , {favouritePuzzles : []}, {new : true} , (err, result) => {
            if (err) {
              res.json(err);
            } else {
              if (result == null) {
                res.json("invalid username")
              } else {
                res.json(result);
              }
            }
          });
          break;

        default:
          res.json("invalid list");
        }
      }
    }

  async getRecommendedPuzzles(req, res, next) {
    //
  }

  async getLastPlayedPuzzleFromUser(req, res, next) {
    //grab username
    const uName = req.body.username;

    //check if given info is null
    if (uName == null) {
      res.json("invalid request")
    } else {
      //return lastPlayed for user if the user exists
      UserModel.findOne({ username : uName }, (err, result) => {
        if (err) {
          res.json(err);
        } else if (result == null) {
          res.json("invalid username");
        } else {
          res.json(result.lastPlayed);
        }
      });
    }
  }

  async setLastPlayedPuzzleFromUser(req, res, next) {
    //grab username and puzzle
    const uName = req.body.username;
    const uPuzzle = req.body.puzzle;

    if (uName == null || uPuzzle == null) {
      res.json("invalid request")
    } else {
      //check for validity of puzzle
      //

      UserModel.findOneAndUpdate({ username : uName }, {lastPlayed : uPuzzle}, {new : true}, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  }
}
