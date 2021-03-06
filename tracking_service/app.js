"use strict"

let seneca = require('seneca')()
	.use(require('./seneca_plugins/api'))

let app = require('express')()
	.use(require('body-parser').json())
	.use(seneca.export('web'))
	.listen(process.env.TRACKING_SERVICE_PORT || 3003)