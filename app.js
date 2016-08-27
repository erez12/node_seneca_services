"use strict";

const fork = require('child_process').fork;

// 1. Start all services:
fork('./web_app/app.js');
fork('./tracking_service/app.js');
fork('./logger_service/app.js');

// 2. Start few clients:
// Allow few secs for services to load
setTimeout(() => {
	for (let i = 0; i < 2; i++) {
		fork('./tracking_service/test/tracking_client.js');
	}
}, 1000 * 5);