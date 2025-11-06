const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const UserTokenSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now()},
    expiresIn: {type: Date, required: true, default: Date.now()+ + 7 * 24 * 60 * 60 * 1000},
})
UserTokenSchema.index({ expiresIn: 1 }, { expireAfterSeconds: 0 });


module.exports = mongoose.model("UserToken", UserTokenSchema);