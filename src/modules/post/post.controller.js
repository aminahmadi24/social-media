const messages = require("../../constants/messages");
const PostModel = require("./../../models/Post");
const { createPostValidator } = require("./post.validator");

exports.showPostUploadView = async (req, res, next) => {
    // const success = req.flash("success");
    return res.render("post/upload");
}
exports.createPost = async (req, res, next) => {
    try {
        let { description, hashtags } = req.body;
        await createPostValidator.validate({ description });
        if (hashtags.length > 0) {
            hashtags = hashtags.split(",");
        }
        if (!req.file) {
            req.flash("error", messages.errors.mediaIsRequired);
            return res.render("post/upload");
        }
        const mediaPath = `uploads/posts/${req.file.filename}`;
        const post = new PostModel({
            description,
            hashtags,
            media: {
                path: mediaPath,
                filename: req.file.filename
            },
            user: req.user
        });
        await post.save();
        req.flash("success", messages.success.postUploaded);
        return res.render("post/upload");
    } catch (error) {
        req.flash("error", error.message);
        return res.redirect("/posts");
    }
}