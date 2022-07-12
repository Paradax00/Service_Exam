const mongoose = require("mongoose");

const DoseSchema = mongoose.Schema(
    {
        type: String,
        date: String,
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        }
    }
);

const Dose = mongoose.model("dose", DoseSchema);

module.exports = { Dose }