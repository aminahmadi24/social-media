const express = require("express");
const authController = require("./auth.controller");
const { auth } = require("./../../middlewares/auth");
const { isAdmin } = require("./../../middlewares/isAdmin")
const router = express.Router();

router.route("/register")
    .get(authController.showRegisterView)
    .post(authController.register)
router.route("/login")
    .get(authController.showLoginView)
    .post(authController.login)

router.get("/testAuth", auth, isAdmin, (req, res) => {
    res.json({ message: "Hello you are allowed" })
});

module.exports = router;