const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");

const Strategies = module.exports;

Strategies.local = new LocalStrategy(
  {
    usernameField: "email", // define the parameter in req.body that passport can use as username and password
    passwordField: "password",
  },
  (email, password, done) => {
    UserModel.findOne({ email: email }, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "User doesn't exist" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return done(null, user);
      } else {
        return done(null, false, { error: "Invalid Password" });
      }
    });
  }
);
