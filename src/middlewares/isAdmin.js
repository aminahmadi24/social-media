const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/responses");
const messages = require("../constants/messages");

exports.isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role === "ADMIN") {
        next()
    } else {
        errorResponse(res, StatusCodes.FORBIDDEN, messages.errors.forbidden);
    }
}
