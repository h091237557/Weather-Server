const config = require("../../config");
const request = require("request");
const UnknownError = require("../errors/unknown-error");
const {getClient} = require("./db-connect");

const url = `${config.source_server.url}/${config.source_server.dataid}?Authorization=${config.source_server.apikey}&format=${config.source_server.format}`;

/**
 * @typedef {Object} Model.Weather 
 * @property {String} city - 城市 
 * @property {String} city_code - 城市編號 
 * @property {String} town - 鄉鎮 
 * @property {String} town_code - 鄉鎮篇號
 * @property {Number} maximum_temperature - 最低溫 
 * @property {Number} minimum_temperature - 最高溫 
 * @property {Number} updated_at - 更新時間 
 * @property {Number} deleted_at - 刪除時間 
 */

module.exports = {
	COLLECTION_NAME : "Weaters",
	/**
     * @see https://opendata.cwb.gov.tw/opendatadoc/DIV2/A0001-001.pdf
     * @returns {Object} the opendata api 
	 */
	fetchWeathersFromOpendata : function(){
		return new Promise((resolve, reject) => {
			request.get(url, {json:true}, (err, res, body) => {
				if(err) reject(err);
				if(res.statusCode === 200) resolve(body);
				reject(new UnknownError());
			});
		});
	},
	/**
	 * @param {Array<Model.Weather>} weathers
	 */
	saveWeathers : async function(weathers){
		const client = await getClient();
		const db = client.db(config.db.name);
		return new Promise((resolve, reject) => {
			db.collection(this.COLLECTION_NAME, async (err, collection) => {
				if(err) reject(err);

				await collection.insertMany(weathers);
				client.close();
				resolve();
			});
		});
	},
	/**
     * @param {String} cityCode 
	 * @param {Number} diff - find the weather between current to (current - diff);
	 * @returns {Array<Model.Weather>}
     */
	getCurrentWeatherByCity : async function(cityCode, diff){
		const client = await getClient();
		const db = client.db(config.db.name);
		return new Promise((resolve, reject) => {
			db.collection(this.COLLECTION_NAME)
				.find({"city_code": cityCode, "updated_at": {"$gte" : Date.now() - diff}})
				.toArray((err, res) => {
					if(err) reject(err);
					client.close();
					resolve(res);
				});
		});
	}
};