"use strict";

const express = require('express');
const http = require('http');
const socketIO = require('socket.io')

let app = express();
let server = http.Server(app);
let io = socketIO(server);

app.use(express.static('public'));

function sendDummyData(){
   var _messageCount = 1;
   var _severities = ['log', 'warn', 'error'];
   var _severitiesIndex = 0;
   var _services = ['foo', 'goo', 'moo'];
   var _serviceIndex = 0;

   setInterval(() => {
      io.sockets.emit('log_event', {
         service: _services[_serviceIndex],
         severity: _severities[_severitiesIndex],
         message: "from server " + (_messageCount++)
      });
      _severitiesIndex = (_severitiesIndex + 1) % _severities.length;
      _serviceIndex = (_serviceIndex + 1) % _services.length;
   }, 1000 * 2);
}
var connection = false;
io.on('connection', function (socket) {
   console.log('connection');
   if (!connection) sendDummyData();

   connection = true;
});

server.listen(8080);
