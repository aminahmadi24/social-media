const express = require("express");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const configs = require("./configs");
const { setHeaders } = require("./middlewares/headers");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

// Body Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Cors Policy
app.use(setHeaders);

// Static Files
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use("/images", express.static(path.join(__dirname, "..", "public", "images")));
app.use("/fonts", express.static(path.join(__dirname, "..", "public", "fonts")));

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



app.use(notFound);
app.use(errorHandler);
module.exports = app;