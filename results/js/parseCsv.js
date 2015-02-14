var parseCSV = function(rowers){
  var newRowers;
  // get rid of DNS
  newRowers = _.reject(rowers, function(rower){
    return rower.Time === 'DNS';
  });

  newRowers = _.map(newRowers, function(rower){
    var newRower = {};
    var nameArr = rower.Name.split(' ');
    newRower.rank = rower.Place;
    newRower.fName = nameArr[0];
    newRower.lName = nameArr[1];
    newRower.affiliation = rower["Affliation "];
    newRower.time = rower.Time;
    return newRower;
  });

  return newRowers;
};
