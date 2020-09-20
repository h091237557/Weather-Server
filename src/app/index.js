const config = require("../../config");
const app = require("./server");

app.listen(config.server.port, () => {
	console.log("Server started !");
});