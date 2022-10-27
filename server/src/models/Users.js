const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   //outline of what a user looks like in the database
   name: {
    type: String,
    required: true,
   },
   age: {
      type: Number,
      required: true,
   },
   username: {
    type: String,
    required: true,
   },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;