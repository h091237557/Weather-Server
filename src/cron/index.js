const tasks = require("./tasks/index");
const { Worker } = require("worker_threads");

console.log("Cron Service Start");
tasks.forEach((task) => {
	let worker = new Worker(`${__dirname}/thread-init.js`);
	worker.postMessage(task); 
	worker.on("message", message => console.log(message)); 
});


