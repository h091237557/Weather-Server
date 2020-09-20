const help = require("./help");
const EmptyResouceError = require("../../errors/empty-resource-error");

module.exports = (req, res, next) => {
	const cityCode = req.params.city_code;
	if(!cityCode || !help["valid_city"].includes(cityCode)){
		throw new EmptyResouceError(); 
	}
	next();
};