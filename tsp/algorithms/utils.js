module.exports = function utils () {

  var sqr = function (value) {
    return Math.pow(value, 2);
  };

  var pointsDistance = function (point1, point2) {
    return Math.sqrt(sqr(point1.x - point2.x) + sqr(point1.y - point2.y));
  };

  var findWholeDistance = function (points, path) {
    var len = points.length;
    var distance = pointsDistance(points[path[0]], points[path[len-1]]);
    
    for (var i = 1; i < len; i++) {
      distance += pointsDistance(points[path[i-1]], points[path[i]]);
    }
    
    return distance;
  };

  var findClosestPoint = function (points, zeroPoint) {
    var closestDistance = 1000000000,
      selectedPoint,
      selectedIndex,
      len = points.length;

    for (var i = 0; i <  len; i++) {
      var distance = pointsDistance(zeroPoint, points[i]);
      if (closestDistance >  distance) {
        closestDistance = distance;
        selectedPoint = points[i];
      }
    }

    return selectedPoint;
  };
 
  return {
    sqr               : sqr,
    pointsDistance    : pointsDistance,
    findWholeDistance : findWholeDistance,
    findClosestPoint  : findClosestPoint
  };
};