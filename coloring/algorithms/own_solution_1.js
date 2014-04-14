var iterator = require('./own_solution');

module.exports = function findBestSolution (vertexesCount, adgesCount, values, previousResult) {
  var result, 
      bestResult = previousResult,
      maxColor = previousResult.value;

     //console.log(previousResult);
     for (var i = 1; i < maxColor; i++) {
      result = iterator (vertexesCount, adgesCount, values, bestResult.taken, bestResult.value - i, i);
      //console.log(result.value);
      if (!result) continue;
      
      if (result.value < bestResult.value) {
        bestResult = result;
      } 
     }

  return bestResult;
};