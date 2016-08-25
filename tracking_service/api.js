"use strict"

const logger = require('../common/logging/create_logger.js')('service', 'tracking_service');
const dataAccessLayer = require('./data_access_layer.js');
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
        dataAccessLayer.updateTracking(msg.bag_id, data, function(err) {
            if (err) {
                logger.error(error.message);
                respond(err);
                return;
            }

            data.bag_id = msg.bag_id;
            //TODO - Notify webApp
            updateWebApp(data);
            logger.log(data);
            respond(null, {
                answer: 'updated'
            })
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