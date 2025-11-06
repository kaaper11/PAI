const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const ProductSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    images: [{type: String, required: true}],
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    //rate: {type: Number, required: false},
    //comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
})

module.exports = mongoose.model('Products', ProductSchema);