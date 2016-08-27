"use strict";

module.exports = function create_log_updates_plugin(webClientsNotifier) {
    return function log_update(options) {
        let seneca = this;

        seneca.add('role:web_app,cmd:tracking_update', function(msg, respond) {
            webClientsNotifier.notifiy({
                lon: msg.lon,
                lat: msg.lat,
                bag_id: msg.bag_id
            });
            respond(null);
        });
    };
};