'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
	beforeEach(module('resultsFilters'));
  	describe('taggedRaces', function() {
  		var races = null,
  			filter = null;

    	beforeEach(inject(function(taggedRacesFilter) {
    		filter = taggedRacesFilter;
      		races = [
	            {
	                    "id": "gyu142014",
	                    "name": "Girl's Youth Under 14",
	                    "number": 1,
	                    "tags": ["womens","girls","u14"],
	                    "rowers": []
	            },
	            {
	                    "id": "byu142014",
	                    "name": "Boy's Youth Under 14",
	                    "number": 2,
	                    "time": null, 
	                    "distance": 2000,
	                    "tags": ["mens","boys","u14"],
	                    "rowers": []
	            },
	            {
	                    "id": "whsn2014",
	                    "name": "Women's High School Novice",
	                    "number": 3,
	                    "time": null, 
	                    "distance": 2000,
	                    "tags": ["womens","highschool","novice"],
	                    "rowers": []
	            }
	         ];
    	}));


		it('should return races with the mens tag', inject(function(taggedRacesFilter) {
	    	var taggedRacesResult = taggedRacesFilter(races, 'mens');
	      	expect(taggedRacesResult.length).toEqual(1);
	      	expect(taggedRacesResult).toEqual([{
	                    "id": "byu142014",
	                    "name": "Boy's Youth Under 14",
	                    "number": 2,
	                    "time": null, 
	                    "distance": 2000,
	                    "tags": ["mens","boys","u14"],
	                    "rowers": []
	            }]);
	    }));

	    it('should return races with the womens tag', inject(function(taggedRacesFilter) {
	    	var taggedRacesResult = taggedRacesFilter(races, 'womens');
	    	expect(taggedRacesResult.length).toEqual(2);
	    	expect(taggedRacesResult[0].id).toEqual('gyu142014');
	    }));
  	});

	describe('rowerOrAffiliation', function(){
		var rowers = null,
			filter = null;

		beforeEach(inject(function(rowerOrAffiliationFilter){
			filter = rowerOrAffiliationFilter;
      		rowers = [
	      		{"rank":1,"fName":"Paul","lName":"Hurd","time":"06:39.00","affiliation":"Haddonfield Crew Club"},
				{"rank":2,"fName":"Gavin","lName":"Adams","time":"06:44.30","affiliation":"Haverford School"},
				{"rank":2,"fName":"Sean","lName":"Pepin","time":"06:44.30","affiliation":"Conestoga Crew Club"},
				{"rank":4,"fName":"John","lName":"Edelman III","time":"06:47.30","affiliation":"St. Joseph's Preparatory School"},
				{"rank":5,"fName":"JIM","lName":"MC CULLOUGH","time":"06:50.00","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":6,"fName":"STEVE","lName":"GENNARO","time":"06:52.10","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":7,"fName":"DAN","lName":"MOTZ","time":"06:54.10","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":8,"fName":"LIAM","lName":"GREEN","time":"06:54.50","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":9,"fName":"RICKEY","lName":"LUNNEY","time":"06:56.20","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":10,"fName":"Luke","lName":"Small","time":"06:56.60","affiliation":"Haddonfield Crew Club"},
				{"rank":11,"fName":"ALEX","lName":"HALAS","time":"06:57.30","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":12,"fName":"Matthew","lName":"Ix","time":"06:57.60","affiliation":"St. Joseph's Preparatory School"},
				{"rank":13,"fName":"Greg","lName":"Kirwan","time":"07:00.60","affiliation":"Haverford School"},
				{"rank":14,"fName":"M","lName":"Kveney","time":"07:04.00","affiliation":""},
				{"rank":15,"fName":"Bobby","lName":"Risendorf","time":"07:04.80","affiliation":"South Jersey Rowing Club"},
				{"rank":16,"fName":"Tyler","lName":"Simpson","time":"07:05.10","affiliation":"Conestoga Crew Club"},
				{"rank":17,"fName":"","lName":"Poivey-Loson","time":"07:09.6","affiliation":""},
				{"rank":18,"fName":"Justin","lName":"Koch","time":"07:10.20","affiliation":"Holy Spirit High School"},
				{"rank":19,"fName":"Colin","lName":"George","time":"07:10.60","affiliation":"Haddonfield Crew Club"},
				{"rank":20,"fName":"Max","lName":"Levin","time":"07:10.80","affiliation":"Haddonfield Crew Club"},
				{"rank":21,"fName":"Max","lName":"Mallarkey","time":"07:11.10","affiliation":"Conestoga Crew Club"},
				{"rank":22,"fName":"Blaize","lName":"Giangiulio","time":"07:11.20","affiliation":"Haddonfield Crew Club"},
				{"rank":23,"fName":"Ryan","lName":"Hollinger","time":"07:11.30","affiliation":"Conestoga Crew Club"},
				{"rank":24,"fName":"Evan","lName":"Sandt","time":"07:11.60","affiliation":"Holy Spirit High School"},
				{"rank":25,"fName":"Nicholas","lName":"Lario","time":"07:13.70","affiliation":"Haddonfield Crew Club"},
				{"rank":26,"fName":"Hanan","lName":"Zisling","time":"07:14.10","affiliation":"Conestoga Crew Club"},
				{"rank":27,"fName":"Andy","lName":"Laberee","time":"07:15.60","affiliation":"South Jersey Rowing Club"},
				{"rank":28,"fName":"Michael","lName":"Kling","time":"07:16.30","affiliation":"Conestoga Crew Club"},
				{"rank":29,"fName":"Jackson","lName":"Goldberg","time":"07:16.50","affiliation":"South Jersey Rowing Club"},
				{"rank":30,"fName":"james","lName":"cassidy","time":"07:16.80","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":31,"fName":"Daniel","lName":"Hughes","time":"07:17.00","affiliation":"Radnor High School Crew Club"},
				{"rank":32,"fName":"AUSTIN","lName":"BURKE","time":"07:19.50","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":33,"fName":"John","lName":"Glowacki","time":"07:22.60","affiliation":"Bishop Eustace Prep School"},
				{"rank":34,"fName":"JOHN","lName":"MOLCHAN","time":"07:23.00","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":35,"fName":"CHRIS","lName":"WREN","time":"07:24.50","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":36,"fName":"ALEC","lName":"VIDAL","time":"07:27.00","affiliation":"St. Joseph's Preparatory School"},
				{"rank":37,"fName":"Will","lName":"Tasman","time":"07:28.00","affiliation":"Chestnut Hill Academy"},
				{"rank":38,"fName":"James","lName":"Garcia","time":"07:28.50","affiliation":"Philadelphia City Rowing"},
				{"rank":39,"fName":"Jason","lName":"Ronkin","time":"07:28.80","affiliation":"Bishop Eustace Prep School"},
				{"rank":40,"fName":"JOE","lName":"O'CONNEL","time":"07:34.00","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":41,"fName":"Andrew","lName":"Walters","time":"07:34.50","affiliation":"Haddonfield Crew Club"},
				{"rank":42,"fName":"Tanner","lName":"Reese","time":"07:38.80","affiliation":"Haddonfield Crew Club"},
				{"rank":43,"fName":"Matt","lName":"Schmitt","time":"07:44.50","affiliation":"Haddonfield Crew Club"},
				{"rank":44,"fName":"MICHAEL","lName":"SCHWENGER","time":"07:44.50","affiliation":"St. Joseph's Collegiate Institute"},
				{"rank":45,"fName":"Simon","lName":"Michel","time":"07:46.50","affiliation":"South Jersey Rowing Club"},
				{"rank":46,"fName":"Cooper","lName":"Reck","time":"07:47.60","affiliation":"Bishop Eustace Prep School"},
				{"rank":47,"fName":"Aamir","lName":"Mandviwalla","time":"07:56.70","affiliation":"Haddonfield Crew Club"},
				{"rank":48,"fName":"Jacob","lName":"Frankenthaler","time":"07:57.70","affiliation":"Haddonfield Crew Club"},
				{"rank":49,"fName":"Anders","lName":"Backstrom","time":"07:58.50","affiliation":"Conestoga Crew Club"},
				{"rank":50,"fName":"Matt","lName":"Tepper","time":"08:08.70","affiliation":"South Jersey Rowing Club"}
			];
    	}));

		it('should return rowers matching first name', function(){
			var returnedRowers = filter(rowers, 'John');
			expect(returnedRowers.length).toEqual(3);
			expect(returnedRowers[0].fName.toLowerCase()).toEqual('john');
		});

		it('should return rowers matching last name', function(){
			var returnedRowers = filter(rowers, 'zisling');
			expect(returnedRowers.length).toEqual(1);
			expect(returnedRowers[0].lName).toEqual('Zisling');
		});

		it('should return rowers matching first + last name', function(){
			var returnedRowers = filter(rowers, 'hanan zisling');
			expect(returnedRowers.length).toEqual(1);
			expect(returnedRowers[0].fName).toEqual('Hanan');
		});

		it('should return rowers matching the given affiliation', function(){
			var returnedRowers = filter(rowers, "st. joseph's preparatory school");
			expect(returnedRowers.length).toEqual(3);
			expect(returnedRowers[0].affiliation).toEqual("St. Joseph's Preparatory School");
		});

		it('should return rowers matching a partial given affiliation', function(){
			var returnedRowers = filter(rowers, 'st. joseph');
			expect(returnedRowers.length).toEqual(15);
		});

	});
});