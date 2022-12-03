// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Puzzles" entity database schema, using mongoose

const mongoose = require("mongoose");

// Defining schema:
const PuzzleHistorySchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  puzzleId: {
    type: String,
    required: true,
  },
  result: {
    type: Boolean,
    required: true,
  },
  completedTime: {
    // user complete time, null when lost (end count down)
    type: Number,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

// Defining and compiling model under name "PuzzleHistory":
const model = mongoose.model("puzzleHistory", PuzzleHistorySchema);

// Exporting model so it can be used in another file:
module.exports = model;
