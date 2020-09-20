const { parentPort } = require("worker_threads");

parentPort.once("message", async (task_name) => {
	const task = require(`./tasks/${task_name}`);
	console.log(`start doing the ${task.name} task`);
	await doingWork(task, parentPort);
	setInterval(async () => {
		await doingWork(task, parentPort);
		console.log(`Finished a work on ${task.name} task`);
	}, task.interval*1000);
});

async function doingWork(task,parentPort){
	try {
		await task.work();
	} catch (error) {
		parentPort.postMessage({
			"error_code": error.code,
			"error_msg": error.message,
			"error_stack": error.stack
		});
	}
}