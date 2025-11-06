const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const CategorySchema = new Schema({
    name: {type: String, required: true},
    parentId: {type: Schema.Types.ObjectId, ref: "Category", required: false},
    mod: {type: Schema.Types.ObjectId, ref: "User", required: false},
    createdAt: {type: Date, required: true, default: Date.now()},
})

module.exports = mongoose.model("Category", CategorySchema);