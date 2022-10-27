const passport = require("passport");
const UserModel = require("../models/Users");
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

  //will create a new User
  async createUser(req, res, next) {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
    //returns json of the user
  }
}
