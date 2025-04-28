const { StatusCodes } = require("http-status-codes");
const messages = require("../constants/messages");
const { errorResponse } = require("../utils/responses");


exports.notFound = (req, res, next) => {
    errorResponse(res, StatusCodes.NOT_FOUND, messages.errors.notFoundRoute)
}