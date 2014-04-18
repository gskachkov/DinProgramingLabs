var utils = require("./utils")();

module.exports = function bruteForce (pointCount, points) {


  var result = [],
    distance = 0,
    bestDistance = 100000000000000000000000000,
    bestResult = [];

  var notSelectedPoints = function (points) {
    var notSelPoints = [];
    var len = points.length;

    for (var i = 0; i < len; i++) {
      if (!points[i]["selected"]) {
        notSelPoints.push(points[i]);
      }
    }

    return notSelPoints;
  };

  for (var j = 0; j < pointCount; j++) {
    var startPoint = points[j];
    result = [];

    startPoint.selected = true;

    result.push(startPoint.index);
    var closestPoint = startPoint;
    var notSelectedP = notSelectedPoints(points);

    for (var i = 1; i < pointCount; i++) { 
      notSelectedP = notSelectedPoints(notSelectedP);
      //console.log(notSelectedP);
      
      if (notSelectedP.length !== 1) {
        closestPoint = utils.findClosestPoint(notSelectedP, closestPoint);
      } else {
        closestPoint = notSelectedP[0];
      }
      //console.log(closestPoint);
      closestPoint.selected = true;
      result.push(closestPoint.index);
    }

    //console.log(result);
    distance = utils.findWholeDistance(points, result); 

    if (distance < bestDistance) {
      bestResult = result.slice();
      bestDistance = distance; 
    }

    for (var i = 0; i < pointCount; i++) {
      points[i].selected = false;
    }
  } 

  return {
    value: bestDistance,
    taken: bestResult
  };
};