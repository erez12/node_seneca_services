function TrackingController($scope, ServerEvents) {
	$scope.data = {};
	ServerEvents.on('tracking_event', (data) => {
		$scope.data[data.bag_id] = data;
	});
}