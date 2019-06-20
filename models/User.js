const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    wallet: {
        spent: {type: Number, default: 0},
        budget: {type: Number, default: 0}
    }
});

module.exports = User = mongoose.model("User", UserSchema);