module.exports = Object.freeze({
    errors: {
        notFoundRoute: "The requested route was not found.",
        unauthorized: "Unauthorized access. Please provide a valid token",
        loginFirst: "Authentication failed. Please login first",
        forbidden: 'You are not allowed to perform this action.',
        server: 'An error occurred on the server.',
        userAlreadyExists: "User already exists.",
        emailOrUsernameAlreadyExists: "Email or username already exists.",
        notFoundUser: "User was not found.",
        invalildEmailOrPassword: "Invalild email or password.",
        verifyAccountMessage: "You need to verify your account.",
        invalidFileType: "Invalid file type.",
        mediaIsRequired: "Media is required."
    },
    success: {
        login: "Login was successful.",
        created: "The item was created successfully.",
        register: "Your registration was successful.",
        postUploaded: "Your post was uploaded successfully."

    }
});