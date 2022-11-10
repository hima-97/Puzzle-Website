const mongoose  = require('mongoose');

const PuzzleSchema = new mongoose.Schema({
    //outline of what defines a puzzle. Also looks like this in the database
    name: {
        type: String,
        required: true,
    },
    img: {
        //byte[]
        type: String,
        required: true,
    },
    duration: {
        //in ms
        type: Number,
        required: false,
    },
    genre: {
        type: String,
        required: true,
    },
    difficulty: {
        //will be an integer: 0,1,2 for easy, medium, hard
        type: Number,
        required: true,
    },
});

const PuzzleModel = mongoose.model("puzzles", PuzzleSchema);
module.exports = PuzzleModel;