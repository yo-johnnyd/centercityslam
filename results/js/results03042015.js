angular.module('resultsFilters', [])
.filter('taggedRaces', function(){
	return function(races, tagName) {
		var taggedRaces = [];
		if(races){
			// using for loop instead of angular.foreach because this http://jsperf.com/angular-foreach-vs-native-for-loop/3
			for(var i=0; i<races.length; i++){
				var isTagged = false,
					thisRace = races[i];
				if(thisRace.tags){
					for(var j=0; j<thisRace.tags.length; j++){
						if(thisRace.tags[j] === tagName){
							isTagged = true;
							break;
						}
					}
				}
				if(isTagged){
					taggedRaces.push(thisRace);
				}
			}
		}
		return taggedRaces;
	};
})
.filter('rowerOrAffiliation', function(){
	return function(rowers, rowerOrAffiliation) {
		var matchingRowers = [];
		if(!rowerOrAffiliation || rowerOrAffiliation === ""){
			return rowers;
		}
		if(rowers){
			for(var i=0; i<rowers.length; i++){
				var rower = rowers[i],
					lcQuery = rowerOrAffiliation.toLowerCase(),
					lcFName = rower.fName.toLowerCase(),
					lcLName = rower.lName.toLowerCase(),
					lcFullName = lcFName + ' ' + lcLName,
					lcAffiliation = rower.affiliation.toLowerCase();

				if(lcFName.indexOf(lcQuery) != -1 ||
					lcLName.indexOf(lcQuery) != -1 ||
					lcFullName.indexOf(lcQuery) != -1 ||
					lcAffiliation.indexOf(lcQuery) != -1){
					matchingRowers.push(rower);
				}
			}
		}
		return matchingRowers;
	};
});

angular.module('results', ['ngRoute','resultsFilters'])

.constant('mySettings', {
	'defaultYear': '2015',
	'tags': {
		'mensTag': 'mens',
		'womensTag': 'womens'
	}
})

.config(function($routeProvider, mySettings) {
	$routeProvider.when('/year/:year', {
		controller:'ResultsCtrl',
		templateUrl:'partials/resultsTemplate.html'
	})
	.when('/records/:year', {
		controller:'RecordsCtrl',
		templateUrl:'partials/recordsTemplate.html'
	})
	.otherwise({
		redirectTo:'/year/' + mySettings.defaultYear
	});
})

.factory('timeParse', function() {
	return function(raceTime) {
		return raceTime.substring(0,7);
	}
})

.controller('RecordsCtrl', function($scope, $http, $routeParams, mySettings, timeParse) {
	var menuHeight = $('#resultsMenu').height(),
		yearMenuOffset = $('#yearMenu').offset.top;

	$scope.year = $routeParams.year;
	$scope.timeParse = timeParse;
	$scope.mensTag = mySettings.tags.mensTag;
	$scope.womensTag = mySettings.tags.womensTag;

	$scope.scrollToRace = function(raceId) {
		// TODO need a way to figure out how to do this differently for mobile?
		$("body,html").animate({scrollTop: $('#' + raceId).offset().top - menuHeight}, "slow");
	};

	// TODO: does this need to animate? doesn't seem to work anyways
	$scope.scrollToTop = function() {
		$("body,html").animate({scrollTop: yearMenuOffset - menuHeight}, "slow");
	};

	// menu context check
	$scope.isActive = function(menuItem){
		return menuItem === 'records';
	};

	$('#filter-form').on('submit', function(event){
		document.activeElement.blur();
	});

	// make request
	$http.get('data/' + $routeParams.year + 'records.json').success(function(data) {
		$scope.races = data.years[0].races;
	});
})

.controller('ResultsCtrl', function($scope, $http, $routeParams, mySettings, timeParse) {
	var menuHeight = $('#resultsMenu').height(),
		yearMenuOffset = $('#yearMenu').offset.top;

	$scope.year = $routeParams.year;
	$scope.timeParse = timeParse;
	$scope.mensTag = mySettings.tags.mensTag;
	$scope.womensTag = mySettings.tags.womensTag;

	$scope.downloadLinks = {
		"2013": {
			"title": "Results (pdf)",
			"link": "data/Center_City_Slam_2013_results.pdf",
			"recordsTitle": "Records (pdf)",
			"recordsLink": "Records_2013.pdf"
		},
		"2012": {
			"title": "Results (Ronin Racing)",
			"link": "http://www.roninregistration.com/rowing/results/TimingResults.asp?p=default&pt=rowing&GroupID=88116"
		},
		"2011": {
			"title": "Results (pdf)",
			"link": "data/Center_City_Slam_2011_results.pdf"
		},
		"2010": {
			"title": "Results (xls)",
			"link": "data/Center_City_Slam_2010results.xls"
		},
		"2009": {
			"title": "Results (xls)",
			"link": "data/Center+City+Slam+Results+2009.xls"
		},
		"2008": {
			"title": "Results (pdf)",
			"link": "data/2008_Results.pdf"
		}
	}

	$scope.scrollToRace = function(raceId) {
		// TODO need a way to figure out how to do this differently for mobile?
		$("body,html").animate({scrollTop: $('#' + raceId).offset().top - menuHeight}, "slow");
	};
	// TODO: does this need to animate? doesn't seem to work anyways
	$scope.scrollToTop = function() {
		$("body,html").animate({scrollTop: yearMenuOffset - menuHeight}, "slow");
	};
	// menu context check
	$scope.isActive = function(year){
		return year === $scope.year;
	};

	$('#filter-form').on('submit', function(event){
		document.activeElement.blur();
	});

	var resultsMap = {
		2008: '2008results.json',
		2009: '2009results.json',
		2010: '2010results.json',
		2011: '2011results.json',
		2012: '2012results.json',
		2013: '2013results.json',
		2014: '2014results.json',
		2015: '2015results03042015.json'
	}

	// make request
	$http.get('data/' + resultsMap[$routeParams.year]).success(function(data) {
		$scope.races = data.years[0].races;
	});
});
