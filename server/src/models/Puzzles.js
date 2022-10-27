const mongoose  = require('mongoose');

const PuzzleSchema = new mongoose.Schema({
    //Outline of what defines a puzzle. Also looks like this in the database
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});

const PuzzleModel = mongoose.model("users", PuzzleSchema);
module.exports = PuzzleModel;