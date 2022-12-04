const passport = require("passport");
const session = require("express-session");
const uuid = require("uuid");

const Strategies = require("./strategies");
const UserModel = require("../models/Users");

module.exports = (app) => {
  const sessionConfig = {
    genid: () => uuid.v4(),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  };

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    UserModel.findById({ _id: id })
      .then((user) => done(null, user))
      .catch((err) => console.warn(`err at deserialize: ${err}`))
  );

  passport.use(Strategies.local);
};
