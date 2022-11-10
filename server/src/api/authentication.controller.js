const passport = require("passport");
// const { User } = require("../database/schemas");

export default class authenticationController {
  constructor() {}

  async register(req, res, next) {
    if (!req || !req.body || !req.body.username || !req.body.password) {
      res.status(400).send({ message: "Username and Password required" });
    }
  
    req.body.username_case = req.body.username;
    req.body.username = req.body.username.toLowerCase();
  
    const { username } = req.body;
    const newUser = User(req.body);
  
    User.find({ username }, (err, users) => {
      if (err) {
        res.status(400).send({ message: "Create user failed", err });
      }
      if (users[0]) {
        res.status(400).send({ message: "Username exists" });
      }
  
      newUser.hashPassword().then(() => {
        newUser.save((err, savedUser) => {
          if (err || !savedUser) {
            res.status(400).send({ message: "Create user failed", err });
          } else {
            res.send({
              message: "User created successfully",
              user: savedUser.hidePassword(),
            });
          }
        });
      });
    });
  }

  async login(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
  
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
  
      req.login(user, (err) => {
        if (err) {
          res.status(401).send({ message: "Login failed", err });
        }
        res.send({
          message: "Logged in successfully",
          user: user.hidePassword(),
        });
      });
    })(req, res, next);
  }

  async logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        res.status(400).send({ message: "Logout failed", err });
      }
  
      req.session.destroy((err) => {
        if (err) {
          res.status(400).send({ message: "Logout failed", err });
        }
  
        res.clearCookie("connect.sid");
        req.sessionID = null;
        res.send({ message: "Logged out successfully" });
      });
    });
  }
}
