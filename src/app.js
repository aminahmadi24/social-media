const express = require("express");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const configs = require("./configs");

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
})
module.exports = app;