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
	$routeProvider.when('/year/:year', {
		controller:'ResultsCtrl',
		templateUrl:'results/resultsTemplate.html'
	})
	.otherwise({
		redirectTo:'/year/2013'
	});
})
.controller('ResultsCtrl', function($rootScope, $scope, $http, $routeParams, $location, $anchorScroll) {
	$http.get('results/' + $routeParams.year + 'results.json').success(function(data) {
		$scope.events = data.years[0].events;
	});
	$scope.year = $routeParams.year;
	$scope.mensTag = "mens";
	$scope.womensTag = "womens";
	$scope.active2013 = true;
	var menuHeight = $('#resultsMenu').height(),
		yearMenuOffset = $('#yearMenu').offset.top;
	$scope.scrollToRace = function(raceId) {
		// TODO need a way to figure out how to do this differently for mobile?
		$("body").animate({scrollTop: $('#' + raceId).offset().top - menuHeight}, "slow");
	};
	$scope.scrollToTop = function() {
		$("body").animate({scrollTop: yearMenuOffset - menuHeight}, "slow");
	};	
});