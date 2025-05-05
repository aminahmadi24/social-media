const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: +process.env.PORT || 3400,
    sessionSecret: process.env.SESSION_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpiresInDays: +process.env.ACCESS_TOKEN_EXPIRES_IN_DAYS,
    refreshTokenExpiresInDays: +process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS,
    NODE_ENV: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI
}