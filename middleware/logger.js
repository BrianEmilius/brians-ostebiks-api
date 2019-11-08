const Winston = require("winston");
const expressWinston = require("express-winston");

exports.debugLogger = expressWinston.logger({
	transports: [
		new Winston.transports.Console()
	],
	meta: false,
	expressFormat: true
});

exports.log = Winston.createLogger({
	transports: [
		new Winston.transports.Console()
	]
});
