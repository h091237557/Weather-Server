const express = require("express");
const router = express.Router();
const weatherModel = require("../../models/weather-model");
const requireValidCity = require("../middlewares/require-valid-city-middleware");
const wrap = require("../help");
const EmptyResourceError = require("../../errors/empty-resource-error");
const config = require("../../../config");

/**
 * @api {get} /weathers/:city_code - get hero
 * @apiSuccess {String} city 
 * @apiSuccess {Number} maximum_temperature 
 * @apiSuccess {Number} minimum_temperature
 */
router.get("/:city_code",requireValidCity,wrap(async (req, res) => {
	const cityCode = req.params.city_code;
	const interval = config.cron.fetch_weather_task.interval * 1000;
	const weathers = await weatherModel.getCurrentWeatherByCity(cityCode, interval);
	if(weathers.length == 0){
		throw new EmptyResourceError();
	}

	const weaters_avgs = generateAvg(weathers);
	res.send({
		"city": weathers[0]["city"],
		"maximum_temperature": Math.round(weaters_avgs["max_avg"]),
		"minimum_temperature": Math.round(weaters_avgs["min_avg"])
	});
}));
/**
 * @param {Array<Model.Weather>} weathers
 */
function generateAvg(weathers){
	const n = weathers.length;
	const sums = weathers.reduce((accumulator, cur) => {
		accumulator["max_sum"] += Number(cur["maximum_temperature"]);
		accumulator["min_sum"] += Number(cur["minimum_temperature"]);
		return accumulator;
	}, { "max_sum": 0, "min_sum": 0 });
	return {"max_avg": sums["max_sum"]/n, "min_avg": sums["min_sum"]/n};
}

module.exports = router;