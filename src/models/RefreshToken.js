const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const configs = require("./../configs");
const UserModel = require("./../models/User");

const schema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    expiresIn: { type: Date, required: true }
}, { timestamps: true });

schema.statics.createToken = async (user) => {
    const refreshTokenExpiresInDays = configs.refreshTokenExpiresInDays;
    const token = uuidv4();
    const refreshTokenDocument = new model({
        token,
        user: user._id,
        expiresIn: new Date(Date.now() + (refreshTokenExpiresInDays * 24 * 60 * 60 * 1000))
    });
    await refreshTokenDocument.save();
    return refreshTokenDocument;
}

schema.statics.verifyToken = async (token) => {
    const refreshTokenDocument = await model.findOne({ token }).lean();
    if (!refreshTokenDocument || refreshTokenDocument.expiresIn < Date.now()) {
        return null;
    }
    const user = await UserModel.findOne({ _id: refreshTokenDocument.user }).lean();
    if (!user) {
        return null;
    }
    return user;
}
const model = mongoose.model("RefreshToken", schema);
module.exports = model;