"use strict";

const LISTEN_OBJECT = {
   pin: 'role:logging',
   port: process.env.LOGGER_SERVICE_PORT,
   host: process.env.LOGGER_SERVICE_HOST,
   type: process.env.LOGGER_SERVICE_TRANSPORT,
};

require('seneca')()
   .use('logger')
   .listen(LISTEN_OBJECT);
