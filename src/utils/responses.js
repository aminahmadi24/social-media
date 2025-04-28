const successResponse = (res, statusCode = 200, data) => {
    return res.status(statusCode).json({
        status: statusCode, success: true, data
    });
}

const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        status: statusCode, success: false, error: message
    });
}

module.exports = {
    successResponse, errorResponse
}