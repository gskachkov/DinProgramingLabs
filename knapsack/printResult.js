module.exports = function printResult(result) {
  var resultString = '';
  var items = result.taken.length;
  for(var i = 0; i < items; i++) {
    var value = typeof result.taken[i] === 'undefined' ?  0 :result.taken[i];
    resultString +=  value + " ";
  }

  console.log(result.value + ' 0');
  console.log(resultString);
};