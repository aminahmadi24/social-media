const { Router } = require("express");
const path = require("path");
const postController = require("./post.controller");
const { auth } = require("./../../middlewares/auth");
const { verifyAccount } = require("./../../middlewares/verifyAccount");
const { multerStorage } = require("./../../middlewares/uploader");
const router = Router();

const uploader = multerStorage(path.join(process.cwd(), "public", "uploads", "posts"), /jpg|jpeg|png|webp|mp4|mkv/);

router.route("/")
    .get(auth, verifyAccount, postController.showPostUploadView)
    .post(auth, verifyAccount, uploader.single("media"), postController.createPost)

module.exports = router;