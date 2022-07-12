const mongoose = require("mongoose");
const RdvSchema = mongoose.Schema(
    {
        type: String,
        date: String,
    }
);

const RDV = mongoose.model("rdv", RdvSchema);

module.exports = { RDV }