const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const PhotoSchema = new Schema({
    path: {type: String, unique: false, required: true},
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Photos", PhotoSchema);