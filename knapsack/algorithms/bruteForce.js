module.exports = function branchAndBunch (capacity, values, weights) {
  var items = values.length;
  var value = 0;
  var weight = 0;
  var taken = new Array(items);
  //console.log(items, capacity);
  for (var i = 0; i< items; i++) {
    taken[i] = 0;
  }
  
  var getOptimisticValue = function (taken, values) {
    var items = values.length,
        result = 0;

    for (var i = 0; i < items; i++) {
      result += !taken[i] ? values[i] : 0; 
    }

    return result;
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

    if (curRoom <= capacity) {
      saveBestResult(curValue, curTaken);
      leftBranch(curTaken, values, weights, curStep, curRoom, curValue);
    }

    // Right branch
    curTaken[curStep] = 0;
    leftBranch(curTaken, values, weights, curStep, room, value);
  };

  var saveBestResult = function (value, taken) {
    if (bestResult.value < value) {
      bestResult.value  = value;
      bestResult.taken = taken.slice(); 
    }
    //console.log(bestResult);
  };

  leftBranch (taken, values, weights, step, 0, 0); 

  return bestResult;
};