const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        nom: String,
        prenom: String,
        email: String,
        year: String,
        code: Number
    }
);

const User = mongoose.model("user", userSchema);

module.exports = { User }