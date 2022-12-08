// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Users" entity database schema, using mongoose

const mongoose = require("mongoose");

// Defining schema:
const UserSchema = new mongoose.Schema({
  //outline of what a user looks like in the database
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  userPuzzles: [
    {
      type: String,
      required: true,
    },
  ],
  playedPuzzles: [
    {
      type: String,
      required: true,
    },
  ],
  favouritePuzzles: [
    {
      type: String,
      required: true,
    },
  ],
  accessToken: {
    type: String,
  },
});

// Defining and compiling model under name "Users":
const UserModel = mongoose.model("users", UserSchema);

// Exporting model so it can be used in another file:
module.exports = UserModel;
