const { StatusCodes } = require("http-status-codes");
const messages = require("../constants/messages");
const constants = require("./../constants/constants");
const { errorResponse } = require("../utils/responses");
const UserModel = require("./../models/User");
const jwt = require("jsonwebtoken");
const configs = require("../configs");

exports.auth = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.[constants.accessToken];
        if (!accessToken) {
            req.flash("error", messages.errors.loginFirst);
            return res.redirect("/auth/login");
        }
        const accessTokenPayload = jwt.verify(accessToken, configs.jwtSecret);
        const user = await UserModel.findOne({ _id: accessTokenPayload.userID }).lean();
        if (!user) {
            req.flash("error", messages.errors.loginFirst);
            return res.redirect("/auth/login");
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }

}

