const mongoose  = require('mongoose');

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

const PuzzleModel = mongoose.model("users", PuzzleSchema);
module.exports = PuzzleModel;