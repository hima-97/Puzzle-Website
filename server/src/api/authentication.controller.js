const passport = require("passport");
const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.SESSION_SECRET, {
    expiresIn: 24 * 60 * 60,
  });
}

export default class authenticationController {
  constructor() {}

  async register(req, res, next) {
    if (!req || !req.body || !req.body.email || !req.body.password) {
      res.status(400).send({ message: "Username and Password required" });
    }

    const { email } = req.body;

    UserModel.find({ email }, async (err, users) => {
      if (err) {
        res.status(400).send({ message: "Create user failed", err });
      }
      if (users[0]) {
        res.status(400).send({ message: "Username exists" });
      }

      const newUser = UserModel(req.body);
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      newUser.password = await bcrypt.hash(newUser.password, salt);
      // access token for login state
      newUser.accessToken = generateAccessToken({
        email: newUser.email,
      });

      newUser.save().catch((err) => {
        res.status(400).send({ message: "Error data saved" });
      });

      // This auto login when using passport.authenticate but register need to login
      // req.login assign user data to the session
      req.login(newUser, (err) => {
        if (err) {
          res.status(400).send({ message: "Login failed", err });
        }
        res.send({
          message: "Logged in successfully",
          token: newUser.accessToken,
        });
      });
    });
  }

  async login(req, res, next) {
    // Using simple local passport on config to validate user from req.body
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).send(info);
      }

      user.accessToken = generateAccessToken({
        email: user.email,
      });
      await user.save();

      res.send({
        message: "Logged in successfully",
        token: user.accessToken,
      });
    })(req, res, next);
  }

  async checkAuth(req, res, next) {
    res.status(200).send();
  }

  async logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return;
      }

      req.session.destroy(async (err) => {
        if (err) {
          return;
        }

        try {
          // Get user data from token
          var decoded = jwt.verify(
            req.header("authorization"),
            process.env.SESSION_SECRET
          );
          UserModel.findOne({ email: decoded.email }, async (err, user) => {
            if (err) res.status(400).send();
            if (!user) res.status(400).send();

            user.accessToken = null;
            await user.save();
            res.clearCookie("connect.sid");
            req.sessionID = null;
            res.send();
          });
        } catch (err) {
          res.status(400).send();
        }
      });
    });
  }
}
