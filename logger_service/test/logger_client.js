"use strict";

const logger = require('../../common/logging/create_logger.js')('service', 'test_client');
logger.log("Somthing happend at: " + Date.now()).then(console.log);
logger.warn("Somthing weird happend at: " + Date.now()).then(console.log);
logger.error("Somthing bad happend at: " + Date.now()).then(console.log);
