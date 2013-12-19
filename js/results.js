angular.module('resultsFilters', [])
.filter('taggedRaces', function(){
	return function(events, tagName) {
		var taggedEvents = [];
		angular.forEach(events, function(event){
			var isTagged = false;
			// TODO: this should be more of an UNDERSCRORE FIND
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
	$routeProvider.when('/year/2012', {
		controller: 'ResultsCtrl2012',
		templateUrl: 'results/resultsTemplate2012.html'
	})
	.when('/year/2011', {
		controller: 'ResultsCtrl2011',
		templateUrl: 'results/resultsTemplate2011.html'
	})
	.when('/year/2010', {
		controller: 'ResultsCtrl2010',
		templateUrl: 'results/resultsTemplate2010.html'
	})
	.when('/year/2009', {
		controller: 'ResultsCtrl2009',
		templateUrl: 'results/resultsTemplate2009.html'
	})
	.when('/year/2008', {
		controller: 'ResultsCtrl2008',
		templateUrl: 'results/resultsTemplate2008.html'
	})
	.when('/year/:year', {
		controller:'ResultsCtrl',
		templateUrl:'results/resultsTemplate.html'
	})
	.otherwise({
		redirectTo:'/year/2013'
	});
})

.controller('ResultsCtrl2012', function($scope) {
	$scope.isActive = function(year){
		return year === "2012";
	};
})

.controller('ResultsCtrl2011', function($scope) {
	$scope.isActive = function(year){
		return year === "2011";
	};
})

.controller('ResultsCtrl2010', function($scope) {
	$scope.isActive = function(year){
		return year === "2010";
	};
})

.controller('ResultsCtrl2009', function($scope) {
	$scope.isActive = function(year){
		return year === "2009";
	};
})

.controller('ResultsCtrl2008', function($scope) {
	$scope.isActive = function(year){
		return year === "2008";
	};
})

.controller('ResultsCtrl', function($scope, $http, $routeParams) {
	var menuHeight = $('#resultsMenu').height(),
		yearMenuOffset = $('#yearMenu').offset.top;

	$scope.year = $routeParams.year;
	// TODO: why can't I just pass these in to the filter function?
	$scope.mensTag = "mens";
	$scope.womensTag = "womens";

	$scope.search = function (rower){
		if(!$scope.query || $scope.query === ""){
			return true;
		}
		var lcQuery = $scope.query.toLowerCase(),
			lcFName = rower.fName.toLowerCase(),
			lcLName = rower.lName.toLowerCase(),
			lcFullName = lcFName + ' ' + lcLName,
			lcAffiliation = rower.affiliation.toLowerCase();

		if(lcFName.indexOf(lcQuery) != -1 || 
			lcLName.indexOf(lcQuery) != -1 ||
			lcFullName.indexOf(lcQuery) != -1 ||
			lcAffiliation.indexOf(lcQuery) != -1){
			return true;
		}
		return false;
	};

	$scope.scrollToRace = function(raceId) {
		// TODO need a way to figure out how to do this differently for mobile?
		$("body").animate({scrollTop: $('#' + raceId).offset().top - menuHeight}, "slow");
	};
	// TODO: does this need to animate? doesn't seem to work anyways
	$scope.scrollToTop = function() {
		$("body").animate({scrollTop: yearMenuOffset - menuHeight}, "slow");
	};
	// menu context check	
	$scope.isActive = function(year){
		return year === $scope.year;
	};

	$('#filter-form').on('submit', function(event){
		console.log('submit');
		document.activeElement.blur();
	});

	// make request
	$http.get('results/' + $routeParams.year + 'results.json').success(function(data) {
		$scope.races = data.years[0].races;
	});
});