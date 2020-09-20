const mongo = require("mongodb").MongoClient;
const config = require("../../config");
const url = `mongodb://${config.db.user}:${config.db.pwd}@${config.db.host}:${config.db.port}`;

module.exports = {
	getClient(){
		return new Promise((resolve, reject) => {
			mongo.connect(url, { useUnifiedTopology: true } , function (err, client) {
				if(err) {
					reject(err);
				}
				resolve(client);
			});
		});
	}
};