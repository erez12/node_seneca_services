"use strict";

module.exports = function create_log_updates_plugin(webClientsNotifier) {
    return function log_update(options) {
        let seneca = this;

        seneca.add('role:web_app,cmd:log_update', function(msg, respond) {
            webClientsNotifier.notifiy({
                service: msg.service,
                severity: msg.severity,
                message: msg.message
            });
            respond(null);
        });
    };
};