var app = angular.module('MyApp', []);
app.service('ServerEvents', ServerEventsService);
app.controller('loggerCtroller', LoggerController);
app.controller('trackingCtroller', TrackingController);
