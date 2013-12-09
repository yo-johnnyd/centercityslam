angular.module('results', [])
.controller('ResultListCtrl', function($scope, $http) {
	$http.get('results/2013results.json').success(function(data) {
		$scope.events = data.years[0].events;
	})
});