const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schema = new mongoose.Schema({
    name: { type: String, requried: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: { type: String },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    profilePicture: { type: String },
    isPrivate: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

schema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    };
})
const model = mongoose.model("User", schema);
module.exports = model;