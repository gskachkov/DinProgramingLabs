module.exports = function bruteForce (pointCount, points) {

  var result = [],
  	  distance = 0;	

  var sqr = function (value) {
  	return Math.pow(value, 2);
  };

  var pointLength = function (point1, point2) {
  	return Math.sqrt(sqr(point1.x - point2.x) 
  		           + sqr(point1.y - point2.y));
  };

  result.push(0);
  distance = pointLength(points[0], points[pointCount-1]);
  for (var i = 1; i < pointCount; i++) {
    result.push(i);
    distance += pointLength(points[i-1], points[i]);
  }

  return {
    value: distance,
    taken: result
  };
};