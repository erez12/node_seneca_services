"use strict";

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const LISTEN_OBJECT = {
   pin: 'role:web_app',
   port: process.env.WEB_APP_PORT || 3002,
   host: process.env.WEB_APP_HOST || '127.0.0.1',
   type: process.env.WEB_APP_TRANSPORT || 'http'
};

// Web Server:
let app = express()
      .use(express.static(__dirname + '/public'));
let server = http.Server(app).listen(8080);
let io = socketIO(server);
io.on('connection', function (socket) {
   console.log('one more connection');
});

// Services Server:
let seneca = require('seneca')()
//TODO - create a class for clients notifier
   .use(require('./seneca_plugins/log_updates.js')({ notifiy: (msg) => io.sockets.emit('log_event', msg) }))
   .listen(LISTEN_OBJECT);





// function sendDummyData(){
//    var _messageCount = 1;
//    var _severities = ['log', 'warn', 'error'];
//    var _severitiesIndex = 0;
//    var _services = ['foo', 'goo', 'moo'];
//    var _serviceIndex = 0;
//
//    setInterval(() => {
//       io.sockets.emit('log_event', {
//          service: _services[_serviceIndex],
//          severity: _severities[_severitiesIndex],
//          message: "from server " + (_messageCount++)
//       });
//       _severitiesIndex = (_severitiesIndex + 1) % _severities.length;
//       _serviceIndex = (_serviceIndex + 1) % _services.length;
//    }, 1000 * 2);
// }
