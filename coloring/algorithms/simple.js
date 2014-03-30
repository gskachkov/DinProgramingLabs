module.exports = function bruteForce (vertexesCount, adgesCount, values) {

  var result = [];

  for(var i=0; i < vertexesCount; i++) {
    result.push(i);
  }

  return {
    value: vertexesCount,
    taken: result
  };
};