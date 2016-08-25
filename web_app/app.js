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

let clientsNotifier = (topic) => {
	return { notifiy: (msg) => io.sockets.emit(topic, msg) }
}
// Services Server:
let seneca = require('seneca')()
//TODO - create a class for clients notifier
   .use(require('./seneca_plugins/log_updates.js')(clientsNotifier('log_event')))
   .use(require('./seneca_plugins/tracking_updates.js')(clientsNotifier('tracking_event')))
   .listen(LISTEN_OBJECT);