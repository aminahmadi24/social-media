const configs = require("./configs");
const app = require("./app");

function startServer() {
    app.listen(configs.port, () => {
        console.log(`Server is running on port ${configs.port}`);
    })
}

function run() {
    startServer();
}
run();