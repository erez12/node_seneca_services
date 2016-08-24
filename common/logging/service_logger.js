"use strict";

const LISTEN_OBJECT = {
   pin: 'role:logging',
   port: process.env.LOGGER_SERVICE_PORT,
   host: process.env.LOGGER_SERVICE_HOST,
   type: process.env.LOGGER_SERVICE_TRANSPORT,
};

let seneca = require('seneca')().client(LISTEN_OBJECT);

module.exports = (function () {
   function logFunction(severity){
      return function (message){
         return new Promise(function(resolve, reject) {
            if (!message){
               return resolve(null);
            }

            seneca.act({role: 'logging', cmd: severity, message: message}, function (err, result){
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
}());
