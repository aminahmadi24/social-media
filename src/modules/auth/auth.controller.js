const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");

const UserModel = require("./../../models/User");
const RefreshTokenModel = require("./../../models/RefreshToken");
const { registerUserValidationSchema, loginUserValidationSchema } = require("./auth.validator");
const messages = require("../../constants/messages");
const configs = require("../../configs");
const constants = require("../../constants/constants");


exports.showRegisterView = async (req, res, next) => {
    res.render("auth/register/index");
}

exports.register = async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;
        await registerUserValidationSchema.validate({ email, username, password, name }, { abortEarly: false });
        const oldUser = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (oldUser) {
            req.flash("error", messages.errors.emailOrUsernameAlreadyExists);
            return res.redirect("/auth/register");
        }
        const users = await UserModel.find({}).lean();
        let role = "USER";
        if (users.length === 0) {
            role = "ADMIN"
        }
        const user = new UserModel({
            email, username, password, name, role
        });
        await user.save();
        const accessToken = jwt.sign({ userID: user._id }, configs.jwtSecret, { expiresIn: "30d" });
        const refreshToken = await RefreshTokenModel.createToken(user);

        res.cookie(constants.accessToken, accessToken, {
            httpOnly: true,
            maxAge: 900_000
        });
        res.cookie(constants.refreshToken, refreshToken.token,
            { httpOnly: true, maxAge: 900_000 }
        )
        req.flash("success", messages.success.register);
        res.redirect("/auth/register/");
    } catch (error) {
        req.flash("error", error.message);
        return res.redirect("/auth/register");
    }
}

exports.showLoginView = async (req, res, next) => {
    res.render("auth/login/index");
}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await loginUserValidationSchema.validate({ email, password }, { abortEarly: false });
        const user = await UserModel.findOne({ email }).lean();
        if (!user) {
            req.flash("error", messages.errors.notFoundUser);
            return res.redirect("/auth/login");
        }

        if (!(await bcrypt.compare(password, user.password))) {
            req.flash("error", messages.errors.invalildEmailOrPassword);
            return res.redirect("/auth/login");
        }
        const accessToken = jwt.sign({ userID: user._id }, configs.jwtSecret, { expiresIn: "30d" });
        const refreshToken = await RefreshTokenModel.createToken(user);
        res.cookie(constants.accessToken, accessToken, {
            httpOnly: true,
            maxAge: 900_000
        });
        res.cookie(constants.refreshToken, refreshToken.token,
            { httpOnly: true, maxAge: 900_000 }
        )
        return res.redirect("/");
    } catch (error) {
        req.flash("error", error.message);
        return res.redirect("/auth/login");
    }
}

