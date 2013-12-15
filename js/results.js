angular.module('resultsFilters', [])
.filter('taggedEvents', function(){
	return function(events, tagName) {
		var taggedEvents = [];
		angular.forEach(events, function(event){
			var isTagged = false;
			angular.forEach(event.tags, function(tag){
				if(tag === tagName){
					isTagged = true;
				}
			});
			if(isTagged){
				taggedEvents.push(event);
			}
		});
		return taggedEvents;
	};
});

angular.module('results', ['ngRoute','resultsFilters'])
.config(function($routeProvider) {
	$routeProvider.when('/2013', {
		controller:'ResultsCtrl',
		templateUrl:'results/resultsTemplate.html'
	}).when('/2012', {
		controller:'ResultsCtrl2012',
		templateUrl:'results/resultsTemplate.html'
	})
	// .when('/edit/:projectId', {
	// controller:'EditCtrl',
	// templateUrl:'detail.html'
	// })
	// .when('/new', {
	// controller:'CreateCtrl',
	// templateUrl:'detail.html'
	// })
	.otherwise({
		redirectTo:'/2013'
	});
})
.controller('ResultsCtrl', function($scope, $http) {
	$http.get('results/2013results.json').success(function(data) {
		$scope.events = data.years[0].events;
	});
	$scope.mensTag = "mens";
	$scope.womensTag = "womens";
	$scope.active2013 = true;
})
.controller('ResultsCtrl2012', function($scope, $http) {
	$http.get('results/2013results.json').success(function(data) {
		$scope.events = data.years[0].events;
	});
	$scope.mensTag = "mens";
	$scope.womensTag = "womens";
	$scope.active2012 = true;
});