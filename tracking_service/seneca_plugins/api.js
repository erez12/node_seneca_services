"use strict"

const logger = require('../../common/logging/create_logger.js')('service', 'tracking_service');
const dataAccessLayer = require('../data_access_layer.js');
const WEB_APP_CLIENT = {
    pin: 'role:web_app,cmd:tracking_update',
    port: process.env.WEB_APP_PORT || 3002,
    host: process.env.WEB_APP_HOST || '127.0.0.1',
    type: process.env.WEB_APP_TRANSPORT || 'http'
};

module.exports = function api(options) {
    let seneca = this;

    seneca.client(WEB_APP_CLIENT);
    let updateWebApp = (message) => seneca.act('role:web_app,cmd:tracking_update', message);

    this.add('role:api,path:tracking', function(msg, respond) {
        let data = {
            lon: msg.lon,
            lat: msg.lat
        };
        dataAccessLayer.updateTracking(msg.bag_id, data)
            .then((_) => {
                logger.log("bag " + msg.bag_id + " is at " + JSON.stringify(data));
                data.bag_id = msg.bag_id;
                updateWebApp(data);
                respond(null, {
                    answer: 'updated'
                });
            })
            .catch((err) => {
                logger.error(error.message);
                respond(err);
            });
    });

    this.add('init:api', function(msg, respond) {
        this.act('role:web', {
            use: {
                prefix: '/api',
                pin: 'role:api, path:*',
                map: {
                    tracking: {
                        PUT: true
                    }
                }
            }
        }, respond);
    });
}