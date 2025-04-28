const configs = require("./configs");
const app = require("./app");
const { default: mongoose } = require("mongoose");

const isProductionMode = configs.NODE_ENV === "production";

async function connectToDB() {
    try {
        await mongoose.connect(configs.mongoUri);
        console.log("Connected to DB successfully.", mongoose.connection.host);
    } catch (error) {
        console.error(" Database connection failed-> ", error.message);
        process.exit(1);
    }
}

function startServer() {
    app.listen(configs.port, () => {
        console.log(`Server is running in ${isProductionMode ? "production" : "development"} mode on port ${configs.port}`);
    })
}

async function run() {
    startServer();
    await connectToDB();
}
run();