
const weatherModel = require("../../models/weather-model");
const config = require("../../../config");

module.exports = {
	name: "Fetch_Weater",
	interval: config.cron.fetch_weather_task.interval,
	work: async () => {
		const rawDatas = await weatherModel.fetchWeathersFromOpendata();
		const datas = rawDatas.cwbopendata.location;
		const clearDatas = datas.filter(filterByCity(["臺北市","新北市","桃園市"])).map(transform);
		await weatherModel.saveWeathers(clearDatas);
	}
};

function filterByCity(citys){
	return (data) => {
		return citys.includes(data["parameter"][0]["parameterValue"]);
	};
}

function transform(data){
	return {
		"city": data["parameter"][0]["parameterValue"],
		"city_code": data["parameter"][1]["parameterValue"],
		"town": data["parameter"][2]["parameterValue"],
		"town_code": data["parameter"][3]["parameterValue"],
		"maximum_temperature": data["weatherElement"][10]["elementValue"]["value"],
		"minimum_temperature": data["weatherElement"][12]["elementValue"]["value"],
		"updated_at": Date.now(),
		"deleted_at": null
	};
}
