const constants = require("../constants/constants");
const messages = require("../constants/messages");

exports.verifyAccount = async (req, res, next) => {
    try {
        const user = req.user;
        const isAccountVerified = user.isVerified;

        if (!isAccountVerified) {
            req.flash(constants.verifyMessage, messages.errors.verifyAccountMessage);
            return res.render("post/upload");
        }
        next();
    } catch (error) {
        next(error);
    }
}