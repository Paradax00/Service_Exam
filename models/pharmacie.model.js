const mongoose = require("mongoose");
const pharamcieSchema = mongoose.Schema(
    {
        title: String,
        address: String,
        image: String
    }
);

const Pharmacie = mongoose.model("pharmacie", pharamcieSchema);

module.exports = { Pharmacie }