// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Puzzles" entity database schema, using mongoose

const mongoose  = require('mongoose');

// Defining schema:
const PuzzleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});

// Defining and compiling model under name "Puzzles":
const PuzzleModel = mongoose.model("Puzzles", PuzzleSchema);

// Exporting model so it can be used in another file:
module.exports = PuzzleModel;