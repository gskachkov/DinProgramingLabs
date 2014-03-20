/*
With relaxiong
*/
var _ = require("underscore");

module.exports = function branchAndBunchRelaxWithSort (capacity, notSortedValues, notSortedWeights) {
  var items = notSortedValues.length;
  var value = 0;
  var weight = 0;
  var taken = new Array(items);
  var counter = 0;
  var avarages = new Array(items);
  var result = new Array(items);

  for (var i = 0; i< items; i++) {
    taken[i] = undefined;
    avarages[i] = {
      avg    : notSortedValues[i]/notSortedWeights[i],
      index  : i,
      weight : notSortedWeights[i],
      value  : notSortedValues[i]
    };
  }
  
  var sortedAvarages = _(avarages).sortBy(function (value) {
    return 100000000 - value.avg;
  });

  var values  = _(sortedAvarages).map(function (item) { return item.value});
  var weights = _(sortedAvarages).map(function (item) { return item.weight});

  //console.log(sortedAvarages);
  var getOptimisticValue = function (taken) {
    var weight = 0,
        value  = 0;

    for (var i = 0;  i < items; i++) {
      var item = sortedAvarages[i];
      //console.log('w', item, weight);
      var coef = taken[item.index] === 0 ? 0 : 1;
      if (coef > 0) {
        if (weight + item.weight <= capacity) {
          value  += item.value;
          weight += item.weight; 
        } else {  
          value += item.value * (capacity - weight)/item.weight;
          return value;
        }
      }
    }

    return value;
  };


  var optimisticValue = getOptimisticValue (taken);

  var bestResult =  {
    value : 0,
    taken : taken.slice()
  };

  //console.log('Opt values1', optimisticValue,taken);

  var room = 0;
  //step 1
  var step = -1; 
  var leftBranch = function (taken, values, weights, step, room, value) {
    var curStep = step + 1;
    if (curStep > items - 1) return;
    var curTaken = taken.slice(); 

    // Left branch
    curTaken[curStep] = 1;
    var curValue = value + values[curStep];
    var curRoom  = room  + weights[curStep];

    //console.log('step', curStep );

    if (curRoom <= capacity) {
      saveBestResult(curValue, curTaken);
      leftBranch(curTaken, values, weights, curStep, curRoom, curValue);
    }

    // Right branch
    curTaken[curStep] = 0;
    var optimisticValue = getOptimisticValue (curTaken);
    //console.log('Opt values2', optimisticValue, curTaken);
    if (optimisticValue <= bestResult.value) return; 
    leftBranch(curTaken, values, weights, curStep, room, value);
  };

  var isOptimisticValuesLessBestValue = function (optimisticValue) {
    return optimisticValue <= bestResult.value;
  }

  var saveBestResult = function (value, taken) {
    if (bestResult.value < value) {
      bestResult.value  = value;
      bestResult.taken = taken.slice(); 
      //console.log(value);
    }
  };

  leftBranch (taken, values, weights, step, 0, 0); 

  //console.log('counter',counter);  
  _(bestResult.taken).each(function (value, index) {
      var item = sortedAvarages[index];
      result[item.index] = value;
  });

  return {
   value: bestResult.value,
   taken: result
  };
};