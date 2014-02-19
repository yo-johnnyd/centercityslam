/*
*	TODOS:
* -------------------------------------1). get search working as a filter
* 2). don't filter 4 times
* 3). make anything hardcoded a constant
* 4). better way to do scrollToRace
* 5). tests
* 6). pipe dream: route includes race id
*/


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

.config(function($routeProvider) {
	$routeProvider.when('/year/:year', {
		controller:'ResultsCtrl',
		templateUrl:'results/resultsTemplate.html'
	})
	.when('/records/:year', {
		controller:'RecordsCtrl',
		templateUrl:'results/recordsTemplate.html'
	})
	.otherwise({
		redirectTo:'/year/2014'
	});
})

.controller('RecordsCtrl', function($scope, $http, $routeParams) {
	// TODO tons of dup code in here
	var menuHeight = $('#resultsMenu').height(),
		yearMenuOffset = $('#yearMenu').offset.top;

	$scope.year = $routeParams.year;
	// TODO: why can't I just pass these in to the filter function?
	$scope.mensTag = "mens";
	$scope.womensTag = "womens";

	$scope.downloadLinks = {
		"2013" : {
			"title": "Records (pdf)",
			"link": "results/Records_2013.pdf"
		}
	};

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

	$scope.timeParse = function(raceTime) {
		return raceTime.substring(0,7);
	}

	$('#filter-form').on('submit', function(event){
		document.activeElement.blur();
	});

	// make request
	$http.get('results/' + $routeParams.year + 'records.json').success(function(data) {
		$scope.races = data.years[0].races;
	});
})

.controller('ResultsCtrl', function($scope, $http, $routeParams) {
	var menuHeight = $('#resultsMenu').height(),
		yearMenuOffset = $('#yearMenu').offset.top;

	$scope.year = $routeParams.year;
	// TODO: why can't I just pass these in to the filter function?
	$scope.mensTag = "mens";
	$scope.womensTag = "womens";

	$scope.downloadLinks = {
		"2013": {
			"title": "Results (pdf)",
			"link": "results/Center_City_Slam_2013_results.pdf",
			"recordsTitle": "Records (pdf)",
			"recordsLink": "Records_2013.pdf"
		},
		"2012": {
			"title": "Results (Ronin Racing)",
			"link": "http://www.roninregistration.com/rowing/results/TimingResults.asp?p=default&pt=rowing&GroupID=88116"
		},
		"2011": {
			"title": "Results (pdf)",
			"link": "results/Center_City_Slam_2011_results.pdf"
		},
		"2010": {
			"title": "Results (xls)",
			"link": "results/Center_City_Slam_2010results.xls"
		},
		"2009": {
			"title": "Results (xls)",
			"link": "results/Center+City+Slam+Results+2009.xls"
		},
		"2008": {
			"title": "Results (pdf)",
			"link": "results/2008_Results.pdf"
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

	$scope.timeParse = function(raceTime) {
		return raceTime.substring(0,7);
	}

	$('#filter-form').on('submit', function(event){
		document.activeElement.blur();
	});

	// make request
	$http.get('results/' + $routeParams.year + 'results.json').success(function(data) {
		$scope.races = data.years[0].races;
	});
});