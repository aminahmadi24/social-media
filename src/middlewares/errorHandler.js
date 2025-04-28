const { StatusCodes } = require("http-status-codes")
const { errorResponse } = require("../utils/responses");
const messages = require("../constants/messages");

const errorHandler = (err, req, res, next) => {
    const statusCode = err?.status || err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err?.message || messages.errors.server;
    errorResponse(res, statusCode, message);
}
module.exports = { errorHandler };