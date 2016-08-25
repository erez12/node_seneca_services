"use strict";

module.exports = function create_log_updates_plugin(webClientsNotifier){
   return function log_update(options) {
      let seneca = this;

      seneca.add('role:web_app,cmd:log_update', function (msg, respond) {
         webClientsNotifier.notifiy({
            service: msg.service,
            severity: msg.severity,
            message: msg.message
         });
         console.log("message from logger", msg.service, msg.severity, msg.message);
         respond(null);
         // TODO - pass info to our clients
        //Maybe send an internl message to self
      //  this.act('role:math', {
      //    cmd:   valid_ops[msg.operation],
      //    left:  msg.left,
      //    right: msg.right,
      //  }, respond)
      });
   };
};
