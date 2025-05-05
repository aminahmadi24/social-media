const { StatusCodes } = require("http-status-codes");
const messages = require("../constants/messages");
const { errorResponse } = require("../utils/responses");
const UserModel = require("./../models/User");

exports.auth = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const user = await UserModel.findOne({ _id: refreshToken.user }).lean();
        if (!user) {
            errorResponse(res, StatusCodes.UNAUTHORIZED, messages.errors.unauthorized);
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }

}

