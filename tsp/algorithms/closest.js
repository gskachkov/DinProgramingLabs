var utils = require("./utils")();

module.exports = function bruteForce (pointCount, points) {

  var result = [],
    distance = 0;

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

  var findFarestPoint = function (points, zeroPoint) {
    var farestDistance = 0,
      selectedPoint,
      selectedIndex,
      len = points.length;

    for (var i = 0; i <  len; i++) {
      var distance =   utils.pointsDistance(zeroPoint, points[i]);
      if (farestDistance < distance) {
        farestDistance = distance;
        selectedPoint = points[i];
        selectedIndex = i;
      }
    }

    return selectedPoint;
  };

  var findClosestPoint = function (points, zeroPoint) {
    var closestDistance = 1000000000,
      selectedPoint,
      selectedIndex,
      len = points.length;

    for (var i = 0; i <  len; i++) {
      var distance = utils.pointsDistance(zeroPoint, points[i]);
      if (closestDistance >  distance) {
        closestDistance = distance;
        selectedPoint = points[i];
      }
    }

    return selectedPoint;
  };


  var zeroPoint = { x: 0, y: 0};
  var startPoint = findFarestPoint(points, zeroPoint);
  startPoint.selected = true;
  result.push(startPoint.index);
  var closestPoint = startPoint;
  var notSelectedP = notSelectedPoints(points);


  for (var i = 1; i < pointCount; i++ ) {
    notSelectedP = notSelectedPoints(notSelectedP);
    //console.log(notSelectedP);
    
    if (notSelectedP.length !== 1) {
      closestPoint = findClosestPoint(notSelectedP, closestPoint);
    } else {
      closestPoint = notSelectedP[0];
    }
    //console.log(closestPoint);
    closestPoint.selected = true;
    result.push(closestPoint.index);
  }

  distance = utils.findWholeDistance(points, result); 

  return {
    value: distance,
    taken: result
  };
};