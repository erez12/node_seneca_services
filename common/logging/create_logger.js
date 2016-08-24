"use strict";

const supportedLoggers = {
   "console": () => require('./console_logger.js'),
   "service": () => require('./service_logger.js')
};

module.exports = function createLogger(type){
   if (!type || !supportedLoggers[type]) return null;

   return supportedLoggers[type]();
}
