"use strict";

const CLIENT_OBJECT = {
   pin: 'role:logging',
   port: process.env.LOGGER_SERVICE_PORT || 3001,
   host: process.env.LOGGER_SERVICE_HOST || '127.0.0.1',
   type: process.env.LOGGER_SERVICE_TRANSPORT || 'http',
};

let seneca = require('seneca')().client(CLIENT_OBJECT);

module.exports = function (serviceName) {
   function logFunction(severity){
      return function (message, service){
         return new Promise(function(resolve, reject) {
            if (!message){
               return resolve(null);
            }

            seneca.act({role: 'logging', cmd: severity, service: serviceName, message: message}, function (err, result){
               if (err) return reject(err);
               resolve(result);
            });
         });
      };
   }

   return {
      log: logFunction('log'),
      warn: logFunction('warn'),
      error: logFunction('error')
   };
};
