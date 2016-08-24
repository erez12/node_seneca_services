module.exports = function logger(options) {
   this.add('role:logging,cmd:log,message:*', function (msg, respond){
      console.log("LOG::", msg.message);
      respond(null, {answer: 'finish log'});
   });

   this.add('role:logging,cmd:warn,message:*', function (msg, respond){
      console.log("WARN::", msg.message);
      respond(null, {answer: 'finish warn'});
   });

   this.add('role:logging,cmd:error,message:*', function (msg, respond){
      console.log("ERROR::", msg.message);
      respond(null, {answer: 'finish error'});
   });
};
