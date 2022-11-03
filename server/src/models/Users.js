const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   //outline of what a user looks like in the database
   firstname: {
    type: String,
    required: true,
   },
   lastname: {
      type: String,
      required: true,
   },
   username: {
    type: String,
    required: true,
   },
   age: {
      type: Number,
      required: true,
   },
   hashPassword: {
      type: String,
      required: true,
   },
   userPuzzles: [{
      type: String,
      required: true,
   }],
   playedPuzzles: [{
      type: String,
      required: true,
   }],
   favouritePuzzles: [{
      type: String,
      required: true,
   }],
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;