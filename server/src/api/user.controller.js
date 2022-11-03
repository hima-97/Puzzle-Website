const passport = require("passport");
const UserModel = require("../models/Users");
var md5 = require("blueimp-md5")
//grab the userModel for the getUsers cmd

const authenticationService = require("../service/authenticationService");

export default class userController {
  //class that will have the different methods that the user will be able to do
  constructor() {}

  //will display all users
  async getUsers(req, res, next) {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
        //returns a json file of the error if it exists, or all the users if there is not an error.
    });
  }

  //will display the items within the database that match the user's query
  //keep in mind that for testing it will be the name in the db.
  //in the actual implementation it will be the name of the puzzle in the db.
  async findUsers(req, res, next) {
    if (isNaN(userQuery)) {
      //will push userQuery to be checked against and 'name'
      uQuery = {name: userQuery}
    } else {
      //input is a number and name is not of type number
      uQuery = 'INVALID INPUT';//
    }

    UserModel.find({uQuery}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }

  //will create a new User
  async createUser(req, res, next) {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    //returns json of the user
    res.json(user);

    //this will be used for hashing the user's inputted password

    //the line below grabs the hashed version of the input text "test"
    //var hash = md5("test");

    //I (Isaiah) will update this code when the frontend exists and grabs the fields from the user.
    //as of now it will be grabbed in a single json file
  }
}
