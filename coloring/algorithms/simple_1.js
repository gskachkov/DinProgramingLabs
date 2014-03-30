module.exports = function bruteForce (vertexesCount, adgesCount, values) {

  var result = [],
      availableColors = [],
      vertexes = new Array(vertexesCount),
      i,
      colors = 0;

  result.push(0);/* Set first color*/

  var checkAndCreateArrayIfNotExistInVertext = function (index) {
    if (!vertexes[index]) {
      vertexes[index] = [];
    }
  };

  var setValueInAvailableColors = function (vertex, value) {
    for (var j = 0; j < vertex.length; j++ ) {
      var index = result[vertex[j]];
      if (index !== -1) {
        availableColors[index] = value;
      }
      //console.log(result, availableColors);
    }
  };

  for (i = 0; i < adgesCount; i++) {
    var adge = values[i];

    checkAndCreateArrayIfNotExistInVertext(adge.a);
    checkAndCreateArrayIfNotExistInVertext(adge.b);

    vertexes[adge.a].push(adge.b);
    vertexes[adge.b].push(adge.a);
  }

  //console.log('vert', vertexes);

  // Prepare result array 
  for (i = 1; i < vertexesCount; i++) {
    result.push(-1); /* Set unselected color*/
  }

  for (i = 0; i < vertexesCount; i++) {
    availableColors.push(false); /* Set unselected color*/
  }

  // Assign colors to remaining V-1 vertices
  for (i = 1; i < vertexesCount; i++) {
    var index;
    var vertex = vertexes[i];

    setValueInAvailableColors(vertex, true);

    var cr;
    for (cr = 0; cr < vertexesCount; cr++) {
      if (availableColors[cr] === false) {
        break;
      }
    }

    result[i] = cr;
    if (cr > colors) {
      colors = cr;
    }


    setValueInAvailableColors(vertex, false);
  }

  return {
    value: colors,
    taken: result
  };
};