const passport = require("passport");
const UserModel = require("../models/Users");

const authenticationService = require("../service/authenticationService");

export default class userController {
  constructor() {}

  async getUsers(req, res, next) {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }

  async createUser(req, res, next) {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
  }
}
