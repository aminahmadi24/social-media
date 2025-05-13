const yup = require("yup");

exports.createPostValidator = yup.object({
    description: yup.string().max(2200, "Description can't be more than 2200 chars.").required("Description is required.")
});