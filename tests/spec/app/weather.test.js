/* eslint-disable mocha/no-hooks-for-single-case */
const chai = require("chai");
const supertest = require("supertest");
const config = require("../../../config");
const server = require("../../../src/app/server");
const weatherModel = require("../../../src/models/weather-model");
const clearAll = require("../helps/clear-all");

chai.should();

describe("Weather API Spec Test", function() {
	describe("Get /weathers/:city_code", () => {
		let server_;
		let request;
		let mockWeathers;
		beforeEach(async () => {
			mockWeathers = [
				{  
					"city": "台北市",
					"city_code": "01",
					"town": "松山",
					"town_code": "001",
					"maximum_temperature" : 31,
					"minimum_temperature": 25,
					"updated_at": Date.now(),
					"deleted_at": null
				}
			];
			server_ = server.listen(config.server.port);
			request = supertest(server_);
			await weatherModel.saveWeathers(mockWeathers);
		});

		afterEach(async () => {
			await server_.close();
			await clearAll();
		});	

		it("should return correctly result", async () => {
			const cityCode = "01";
			const res = await request.get(`/weathers/${cityCode}`).set("Accept", "application/json");
			res.status.should.eql(200);
			res.body.should.eql({
				"city": mockWeathers[0]["city"],
				"maximum_temperature": mockWeathers[0]["maximum_temperature"],
				"minimum_temperature": mockWeathers[0]["minimum_temperature"]
			});
		});

		it("should return 404 http code, when the city is invalid", async () => {
			const cityCode = "9999";
			const res = await request.get(`/weathers/${cityCode}`).set("Accept", "application/json");
			res.status.should.eql(404);
		});
	});
});
