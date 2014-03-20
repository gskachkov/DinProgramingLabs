var _ = require("underscore");

module.exports = function greedyAlgoritmWithSort (capacity, values, weights) {
  var items = values.length;
  var value = 0;
  var weight = 0;
  var taken = new Array(items);

  var avarages = new Array(items);
  
  for (var i = 0; i< items; i++) {
    taken[i] = undefined;
    avarages[i] = {
      avg    : values[i]/weights[i],
      index  : i,
      weight : weights[i],
      value  : values[i]
    };
  }
  
  var sortedAvarages = _(avarages).sortBy(function (value) {
    return 100000000 - value.avg;
  });

  for (var i = 0;  i < items; i++) {
    var item = sortedAvarages[i];
    if(weight + item.weight <= capacity) {
      taken[item.index] = 1;
      value  += item.value;
      weight += item.weight;
    } else {
      taken[item.index] = 0;
    }
  }


  return {
    value : value,
    taken : taken
  };
};