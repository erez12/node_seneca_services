"use strict"

const WEB_APP_CLIENT = {
   pin: 'role:web_app,cmd:log_update',
   port: process.env.WEB_APP_PORT || 3002,
   host: process.env.WEB_APP_HOST || '127.0.0.1',
   type: process.env.WEB_APP_TRANSPORT || 'http'
};

module.exports = function logger(options) {
   let seneca = this;

   seneca.client(WEB_APP_CLIENT);
   let updateWebApp = (message) => seneca.act('role:web_app,cmd:log_update', message);

   seneca.add('role:logging,cmd:log,message:*', function (msg, respond){
      console.log("LOG::", msg.message);
      // TODO - first save to DB then send to web
      updateWebApp({ service: msg.service, severity: "log", message: msg.message });
      respond(null, {answer: 'finish log'});
   });

   seneca.add('role:logging,cmd:warn,message:*', function (msg, respond){
      console.log("WARN::", msg.message);
      // TODO - first save to DB then send to web
      updateWebApp({ service: msg.service, severity: "warn", message: msg.message });
      respond(null, {answer: 'finish warn'});
   });

   seneca.add('role:logging,cmd:error,message:*', function (msg, respond){
      console.log("ERROR::", msg.message);
      // TODO - first save to DB then send to web
      updateWebApp({ service: msg.service, severity: "error", message: msg.message });
      respond(null, {answer: 'finish error'});
   });
};
