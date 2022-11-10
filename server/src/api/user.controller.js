const passport = require("passport");
const UserModel = require("../models/Users");

const authenticationService = require("../service/authenticationService");

// The "userController" class defines the methods a user can perform: 
export default class userController {
  //class that will have the different methods that the user will be able to do
  constructor() {}

  // This will display all users in the model:
  // This returns a JSON file with all users or, if there is no user, a JSON file with an error
  async getUsers(req, res, next) {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }

  // This will create a new user in the "UserModel" model:
  async createUser(req, res, next) {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    // This returns JSON file for the specific user:
    res.json(user);
  }
}
