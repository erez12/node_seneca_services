function LoggerController($scope, ServerEvents) {
  var severityToClassMapping = {
     log: "",
     warn: "list-group-item-warning",
     error: "list-group-item-danger"
  }
   // Initial value
   $scope.items = [{service: 'SYSTEM', message:'Waiting For Data...', severity: 'log'}];

   $scope.prependLogItem = function (logItem){
      $scope.items = [logItem].concat($scope.items);
      $scope.$apply();
   };

   $scope.getLogClass = function (idx, list) {
       return severityToClassMapping[list[idx].severity];
   }

   ServerEvents.on('log_event', $scope.prependLogItem);
}
