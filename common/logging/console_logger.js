"use strict";

module.exports = function(serviceName) {
    function logFunction(severity) {
        return function(message) {
            return new Promise(function(resolve, reject) {
                if (!message) {
                    return resolve(null);
                }

                if (!console[severity]) {
                    return reject("Invalid severity level");
                }

                console[severity](message);
                return resolve({
                    answer: 'finish ' + severity
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