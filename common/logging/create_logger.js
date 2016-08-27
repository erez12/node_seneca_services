"use strict";

const supportedLoggers = {
	"console": (serviceName) => require('./console_logger.js')(serviceName),
	"service": (serviceName) => require('./service_logger.js')(serviceName)
};

module.exports = function createLogger(type, serviceName) {
	if (!type || !supportedLoggers[type]) return null;

	return supportedLoggers[type](serviceName);
}