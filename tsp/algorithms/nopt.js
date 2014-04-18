var utils = require("./utils")();
var closest = require("./closest");

module.exports = function bruteForce (pointCount, points) {
  //console.log('start');
  var result,
    distance = 0,
    bestResult,
    bestDistance = 100000000,
    nnes = 5,
    next = true; 

  result = closest(pointCount, points);
  //console.log('closest');
  bestDistance = result.value;
  bestResult = result.taken;
  route =  bestResult;
  bestResultStep = bestResult;

  var optSwap = function (points, i, k) {
    //console.log(points, i , k);
    var part1 = points.slice(0, i);
    var part2 = (points.slice(i, k)).reverse();
    var part3 = points.slice(k);
    //console.log([].concat(part1, part2, part3));
    return [].concat(part1, part2, part3);
  };
var iItem = 0;
  while (next) {
    next = false;
    //var bestResultStep = bestResult;

    for (var i = 0; i < pointCount; i++ ) {
      for (var k = 1; k < nnes && k < pointCount; k++) {
       
        route =  optSwap(bestResult, i, i + k);
        distance = utils.findWholeDistance(points, route); 
        iItem ++;
        
        if (distance < bestDistance) {
          //console.log(distance, iItem);
          next = true; 
          iItem = 0;

          bestDistance = distance;
          bestResult = route;
        }

        if (iItem > 10000) {
          break;
        }
      }
    }
  }

  return {
    value: bestDistance,
    taken: bestResult
  };
};
