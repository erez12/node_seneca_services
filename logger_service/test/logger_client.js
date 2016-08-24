"use strict";

const logger = require('../../common/logging/create_logger.js')('service');
logger.log("Somthing happend at: " + Date.now()).then(console.log);
logger.warn("Somthing happend at: " + Date.now()).then(console.log);
logger.error("Somthing happend at: " + Date.now()).then(console.log);
