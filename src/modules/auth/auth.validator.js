const yup = require("yup");

const registerUserValidationSchema = yup.object({
    name: yup.string().required("Name is required."),
    username: yup.string().min(3, "Username should have at least 3 characters").required("Username is required."),
    email: yup.string().email("Invalid email format").required("Email is required."),
    password: yup.string().required("Password is required")
});

const loginUserValidationSchema = yup.object({
    email: yup.string().email("Invalid email format.").required("Email is required."),
    password: yup.string().required("Password is required.")
})

module.exports = { registerUserValidationSchema, loginUserValidationSchema };