const {getClient} = require("../../../src/models/db-connect");
const config = require("../../../config");
const model = require("../../../src/models/weather-model");

module.exports = async () => {
	const client = await getClient();
	const db = client.db(config.db.name);
	return new Promise((resolve, reject) => {
		db.collection(model.COLLECTION_NAME).drop((err, delOK) => {
			if(err) reject(err);
			resolve(delOK);
		});
	});
};