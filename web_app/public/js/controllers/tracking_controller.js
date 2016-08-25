function TrackingController($scope, ServerEvents) {
  ServerEvents.on('tracking_event', (data) => {
    console.log(data);
  });
}
