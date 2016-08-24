// var seneca = require('seneca')()

// seneca.add('role:math,cmd:sum', function (msg, reply){
//    reply(null, {answer: (msg.left + msg.right)})
// });
//
// seneca.add('role:math,cmd:sum,int:true', function (msg, reply){
//    this.act({
//       role:'math', cmd:'sum', left:Math.floor(msg.left), right:Math.floor(msg.right)
//    }, reply);
// });
// seneca.act({role: 'math', cmd: 'sum', left: 1.4, right: 2.1, int:true}, function (err, result) {
//   if (err) return console.error(err)
//   console.log(result)
// });


//Logger service:
"use strict";

require('seneca')()
   .use('./logger_service/logger.js')
   .listen()
   // .act({role:"logging",cmd:"log",message:"fofofo"});

// Web app:


// User
// const logger = require('./lib/logger');
// let p1 = logger.log('The time is ' + (Date.now()))
//             .then(console.log)
//             .catch(console.log)

// let p2 = logger.warn('The time is ' + (Date.now()));
// let p3 = logger.error('The time is ' + (Date.now()));
// Promise.all([p1, p2, p3])
//    .then(console.log)
//    .catch(console.log)
// seneca.act({role: 'logging', cmd: 'error', message: 'The time is ' + (Date.now())}, function (err, result){
//    console.log(err, result);
// });
