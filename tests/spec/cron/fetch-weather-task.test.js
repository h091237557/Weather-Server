/* eslint-disable mocha/no-hooks-for-single-case */
const chai = require("chai");
const sinon = require("sinon");
const weatherModel = require("../../../src/models/weather-model");
const mockWeatherOpenData = require("../datas/weather-opendata.json");
const task = require("../../../src/cron/tasks/fetch-weater-task");
const clearAll = require("../helps/clear-all");

chai.should();

describe("Cron Fetch Weather Task Test", function() {
	let sandbox;
	beforeEach(async () => {
		sandbox = sinon.createSandbox();
		sandbox.stub(weatherModel, "fetchWeathersFromOpendata").returns(mockWeatherOpenData);
	});

	afterEach(async () => {
		sandbox.restore();
		await clearAll();
	});	

	it("should return correctly result, when the task work", async () => {
		await task.work();
		const res = await weatherModel.getCurrentWeatherByCity("01", task.interval*1000);
		res[0].should.have.property("city");
		res[0].should.have.property("city_code");
		res[0].should.have.property("town");
		res[0].should.have.property("town_code");
		res[0].should.have.property("maximum_temperature");
		res[0].should.have.property("minimum_temperature");
		res[0].should.have.property("updated_at");
		res[0].should.have.property("deleted_at");
	});
});
