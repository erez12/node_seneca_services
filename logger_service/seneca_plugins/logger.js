"use strict"

const WEB_APP_CLIENT = {
    pin: 'role:web_app,cmd:log_update',
    port: process.env.WEB_APP_PORT || 3002,
    host: process.env.WEB_APP_HOST || '127.0.0.1',
    type: process.env.WEB_APP_TRANSPORT || 'http'
};
const dataAccessLayer = require('../data_access_layer.js');

module.exports = function logger(options) {
    let seneca = this;

    seneca.client(WEB_APP_CLIENT);
    let updateWebApp = (message) => seneca.act('role:web_app,cmd:log_update', message);

    let loggingCallback = (severity) => (msg, respond) => {
        let data = {
            service: msg.service,
            severity: severity,
            message: msg.message
        };
        dataAccessLayer.addLogMessage(data)
            .then((_) => {
                updateWebApp(data);
                respond(null, {
                    answer: 'finish ' + severity
                });
            })
            .catch((err) => respond(err))
    };

    seneca.add('role:logging,cmd:log,message:*', loggingCallback("log"));
    seneca.add('role:logging,cmd:warn,message:*', loggingCallback("warn"));
    seneca.add('role:logging,cmd:error,message:*', loggingCallback("error"));
};