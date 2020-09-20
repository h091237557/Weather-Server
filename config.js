module.exports = {
	"cron":{
		"fetch_weather_task": {
			"interval_describe": "Doing the task per ${interval} sec",
			"interval": 3600 
		}
	},
	"server":{
		"port": process.env.SERVER_PORT || 3000
	},
	"source_server": {
		"url": process.env.SOURCE_SERVER_URL || "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/",
		"dataid": "O-A0001-001",
		"apikey": process.env.API_KEY || "CWB-3C066427-5C64-4278-9465-AA4656F5661D",
		"format": "JSON"
	},
	"db": {
		"host": process.env.MONGODB_HOST || "127.0.0.1",
		"port": process.env.MONGODB_PORT || 27017,
		"name" : process.env.MONGODB_DBNAME || "testing",
		"user": process.env.MONGODB_USER || "root",
		"pwd": process.env.MONGODB_PWD || "123456789"
	},
};