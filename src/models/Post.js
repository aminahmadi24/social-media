const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    media: {
        path: { type: String, required: true, unique: true },
        filename: { type: String, required: true, unique: true },
    },
    description: { type: String, required: true },
    hashtags: { type: [String] },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const model = mongoose.model("Post", schema);
module.exports = model;