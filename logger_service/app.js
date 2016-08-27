"use strict";

const LISTEN_OBJECT = {
	pin: 'role:logging',
	port: process.env.LOGGER_SERVICE_PORT || 3001,
	host: process.env.LOGGER_SERVICE_HOST || '127.0.0.1',
	type: process.env.LOGGER_SERVICE_TRANSPORT || 'http'
};

require('seneca')()
	.use(require('./seneca_plugins/logger.js'))
	.listen(LISTEN_OBJECT);