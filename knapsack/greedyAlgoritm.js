module.exports = function greedyAlgoritm (capacity, values, weights) {
  var items = values.length;
  var value = 0;
  var weight = 0;
  var taken = new Array(items);;

  for (var i = 0;  i < items; i++) {
    if(weight + weights[i] <= capacity) {
      taken[i] = 1;
      value  += values[i];
      weight += weights[i];
    } else {
      taken[i] = 0;
    }
  }
  return {
    value : value,
    taken : taken
  };
};