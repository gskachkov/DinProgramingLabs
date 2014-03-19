/*
With relaxiong
*/
var _ = require("underscore");

module.exports = function bruteForce (capacity, values, weights) {
  var items = values.length;
  var value = 0;
  var weight = 0;
  var taken = new Array(items);
  var counter = 0;
  var avarages = new Array(items);
  for (var i = 0; i< items; i++) {
    taken[i] = undefined;
    avarages[i] = {
      avg    : weights[i]/values[i],
      index  : i,
      weight : weights[i],
      value  : values[i]
    };
  }
  
  var sortedAvarages = _(avarages).sortBy(function (value) {
    return 100000000 - value.avg;
  });

  var getOptimisticValue = function (taken) {
    var result = 0,
        weight = 0.
        value  = 0;

    for (var i = 0;  i < items; i++) {
      if  (weight + sortedAvarages[i].weight <= capacity) {
        var last = i;
        value  += values[i];
        weight += weights[i];
      } else {
        taken[i] = 0;
      }
    }

    if (i < items - 1) {

    }

    return value;
  };


  var optimisticValue = getOptimisticValue (taken, values);

  var bestResult =  {
    value : 0,
    taken : taken.slice()
  };

  //console.log('Opt values', optimisticValue);

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
    var optimisticValue = getOptimisticValue (curTaken, values);

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
  return bestResult;
};