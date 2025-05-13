const path = require("path");
const fs = require("fs");
const multer = require("multer");
const messages = require("./../constants/messages");


exports.multerStorage = (destination, allowedTypes = /jpg|jpeg|png|webp/) => {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination);
        },
        filename: function (req, file, cb) {
            const unique = Math.round((Math.random() * 1000) + Date.now());
            const ext = path.extname(file.originalname);
            cb(null, `${unique}${ext}`);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (allowedTypes.test(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(messages.errors.invalidFileType), false);
        }
    }
    const uploader = multer({
        storage,
        limits: {
            fileSize: 24_000_000
        },
        fileFilter
    });
    return uploader;

}