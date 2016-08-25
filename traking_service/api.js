"use strict"

const logger = require('../common/logging/create_logger.js')('service', 'traking_service');

module.exports = function api(options) {

  this.add('role:api,path:traking', function (msg, respond){
     logger.log({lon: msg.lon, lat: msg.lat});
     respond(null, {answer: 'updated'})
  });

  this.add('init:api', function (msg, respond){
     this.act('role:web', {use: {
        prefix: '/api',
        pin: 'role:api, path:*',
        map: {
           traking: { PUT: true }
        }
     }}, respond);
  });
}
