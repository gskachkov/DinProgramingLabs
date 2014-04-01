module.exports = function helper () {

  var _helper = {};

  _helper.getVertexes = function (adges, vertexesCount) {
    var vertexes = new Array(vertexesCount);
    var i;

    for (i = 0; i < vertexesCount; i++) {
      vertexes[i] = [];
    }
    
    var adgesCount = adges.length;
    for (i = 0; i < adgesCount; i++) {
      var adge = adges[i];

      vertexes[adge.a].push(adge.b);
      vertexes[adge.b].push(adge.a);
    }

    return vertexes;
  };

  _helper.isColoringValid = function (vertexes, coloring) {
    var result = true,
      colors;

    for (var i = 0; i < vertexes.length; i++) {
      var currColor =  coloring[i];
      var item = vertexes[i];
      var itemLength = item.length;
      for (var j = 0; j < itemLength; j++) {

        var color = coloring[item[j]];
        
        if (color === -1 ) continue;
        if (currColor === color) return false;
      }
    }

    return result;
  };

  _helper.maxColor = function (colors) {
    var color = 0;
    var length = colors.length;
    
    for (var i = 0; i < length; i++) {
      if (colors[i] > color) color = colors[i];
    }
    
    return color;
  };

  return _helper;
};