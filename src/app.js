const express = require("express");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const configs = require("./configs");
const { setHeaders } = require("./middlewares/headers");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./modules/auth/auth.routes");
const postRouter = require("./modules/post/post.routes");
const cookieParser = require("cookie-parser");
const app = express();

// Body Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Cookie Parser
app.use(cookieParser());

// Cors Policy
app.use(setHeaders);

// Static Files
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use("/images", express.static(path.join(__dirname, "..", "public", "images")));
app.use("/fonts", express.static(path.join(__dirname, "..", "public", "fonts")));
app.use("/uploads", express.static(path.join(__dirname, "..", "public", "uploads")));

// Express-Flash
app.use(session({
    secret: configs.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(flash());

// Template Engine 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
    res.render("./index");
});
app.use("/auth", authRouter);
app.use("/posts", postRouter);


app.use(notFound);
app.use(errorHandler);

module.exports = app;