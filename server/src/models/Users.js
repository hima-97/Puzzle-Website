// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Users" entity database schema, using mongoose

const mongoose = require('mongoose');

// Defining schema:
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

// Defining and compiling model under name "Users":
const UserModel = mongoose.model("Users", UserSchema);

// Exporting model so it can be used in another file:
module.exports = UserModel;