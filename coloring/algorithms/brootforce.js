var helper = require('./helper')();

module.exports = function bruteForce (vertexesCount, adgesCount, values, greedyResult) {

  var result = [],
      vertexes,
      i,
      colors = 0;

  result.push(0);/* Set first color*/

  vertexes = helper.getVertexes(values, vertexesCount);
  //console.log(vertexes);
  // Prepare result array 
  for (i = 1; i < vertexesCount; i++) {
    result.push(-1); /* Set unselected color*/
  }

  var iterator = function (index, coloring) {
    //console.log('prevalid', index, coloring, greedyResult);
    if (index >= vertexesCount) return coloring;

    var nextColoring = coloring.slice();
    var currentColor = -1;
    var cr = false;
      
    while (!cr) {
      ++currentColor;

      if (currentColor >= vertexesCount - 1 || currentColor >= greedyResult - 1) {
        return undefined;
      }

      nextColoring[index] = currentColor;
      cr = helper.isColoringValid(vertexes, nextColoring);
      //console.log(index, nextColoring, currentColor, cr);
      if (cr) {
        //console.log('prevalid', index, nextColoring, greedyResult);
        var res = iterator (index + 1, nextColoring);
        //console.log('result', index, res);
        if (typeof res === 'undefined') {
          cr = false; 
        } else {
          if (helper.maxColor(res) < greedyResult - 1) {
            return res;
          } else {
            cr = false;
          }
        }
      }
    }
  };

  var coloring = iterator (1, result);
  var maxColor = 0;

  if (coloring) {
    //console.log(coloring);
    maxColor = helper.maxColor(coloring);
  } 

  return {
    value: maxColor + 1,
    taken: coloring
  };
};