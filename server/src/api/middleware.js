const UserModel = require("../models/Users");
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  // This is used when client and server share request
  // req.isAuthenticated() ? next() : res.status(401).send({ message: 'User not authenticated' });

  try {
    var decoded = jwt.verify(
      req.header("authorization"),
      process.env.SESSION_SECRET
    );
    UserModel.findOne({ email: decoded.email }, async (err, user) => {
      if (err) res.status(401).send({ message: "User not authenticated" });
      if (!user) res.status(401).send({ message: "User not authenticated" });

      if (user.accessToken == req.header("authorization")) next();
      else res.status(401).send({ message: "User not authenticated" });
    });
  } catch (err) {
    res.status(401).send({ message: "User not authenticated" });
  }
};

export { requireAuth };
