const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT || 3400,
    sessionSecret: process.env.SESSION_SECRET
}